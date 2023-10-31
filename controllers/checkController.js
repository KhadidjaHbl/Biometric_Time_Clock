// Import the necessary models
const Employee = require('../models/Employee');
const CheckTime = require('../models/CheckTime');

// Endpoint for employee check-in
exports.checkIn = async (req, res) => {
  try {
    // Extract data from the request body
    const { employeeId, comment } = req.body;

    // Current date and time
    const timestamp = new Date();

    // Create check-in for employee
    const checkInRecord = await CheckTime.create({
      employeeId,
      checkType: 'check-in',  // Indicates a check-in action.
      comment,
      timestamp,
    });

    // Success response
    res.status(201).json(checkInRecord);
  } catch (error) {
    // Errors 
    console.log(error);
    res.status(500).json({ error: 'Failed to check in.' });
  }
};

// Endpoint for employee check-outt
exports.checkOut = async (req, res) => {
  try {
    const { employeeId, comment } = req.body;

    const timestamp = new Date();

    // Find the latest check-in for the employee.
    const checkInRecord = await CheckTime.findOne({
      where: {
        employeeId: employeeId,
        checkType: 'check-in', 
      },
      order: [['timestamp', 'DESC']],  // Order by Desc to get the latest record
    });

    // If no check-in record is found, error
    if (!checkInRecord) {
      return res.status(400).json({ error: 'No corresponding check-in record found.' });
    }

    // Time difference "min" between check-in & check-out
    const checkInTime = checkInRecord.timestamp;
    const checkOutTime = timestamp;
    const timeDifference = (checkOutTime - checkInTime) / (1000 * 60);

    // Create check-out for the employee + time difference.
    const checkOutRecord = await CheckTime.create({
      employeeId,
      checkType: 'check-out', 
      comment,
      timestamp,
      timeDifference,
    });

    // Success
    res.status(201).json(checkOutRecord);
  } catch (error) {
    // Errors
    res.status(500).json({ error: 'Failed to check out.' });
  }
};
