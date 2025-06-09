const { DataTypes } = require('sequelize');
const sequelize = require('../database/dbConfig.js');

const Produto = sequelize.define('Produto', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  codigo_barras: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  imagemUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

module.exports = Produto;