const express = require('express');
const controladorCliente = require('../controllers/controladorCliente.js');

const router = express.Router();

router.post('/cliente', controladorCliente.criarCliente);
router.get('/cliente', controladorCliente.obterCliente);
router.put('/cliente', controladorCliente.editarCliente);
router.delete('/cliente', controladorCliente.apagarCliente);


module.exports = router;