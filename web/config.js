/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

/**
 * Client-side application settings.
 */
const config = {
  // Core application settings
  app: {
    env: `${process.env.APP_ENV}`,
    name: `${process.env.APP_NAME}`,
    origin: `${process.env.APP_ORIGIN}`,
  },
  api: {
    origin: `${process.env.API_ORIGIN}`,
  },
};
console.log('config', config);
export default config;
