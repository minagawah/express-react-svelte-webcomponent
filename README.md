# express-react-svelte-webcomponent

Webpack multi-compiler example to bundle builds for React, Svelte, Web Components, and normal Express view templates.

[1. About](#about)  
[2. Instructions](#instructions)  
[3. What I Did](#what-i-did)  
&nbsp; [3-1. Installed NPM Packages](#what-i-did-npm-packages)  
[4. Notes](#notes)  
&nbsp; [a. Bundle Only NPM Modules Wanted](#notes-exclude-npm-modules)  
&nbsp; [b. Webpack4 Dynamic Import](#notes-webpack4-dynamic-import)  
&nbsp; [c. Infinite Loop Using "webpack-hot-middleware"](#notes-infinite-loop-using-webpack-hot-middleware)  
&nbsp; [d. Unexpected "import" (Jest)](#notes-unexpected-import)  
&nbsp; [e. Watch Server Template Changes Without Restart](#notes-watch-template-changes)  
&nbsp; [f. Uncaught ReferenceError: regeneratorRuntime is not defined](#notes-uncaught-reference-error-regenerateruntime)  
&nbsp; [g. Using Node Profiler](#notes-node-profiler)  
&nbsp; [h. HMR on view templates](#notes-hmr-on-view-templates)  
&nbsp; [i. No HMR Found For Subdirectory](#notes-no-hmr-found-subdirectory)  
&nbsp; [j. Svelte: new App fails](#notes-svelte-new-app)  
&nbsp; [k. Svelte: Can't reexport the named export "onMount"](#notes-svelte-cant-reexport)  
&nbsp; [l. React: 404 Not Found with React Router using Subdirectory](#notes-react-404-subdirectory)  
[5. LICENSE](#license)  

![screenshot](screenshot.png "Screenshot")

<a id="about"></a>
## 1. About

### Overview

Webpack multi-compiler example to bundle builds for React, Svelte, Web Components, and normal Express view templates.

A website with similar composition is found at:  
[Demo](http://tokyo800.herokuapp.com/)

Express app serving several routes
the view templates for which are bundled by Webpack's HTML Webpack Plugin.  
Two routes are reserved for React and Svelte apps,
the paths being `/pizza` and `/nacho` respectively.  
For the ordinary Express pages,
we also have demonstrations of using Web Components
that are also bundled by Webpack.

### Webpack Implementations

We currently have multi-compiler configurations:
(1) for normal JS apps with view template generations,
(2) for React,
(3) for Svelte,
and (3) for Web Components.  
To speed up the process of the compilers, using `parallel-webpack`.

For (1) normal JS apps, we are using Webpack's HTML Webpack Plugin
to generate `*.njk` (Nunjuck) templates for Express.
Meaning, HMR does ***NOT*** work even if changes are made to view templates,
and you need to `yarn build:dev` every time you make a change.
The same situation applies to Web Components.
For Web Components are laoded at runtime by nature,
there's no way of `webpack-dev-middleware` to detect changes
when codes for Web Components are modified.


<a id="instructions"></a>
## 2. Instructions

### BUILD (development)

```shell
yarn build:dev
```

Regardless of the app kinds, `*.njk` (Nunjucks) templates are built to `dist/views`.
The rest of the chunks are bundled to `dist/public`.
All the chunks are bundled right bellow the directory,
but Web Component codes are bundled to `dist/public/components` directory,
React codes to `dist/public/pizza`,
Svelte codes to `dist/public/nacho`.

Given `NODE_ENV=development`, codes are bundled for `development`.  
For all ES6 codes are transpiled in accord with the definitions in `babel.config.js`.


### RUN (local)

```shell
yarn start
```

Starts Express app by runing `dist/server.js`.
Uses `webpack-dev-middleware` and `webpack-hot-middleware`.

You must run `yarn build:dev` beforehand, otherwise Express
is not able to read `*.njk` (Nunjucks) templates.
The same goes for Web Components.
Whenever you make changes to Web Components,
repeat the build.


### BUILD (production)

Ideas are the same as the ones for `development`, but for `production`:

```shell
yarn build
```



<a id="what-i-did"></a>
## 3. What I Did

<a id="what-i-did-npm-packages"></a>
### 3-1. Installed NPM Packages

Installed NPM packages follow:

### # dev

For Babel:
- @babel/core
- @babel/preset-env
- @babel/plugin-syntax-dynamic-import  
&nbsp; For asynchronous module import.  
- @babel/plugin-transform-runtime  
&nbsp; For the runtime Webpack builds (you may use `babel-polyfill` alternatively).  

For Babel (React):
- @babel/preset-react

For ESLint:
- babel-eslint
- eslint
- eslint-loader
- eslint-plugin-react  
&nbsp; Use other ESLint rules if you don't prefer React specific rules.  

For Webpack:
No `autoprefixer` is needed since `tailwind` contains one.

- webpack
- webpack-cli
- parallel-webpack
- webpack-dev-middleware
- webpack-hot-middleware
- webpack-merge
- html-webpack-plugin  
&nbsp; We generate `*.njk` view templates at the build.  
- copy-webpack-plugin  
&nbsp; We copy image assets to `dist/public/images`.  
- babel-loader  
&nbsp; We could use only Babel7 to transpile ES6 codes, but it is always handy with the help of Webpack.  
- html-loader  
&nbsp; To load Web Component templates.  
- nunjucks-loader  
&nbsp; To load `*.njk` templates.  
- file-loader  
&nbsp; To load assets.  
- svelte-loader  
&nbsp; For Svelte.  


For Webpack (other goodies):

- csp-html-webpack-plugin  
&nbsp; Adds Content Security Policy to the meta.  
- license-webpack-plugin  
&nbsp; Extracts license information and add to the bundled codes.  
- webpack-bundle-analyzer  
&nbsp; In case you want to analyze the Webpack generated chunks.  


For CSS:

Make sure to use `@emotion/core` instead of using `emotion` for React
(which is installed for prod, not dev).  
Also, `babel-plugin-emotion` is not needed
when we have `@emotion/babel-preset-css-prop`,

- css-loader
- style-loader
- postcss-loader
- mini-css-extract-plugin
- to-string-loader  
&nbsp; To apply styles to Shadow DOMs (Web Components).  
- tailwindcss
- babel-plugin-macros  
&nbsp; This is one of two solutions to use tailwindcss.  
- @emotion/babel-preset-css-prop  
&nbsp; When using `tw` macro notation, this is what you need.
[More](https://github.com/minagawah/mini-react-201910#in-depth-emotion-tailwind)  

For Jest + Enzyme testing:

- jest
- jest-emotion
- @babel/plugin-transform-modules-commonjs  
&nbsp; While Babel understands `import` syntax, Jest does not.  
- enzyme
- enzyme-adapter-react-16
- enzyme-to-json


```shell
yarn add --dev @babel/core @babel/preset-env @babel/plugin-syntax-dynamic-import @babel/plugin-transform-runtime @babel/preset-react babel-eslint eslint eslint-loader eslint-plugin-react webpack webpack-cli parallel-webpack webpack-dev-middleware webpack-hot-middleware webpack-merge html-webpack-plugin copy-webpack-plugin babel-loader html-loader nunjucks-loader file-loader svelte-loader csp-html-webpack-plugin license-webpack-plugin webpack-bundle-analyzer css-loader style-loader postcss-loader mini-css-extract-plugin to-string-loader tailwindcss babel-plugin-macros @emotion/babel-preset-css-prop jest jest-emotion @babel/plugin-transform-modules-commonjs enzyme enzyme-adapter-react-16 enzyme-to-json
```


### # prod

- express
- nunjucks
- @emotion/core
- @emotion/styled
- tailwind.macro@next  
&nbsp; The actual macros for tailwindcss (using `babel-plugin-macros`).  
- react
- react-dom
- react-router-dom
- svelte
- moment
- ramda
- animejs

```shell
yarn add express nunjucks @emotion/core @emotion/styled tailwind.macro@next react react-dom react-router-dom svelte moment ramda animejs
```


<a id="notes"></a>
## 4. Notes


<a id="notes-exclude-npm-modules"></a>
### a. Bundle Only NPM Modules Wanted

If you are bundling for the server
(for which the current project does not,
but we used to in the past),
you do not want to include unwanted NPM modules included in your bundles.
You may install `webpack-node-externals`
and use `externals` option for your Webpack config.



<a id="notes-webpack4-dynamic-import"></a>
### b. Webpack4 Dynamic Import

Webpack understands dynamic import syntax (`import()`) just,
but Babel complains that it doesn't.
In order to avoid Babel's confusion about the syntax,
you need `plugin-syntax-dynamic-import`.
Once installed, you need the following in `babel.config.js`:

```
"plugins": [
  "@babel/plugin-syntax-dynamic-import"
]
```

In the old time, we needed `babel-polyfill`
in order to achieve dynamic module imports,
and was a bit bothersome as it required two files:
a file which attempts to import another module,
and sort of a proxy file which actually loads one.
Now, we no longer need it,
and just setting `node` in `@babel/preset-env` would do.

```
"presets": [
  [
    "@babel/preset-env", {
      "modules": false,
      "targets": {
        "node": "current"
      }
    }
  ]
]
```

<a id="notes-infinite-loop-using-webpack-hot-middleware"></a>
### c. Infinite Loop Using `webpack-hot-middleware`

While the main cause of is still unknown (could be Node version),
sometimes we experience a browser to endlessly reload itself
when using `webpack-hot-middleware`.
To stop this from happenning, try to set an actual URL
for `publickPath` instead of a relative path:

https://github.com/webpack-contrib/webpack-hot-middleware/issues/135#issuecomment-348724624

```js
app.use(webpackDevMiddleware(compiler, {
  publicPath: 'http://localhost:5000',
}));
```

<a id="notes-unexpected-import"></a>
### d. Unexpected `import` (Jest)

When `jest` does not understand `import` syntax,
you need `@babel/plugin-transform-modules-commonjs`.

By the way, you could use `babel-jest`,
but `babel-jest` is now integrated into Jest.

https://github.com/vuejs/vue-cli/issues/1584#issuecomment-519482294

```
"plugins": [
  "@babel/plugin-transform-modules-commonjs"
]
```

<a id="notes-watch-template-changes"></a>
### e. Watch Server Template Changes Without Restart

You may not.  
You could either go with a pure React application or normal server-client application.
If you choose server-client,
consider using services like `nodemon` or `supervisor` to watch the template changes.  
Compared to `nodemon`, `supervisor` has fewer dependencies.
Install `supervisor`, and do this (in your `package.json`):

```json
  "start": "supervisor -e html,js dist/server.js",
```


<a id="notes-uncaught-reference-error-regenerateruntime"></a>
### f. Uncaught ReferenceError: regeneratorRuntime is not defined

```json
"plugins": [
  "@babel/plugin-transform-runtime"
]
```


<a id="notes-node-profiler"></a>
### g. Using Node Profiler

https://github.com/webpack/webpack/issues/4550#issuecomment-306750677

We have the following command in `package.json` for `yarn profile:build:client`:

```json
"profile:build:client": "BABEL_ENV=client node --inspect-brk node_modules/webpack/bin/webpack.js --config webpack.client.js",
```

Open `chrome://inspect`, and start the profiler.  
You can see what's going on with your webpack build process.


How To Add Swap Space on Ubuntu 16.04 | DigitalOcean  
https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-16-04



<a id="notes-hmr-on-view-templates"></a>
### h. HMR on view templates (not relevant to this project)  

To detect changes in "*.njk" templates, we need a workaround.  
https://github.com/jantimon/html-webpack-plugin/issues/100#issuecomment-368303060


```js
const ReloadPlugin = require('reload-html-webpack-plugin');
```


<a id="notes-no-hmr-found-subdirectory"></a>
### i. No HMR Found For Subdirectory

If you output chunks to a subdirectory, having `__webpack_hmr`
for webpack-hot-middleware path does not resolve,
and you must specify the subdirectory.
For instance, we bunlde React codes to `dist/public/react`,
so we explicitly tell Webpack where to look for the HMR loader.

For `webpack.config.react.js`:

```js
entry: {
  pizza: [
    'webpack-hot-middleware/client?path=http://localhost:5000/react/__webpack_hmr`,
    'src/spa/react/index.jsx'
  ]
}
```

For `dis/server.js`:

```js
webpackHotMiddleware(compiler, {
  path: '/react/__webpack_hmr'
})
```


<a id="notes-svelte-new-app"></a>
### j. Svelte: new App fails

Although you `new App`, it fails.

```
TypeError: Class constructor SvelteComponent cannot be invoked without 'new'
```

In `package.json`:

```json
"browserslist": [
  "last 1 chrome versions"
]
```

Or, in `babel.config.js`:

```js
"presets": [
  [
    "@babel/preset-env",
    {
      "targets": {
        "browsers": ["last 1 chrome versions"]
      }
     }
  ]
]
```


<a id="notes-svelte-cant-reexport"></a>
### k. Svelte: Can't reexport the named export `onMount`

In your Svelte file, you try:

```js
import { onMount } from 'svelte';
```

and it gives you:

```
Can't reexport the named export 'onMount' from non EcmaScript module (only default export is available)
```

Add `.mjs` to `extension` ***BEFORE*** the `.js` of your `webpack.config.svelte.js`:  
https://github.com/sveltejs/svelte-loader/issues/82#issuecomment-485830738

```json
resolve: {
  extensions: ['.mjs', '.js', '.svelte']
}
```

Also, don't forget to add it to the `babel-loader` as well (optional):

```json
{
  test: /\.m?jsx?$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    rootMode: 'upward'
  }
}
```


<a id="notes-react-404-subdirectory"></a>
### l. React: 404 Not Found with React Router using Subdirectory

`dist/router.js`:

```js
router.get(['/pizza', '/pizza/*'], (req, res) => res.render('pizza/index'));
```

Also, make sure you have "basename" set for your React Router:

```js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './components';

const basename = process.env.REACT_PUBLIC_URL;

ReactDOM.render(
  <Router basename={basename}>
    <App />
  </Router>,
  document.getElementById('root')
);
```

and `process.env.REACT_PUBLIC_URL` is set in `webpack.config.react.js`
using `webpack.DefinePlugin`:

```js
new webpack.DefinePlugin({
  'process.env.REACT_PUBLIC_URL': JSON.stringify(path.resolve('/pizza')),
})
```


<a id="3-license"></a>
## 5. License

[LICENSE](./LICENSE)
