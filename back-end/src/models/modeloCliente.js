const { DataTypes } = require('sequelize');
const sequelize = require('../database/dbConfig.js');

const Cliente = sequelize.define('Cliente', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sobrenome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_nascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  plano: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  plano_extra: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: true,
  },
   preco: {
    type: DataTypes.FLOAT,  
    allowNull: false,     
  }
});

module.exports = Cliente;