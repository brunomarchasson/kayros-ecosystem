export default  {
"displayName": "api-unit",
// "testMatch": [
//   "<rootDir>/../../**/*.test.js"
// ],
roots: [
  '<rootDir>'
],

"setupFiles": [
  "envars/config",
  // "<rootDir>/../../utils/setupTests.js"
],
"modulePathIgnorePatterns": [
  "<rootDir>/test/e2e",
],
"transformIgnorePatterns": [],
"transform": {
  "^.*[\\\\\\/](api|db)[\\\\\\/].*\\.(js|ts)$": "babel-jest",
  "node_modules[\\\\\\/](p-cancelable|@szmarczak|lowercase-keys)[\\\\\\/].*\\.js$": "babel-jest"
}
}
