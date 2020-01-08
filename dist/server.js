const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const nunjucks = require('nunjucks');

const webpackConfig = require('../webpack.config.js');
const routes = require('./routes.js');

const {
  DEV_SERVER_HOST,
  DEV_SERVER_PORT,
} = require('../build.config.js');

const APP_PORT = process.env.PORT || DEV_SERVER_PORT;
const BASE_URL = `http://${DEV_SERVER_HOST}${APP_PORT ? ':' + APP_PORT : ''}`;

const TEMPLATE_PATH = path.join(__dirname, 'views');

console.log(`BASE_URL: ${BASE_URL}`);
console.log(`TEMPLATE_PATH: ${TEMPLATE_PATH}`);

const app = express();

if (process.env.NODE_ENV !== 'production') {
  const compilers = webpack(webpackConfig);

  /*
   * Sometimes "/public" to "publicPath" may cause "webpack-hot-middleware" to infinitely
   * refresh the browser. Having URL for "publicPath" seems fix the issue.
   * https://github.com/webpack-contrib/webpack-hot-middleware/issues/135#issuecomment-348724624
   */
  app.use(webpackDevMiddleware(compilers, {
    publicPath: '/public',
    headers: {
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': BASE_URL
    },
  }));

  const defaultHmrOptions = {
    log: console.log,
    heartbeat: 10 * 1000,
    logLevel: 'info',
  };

  [
    { index: 0, path: '/__webpack_hmr', }, // Normal Express app
    { index: 1, path: '/pizza/__webpack_hmr', } // React app
  ].forEach(({ index, path }) => {
    app.use(
      webpackHotMiddleware(
        compilers.compilers[index],
        { ...defaultHmrOptions, path }
      )
    );
  });
}

nunjucks.configure(
  TEMPLATE_PATH,
  {
    autoescape: true,
    express: app,
  }
);

app.set('views', TEMPLATE_PATH);
app.set('view engine', 'njk');
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(routes);

app.listen(APP_PORT, () => console.log(`Listening on ${APP_PORT}`));
