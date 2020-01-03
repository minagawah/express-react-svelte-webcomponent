/*
 * To demonstrate the use of React with React Router to work
 * in subdirectory, the app is bundled to "dist/public/pizza/pizza.js"
 * with a view template "views/pizza.njk" for both Express router
 * configures to serve: /pizza
 */

import React from 'react';
import ReactDOM from 'react-dom';
// import { Router, browserHistory } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { App } from './components';

import './styles.css';

const basename = process.env.REACT_PUBLIC_URL;

// <Router history={browserHistory} basename={basename}>
ReactDOM.render(
  <Router basename={basename}>
    <App />
  </Router>,
  document.querySelector('main')
);

if (typeof module.hot !== 'undefined') {
  module.hot.accept();
}
