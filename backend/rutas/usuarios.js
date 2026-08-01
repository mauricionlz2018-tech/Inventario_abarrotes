const express = require('express');
const router = express.Router();
const ctrl = require('../controladores/usuarioController');

router.get('/', ctrl.listar);
router.get('/nuevo', ctrl.formularioCrear);
router.get('/editar/:id', ctrl.formularioEditar);
router.post('/', ctrl.crear);
router.post('/actualizar/:id', ctrl.actualizar);
router.post('/eliminar/:id', ctrl.eliminar);

module.exports = router;
