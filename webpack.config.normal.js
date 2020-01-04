const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const baseConfig = require('./webpack.base.js');

const {
  DEV_SERVER_PORT,
  DEV_SERVER_HOST,
  // createWebpackEntries,
  // createWebpackCacheGroups,
  // createWebpackViewTemplates,
} = require('./build.config.js');

const isProd = process.env.NODE_ENV === 'production';
const isAnal = !!process.env.ANALYZE; // I know I named it wrong...

const DEV_SERVER_URI = `http://${DEV_SERVER_HOST}${DEV_SERVER_PORT ? ':' + DEV_SERVER_PORT : ''}`;
const HOT_LOADER = `webpack-hot-middleware/client?path=${DEV_SERVER_URI}/__webpack_hmr`;

const DEFAULT_EXCLUDE = [
  /node_modules/,
  path.resolve(__dirname, 'src/components'),
  path.resolve(__dirname, 'src/spa/react'),
  path.resolve(__dirname, 'src/spa/svelte'),
];

module.exports = merge(baseConfig, {
  // entry: createWebpackEntries({
  //   isProd,
  //   url: DEV_SERVER_URI,
  //   path: '/__webpack_hmr',
  // })([
  //   ['footer', './src/partials/footer/index.js'],
  //   ['top', './src/index.js'],
  //   ['contact', './src/contact.js'],
  // ]),
  entry: {
    footer: [
      ...isProd ? [] : [HOT_LOADER],
      './src/partials/footer/index.js'
    ],
    top: [
      ...isProd ? [] : [HOT_LOADER],
      './src/index.js'
    ],
    contact: [
      ...isProd ? [] : [HOT_LOADER],
      './src/contact.js'
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist/public'),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js']
  },
  optimization: {
    // runtimeChunk: 'single',
    runtimeChunk: {
      name: 'runtime-normal', // All chunk files share the same `runtime-normal.js`.
    },
    splitChunks: {
      chunks: 'all', // Enables both `initial` and `async` module imports.
      minSize: 0,
      // cacheGroups: createWebpackCacheGroups([
      //   ['anime', ['animejs']],
      //   ['tailwind', ['tailwindcss']],
      //   ['vendor-normal', ['!animejs', '!tailwindcss']]
      // ]),
      cacheGroups: {
        default: false, // Disable the default.
        vendors: false, // Disable the default.
        anime: {
          name: 'anime',
          test: new RegExp('[\\/]node_modules[\\/](animejs)[\\/]'),
        },
        tailwind: {
          name: 'tailwind',
          test: new RegExp('[\\/]node_modules[\\/](tailwindcss)[\\/]'),
        },
        'vendor-normal': {
          name: 'vendor-normal',
          test: new RegExp('[\\/]node_modules[\\/](!animejs)(!tailwindcss)[\\/]'),
        },
      },
    },
  },
  module: {
    rules: [
      // Feed `*.njk` with Webpack chunks.
      {
        test: /\.(html|njk)$/,
        exclude: DEFAULT_EXCLUDE,
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
        exclude: DEFAULT_EXCLUDE,
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
    //     './src/index.njk',
    //     'dist/views/index.njk',
    //     ['runtime-normal', 'vendor-normal', 'footer', 'top', 'anime']
    //   ],
    //   [
    //     './src/contact.njk',
    //     'dist/views/contact.njk',
    //     ['runtime-normal', 'vendor-normal', 'footer', 'contact']
    //   ],
    // ]),
    new HtmlWebpackPlugin({
      template: './src/index.njk',
      filename: path.resolve(__dirname, 'dist/views/index.njk'),
      chunks: ['runtime-normal', 'vendor-normal', 'footer', 'top', 'anime'],
    }),
    new HtmlWebpackPlugin({
      template: './src/contact.njk',
      filename: path.resolve(__dirname, 'dist/views/contact.njk'),
      chunks: ['runtime-normal', 'vendor-normal', 'footer', 'contact'],
    }),
    new CopyWebpackPlugin([
      { from: 'src/images', to: 'images' }, // Copy images to `dist/public/images`
    ]),
    new CspHtmlWebpackPlugin(
      {
        'base-uri': "'self'",
        'object-src': "'none'",
        'script-src': ["'unsafe-inline'", "'self'", "'unsafe-eval'"],
        'style-src': ["'unsafe-inline'", "'self'", "'unsafe-eval'"],
      },
      {
        enabled: true,
        hashingMethod: 'sha256',
        hashEnabled: {
          'script-src': true,
          'style-src': true
        },
        nonceEnabled: {
          'script-src': true,
          'style-src': false // For "unsafe-inline" in our web components.
        },
      },
    ),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    ...(isProd !== true && isAnal) ? [
      new BundleAnalyzerPlugin(), // 127.0.0.1:8888
    ] : [],
  ],
});
