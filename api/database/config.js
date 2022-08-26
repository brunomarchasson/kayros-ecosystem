import sql from './database-layer';

const checkConnection = async () => {
  try {
    await sql.query('SELECT NOW()');
    return (true);
  } catch (err) {
    return (false);
  }
};

export const getInfo = async () => ({
  connected: await checkConnection(),
});

export default getInfo;
