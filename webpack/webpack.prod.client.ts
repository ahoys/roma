import path from 'path';
// import CopyPlugin from 'copy-webpack-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest';
import WorkboxPlugin from 'workbox-webpack-plugin';
import StatsPlugin from 'stats-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import {
  extensions,
  modules,
  esTarget,
  tsRule,
  esBuilder,
  svgRule,
  processBrowserRule,
  alias,
  clientPlugins,
  clientFallback as fallback,
} from './common';
import { ESBuildMinifyPlugin } from 'esbuild-loader';
import { getPublicPath } from '../src/client/utilities/utilities.configs';

export default {
  name: 'client',
  mode: 'production',
  target: 'web',
  entry: path.resolve(__dirname, '../src/client/components/Client.tsx'),
  devtool: 'nosources-source-map',
  output: {
    path: path.resolve(__dirname, '../dist/public'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].client.js',
    publicPath: getPublicPath(process.env.PUBLICPATH),
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
    fallback,
  },
  plugins: [
    ...clientPlugins,
    new CleanWebpackPlugin(),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: `${path.resolve(__dirname, '../src/assets/favicon.ico')}`,
    //       to: `${path.resolve(__dirname, '../dist/public/')}`,
    //     },
    //   ],
    // }),
    new StatsPlugin('stats.json'),
    // PWA
    new WorkboxPlugin.InjectManifest({
      swSrc: path.resolve(__dirname, '../src/client/service-worker.js'),
      swDest: 'service-worker.js',
      maximumFileSizeToCacheInBytes: 512 * 1024,
      include: [/\.js$/],
    }),
    new WebpackPwaManifest({
      name: 'ROMA',
      short_name: 'ROMA',
      description: 'Product family management tool',
      start_url: process.env.PUBLICPATH || '/',
      display: 'standalone',
      theme_color: '#ffffff',
      background_color: '#F20D0D',
      fingerprints: false,
      inject: false,
      // icons: [
      //   {
      //     src: path.resolve(__dirname, '../src/assets/bc_192.png'),
      //     destination: path.join('assets'),
      //     size: '192x192',
      //   },
      //   {
      //     src: path.resolve(__dirname, '../src/assets/bc_512.png'),
      //     destination: path.join('assets'),
      //     size: '512x512',
      //   },
      // ],
    }),
  ],
  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        target: esTarget,
      }),
    ],
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
          name(module: any) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            return `yarn.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
};
