import config from '../server.config';
import passport from 'passport';
import { Application } from 'express';
import { User } from '../models/model.User';
import { print } from 'logscribe';
import { isAuthenticated } from './resolvers.Passport';

/**
 * Google OAuth related resolvers and authenticators.
 */
export const resolversGoogleOauth2 = (app: Application): void => {
  /**
   * Start the OAuth process as the client enters
   * apiAuthenticate.
   */
  app.get(
    config.oauth.google.apiAuthenticate,
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
    config.oauth.google.apiCallback,
    passport.authenticate('google'),
    (req, res) => {
      res.redirect(config.publicPath);
    }
  );

  /**
   * Returns 200 if the user is authenticated.
   */
  app.get(config.api + 'verify', isAuthenticated, (req, res) =>
    res.status(200).end()
  );

  /**
   * Block all access to API that is not authorized by OAuth.
   * Note that the page itself should still be accessible.
   */
  app.use(config.api, (req, res, next) => {
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
  });
};
