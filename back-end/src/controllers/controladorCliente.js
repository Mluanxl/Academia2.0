const Cliente = require('../models/modeloCliente.js');
const { Op } = require('sequelize');

// Criar cliente
const criarCliente = async (req, res) => {
  try {
    const {
      nome, sobrenome, data_nascimento, cpf, email, telefone, plano, plano_extra, genero } = req.body;

    if (!nome || !sobrenome || !cpf || !email) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando: nome, sobrenome, cpf ou email' });
    }

    const novoCliente = await Cliente.create({
      nome, sobrenome, data_nascimento, cpf, email, telefone, plano, plano_extra, genero
    });

    res.status(201).send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Cadastro</title>
      <style>
        body { font-family: sans-serif; text-align: center; padding-top: 50px; }
        .container { max-width: 400px; margin: auto; }
        button { padding: 10px 20px; font-size: 16px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Cliente cadastrado com sucesso!</h1>
        <a href="http://127.0.0.1:5500/font-end/index.html">
          <button>Voltar à Página Inicial</button>
        </a>
      </div>
    </body>
    </html>
`);


  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Obter clientes
const obterCliente = async (req, res) => {
  try {
    const { idCliente, nome } = req.query;

    if (idCliente) {
      const cliente = await Cliente.findByPk(idCliente);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }
      return res.json(cliente);
    }

    if (nome) {
      const clientes = await Cliente.findAll({
        where: { nome: { [Op.like]: `%${nome}%` } }
      });
      return res.json(clientes);
    }

    const todosClientes = await Cliente.findAll();
    res.json(todosClientes);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Editar cliente
const editarCliente = async (req, res) => {
  try {
    const { idCliente, nome, sobrenome, data_nascimento, cpf, email, telefone, plano, plano_extra, genero } = req.body;

    if (!idCliente) {
      return res.status(400).json({ error: 'ID do cliente é obrigatório para edição' });
    }

    const cliente = await Cliente.findByPk(idCliente);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    await cliente.update({
      nome: nome ?? cliente.nome,
      sobrenome: sobrenome ?? cliente.sobrenome,
      data_nascimento: data_nascimento ?? cliente.data_nascimento,
      cpf: cpf ?? cliente.cpf,
      email: email ?? cliente.email,
      telefone: telefone ?? cliente.telefone,
      plano: plano ?? cliente.plano,
      plano_extra: plano_extra ?? cliente.plano_extra,
      genero: genero ?? cliente.genero
    });

    res.json({ mensagem: 'Cliente atualizado com sucesso', cliente });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Apagar cliente
const apagarCliente = async (req, res) => {
  try {
    const { idCliente } = req.body;

    if (!idCliente) {
      return res.status(400).json({ error: 'ID do cliente é obrigatório para exclusão' });
    }

    const cliente = await Cliente.findByPk(idCliente);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    await cliente.destroy();

    res.json({ mensagem: 'Cliente apagado com sucesso', cliente });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { criarCliente, obterCliente, editarCliente, apagarCliente };
