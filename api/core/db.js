import chalk from "chalk";
// const chalk  = require("chalk");
import knex from "knex";
import config from "./dbConfig";

const db = knex(config);
process.once("SIGTERM", function () {
  db.destroy();
});

export { db };

const versionCmd = config.client === 'mssql' ? 'select @@version as v' : "SELECT VERSION() as v"
db.raw(versionCmd)
  .then((version) => {
    console.log(chalk.blue('DB CONNECTED'));
    console.log(chalk.blue(version[0].v));
  })
  .catch((err) => {
    // console.log(err);
    console.log(chalk.red('DB ERROR', err));
    throw err;
  })
  
export default db;
