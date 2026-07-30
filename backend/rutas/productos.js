const express = require('express');
const router = express.Router();
const ctrl = require('../controladores/productoController');

router.get('/', ctrl.listar);
router.get('/nuevo', ctrl.formularioCrear);
router.post('/', ctrl.crear);
router.get('/editar/:id', ctrl.formularioEditar);
router.post('/actualizar/:id', ctrl.actualizar);
router.post('/eliminar/:id', ctrl.eliminar);

module.exports = router;