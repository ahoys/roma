import config from '../server.config';
import passport from 'passport';
import { Application } from 'express';
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
};
