// process.env['JEST_TESTCONTAINERS_CONFIG_PATH'] = './test/e2e';

export default  {
  displayName:"api-e2e ",
  roots: [
    '<rootDir>/test/e2e'
  ],
  // "setupFiles": [
    // "test/e2e/setupTests.js",
    // "<rootDir>/../../utils/setupTests.js"
  // ],
  // preset: '@trendyol/jest-testcontainers',
  // "modulePathIgnorePatterns": [
  //   "<rootDir>/test/e2e",
  // ],
  "transformIgnorePatterns": [],
  "transform": {
    "^.*[\\\\\\/](api|db)[\\\\\\/].*\\.(js|ts)$": "babel-jest",
    "node_modules[\\\\\\/](p-cancelable|@szmarczak|lowercase-keys)[\\\\\\/].*\\.js$": "babel-jest"
  }
};
