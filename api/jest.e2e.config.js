process.env['JEST_TESTCONTAINERS_CONFIG_PATH'] = './api';

export default  {
  displayName:"api-e2e ",
  roots: [
    '<rootDir>'
  ],
  preset: '@trendyol/jest-testcontainers',
  transform: {
    "^.*[\\\\\\/](api|db)[\\\\\\/].*\\.(js|ts)$": "babel-jest",
    // "node_modules[\\\\\\/](p-cancelable|@szmarczak|lowercase-keys)[\\\\\\/].*\\.js$": "babel-jest"
  }
};
