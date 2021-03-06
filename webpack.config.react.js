const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = require('./webpack.base.js');

const {
  DEV_SERVER_PORT,
  DEV_SERVER_HOST,
  // createWebpackEntries,
  // createWebpackCacheGroups,
  // createWebpackViewTemplates,
} = require('./build.config.js');

const isProd = process.env.NODE_ENV === 'production';
const DEV_SERVER_URI = `http://${DEV_SERVER_HOST}${DEV_SERVER_PORT ? ':' + DEV_SERVER_PORT : ''}`;
const HOT_LOADER = `webpack-hot-middleware/client?path=${DEV_SERVER_URI}/pizza/__webpack_hmr`;

console.log(`(webpack.react) process.env.NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`(webpack.react) REACT_HOME: ${REACT_HOME}`);

module.exports = merge(baseConfig, {
  // entry: createWebpackEntries({
  //   isProd,
  //   url: DEV_SERVER_URI,
  //   path: '/pizza/__webpack_hmr', // Output directory being "pizza".
  // })([
  //   ['pizza', './src/spa/react/index.jsx'],
  // ]),
  entry: {
    pizza: [
      ...isProd ? [] : [HOT_LOADER],
      './src/spa/react/index.jsx'
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist/public/pizza'),
    filename: '[name].js',
    publicPath: '/pizza/', // Source path becomes: /pizza/*.(js|css)
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  optimization: {
    // runtimeChunk: 'single',
    runtimeChunk: {
      name: 'runtime-pizza', // All chunk files share the same `runtime-pizza.js`.
    },
    splitChunks: {
      chunks: 'all', // Enables both `initial` and `async` module imports.
      minSize: 0,
      // cacheGroups: createWebpackCacheGroups([
      //   ['tailwind', ['tailwindcss']],
      //   ['react', ['react|react-dom|react-router']],
      //   ['vendor-pizza', ['!tailwindcss', '!react', '!react-dom', '!react-router-dom']]
      // ]),
      cacheGroups: {
        default: false, // Disable the default.
        vendors: false, // Disable the default.
        tailwind: {
          name: 'tailwind',
          test: new RegExp('[\\/]node_modules[\\/](tailwindcss)[\\/]'),
        },
        react: {
          name: 'react',
          test: new RegExp('[\\/]node_modules[\\/](react|react-dom|react-router)[\\/]'),
        },
        'vendor-pizza': {
          name: 'vendor-pizza',
          test: new RegExp('[\\/]node_modules[\\/](!tailwindcss)(!react)(!react-dom)(!react-router)[\\/]'),
        },
      },
    },
  },
  module: {
    rules: [
      // Feed `*.njk` with Webpack chunks.
      {
        test: /\.(html|njk)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src/spa/react'),
        use: [
          {
            loader: 'html-loader',
            options: {
              // `index.njk` and `contact.njk` include partial(s) (`footer.njk`).
              interpolate: true,
            },
          },
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src/spa/react'),
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    // Express templates using HTML Webpack Plugin.
    // ...createWebpackViewTemplates({ rootDir: __dirname })([
    //   [
    //     './src/spa/react/index.njk',
    //     'dist/views/pizza/index.njk',
    //     ['runtime-pizza', 'react', 'vendor-pizza', 'pizza']
    //   ],
    // ]),
    new HtmlWebpackPlugin({
      template: './src/spa/react/index.njk',
      filename: path.resolve(__dirname, 'dist/views/pizza/index.njk'),
      chunks: ['runtime-pizza', 'react', 'vendor-pizza', 'pizza'],
    }),
    new webpack.DefinePlugin({
      // "basename" for React Router.
      'process.env.REACT_PUBLIC_URL': JSON.stringify(path.resolve('/pizza')),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
});

