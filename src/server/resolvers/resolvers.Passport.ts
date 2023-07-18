import config from '../server.config';
import passport from 'passport';
import session from 'express-session';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Application } from 'express';
import { User } from '../models/model.User';
import { print } from 'logscribe';

export const resolversPassport = (app: Application) => {
  app.use(
    session({
      secret: config.session.secret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: !config.isDevelopment,
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.oauth.clientId,
        clientSecret: config.oauth.clientSecret,
        callbackURL: config.oauth.callbackURL,
      },
      async (accessToken, refreshToken, profile, cb) => {
        const { id, displayName } = profile || {};
        const user = await User.findOneBy({ oauthId: id });
        if (user) {
          // Has access.
          return cb(null, user);
        } else {
          // No access, generate a new user for validation.
          const master = await User.findOneBy({ admin: true });
          const thisUser = new User();
          thisUser.name = displayName;
          thisUser.oauthId = id;
          thisUser.admin = !master;
          await User.save(thisUser);
          if (thisUser.admin) print('Master not found, created a new one.');
          print(`Registered a new user: ${thisUser.name}`);
          return cb(null, thisUser);
        }
      }
    )
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  passport.serializeUser((user: any, done) =>
    done(null, (user as User)?.oauthId)
  );
  passport.deserializeUser(async (oauthId: string, done) =>
    User.findOneBy({ oauthId })
      .then((foundUser) => done(null, foundUser))
      .catch(() => done(null, false))
  );
};
