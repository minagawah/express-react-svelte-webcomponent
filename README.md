# express-react-svelte-webcomponent

Webpack multi-compiler example to bundle builds for React, Svelte, Web Components, and normal Express view templates.

[1. About](#about)  
[2. Instructions](#instructions)  
[3. What I Did](#what-i-did)  
&nbsp; [3-1. Installed NPM Packages](#what-i-did-npm-packages)  
[4. Notes](#notes)  
&nbsp; [4-1. Extra Features Implemented](#notes-extra)  
&nbsp; &nbsp; [(1) Dynamic (async) Import](#notes-extra-dynamic-import)  
&nbsp; &nbsp; [(2) Use of "animejs" in ES modules](#notes-extra-animejs)  
&nbsp; &nbsp; [(3) React: Tailwind + Emotion](#notes-extra-tailwind-emotion)  
&nbsp; &nbsp; [(4) Express: Include Nunjucks Partials](#notes-extra-nunjucks-partials)  
&nbsp; &nbsp; [(5) Web Components: Load External CSS for Shadow DOMs](#notes-extra-external-css-fro-shadow-doms)  
&nbsp; &nbsp; [(6) Web Components: No "class" Syntax](#notes-extra-web-components-without-class)  
&nbsp; &nbsp; [(7) Web Components: Apply styles to "slot"](#notes-extra-apply-styles-to-slot)  
&nbsp; &nbsp; [(8) CORS Errors Fetching from `localhost`](#notes-extra-cors-errors-for-localhost)  
[5. Troubles & Solutions](#troubles)  
&nbsp; [5-1. Webpack4 Dynamic Import](#troubles-webpack4-dynamic-import)  
&nbsp; [5-2. Unexpected "import" (Jest)](#troubles-unexpected-import)  
&nbsp; [5-3. Infinite Loop Using "webpack-hot-middleware"](#troubles-infinite-loop-using-webpack-hot-middleware)  
&nbsp; [5-4. Uncaught ReferenceError: regeneratorRuntime is not defined](#troubles-uncaught-reference-error-regenerateruntime)  
&nbsp; [5-5. Using Node Profiler](#troubles-node-profiler)  
&nbsp; [5-6. No HMR Found For Subdirectory](#troubles-no-hmr-found-subdirectory)  
&nbsp; [5-7. Svelte: new App fails](#troubles-svelte-new-app)  
&nbsp; [5-8. Svelte: Can't reexport the named export "onMount"](#troubles-svelte-cant-reexport)  
&nbsp; [5-9. React: 404 Not Found with React Router using Subdirectory](#troubles-react-404-subdirectory)  
&nbsp; [5-10. Troubles: Irrelevant Issues)](#troubles-irrelevant)  
&nbsp; &nbsp; [(a) Bundle Only NPM Modules Wanted](#troubles-irrelevant-exclude-npm-modules)  
&nbsp; &nbsp; [(b) Watch Server Template Changes Without Restart](#troubles-irrelevant-watch-template-changes)  
&nbsp; &nbsp; [(c) HMR on view templates](#troubles-irrelevant-hmr-on-view-templates)  
[6. LICENSE](#license)  

A working example with similar composition is found at:  
[Demo](http://tokyo800.herokuapp.com/)

![screenshot](screenshot.png "Screenshot")


<a id="about"></a>
## 1. About

### Goal

As we enter 2020, many of us deal with monolithic frontends,
and our professional hunch tells us
that we need more flexibility as to make changes
to hundreds of components everyday.
So, it was quite natural for web dev communities
to observe last year the growing trends of ***"micro frontends"***
as to satisfy the mentioned urge.

One solution would be to have pages with different frameworks.
This project configures Webpack multi-compilers
to bundle both React and Svelte apps.
Another would be to have Web Components for more lightweight tasks.
For this one, too, we have Webpack bundles the codes.

However, as simple as it may sound,
configuring Webpack to handle multiple frameworks is quite laborious.
Especially when we normally want these frameworks
running in different subdirectories, and we can easily assume
it means never-ending struggles with Webpack configurations.
With a sample provided in this project,
I hope to lessen the burdens for those
who also suffer from the same situations.

### Overview

We have Express app which serves several routes:

(1) `/` and `/contact`: Normal Express app  
(2) `/pizza`: React SPA  
(3) `/nacho`: Svelte SPA  

For (1) normal Express app, as you look into
the HTML codes, you see the following tags:

a. &lt;burger-header&gt;  
b. &lt;cookie-consent&gt;  
c. &lt;message-box&gt;  

which are all custom elements
to demonstrate the use of Web Components.  
So, there's that.

(4) Web Components

For all the above, we use *multi-compiler* mode of Webpack,
which is configured in `webpack.config.js`,
and basically requires another set of the following configurations:

(1) `webpack.config.normal.js`  
(2) `webpack.config.react.js`  
(3) `webpack.config.svelte.js`  
(4) `webpack.config.webcomponent.js`  

To speed up the build, we use `parallel-webpack`
instead of normal multi-compiler mode of Webpack.

When we `yarn build:dev`, along with the bundling
processes for JS and CSS, we use HTML Webpack Plugin
to generate `*.njk` (Nunjucks) from templates,
that are used as view templates for Express app
when we run `dist/server.js`.

As you can tell, once the view templates are generated,
they are physically there in the `dist/views`,
and neither `webpack-dev-middleware` nor `webpack-hot-middleware`
can detect changes made to the source templates.  
So, whenever you make changes to the source templates,
you must run `yarn build:dev` to re-generate the view templates,
and reload the browser.

Similar goes for Web Components.
Because Web Components are loaded runtime by nature,
`webpack-dev-middleware` and `webpack-hot-middleware`
cannot detect changes to any of the sources,
and you must perform the build again
just like you need it for Express view templates.

For normal JS and React apps,
`webpack-dev-middleware` and `webpack-hot-middleware`
detect changes, and you don't need to run builds again.

For Svelte apps, it currently does not support HMR,
and you must re-build, and reload the browser.  
(while I can make `webpack-dev-middleware` to detect changes,
I haven't done it yet)


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

<a id="notes-extra"></a>
### 4-1. Extra Features Implemented

Some features that are implemented in this project
may help someone who has troubles implementing.


<a id="notes-extra-dynamic-import"></a>
#### (1) Dynamic (async) Import

Sometimes you want certain NPM packages being loaded at runtime,
and Webpack4 offers `import()` syntax to achieve this,
and those packages are excluded from the bundled chunks.

[src/index.js](./src/index.js):

```js
(async () => {
  const animeES = await import('animejs/lib/anime.es.js');
})();
```

You need to specify "optimization.splitChunks.chunks"
in your Webpack configuration.  
Specifying "initial" lets you load modules only statically.  
Specifying "async" lets you modules only dynamically.  
Specifying "all" lets you load both.

[webpack.config.normal.js](./webpack.config.normal.js):

```js
optimization: {
  splitChunks: {
    chunks: 'all'
  }
}
```

You also need to know `import()` syntax is valid only to Webpack4,
and Babel does not understand the syntax.
See [5-1. Webpack4 Dynamic Import](#troubles-webpack4-dynamic-import)
for how you need `@babel/plugin-syntax-dynamic-import`
to teach Babel of the syntax.



<a id="notes-extra-animejs"></a>
#### (2) Use of `animejs` in ES modules

`animejs` provides a build specific for ES codes:

[./src/index.js](./src/index.js):

```js
const animeES = await import('animejs/lib/anime.es.js');
const anime = prop('default')(animeES);

anime({
  targets: '.square',
  keyframes: [
    { translateX: 190 },
    { translateX: 0 },
  ],
  loop: true
})
```


<a id="notes-extra-tailwind-emotion"></a>
#### (3) React: Tailwind + Emotion

You want Tailwind + Emotion in your React apps.

[src/spa/react/components/Toppings.jsx](./src/spa/react/components/Toppings.jsx):  

```html
<div key={o.id} css={css`${tw`flex flex-row`}`}>
```

The topic is pretty much discussed in the following repository:  
[cra-ts-emotion-tailwind-solution](https://github.com/minagawah/cra-ts-emotion-tailwind-solution)  
or  
[mini-react-201910](https://github.com/minagawah/mini-react-201910#in-depth-emotion-tailwind)
but the basic idea is to choose "Babel macro" solution over "PostCSS" solution
if you are using Jest to test your components.




<a id="notes-extra-nunjucks-partials"></a>
#### (4) Express: Include Nunjucks Partials

Many Express view templates allow you
to include partial templates, and so does Nunjucks.

[./src/index.njk](./src/index.njk):

```html
${require('./partials/footer/template.njk')}
```



<a id="notes-extra-external-css-fro-shadow-doms"></a>
#### (5) Web Components: Load External CSS for Shadow DOMs

`to-string-loader` is a handy loader for external CSS files
to your Web Components to apply styles to Shadow DOMs.

[webpack.config.webcomponent.js](./webpack.config.webcomponent.js):

```js
module: {
  rules: [
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: [
        'to-string-loader'
        'css-loader',
        'postcss-loader'
      ]
    }
  ]
}
```

[src/components/burger-header/index.js](./src/components/burger-header/index.js):  
[src/components/cookie-consent/index.js](./src/components/cookie-consent/index.js):  


```js
import styles from './style.css';
import template from './template.html';

class BurgerHeader extends HTMLElement {
  constructor () {
    super();

    const text = String.raw`${template}`;
    const css = styles.toString();
    
    if (!text) throw new Error('No template');
    if (!css)  throw new Error('No styles');

    const el = document.createElement('template');
    el.innerHTML = `<style>${css}</style>${text}`;

    this.attachShadow({ mode: 'open' })
      .appendChild(el.content.cloneNode(true));
  }
```


<a id="notes-extra-web-components-without-class"></a>
#### (6) Web Components: No `class` Syntax

Some of you may prefer not using ES6 `class` syntax,
but want to go the old fashion way (using `prototype`).

[src/components/message-box/index.js](./src/components/message-box/index.js):  



<a id="notes-extra-apply-styles-to-slot"></a>
#### (7) Web Components: Apply styles to `slot`

Applying styles to CSS classes within the custom elements are easy.
Yet, you want styles for `slot` given from the parent.

Say, the parent gives you "message" slot.

[src/index.njk](./src/index.njk):  

```html
<cookie-consent>
  <div slot="message">
    This website uses cookies to ensure you get the best experience on our website.
  </div>
</cookie-consent>
```

and you have in your custom element the following.

[src/components/cookie-consent/template.html](./src/components/cookie-consent/template.html):  

```html
<div id="message-wrapper">
  <slot name="message">
    This website uses cookies.
  </slot>
</div>
```

and here is the selector syntax you want.

[src/components/cookie-consent/style.css](./src/components/cookie-consent/style.css):  

```css
div#message-wrapper slot[name=message] {
    @apply text-gray-800 mb-1;
}
```



<a id="notes-extra-cors-errors-for-localhost"></a>
#### (8) CORS Errors Fetching from `localhost`

You run your app locally, and Chrome raises a CORS error
when you attempt to `fetch` external resources.

What you probablly want is: https://cors-anywhere.herokuapp.com/

[src/spa/svelte/App.svelte](./src/spa/svelte/App.svelte)  
[src/lib/utils.js](./src/lib/utils.js)  





<a id="troubles"></a>
## 5. Troubles & Solutions

Issues I encountered and their solutions.


<a id="troubles-webpack4-dynamic-import"></a>
### 5-1. Webpack4 Dynamic Import

Webpack understands the syntax `import()` just fine, but Babel complains.
For Babel, you need `plugin-syntax-dynamic-import`.  
Once installed, then in your `babel.config.js`:

```
"plugins": [
  "@babel/plugin-syntax-dynamic-import"
]
```

Once a time, we used `babel-polyfill` for dynamic module imports.
Yet, it required us to have 2 steps: actual files to import others,
and sort of proxy files for them.  
Now, it has become much easier for we only need "node" as one of the build target.  
In your `babel.config.js`:

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


<a id="troubles-unexpected-import"></a>
### 5-2. Unexpected `import` (Jest)

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


<a id="troubles-infinite-loop-using-webpack-hot-middleware"></a>
### 5-3. Infinite Loop Using `webpack-hot-middleware`

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


<a id="troubles-uncaught-reference-error-regenerateruntime"></a>
### 5-4. Uncaught ReferenceError: regeneratorRuntime is not defined

```json
"plugins": [
  "@babel/plugin-transform-runtime"
]
```


<a id="troubles-node-profiler"></a>
### 5-5. Using Node Profiler

https://github.com/webpack/webpack/issues/4550#issuecomment-306750677

We have the following command in `package.json` for `yarn profile:build:client`:

```json
"profile:build:client": "BABEL_ENV=client node --inspect-brk node_modules/webpack/bin/webpack.js --config webpack.client.js",
```

Open `chrome://inspect`, and start the profiler.  
You can see what's going on with your webpack build process.


How To Add Swap Space on Ubuntu 16.04 | DigitalOcean  
https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-16-04



<a id="troubles-no-hmr-found-subdirectory"></a>
### 5-6. No HMR Found For Subdirectory

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


<a id="troubles-svelte-new-app"></a>
### 5-7. Svelte: new App fails

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


<a id="troubles-svelte-cant-reexport"></a>
### 5-8. Svelte: Can't reexport the named export `onMount`

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

```js
resolve: {
  extensions: ['.mjs', '.js', '.svelte']
}
```

Also, don't forget to add it to the `babel-loader` as well (optional):

```js
{
  test: /\.m?jsx?$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    rootMode: 'upward'
  }
}
```


<a id="troubles-react-404-subdirectory"></a>
### 5-9. React: 404 Not Found with React Router using Subdirectory

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




<a id="troubles-irrelevant"></a>
### 5-10. Troubles: Irrelevant Issues

Troubleshoots from the past for features that were once
implemented in this project but are now gone.  
Or, notes on irrelevant topics, but may help you
with understanding the core issues associated.


<a id="troubles-irrelevant-exclude-npm-modules"></a>
#### a. Bundle Only NPM Modules Wanted

If you attempt to bundle `server.js` using Webpack,
you do not want to include unwanted NPM modules.
Then, use `webpack-node-externals`,
and set it to "externals" option in your Webpack config.


<a id="troubles-irrelevant-watch-template-changes"></a>
#### b. Watch Server Template Changes Without Restart

You may not.  
You could either go with a pure React application or normal server-client application.
If you choose server-client,
consider using services like `nodemon` or `supervisor` to watch the template changes.  
Compared to `nodemon`, `supervisor` has fewer dependencies.
Install `supervisor`, and do this (in your `package.json`):

```json
  "start": "supervisor -e html,js dist/server.js",
```


<a id="troubles-irrelevant-hmr-on-view-templates"></a>
#### c. HMR on view templates (not relevant to this project)  

To detect changes in "*.njk" templates, we need a workaround.  
https://github.com/jantimon/html-webpack-plugin/issues/100#issuecomment-368303060


```js
const ReloadPlugin = require('reload-html-webpack-plugin');
```



<a id="license"></a>
## 6. License

[LICENSE](./LICENSE)
