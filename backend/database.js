const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,       // abarrotes_db
  process.env.DB_USER,       // app_user
  process.env.DB_PASSWORD,   
  {
    host: process.env.DB_HOST,      // host interno de Railway
    port: process.env.DB_PORT,      // 3306
    dialect: process.env.DB_DIALECT, // mariadb
    logging: false
  }
);

async function probarConexion() {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa a MariaDB');
  } catch (error) {
    console.error('Error de conexión:', error);
  }
}


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: require('path').join(__dirname, '.env') });
}

module.exports = { sequelize, probarConexion };