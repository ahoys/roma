import config from '../server.config';
import { Application } from 'express';

export const defaultCookieOptions = {
  path: config.publicPath,
  maxAge: 86400000 * 30,
  secure: !config.isDevelopment,
  sameSite: true,
  httpOnly: true,
};

export const cookieResolvers = (app: Application) => {
  /**
   * Stores the given cookies.
   */
  app.put(config.api + 'cookies', async ({ body }, res, next) => {
    try {
      if (typeof body === 'object') {
        if (body.screenFormat) {
          res.cookie(
            config.cookies.screenFormat,
            body.screenFormat,
            defaultCookieOptions
          );
        }
        res.status(200).end();
      }
      res.status(200).end();
    } catch (error) {
      next(error);
    }
  });
};
