const { Producto, Categoria, Proveedor } = require('../modelos/relaciones');

exports.listar = async (req, res) => {
  const productos = await Producto.findAll({
    include: [
      { model: Categoria, as: 'categoria' },
      { model: Proveedor, as: 'proveedor' }
    ],
    order: [['id_producto', 'DESC']]
  });
  res.render('productos', { productos });
};

exports.formularioCrear = async (req, res) => {
  const categorias = await Categoria.findAll();
  const proveedores = await Proveedor.findAll();
  res.render('producto_form', { categorias, proveedores, producto: null });
};

exports.crear = async (req, res) => {
  const datos = {
    id_categoria: req.body.id_categoria,
    id_proveedor: req.body.id_proveedor,
    nombre_producto: req.body.nombre_producto,
    precio_compra: req.body.precio_compra,
    precio_venta: req.body.precio_venta,
    stock_actual: req.body.stock_actual,
    stock_minimo: req.body.stock_minimo,
    activo: req.body.activo === 'on' || req.body.activo === '1'
  };
  await Producto.create(datos);
  res.redirect('/productos');
};

exports.formularioEditar = async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);
  const categorias = await Categoria.findAll();
  const proveedores = await Proveedor.findAll();
  res.render('producto_form', { categorias, proveedores, producto });
};

exports.actualizar = async (req, res) => {
  const datos = {
    id_categoria: req.body.id_categoria,
    id_proveedor: req.body.id_proveedor,
    nombre_producto: req.body.nombre_producto,
    precio_compra: req.body.precio_compra,
    precio_venta: req.body.precio_venta,
    stock_actual: req.body.stock_actual,
    stock_minimo: req.body.stock_minimo,
    activo: req.body.activo === 'on' || req.body.activo === '1'
  };
  await Producto.update(datos, { where: { id_producto: req.params.id } });
  res.redirect('/productos');
};

exports.eliminar = async (req, res) => {
  await Producto.destroy({ where: { id_producto: req.params.id } });
  res.redirect('/productos');
};