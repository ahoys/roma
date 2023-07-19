import path from 'path';
import fs from 'fs';
import http from 'http';
import https from 'https';
import crypto from 'crypto';
import express from 'express';
import logscribe from 'logscribe';
import webpack from 'webpack';
import serverRenderer from '../client/components/Server';
import WebpackDevClientConfig from '../../webpack/webpack.dev.client';
import WebpackDevServerConfig from '../../webpack/webpack.dev.server';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import csurf from 'csurf';
import config from './server.config';
import { urlencoded, json } from 'body-parser';
import { DataSource } from 'typeorm';
import { resolversOauth } from './resolvers/resolvers.Oauth';
import { resolversUser } from './resolvers/resolvers.User';
import { resolversPassport } from './resolvers/resolvers.Passport';
import { User } from './models/model.User';
import { Assignment } from './models/model.Assignment';
import { AssignmentComment } from './models/model.AssignmentComment';
import { Feature } from './models/model.Feature';
import { Product } from './models/model.Product';
import { Requirement } from './models/model.Requirement';
import { RequirementComment } from './models/model.RequirementComment';
import { Roadmap } from './models/model.Roadmap';
import { Tag } from './models/model.Tag';
import { Version } from './models/model.Version';
import { AssignmentSubscriber } from './models/subscribers/subscriber.Assignment';
import { RequirementSubscriber } from './models/subscribers/subscriber.Requirement';
import { roadmapResolvers } from './resolvers/resolvers.Roadmap';
import { errorResolver } from './resolvers/resolvers.Error';
import { productResolvers } from './resolvers/resolvers.Product';
import { tagResolvers } from './resolvers/resolvers.Tag';
import { versionResolvers } from './resolvers/resolvers.Version';
import { featureResolvers } from './resolvers/resolvers.Feature';
import { requirementResolvers } from './resolvers/resolvers.Requirement';
import { requirementCommentResolvers } from './resolvers/resolvers.RequirementComment';
import { assignmentResolvers } from './resolvers/resolvers.Assignment';
import { assignmentCommentResolvers } from './resolvers/resolvers.AssignmentComment';
import { createMockupTables } from './utilities/utilities.db';
import {
  cookieResolvers,
  defaultCookieOptions,
} from './resolvers/resolvers.Cookie';

const print = logscribe('server').print;
print(config);

(async () =>
  new DataSource({
    type: 'mysql',
    host: config.database.host,
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.database,
    synchronize: true,
    cache: true,
    entities: [
      Assignment,
      AssignmentComment,
      Feature,
      Product,
      Requirement,
      RequirementComment,
      Roadmap,
      Tag,
      User,
      Version,
    ],
    subscribers: [AssignmentSubscriber, RequirementSubscriber],
  })
    .initialize()
    .then(async (ds) => {
      const nonce = crypto.randomBytes(16).toString('base64');
      const app: express.Application = express();
      app.use(cors());
      app.use(cookieParser(config.cookies.secret));
      app.use(
        urlencoded({
          extended: true,
          limit: '1mb',
        })
      );
      app.use(
        json({
          limit: '1mb',
        })
      );
      if (config.isDevelopment) {
        app.use('*', (req, res, next) => {
          print(req.method + ' > ' + req.originalUrl);
          next();
        });
      }
      resolversPassport(app);
      resolversOauth(app);
      resolversUser(app, ds);
      cookieResolvers(app);
      roadmapResolvers(app, ds);
      productResolvers(app, ds);
      tagResolvers(app, ds);
      versionResolvers(app, ds);
      featureResolvers(app, ds);
      requirementResolvers(app, ds);
      requirementCommentResolvers(app, ds);
      assignmentResolvers(app, ds);
      assignmentCommentResolvers(app, ds);
      errorResolver(app); // Should come last.
      if (config.isDevelopment) {
        await createMockupTables();
        const compiler = webpack([
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          WebpackDevClientConfig as any,
          WebpackDevServerConfig,
        ]);
        // In development we use a hot server.
        app.use(
          webpackDevMiddleware(compiler, {
            publicPath: config.publicPath,
            serverSideRender: true,
          })
        );
        app.use(webpackHotServerMiddleware(compiler));
      } else {
        // Define CORS-rules here.
        const directives: { [key: string]: string[] } = {
          'script-src': [
            "'self'",
            typeof nonce === 'string' ? `'nonce-${nonce}'` : "'unsafe-inline'",
          ],
        };
        app.use(
          config.publicPath,
          express.static(path.join(__dirname, 'public'), {
            maxAge: '365d',
          })
        );
        app.use(
          helmet({
            contentSecurityPolicy: {
              useDefaults: true,
              directives,
            },
          })
        );
        app.use(
          csurf({
            cookie: defaultCookieOptions,
          })
        );
        // In production we use pre-built stats.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const clientStats = await import('../../dist/public/stats.json' as any);
        app.use(serverRenderer({ clientStats, nonce }));
      }
      if (config.ssl.crtPath && config.ssl.keyPath) {
        // This application will arrange the HTTPS.
        const key = fs.readFileSync(config.ssl.keyPath);
        const cert = fs.readFileSync(config.ssl.crtPath);
        https
          .createServer({ key, cert }, app)
          .listen(config.port, () =>
            console.info(`https://localhost:${config.port}...`)
          );
      } else {
        // Apache2 or something else is used as a proxy.
        http
          .createServer(app)
          .listen(config.port, () =>
            console.info(`http://localhost:${config.port}...`)
          );
      }
    }))();
