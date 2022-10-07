/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

/**
 * Babel configuration
 *
 * @see https://babeljs.io/docs/en/options
 * @param {import("@babel/core").ConfigAPI} api
 * @returns {import("@babel/core").TransformOptions}
 */
module.exports = function config(api) {
  // api.cache(true);
  const isNodeEnv = api.caller((caller) =>
    [
      "babel-jest",
      "@babel/register",
      "@babel/cli",
      "@babel/node",
    ].includes(caller?.name || ""),
  );

  return {
    presets: [
      [
        "@babel/preset-env",
        // {targets: { node: "16" }}
        isNodeEnv ? { targets: { node: "16", esmodules: false } } : {},
      ],
    ],

    "plugins": [
      "@babel/plugin-proposal-private-methods",
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-object-rest-spread",
      // "babel-plugin-relay",
      [
        "babel-plugin-import",
        {
          libraryName: "lodash",
          libraryDirectory: "",
          camel2DashComponentName: false,
        },
        "lodash",
      ],
    ]

    // ignore: api.env() === "test" ? [] : ["**/__tests__/**", "**/*.test.ts"],
    // sourceMaps: api.env() === "production",
  }
};
