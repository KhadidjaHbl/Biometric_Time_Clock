const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const Employee = require('../models/Employee'); 
const CheckTime = sequelize.define('CheckTime', {
  checkType: DataTypes.STRING, 
  comment: DataTypes.STRING,
  timestamp: DataTypes.DATE,
});

Employee.hasMany(CheckTime);
CheckTime.belongsTo(Employee);