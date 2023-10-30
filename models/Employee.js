const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Employee = sequelize.define('Employee', {
  lastName: DataTypes.STRING,
  firstName: DataTypes.STRING,
  dateCreated: DataTypes.DATE,
  department: DataTypes.STRING,
});

module.exports =  Employee;
