module.exports = {
  "parser": "babel-eslint",
  "plugins": ["react"],
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "env": {
    "browser": true,
    "node": true,
    "jest": true
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "overrides": [
    {
      "files": ["**/*.js", "**/*.jsx"],
      "rules": {
        "indent": ["error", 2],
        "react/prop-types": [1],
      }
    }
  ],
  // Shared throughout the plugins.
  "settings": {
    "react": {
      "pragma": "React",
      "version": "detect"
    }
  },
  "globals": {
    "tw": true
  }
}
