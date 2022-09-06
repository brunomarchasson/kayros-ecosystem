/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

/**
 * Babel configuration.
 *
 * @see https://babeljs.io/docs/en/options
 * @param {import("@babel/core").ConfigAPI} api
 * @returns {import("@babel/core").TransformOptions}
 */
module.exports = function config(api) {
  api.cache(true);
  return {
    presets: ['@babel/preset-react'],
    plugins: ['@babel/plugin-proposal-nullish-coalescing-operator'],
  };
};
