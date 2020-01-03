/* eslint no-unused-vars: [0] */

/*
 * To demonstrate the use of Svelete to work in subdirectory,
 * the app is bundled to "dist/public/nacho/nacho.js"
 * with a view template "views/pizza.njk" for both
 * Express router configures to serve: /nacho
 */

import App from './App.svelte';

const app = new App({
  target: document.querySelector('main'),
  data: {
    quotes: []
  },
});
