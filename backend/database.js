require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false
  }
);

async function probarConexion() {
  try {
    await sequelize.authenticate();
    console.log('Conexion exitosa a la base de datos');
  } catch (error) {
    console.error('Error de conexion:', error);
  }
}

module.exports = { sequelize, probarConexion };