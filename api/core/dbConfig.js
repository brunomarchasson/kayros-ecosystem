import envars from "envars";
console.log('APP_ENV',process.env.APP_ENV)
envars.config();
const config = {
  client:  process.env.DB_CLIENT,
  connection: {
      host:  process.env.DB_HOST,
      user:  process.env.DB_USR,
      password:  process.env.DB_PWD,
      database:  process.env.DB_NAME
  }
}
export default config
