declare module 'passport-azure-ad-oauth2' {
    import * as passport from 'passport';
    import * as oauth2 from 'passport-oauth2';
  
    type VerifyCallback = (
      err?: string | Error | null,
      user?: Express.User,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      info?: any
    ) => void;
  
    interface AzureAdOAuth2Options {
      clientID: string;
      clientSecret: string;
      callbackURL: string;
      resource?: string;
      tenant?: string;
      useCommonEndpoint?: boolean;
    }
  
    interface AzureAdOAuth2Profile {
      id: string;
      displayName: string;
      givenName: string;
      familyName: string;
      email: string;
    }
  
    export class Strategy extends oauth2.Strategy {
      constructor(
        options: AzureAdOAuth2Options,
        verify: (
          accessToken: string,
          refreshToken: string,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          params: any,
          profile: passport.Profile,
          done: VerifyCallback
        ) => void
      );
      constructor(
        options: AzureAdOAuth2Options,
        verify: (
          accessToken: string,
          refreshToken: string,
          profile: passport.Profile,
          done: VerifyCallback
        ) => void
      );
    }
  }
  