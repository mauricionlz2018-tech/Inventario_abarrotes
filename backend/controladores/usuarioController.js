const { Usuario } = require('../modelos/relaciones');

exports.listar = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({ order: [['id_usuario', 'ASC']] });
    res.render('usuarios', { usuarios, mensaje: null, error: null });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar usuarios');
  }
};

exports.formularioCrear = (req, res) => {
  res.render('usuario_form', { usuario: null, mensaje: null, error: null });
};

exports.formularioEditar = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.redirect('/usuarios');
    res.render('usuario_form', { usuario, mensaje: null, error: null });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar el usuario');
  }
};

exports.crear = async (req, res) => {
  try {
    const nombre = req.body.nombre?.trim();
    const usuario = req.body.usuario?.trim();
    const contrasena = req.body.contrasena?.trim();
    const rol = req.body.rol?.trim();
    const activo = req.body.activo === 'on' || req.body.activo === '1';

    if (!nombre || !usuario || !contrasena || !rol) {
      return res.status(400).render('usuario_form', {
        usuario: null,
        mensaje: null,
        error: 'Completa nombre, usuario, contraseña y rol.'
      });
    }

    await Usuario.create({ nombre, usuario, contrasena, rol, activo });
    res.redirect('/usuarios');
  } catch (error) {
    console.error(error);
    res.status(500).render('usuario_form', {
      usuario: null,
      mensaje: null,
      error: 'No se pudo guardar el usuario.'
    });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const nombre = req.body.nombre?.trim();
    const usuario = req.body.usuario?.trim();
    const contrasena = req.body.contrasena?.trim();
    const rol = req.body.rol?.trim();
    const activo = req.body.activo === 'on' || req.body.activo === '1';

    if (!nombre || !usuario || !contrasena || !rol) {
      const user = await Usuario.findByPk(req.params.id);
      return res.status(400).render('usuario_form', {
        usuario: user,
        mensaje: null,
        error: 'Completa nombre, usuario, contraseña y rol.'
      });
    }

    await Usuario.update({ nombre, usuario, contrasena, rol, activo }, { where: { id_usuario: req.params.id } });
    res.redirect('/usuarios');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar el usuario');
  }
};

exports.eliminar = async (req, res) => {
  try {
    await Usuario.destroy({ where: { id_usuario: req.params.id } });
    res.redirect('/usuarios');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar el usuario');
  }
};
