// import chalk from "chalk";
const chalk  = require("chalk");
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
  // .finally(() => {
  //   knex.destroy();
  // });

// export const dbConfig = {
//   mocked: process.env.DB_MOCK,
//   user: process.env.DB_USER,
//   password: process.env.DB_PWD,
//   database: process.env.DB_NAME,
//   server: process.env.DB_SERVER,
//   // trustedConnection : true,
//   pool: {
//     max: 10,
//     min: 0,
//     idleTimeoutMillis: 30000,
//   },
//   options: {
//     // encrypt: true, // for azure
//     trustServerCertificate: true // change to true for local dev / self-signed certs
//   }
// };
// if(dbConfig.mocked){
//   console.log(chalk.red('DATA IS MOCED'));
// }else {
//     sql.on('error', (err) => {
//       console.error(err);
//     });
//     sql.on('info', (info) => {
//       console.info(info);
//     });

//     sql.connect(dbConfig).then(() => {
//       console.info('sql ready');
//     });
// }
export default db;
