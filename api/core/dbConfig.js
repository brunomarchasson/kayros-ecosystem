import envars from "envars";
envars.config();
const config = {
  client:  process.env.DB_CLIENT,
  connection: {
      host:  process.env.DB_HOST,
      port :  parseInt(process.env.DB_PORT, 10) ?? 1433,
      user:  process.env.DB_USR,
      password:  process.env.DB_PWD,
      database:  process.env.DB_NAME
  }
}
export default config
