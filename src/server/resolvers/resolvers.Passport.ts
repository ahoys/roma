import config from '../server.config';
import passport from 'passport';
import session from 'express-session';
import jwt from 'jsonwebtoken';
import { Strategy as AzureStrategy } from 'passport-azure-ad-oauth2';
import { Strategy as GoogleStrategy, VerifyCallback } from 'passport-google-oauth20';
import { Application, NextFunction, Request, Response } from 'express';
import { User } from '../models/model.User';
import { print } from 'logscribe';

/**
 * Returns 401 if the user object can't be found.
 */
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (config.oauth.overrideAccess === true) {
    return next();
  }
  const user = req.user as User;
  if (user) {
    next();
  } else {
    res.status(401).end();
  }
};

const commonCallback = async (
  id: string,
  displayName: string,
  cb: VerifyCallback
) => {
  try {
    const user = await User.findOneBy({ oauthId: id });
    console.log(id, displayName, user);
    if (user) {
      // User found, access granted.
      return cb(null, user);
    } else {
      // User not found, investigate...
      // 1) If no master set, the first user will be the master user.
      // 2) If master set, this user simply doesn't have an access.
      const master = await User.findOneBy({ admin: true });
      if (!master) {
        // Scenario 1.
        // This user will be the master. Has access.
        const master = new User();
        master.name = displayName;
        master.oauthId = id;
        master.admin = true;
        await User.save(master);
        print('Created a new master user:', master.name);
        return cb(null, master);
      } else {
        // Scenario 2.
        // Master already exists.
        // Add a read-only user.
        const readonlyUser = new User();
        readonlyUser.name = displayName;
        readonlyUser.oauthId = id;
        readonlyUser.admin = false;
        await User.save(readonlyUser);
        print('Created a new read-only user:', readonlyUser.name);
        return cb(null, readonlyUser);
      }
    }
  } catch (error) {
    print(error);
  }
};

export const resolversPassport = (app: Application) => {
  // Init OAuth 2.0 with Passport.js
  app.use(
    session({
      secret: config.session.secret,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  if (config.oauth.authBy === 'aad') {
    /**
     * Enable Azure AD Strategy.
     */
    passport.use(
      new AzureStrategy(
        {
          clientID: config.oauth.aad.clientId,
          clientSecret: config.oauth.aad.clientSecret,
          callbackURL: config.oauth.aad.callbackURL,
          tenant: config.oauth.aad.tenantId,
        },
        async (accessToken, refreshToken, params, profile, cb) => {
          try {
            const { id_token } = params;
            const decodedToken = jwt.decode(id_token) as {
              oid: string;
              name: string;
            };
            const { oid, name } = decodedToken;
            return commonCallback(oid, name, cb);
          } catch (error) {
            print(error);
            return cb(null, undefined);
          }
        }
      )
    );
  } else if (config.oauth.authBy === 'google') {
    /**
     * Enable Google Strategy.
     */
    passport.use(
      new GoogleStrategy(
        {
          clientID: config.oauth.google.clientId,
          clientSecret: config.oauth.google.clientSecret,
          callbackURL: config.oauth.google.apiCallback,
        },
        async (accessToken, refreshToken, profile, cb) =>
          commonCallback(profile.id, profile.displayName, cb)
      )
    );
  }
  // app.use(
  //   session({
  //     secret: config.session.secret,
  //     resave: false,
  //     saveUninitialized: false,
  //   })
  // );
  // app.use(passport.initialize());
  // app.use(passport.session());
  // passport.use(
  //   new GoogleStrategy(
  //     {
  //       clientID: config.oauth.clientId,
  //       clientSecret: config.oauth.clientSecret,
  //       callbackURL: config.oauth.callbackURL,
  //     },
  //     async (accessToken, refreshToken, profile, cb) => {
  //       const { id, displayName } = profile || {};
  //       const user = await User.findOneBy({ oauthId: id });
  //       if (user) {
  //         // Has access.
  //         return cb(null, user);
  //       } else {
  //         // No access, generate a new user for validation.
  //         const master = await User.findOneBy({ admin: true });
  //         const thisUser = new User();
  //         thisUser.name = displayName;
  //         thisUser.oauthId = id;
  //         thisUser.admin = !master;
  //         await User.save(thisUser);
  //         if (thisUser.admin) print('Master not found, created a new one.');
  //         print(`Registered a new user: ${thisUser.name}`);
  //         return cb(null, thisUser);
  //       }
  //     }
  //   )
  // );
  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // passport.serializeUser((user: any, done) =>
  //   done(null, (user as User)?.oauthId)
  // );
  // passport.deserializeUser(async (oauthId: string, done) =>
  //   User.findOneBy({ oauthId })
  //     .then((foundUser) => done(null, foundUser))
  //     .catch(() => done(null, false))
  // );
};
