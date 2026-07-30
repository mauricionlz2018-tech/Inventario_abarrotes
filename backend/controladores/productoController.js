const { Producto, Categoria, Proveedor } = require('../modelos/relaciones');

exports.listar = async (req, res) => {
  const productos = await Producto.findAll({ include: [Categoria, Proveedor] });
  res.render('productos', { productos });
};

exports.formularioCrear = async (req, res) => {
  const categorias = await Categoria.findAll();
  const proveedores = await Proveedor.findAll();
  res.render('producto_form', { categorias, proveedores, producto: null });
};

exports.crear = async (req, res) => {
  const datos = req.body;
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
  await Producto.update(req.body, { where: { id_producto: req.params.id } });
  res.redirect('/productos');
};

exports.eliminar = async (req, res) => {
  await Producto.destroy({ where: { id_producto: req.params.id } });
  res.redirect('/productos');
};