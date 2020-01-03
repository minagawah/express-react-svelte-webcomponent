const path = require('path');
const webpack = require('webpack');
const LicenseWebpackPlugin = require('license-webpack-plugin').LicenseWebpackPlugin;

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  target: 'web',
  mode: isProd ? 'production' : 'development',
  ...isProd ? {} : {
    // See: https://webpack.js.org/configuration/devtool/
    devtool: 'cheap-source-map',
    // devtool: 'cheap-eval-source-map',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
          failOnError: false,
          failOnWarning: false
        }
      },
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          rootMode: 'upward', // Babel looks up "babel.config.js"
        },
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
    ],
  },
  plugins: [
    ...isProd ? [] : [
      new webpack.optimize.OccurrenceOrderPlugin(), // For webpack 1.x only
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin() // For webpack 1.x only
    ],
    new LicenseWebpackPlugin(),
  ],
};
