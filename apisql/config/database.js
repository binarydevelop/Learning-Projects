const Sequelize = require('sequelize');
const db = new Sequelize('inventory', 'postgres', 'Tusharroy@21', {
    host: 'localhost',
    dialect: 'postgres' 
  });

  module.exports = db;