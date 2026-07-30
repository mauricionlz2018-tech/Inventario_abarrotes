const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Proveedor = sequelize.define('proveedores', {
  id_proveedor: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre_empresa: { type: DataTypes.STRING(100), allowNull: false },
  telefono: { type: DataTypes.STRING(15), allowNull: false },
  correo: { type: DataTypes.STRING(100), allowNull: true },
  direccion: { type: DataTypes.STRING(150), allowNull: true }
}, { tableName: 'proveedores', timestamps: false });

module.exports = Proveedor;