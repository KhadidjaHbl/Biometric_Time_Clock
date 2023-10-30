const Sequelize = require('sequelize');

const sequelize = new Sequelize('time_clock', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
