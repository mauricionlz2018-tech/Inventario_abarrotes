const { Proveedor } = require('../modelos/relaciones');

exports.listar = async (req, res) => {
  try {
    const proveedores = await Proveedor.findAll({ order: [['id_proveedor', 'ASC']] });
    res.render('proveedores', { proveedores, mensaje: null, error: null });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar proveedores');
  }
};

exports.formularioCrear = (req, res) => {
  res.render('proveedor_form', { proveedor: null, mensaje: null, error: null });
};

exports.crear = async (req, res) => {
  try {
    const nombre_empresa = req.body.nombre_empresa?.trim();
    const telefono = req.body.telefono?.trim();
    const correo = req.body.correo?.trim() || null;
    const direccion = req.body.direccion?.trim() || null;

    if (!nombre_empresa || !telefono) {
      return res.status(400).render('proveedor_form', {
        proveedor: null,
        mensaje: null,
        error: 'El nombre y el teléfono del proveedor son obligatorios.'
      });
    }

    await Proveedor.create({ nombre_empresa, telefono, correo, direccion });
    res.redirect('/proveedores');
  } catch (error) {
    console.error(error);
    res.status(500).render('proveedor_form', {
      proveedor: null,
      mensaje: null,
      error: 'No se pudo guardar el proveedor.'
    });
  }
};
