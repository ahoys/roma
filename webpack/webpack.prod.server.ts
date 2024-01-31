import webpack from 'webpack';
import path from 'path';
import {
  extensions,
  modules,
  tsRule,
  esBuilder,
  svgRule,
  processBrowserRule,
  alias,
} from './common';
import DotEnvWebpack from 'dotenv-webpack';
import ExcludeExternals from 'webpack-node-externals';
import LoadablePlugin from '@loadable/webpack-plugin';

export default {
  name: 'server',
  mode: 'production',
  target: 'node',
  entry: path.resolve(__dirname, '../src/server/server.ts'),
  devtool: 'nosources-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'roma.js',
    trustedTypes: true,
  },
  module: {
    rules: [
      {
        ...tsRule,
        ...esBuilder,
      },
      svgRule,
      processBrowserRule,
    ],
  },
  resolve: {
    modules,
    extensions,
    alias,
  },
  plugins: [
    new DotEnvWebpack({
      // Otherwise .env won't be read to build.
      systemvars: true,
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new LoadablePlugin(),
  ],
  node: {
    __dirname: false,
    __filename: false,
  },
  optimization: {
    minimize: false,
  },
  externals: [ExcludeExternals()],
};
