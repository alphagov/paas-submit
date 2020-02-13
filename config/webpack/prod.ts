import CompressionPlugin from 'compression-webpack-plugin';
import TerserJSPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';

import common from './common';

const config: webpack.Configuration = {
  ...common,

  devtool: 'source-map',

  mode: 'production',

  optimization: {
    ...common.optimization,

    minimize: true,
    minimizer: [new TerserJSPlugin({})],
    occurrenceOrder: true,
    runtimeChunk: false,
    splitChunks: false,
  },

  plugins: [
    ...(common.plugins || []),

    new CompressionPlugin({
      deleteOriginalAssets: true,
      include: 'assets/',
      test: /\.(js|svg|css)$/,
    }),
  ],
};

export default config;
