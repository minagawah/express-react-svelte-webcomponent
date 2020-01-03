module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "testMatch": [
    "**/__tests__/**/*.(js|jsx)",
    "**/?(*.)+(test).(js|jsx)"
  ],
  "snapshotSerializers": ["enzyme-to-json/serializer"],
  "setupFilesAfterEnv": ["<rootDir>/src/setupTests.js"],
  "testPathIgnorePatterns": [
    "/node_modules/",
    "<rootDir>/src/setupTests.js"
  ],
  "moduleFileExtensions": [
    "js", "jsx", "json", "node"
  ],
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less|scss)$": "<rootDir>/__mocks__/styleMock.js",
  }
}
