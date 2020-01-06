/*
 * To demonstrate the use of React with React Router to work
 * in subdirectory, the app is bundled to "dist/public/pizza/pizza.js"
 * with a view template "views/pizza.njk" for both Express router
 * configures to serve: /pizza
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { composeContextProviders } from './lib/';
import { ProvideScreenSize } from './contexts/'; // ScreenSizeStateType

import { App } from './components';

import './styles.css';

const basename = process.env.REACT_PUBLIC_URL;

/*
 * type AppliedContext = (React.FC | any)[];
 * type AppliedContextList = AppliedContext[];
 *
 * [
 *   [(ProvideScreenSize as React.FC), {} as ScreenSizeStateType]
 * ] as AppliedContextList,
 */

ReactDOM.render(
  <Router basename={basename}>
    {composeContextProviders( // Lets you compose multiple contexts.
      [
        [ProvideScreenSize, {}]
      ],
      (<App />)
    )}
  </Router>,
  document.querySelector('main')
);

if (typeof module.hot !== 'undefined') {
  module.hot.accept();
}
