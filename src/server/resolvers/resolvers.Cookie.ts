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
        if (
          typeof body.screenFormat === 'string' &&
          ['mobile', 'compact', 'wide'].includes(body.screenFormat)
        ) {
          return res
            .cookie(
              config.cookies.screenFormat,
              body.screenFormat,
              defaultCookieOptions
            )
            .status(200)
            .send({
              screenFormat: body.screenFormat,
            });
        }
        if (
          typeof body.theme === 'string' &&
          ['light', 'dark'].includes(body.theme)
        ) {
          return res
            .cookie(config.cookies.theme, body.theme, defaultCookieOptions)
            .status(200)
            .send({
              theme: body.theme,
            });
        }
        if (body.language && ['en', 'fi'].includes(body.language)) {
          return res
            .cookie(
              config.cookies.language,
              body.language,
              defaultCookieOptions
            )
            .status(200)
            .send({
              language: body.language,
            });
        }
      }
      return res.status(304).end();
    } catch (error) {
      next(error);
    }
  });
};
