import chalk from "chalk";
import sql from 'mssql';
import sqlConfig from "../dbConfig";


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



export default db;
