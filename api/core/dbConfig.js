import envars from "envars";
envars.config();
// const config = {
//   client:  process.env.DB_CLIENT,
//   connection: {
//       host:  process.env.DB_HOST,
//       port :  parseInt(process.env.DB_PORT, 10) ?? 1433,
//       user:  process.env.DB_USR,
//       password:  process.env.DB_PWD,
//       database:  process.env.DB_NAME
//   }
// }

const sqlConfig = {
  user: process.env.DB_USR,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  encrypt: false,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },

}
export default sqlConfig
