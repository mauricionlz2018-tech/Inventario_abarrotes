const { Producto, Usuario, Venta, DetalleVenta } = require('../modelos/relaciones');

exports.listar = async (req, res) => {
  try {
    const ventas = await Venta.findAll({
      include: [
        { model: Usuario, attributes: ['nombre', 'usuario'] },
        {
          model: DetalleVenta,
          include: [{ model: Producto, attributes: ['nombre_producto'] }]
        }
      ],
      order: [['id_venta', 'DESC']]
    });

    res.render('ventas', { ventas });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar las ventas');
  }
};

exports.formularioCrear = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({ where: { activo: true }, order: [['nombre', 'ASC']] });
    const productos = await Producto.findAll({ where: { activo: true }, order: [['nombre_producto', 'ASC']] });
    res.render('venta_form', { usuarios, productos, error: null });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar el formulario de venta');
  }
};

exports.crear = async (req, res) => {
  try {
    const id_usuario = req.body.id_usuario;
    const id_producto = req.body.id_producto;
    const cantidad = Number(req.body.cantidad);

    if (!id_usuario || !id_producto || !cantidad || cantidad <= 0) {
      const usuarios = await Usuario.findAll({ where: { activo: true }, order: [['nombre', 'ASC']] });
      const productos = await Producto.findAll({ where: { activo: true }, order: [['nombre_producto', 'ASC']] });
      return res.status(400).render('venta_form', {
        usuarios,
        productos,
        error: 'Completa todos los campos y usa una cantidad válida.'
      });
    }

    const producto = await Producto.findByPk(id_producto);
    if (!producto || !producto.activo) {
      const usuarios = await Usuario.findAll({ where: { activo: true }, order: [['nombre', 'ASC']] });
      const productos = await Producto.findAll({ where: { activo: true }, order: [['nombre_producto', 'ASC']] });
      return res.status(400).render('venta_form', {
        usuarios,
        productos,
        error: 'El producto seleccionado no está disponible.'
      });
    }

    if (producto.stock_actual < cantidad) {
      const usuarios = await Usuario.findAll({ where: { activo: true }, order: [['nombre', 'ASC']] });
      const productos = await Producto.findAll({ where: { activo: true }, order: [['nombre_producto', 'ASC']] });
      return res.status(400).render('venta_form', {
        usuarios,
        productos,
        error: 'No hay suficiente stock para completar la venta.'
      });
    }

    const precio_unitario = Number(producto.precio_venta);
    const subtotal = precio_unitario * cantidad;

    const venta = await Venta.create({
      id_usuario,
      total: subtotal
    });

    await DetalleVenta.create({
      id_venta: venta.id_venta,
      id_producto,
      cantidad,
      precio_unitario,
      subtotal
    });

    producto.stock_actual = producto.stock_actual - cantidad;
    await producto.save();

    res.redirect('/ventas');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al registrar la venta');
  }
};
