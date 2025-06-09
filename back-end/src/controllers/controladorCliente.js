const Produto = require('../models/modeloCliente.js');
const { Op } = require('sequelize');

const criarProduto = async (req, res) => {
  try {
    const { nome, preco, codigo_barras, quantidade, descricao, imagemUrl, criarLote , lote } = req.body;

    if ( criarLote ){
      lote.forEach(async p => {
        const novoProduto = await Produto.create({ 
          nome: p.nome,
          preco: p.preco,
          codigo_barras: p.codigo_barras,
          quantidade: p.quantidade,
          descricao: p.descricao,
          imagemUrl: p.imagemUrl 
        });
      });
      res.status(201).json({"res": "Produtos cadastrados!"})
    } else {
      const novoProduto = await Produto.create({ nome, preco, codigo_barras, quantidade, descricao, imagemUrl });
      res.status(201).json(novoProduto);
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const obterProduto = async (req, res) => {
  try {

    console.log(req.body)

    const idProduto = req.query  ? req.query .idProduto : false;
    const nome = req.query? req.query.nome : false;


    if (idProduto) {
      const produto = await Produto.findByPk(idProduto)
      res.json(produto);
    }else if(nome){
      const produtos = await Produto.findAll({ where: { nome: { [Op.like]: `%${nome}%` } } });
      res.json(produtos);
    }else{
      const produtos = await Produto.findAll();
      res.json(produtos);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const apagarProduto = async (req, res) => {
  try {
    const {idProduto} = req.body;

    if (!idProduto) throw new Error('ID é obrigatorio');
    
    const produto = await Produto.findByPk(idProduto);

    if (!produto) throw new Error('Produto não encontrado');

    produto.destroy({
      where: {
        id: idProduto,
      },
    });
    
    res.status(201).json(produto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const editarProduto = async (req, res) => {
  try {
    const {idProduto, nomeProduto, precoProduto, codigo_barras, quantidade, descricao, imagemUrl} = req.body;

    console.log('req.body',req.body)
    if (!idProduto && !nomeProduto && !precoProduto) throw new Error('Campos obrigatorios não foram preenchidos');
    const produto = await Produto.findByPk(idProduto);

    if (!produto) throw new Error('Produto não encontrado');

    produto.update({ 
      nome: nomeProduto || produto.nome, 
      preco: precoProduto || produto.preco,
      codigo_barras: codigo_barras || produto.codigo_barras, 
      quantidade: quantidade || produto.quantidade, 
      descricao: descricao || produto.descricao, 
      imagemUrl: imagemUrl || produto.imagemUrl
    })

    res.status(201).json(produto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { criarProduto , obterProduto, editarProduto, apagarProduto }