const Cliente = require('../models/modeloCliente.js');
const { Op } = require('sequelize');

const criarCliente = async (req, res) => {
  try {
    const { nome, sobrenome, data_nascimento, cpf, email, celular, plano, plano_extra} = req.body;

      const novoCliente = await Cliente.create({ nome, sobrenome, data_nascimento, cpf, email, celular, plano, plano_extra });
      res.status(201).json(novoCliente);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const obterCliente = async (req, res) => {
  try {

    console.log(req.body)

    const idCliente = req.query  ? req.query .idCliente : false;
    const nome = req.query? req.query.nome : false;


    if (idCliente) {
      const cliente = await Cliente.findByPk(idCliente)
      res.json(cliente);
    }else if(nome){
      const clientes = await Cliente.findAll({ where: { nome: { [Op.like]: `%${nome}%` } } });
      res.json(clientes);
    }else{
      const clientes = await Cliente.findAll();
      res.json(clientes);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const apagarCliente = async (req, res) => {
  try {
    const {idCliente} = req.body;

    if (!idCliente) throw new Error('ID é obrigatorio');
    
    const cliente = await Cliente.findByPk(idCliente);

    if (!cliente) throw new Error('Cliente não encontrado');

    cliente.destroy({
      where: {
        id: idCliente,
      },
    });
    
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const editarCliente = async (req, res) => {
  try {
    const {idCliente, nomeCliente, precoCliente, codigo_barras, quantidade, descricao, imagemUrl} = req.body;

    console.log('req.body',req.body)
    if (!idCliente && !nomeCliente && !precoCliente) throw new Error('Campos obrigatorios não foram preenchidos');
    const cliente = await Cliente.findByPk(idCliente);

    if (!cliente) throw new Error('Cliente não encontrado');

    cliente.update({ 
      nome: nomeCliente || cliente.nome, 
      preco: precoCliente || cliente.preco,
      codigo_barras: codigo_barras || cliente.codigo_barras, 
      quantidade: quantidade || cliente.quantidade, 
      descricao: descricao || cliente.descricao, 
      imagemUrl: imagemUrl || cliente.imagemUrl
    })

    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { criarCliente , obterCliente, editarCliente, apagarCliente }