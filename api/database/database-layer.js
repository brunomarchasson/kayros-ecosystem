import sql from 'mssql';

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER,
  // trustedConnection : true,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    // encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
};

sql.on('error', (err) => {
  console.error(err);
});
sql.on('info', (info) => {
  console.info(info);
});

sql.connect(dbConfig).then(() => {
  console.info('sql ready');
});

export default sql;
