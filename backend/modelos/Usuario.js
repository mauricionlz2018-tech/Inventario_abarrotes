const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Usuario = sequelize.define('usuarios', {
  id_usuario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  usuario: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  contrasena: { type: DataTypes.STRING(255), allowNull: false },
  rol: { type: DataTypes.STRING(20), allowNull: false },
  activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
}, { tableName: 'usuarios', timestamps: false });

module.exports = Usuario;