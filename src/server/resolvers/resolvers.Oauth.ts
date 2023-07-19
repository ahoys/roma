import config from '../server.config';
import passport from 'passport';
import { Application, Request, Response, NextFunction } from 'express';
import { User } from '../models/model.User';
import { print } from 'logscribe';

/**
 * Block all access to API that is not authorized by OAuth.
 * Note that the page itself should still be accessible.
 */
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as User;
    if (
      (user && user.admin === true) ||
      (config.isDevelopment && config.oauth.overrideAccess)
    ) {
      next();
    } else {
      res.status(401).end();
    }
  } catch (error) {
    print(error);
    res?.status(401).end();
  }
};

/**
 * Google OAuth related resolvers and authenticators.
 */
export const resolversOauth = (app: Application): void => {
  /**
   * Start the OAuth process as the client enters
   * apiAuthenticate.
   */
  app.get(
    config.oauth.apiAuthenticate,
    passport.authenticate('google', {
      scope: ['profile'],
    })
  );

  /**
   * Accessing the apiCallback will redirect
   * the client to home. This usually happens after a
   * successful new OAuth authorization.
   */
  app.get(
    config.oauth.apiCallback,
    passport.authenticate('google'),
    (req, res) => {
      res.redirect(config.publicPath);
    }
  );

  /**
   * Used to verify that the user is authenticated.
   */
  app.get(config.api + 'verify', isAuthenticated, (req, res) =>
    res.status(200).end()
  );
};
