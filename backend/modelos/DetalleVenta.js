const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const DetalleVenta = sequelize.define('detalle_venta', {
  id_detalle: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_venta: { type: DataTypes.INTEGER, allowNull: false },
  id_producto: { type: DataTypes.INTEGER, allowNull: false },
  cantidad: { type: DataTypes.INTEGER, allowNull: false },
  precio_unitario: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  subtotal: { type: DataTypes.DECIMAL(10,2), allowNull: false }
}, { tableName: 'detalle_venta', timestamps: false });

module.exports = DetalleVenta;