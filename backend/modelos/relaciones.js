const Usuario = require('./Usuario');
const Categoria = require('./Categoria');
const Proveedor = require('./Proveedor');
const Producto = require('./Producto');
const Venta = require('./Venta');
const DetalleVenta = require('./DetalleVenta');

Categoria.hasMany(Producto, { foreignKey: 'id_categoria' });
Producto.belongsTo(Categoria, { foreignKey: 'id_categoria' });

Proveedor.hasMany(Producto, { foreignKey: 'id_proveedor' });
Producto.belongsTo(Proveedor, { foreignKey: 'id_proveedor' });

Usuario.hasMany(Venta, { foreignKey: 'id_usuario' });
Venta.belongsTo(Usuario, { foreignKey: 'id_usuario' });

Venta.hasMany(DetalleVenta, { foreignKey: 'id_venta' });
DetalleVenta.belongsTo(Venta, { foreignKey: 'id_venta' });

Producto.hasMany(DetalleVenta, { foreignKey: 'id_producto' });
DetalleVenta.belongsTo(Producto, { foreignKey: 'id_producto' });

module.exports = { Usuario, Categoria, Proveedor, Producto, Venta, DetalleVenta };