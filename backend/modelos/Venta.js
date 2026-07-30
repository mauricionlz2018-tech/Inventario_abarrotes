const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Venta = sequelize.define('ventas', {
  id_venta: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_usuario: { type: DataTypes.INTEGER, allowNull: false },
  fecha: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  total: { type: DataTypes.DECIMAL(10,2), allowNull: false }
}, { tableName: 'ventas', timestamps: false });

module.exports = Venta;