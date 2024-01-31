import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import serialize from 'serialize-javascript';
import {
  IDeviceState,
  initialState as defaultDeviceState,
} from 'reducers/reducer.device';
import config from 'config';
import { StaticRouter } from 'react-router-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { ChunkExtractor } from '@loadable/server';
import { Provider } from 'react-redux';
import { baseTheme } from '../theme';
import { Stats } from 'webpack';
import { createStore } from '../store';
import { App } from './App';
import {
  ISessionState,
  initialState as defaultSessionState,
} from 'reducers/reducer.session';
import {
  IDataState,
  initialState as defaultDataState,
} from 'reducers/reducer.data';
import { getRoadmapId } from 'utilities/utilities.roadmap';
import * as fontawesome from '@fortawesome/fontawesome-svg-core';

interface IServer {
  clientStats: Stats;
  nonce?: string;
}

export default ({ clientStats, nonce }: IServer) =>
  async (req: express.Request, res: express.Response) => {
    const sheet = new ServerStyleSheet();
    try {
      const screenFormat = req.cookies[config.cookies.screenFormat];
      const theme = req.cookies[config.cookies.theme];
      const language = req.cookies[config.cookies.language];
      const roadmap = getRoadmapId(req.originalUrl);
      const data: IDataState = { ...defaultDataState };
      if (typeof roadmap === 'number') {
        data.roadmap = roadmap;
      }
      const overrideSecurity =
        config.isDevelopment && config.oauth.overrideAccess;
      const session: ISessionState = {
        ...defaultSessionState,
        language: language || defaultSessionState.language,
        isLoggedIn: !!req.user || overrideSecurity,
      };
      const device: IDeviceState = {
        ...defaultDeviceState,
        screenFormat: screenFormat || defaultDeviceState.screenFormat,
        theme: theme || defaultDeviceState.theme,
      };
      const store = createStore({ session, data, device });
      const extractor = new ChunkExtractor({ stats: clientStats });
      const jsx = extractor.collectChunks(
        <Provider store={store}>
          <StaticRouter location={req.url}>
            <App />
          </StaticRouter>
        </Provider>
      );
      const html = ReactDOMServer.renderToString(sheet.collectStyles(jsx));
      const scriptTags = extractor.getScriptTags();
      res.send(`
        <!doctype html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <title>${config.meta.title}</title>
            <meta name="description" content="${config.meta.description}">
            <meta name="author" content="${config.meta.author}">
            <meta name="mobile-web-app-capable" content="yes">
            <meta name="apple-mobile-web-app-capable" content="yes">
            <meta name="application-name" content="${config.meta.title}">
            <meta name="apple-mobile-web-app-title" content="${
              config.meta.title
            }">
            <meta name="msapplication-starturl" content="/">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <meta name="theme-color" content="#1c1e20">
            ${
              config.isDevelopment
                ? ''
                : `<link rel="manifest" href="${config.publicPath}manifest.json" />`
            }
            <link rel="shortcut icon" href="${
              config.publicPath
            }assets/favicon.ico" />
            ${sheet.getStyleTags()}
            <style>${fontawesome.dom.css()}</style>
            <style type="text/css">${baseTheme}</style>
          </head>
          <body>
            <div id="client">${html}</div>
            <script nonce="${nonce}" type="text/javascript">
              window.__PRELOADED_STATE__ = ${serialize(store.getState())}
            </script>
            ${
              config.isDevelopment
                ? ''
                : `<script nonce="${nonce}" type="text/javascript">
                    if ('serviceWorker' in navigator) {
                      window.addEventListener('load', () => {
                        navigator.serviceWorker.register(
                          '${config.publicPath}service-worker.js'
                        ).then(reg => {
                          console.info('Service worker successfully registered.');
                        }).catch(err => {
                          console.error('Service worker registration failed.');
                        });
                      });
                    }
                  </script>`
            }
            ${scriptTags}
          </body>
        </html>
      `);
    } catch (err) {
      console.error(err);
    } finally {
      sheet.seal();
    }
  };
