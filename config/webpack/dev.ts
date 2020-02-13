import path from 'path';

import NodemonPlugin from 'nodemon-webpack-plugin';
import webpack from 'webpack';

import common from './common';

const config: webpack.Configuration = {
  ...common,

  devtool: 'inline-source-map',

  mode: 'development',

  plugins: [
    ...(common.plugins || []),

    new webpack.EnvironmentPlugin({
      LOG_LEVEL: 'debug',
      NODE_ENV: 'development',
      PROJECT: './sample',
    }),

    new NodemonPlugin({
      ignore: ['*.map'],
      script: './dist/main.js',
      verbose: true,
      watch: [
        path.resolve('./dist'),
      ],
    }),
  ],

  watch: true,
};

export default config;
