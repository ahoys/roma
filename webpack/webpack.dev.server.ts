import webpack from 'webpack';
import path from 'path';
import {
  extensions,
  modules,
  tsRule,
  esBuilder,
  svgRule,
  alias,
} from './common';

process.traceDeprecation = true;

export default {
  name: 'server',
  mode: 'development',
  target: 'node',
  entry: path.resolve(__dirname, '../src/client/components/Server.tsx'),
  devtool: 'eval-cheap-module-source-map',
  output: {
    publicPath: '/',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        ...tsRule,
        ...esBuilder,
      },
      svgRule,
    ],
  },
  resolve: {
    modules,
    extensions,
    alias,
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
};
