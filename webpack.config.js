const normalConfig = require('./webpack.config.normal.js');
const reactConfig = require('./webpack.config.react.js');
const svelteConfig = require('./webpack.config.svelte.js');
const webcomponentConfig = require('./webpack.config.webcomponent.js');

module.exports = [
  normalConfig,
  reactConfig,
  svelteConfig,
  webcomponentConfig,
];
