import chalk from "chalk";
// const chalk  = require("chalk");
import sql from 'mssql';
import sqlConfig from "./dbConfig";

sql.on('error', err => {
  console.error(err);
})


const db = await sql.connect(sqlConfig).then(p => {
  p.query('select @@version as v').then(res => {
    console.log('res', res.recordset[0].v)
    console.log(chalk.blue('DB CONNECTED'));
        console.log(chalk.blue(res.recordset[0].v));
  }).catch(err => {
    console.error(chalk.red('DB ERROR', err));
  })
  return p
}).catch(console.error);


// const r = await pool.query('select @@version as v')

// console.log(config)
// // const db = knex(config);
// process.once("SIGTERM", function () {
//   db.destroy();
// });


// export { db };
// const versionCmd = config.client === 'mssql' ? 'select @@version as v' : "SELECT VERSION() as v"
// db.raw(versionCmd)
//   .then((version) => {
//     console.log(chalk.blue('DB CONNECTED'));
//     console.log(chalk.blue(version[0].v));
//   })
//   .catch((err) => {
//     // console.log(err);
//     console.log(chalk.red('DB ERROR', err));
//     throw err;
//   })

export default db;
