const { Sequelize } = require('sequelize');

// Cargar variables desde .env SOLO en entorno local
if (!process.env.DB_HOST || !process.env.DB_NAME) {
  try {
    require('dotenv').config({ path: require('path').join(__dirname, '.env') });
  } catch (e) {
    console.log('No se cargó .env (producción o Railway)');
  }
}

// Verificar que las variables estén presentes
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_DIALECT:', process.env.DB_DIALECT);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT || 'mariadb',
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

module.exports = { sequelize, probarConexion };