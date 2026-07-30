const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Categoria = sequelize.define('categorias', {
  id_categoria: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre_categoria: { type: DataTypes.STRING(50), allowNull: false },
  descripcion: { type: DataTypes.STRING(150), allowNull: true }
}, { tableName: 'categorias', timestamps: false });

module.exports = Categoria;