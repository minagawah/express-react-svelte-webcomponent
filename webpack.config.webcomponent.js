const path = require('path');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.base.js');

module.exports = merge(baseConfig, {
  entry: {
    cookieconsent: './src/components/cookie-consent/index.js',
    burger: './src/components/burger-header/index.js',
    messagebox: './src/components/message-box/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist/public/components'),
    filename: '[name].js',
    publicPath: '../',
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src/components'),
        use: [
          'html-loader'
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src/components'),
        use: [
          'to-string-loader', // Apply styles to Shadow DOMs.
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
});
