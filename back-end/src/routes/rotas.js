const express = require('express');
const controladorProduto = require('../controllers/controladorProduto.js');

const router = express.Router();

router.post('/produto', controladorProduto.criarProduto);
router.get('/produto', controladorProduto.obterProduto);
router.put('/produto', controladorProduto.editarProduto);
router.delete('/produto', controladorProduto.apagarProduto);


module.exports = router;