const Employee = require('../models/Employee');

exports.createEmployee = async (req, res) => {
    try {
      console.log(req.body);
      const { lastName, firstName, department } = req.body;
      const dateCreated = new Date();
  
      const newEmployee = await Employee.create({ lastName, firstName, dateCreated, department });
  
      res.status(201).json(newEmployee);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create employee.' });
    }
  };

exports.getEmployees = async (req, res) => {
    try {
      const employees = await Employee.findAll();
      console.log('Employees:', employees); 
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch employees.' });
    }
  };
  

exports.getEmployeesByDate = async (req, res) => {
    try {
      const date = req.params.date;
      const employees = await Employee.findAll({
        where: {
          dateCreated: date,
        },
      });
  
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch employees by date.' });
    }
  };
  