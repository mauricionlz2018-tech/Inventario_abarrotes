const express = require('express');
const router = express.Router();
const ctrl = require('../controladores/ventaController');

router.get('/', ctrl.listar);
router.get('/nueva', ctrl.formularioCrear);
router.post('/', ctrl.crear);

module.exports = router;
