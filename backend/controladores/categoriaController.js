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

exports.formularioEditar = async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria) return res.redirect('/categorias');
    res.render('categoria_form', { categoria, mensaje: null, error: null });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar la categoría');
  }
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

exports.actualizar = async (req, res) => {
  try {
    const nombre = req.body.nombre_categoria?.trim();
    const descripcion = req.body.descripcion?.trim() || null;

    if (!nombre) {
      const categoria = await Categoria.findByPk(req.params.id);
      return res.status(400).render('categoria_form', {
        categoria,
        mensaje: null,
        error: 'El nombre de la categoría es obligatorio.'
      });
    }

    await Categoria.update({ nombre_categoria: nombre, descripcion }, { where: { id_categoria: req.params.id } });
    res.redirect('/categorias');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar la categoría');
  }
};

exports.eliminar = async (req, res) => {
  try {
    await Categoria.destroy({ where: { id_categoria: req.params.id } });
    res.redirect('/categorias');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar la categoría');
  }
};
