const Employee = require('../models/Employee');

// Create a new employee 
exports.createEmployee = async (req, res) => {
  try {
    // Extract  data from request body
    const { lastName, firstName, department } = req.body;

    const dateCreated = new Date();

    // Create a new employee in the db
    const newEmployee = await Employee.create({ lastName, firstName, dateCreated, department });

    // Success
    res.status(201).json(newEmployee);
  } catch (error) {
    // Errors
    res.status(500).json({ error: 'Failed to create employee.' });
  }
};


// List of all employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    console.log('Employees:', employees);

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employees.' });
  }
};

  

// List of employees created on a specific date
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
