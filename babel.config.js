module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "browsers": ["last 1 chrome versions"] // Fixed for Svelte `new` issue.
        }
      }
    ],
    "@babel/preset-react",
    [
      "@emotion/babel-preset-css-prop", // For `tw` macro notation.
      {
        "autoLabel": true,
        "labelFormat": "[local]"
      }
    ],
  ],
  "plugins": [
    "@babel/plugin-transform-runtime",
    "macros"
  ]
}
