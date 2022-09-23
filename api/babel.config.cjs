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
  api.cache(true);
  // const isNodeEnv = api.caller((caller) =>
  //   [
  //     "babel-jest",
  //     "@babel/register",
  //     "@babel/cli",
  //     "@babel/node",
  //   ].includes(caller?.name || ""),
  // );

  return {
    presets: [
      [
        "@babel/preset-env",
        {targets: { node: "16", esmodules: false }}
        // isNodeEnv ? { targets: { node: "16", esmodules: false } } : {},
      ],
    ],

    "plugins": [
      [
        "@babel/plugin-transform-runtime",
        {
          "regenerator": true
        }
      ]
    ]

    // ignore: api.env() === "test" ? [] : ["**/__tests__/**", "**/*.test.ts"],
    // sourceMaps: api.env() === "production",
  }
};
