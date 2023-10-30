const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.post('/', employeeController.createEmployee);
router.get('/', employeeController.getEmployees);
router.get('/created/:date', employeeController.getEmployeesByDate);

module.exports = router;