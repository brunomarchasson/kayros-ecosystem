/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

// import { greenBright } from "chalk";
import envars from "envars";
import knex from "knex";
import minimist from "minimist";
import { basename } from "node:path";
import config from "../../core/dbConfig.js";

/**
 * Bootstraps a new database if it doesn't exist.
 *
 *   $ yarn db:create [--env #0]
 */
export default async function createDatabase() {
  const DB_NAME = config.connection.database;
  delete config.connection.database
  let db = knex(config);

   return db.raw(`
    IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = '${DB_NAME}')
    BEGIN
      CREATE DATABASE ${DB_NAME}
      SELECT 1 as res
      END
  ELSE
  SELECT 0 as res
`).then((r) =>{
  if(r[0].res)
    console.log('DATABASE CREATED !')
  else
    console.log('DATABASE ALREADY EXISTS !')

});
}

console.log('rrr')
if (basename(process.argv[1]) === "create.js") {
  envars.config({ env: minimist(process.argv.slice(2)).env ?? 'test'  });
  createDatabase().then(()=>{
    process.exit()
  }).catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });
}
