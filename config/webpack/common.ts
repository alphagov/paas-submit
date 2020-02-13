import path from 'path';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import webpack from 'webpack';
import nodeModules from 'webpack-node-externals';

const assetName = (ext?: string): string => `assets/[hash:base32].[name].${ext || '[ext]'}`;

const config: webpack.Configuration = {
  entry: {
    main: [path.resolve(__dirname, '..', '..', 'src', 'server.ts')],
  },

  externals: [
    nodeModules({ whitelist: [] }),
  ],

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts(x?)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              reportFiles: [/(?<!\.test)\.ts(x?)/],
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|ico|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: assetName(),
            },
          },
        ],
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: assetName('css'),
            },
          },
          {
            loader: 'extract-loader',
            options: {
              publicPath: '/',
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [path.resolve(__dirname, '../node_modules')],
              },
              sourceMap: true,
            },
          },
        ],
      },
      {
        enforce: 'pre',
        loader: 'source-map-loader',
        test: /\.js$/,
      },
    ],
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', '..', 'dist'),
    publicPath: '/',
  },

  plugins: [
    new CleanWebpackPlugin(),
  ],

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },

  target: 'node',
};

export default config;
