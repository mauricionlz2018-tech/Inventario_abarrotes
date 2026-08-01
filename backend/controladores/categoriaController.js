const { Categoria } = require('../modelos/relaciones');

exports.listar = async (req, res) => {
  try {
    const categorias = await Categoria.findAll({ order: [['id_categoria', 'ASC']] });
    res.render('categorias', { categorias, mensaje: null, error: null });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar categorías');
  }
};

exports.formularioCrear = (req, res) => {
  res.render('categoria_form', { categoria: null, mensaje: null, error: null });
};

exports.crear = async (req, res) => {
  try {
    const nombre = req.body.nombre_categoria?.trim();
    const descripcion = req.body.descripcion?.trim() || null;

    if (!nombre) {
      return res.status(400).render('categoria_form', {
        categoria: null,
        mensaje: null,
        error: 'El nombre de la categoría es obligatorio.'
      });
    }

    await Categoria.create({ nombre_categoria: nombre, descripcion });
    res.redirect('/categorias');
  } catch (error) {
    console.error(error);
    res.status(500).render('categoria_form', {
      categoria: null,
      mensaje: null,
      error: 'No se pudo guardar la categoría.'
    });
  }
};
