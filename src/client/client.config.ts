import { getPublicPath } from 'utilities/utilities.configs';

const publicPath = getPublicPath(process.env.PUBLICPATH);
const api = process.env.API
  ? getPublicPath(process.env.API)
  : publicPath + 'api/';

const production = {
  isDevelopment: false,
  isBrowser:
    process.env.ISBROWSER !== undefined && typeof window !== 'undefined',
  publicPath,
  api,
  meta: {
    title: 'ROMA',
    description: 'Roadmap guidance tool.',
    author: 'Ari Höysniemi',
  },
  cookies: {
    domain: process.env.COOKIES_DOMAIN,
    screenFormat: '__Secure-roma_screenFormat',
    theme: '__Secure-roma_theme',
    language: '__Secure-roma_language',
  },
  oauth: {
    apiAuthenticate: publicPath + 'google',
    apiCallback: publicPath + 'auth/google/callback',
    clientId: process.env.OAUTH_CLIENTID || '',
    callbackURL: process.env.OAUTH_CALLBACKURL || '',
    overrideAccess: false,
  },
  localStorage: {
    roadmap: 'roadmap',
  },
};

const development: typeof production = {
  ...production,
  isDevelopment: true,
  cookies: {
    domain: 'localhost',
    screenFormat: 'roma_dev_screenFormat',
    theme: 'roma_dev_theme',
    language: 'roma_dev_language',
  },
  oauth: {
    ...production.oauth,
    callbackURL:
      process.env.OAUTH_CALLBACKURL ||
      'https://localhost:9216/auth/google/callback',
    overrideAccess: process.env.OAUTH_OVERRIDEACCESS === 'true',
  },
};

export default process.env.NODE_ENV === 'development'
  ? development
  : production;
