const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-app', 'root', 'dinda0907', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;