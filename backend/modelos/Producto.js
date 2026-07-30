const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Producto = sequelize.define('productos', {
  id_producto: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_categoria: { type: DataTypes.INTEGER, allowNull: false },
  id_proveedor: { type: DataTypes.INTEGER, allowNull: false },
  nombre_producto: { type: DataTypes.STRING(100), allowNull: false },
  precio_compra: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  precio_venta: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  stock_actual: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  stock_minimo: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 5 },
  activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
}, { tableName: 'productos', timestamps: false });

module.exports = Producto;