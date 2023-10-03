import clientConfig from '../client/client.config';

/**
 * The client should never be allowed here.
 */
if (clientConfig.isBrowser || typeof window !== 'undefined') {
  throw new Error('Client accessed the server-config!');
}

/**
 * Server-side configs include secrets,
 * definitions etc that should never be
 * accessed client-side.
 */
const production = {
  ...clientConfig,
  port: Number(process.env.PORT) || 9216,
  session: {
    secret: process.env.SESSION_SECRET || '',
  },
  cookies: {
    ...clientConfig.cookies,
    secret: process.env.COOKIES_SECRET || '',
  },
  database: {
    type: process.env.DB_TYPE || 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_DATABASE || 'roma',
    encryptionKey: process.env.DB_ENCRYPTION_KEY || '',
  },
  oauth: {
    ...clientConfig.oauth,
    google: {
      ...clientConfig.oauth.google,
      apiCallback: process.env.OAUTH_APICALLBACK || '',
      clientId: process.env.OAUTH_CLIENTID || '',
      clientSecret: process.env.OAUTH_SECRET || '',
      callbackURL: process.env.OAUTH_CALLBACKURL || '',
    },
    aad: {
      ...clientConfig.oauth.aad,
      apiCallback: process.env.OAUTH_APICALLBACK || '',
      clientId: process.env.OAUTH_CLIENTID || '',
      tenantId: process.env.OAUTH_TENANTID || '',
      clientSecret: process.env.OAUTH_SECRET || '',
      callbackURL: process.env.OAUTH_CALLBACKURL || '',
    },
  },
  ssl: {
    crtPath: process.env.SSL_CRTPATH,
    keyPath: process.env.SSL_KEYPATH,
  },
};

const development: typeof production = {
  ...production,
  isDevelopment: true,
  ssl: {
    crtPath: process.env.SSL_CRTPATH,
    keyPath: process.env.SSL_KEYPATH,
  },
};

export default process.env.NODE_ENV === 'development'
  ? development
  : production;
