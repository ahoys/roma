import webpack from 'webpack';
import path from 'path';
import DotEnv from 'dotenv';
import LoadablePlugin from '@loadable/webpack-plugin';

DotEnv.config();

/**
 * Rules to transpile Typescript to JS.
 */
export const tsRule = {
  test: /\.(ts|tsx)$/,
  include: path.resolve('__dirname', '../src'),
};

/**
 * Transpiles SVG to React.
 */
export const svgRule = {
  test: /\.svg$/,
  use: ['@svgr/webpack'],
};

// Loader and the minimizer should have the same target.
export const esTarget = 'es2021';

/**
 * Esbuilder is a much faster alternative to ts-loader.
 */
export const esBuilder = {
  loader: 'esbuild-loader',
  options: {
    loader: 'tsx',
    target: esTarget,
  },
};

/**
 * Used to solve a process/browser error.
 * https://github.com/microsoft/PowerBI-visuals-tools/issues/365
 */
export const processBrowserRule = {
  test: /\.m?js/,
  resolve: {
    fullySpecified: false,
  },
};

/**
 * Supported extensions of the project.
 * Other files won't be read.
 */
export const extensions = ['.ts', '.tsx', '.json', '.js', '.jsx', '.svg'];

/**
 * Location of 3rd-party modules.
 */
export const modules = ['node_modules'];

/**
 * Some modules are not supported client-side.
 * Here you can define fallbacks.
 */
export const clientFallback = {
  fs: false,
  path: false,
  os: false,
};

/**
 * Import names that point into some specific file.
 */
export const alias = {
  // The config should always point to client-side configs for
  // security reasons.
  config$: path.resolve(__dirname, '../src/client/client.config.ts'),
  types$: path.resolve(__dirname, '../src/types.ts'),
  theme$: path.resolve(__dirname, '../src/client/theme.ts'),
  components: path.resolve(__dirname, '../src/client/components'),
  hooks: path.resolve(__dirname, '../src/client/hooks'),
  reducers: path.resolve(__dirname, '../src/client/reducers'),
  strings: path.resolve(__dirname, '../src/client/strings'),
  utilities: path.resolve(__dirname, '../src/client/utilities'),
  dtos: path.resolve(__dirname, '../src/shared/dtos'),
};

/**
 * Plugins used for the client-side bundling.
 */
export const clientPlugins = [
  new webpack.EnvironmentPlugin({
    NODE_ENV: null, // null means optional.
    PUBLICPATH: null,
    API: null,
    FEATURES_GITLAB: null,
    COOKIES_DOMAIN: undefined,
    OAUTH_AUTHBY: undefined,
  }),
  new webpack.ProvidePlugin({
    process: 'process/browser',
  }),
  new webpack.DefinePlugin({
    // Must always be true.
    'process.env.ISBROWSER': JSON.stringify(true),
  }),
  new LoadablePlugin(),
];
