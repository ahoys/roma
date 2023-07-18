import path from 'path';
import {
  modules,
  extensions,
  tsRule,
  esBuilder,
  svgRule,
  alias,
  clientPlugins as plugins,
  clientFallback as fallback,
} from './common';

export default {
  name: 'client',
  mode: 'development',
  target: 'web',
  entry: path.resolve(__dirname, '../src/client/components/Client.tsx'),
  devtool: 'eval-cheap-module-source-map',
  output: {
    filename: 'client.js',
    publicPath: '/',
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
    fallback,
  },
  plugins,
};
