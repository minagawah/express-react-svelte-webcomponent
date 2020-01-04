const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = require('./webpack.base.js');

const {
  // createWebpackCacheGroups,
  // createWebpackViewTemplates,
} = require('./build.config.js');

const isProd = process.env.NODE_ENV === 'production';

module.exports = merge(baseConfig, {
  entry: {
    nacho: './src/spa/svelte/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist/public/nacho'),
    filename: '[name].js',
    publicPath: '/nacho/',
  },
  resolve: {
    extensions: ['.mjs', '.js', '.svelte']
  },
  optimization: {
    // runtimeChunk: 'single',
    runtimeChunk: {
      name: 'runtime-nacho', // All chunk files share the same `runtime-nacho.js`.
    },
    splitChunks: {
      chunks: 'initial',
      minSize: 0,
      // cacheGroups: createWebpackCacheGroups([
      //   ['tailwind', ['tailwindcss']],
      //   ['svelte', ['svelte']],
      //   ['vendor-nacho', ['!tailwindcss', '!svelte']]
      // ]),
      cacheGroups: {
        default: false, // Disable the default.
        vendors: false, // Disable the default.
        tailwind: {
          name: 'tailwind',
          test: new RegExp('[\\/]node_modules[\\/](tailwindcss)[\\/]'),
        },
        svelte: {
          name: 'svelte',
          test: new RegExp('[\\/]node_modules[\\/](svelte)[\\/]'),
        },
        'vendor-nacho': {
          name: 'vendor-nacho',
          test: new RegExp('[\\/]node_modules[\\/](!tailwindcss)(!svelte)[\\/]'),
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src/spa/svelte'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              rootMode: 'upward', // Babel looks up "babel.config.js"
            },
          },
          {
            loader: 'svelte-loader',
            options: {
              emitCss: true,
              hotReload: true,
            },
          }
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src/spa/svelte'),
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    // ...createWebpackViewTemplates({ rootDir: __dirname })([
    //   [
    //     './src/spa/svelte/index.njk',
    //     'dist/views/nacho/index.njk',
    //     ['runtime-nacho', 'svelte', 'vendor-nacho', 'nacho']
    //   ],
    // ]),
    new HtmlWebpackPlugin({
      template: './src/spa/svelte/index.njk',
      filename: path.resolve(__dirname, 'dist/views/nacho/index.njk'),
      chunks: ['runtime-nacho', 'svelte', 'vendor-nacho', 'nacho'],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
});
