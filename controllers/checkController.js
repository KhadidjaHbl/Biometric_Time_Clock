const Employee = require('../models/Employee');
const CheckTime = require('../models/CheckTime');

exports.checkIn = async (req, res) => {
    try {
      const { employeeId, comment } = req.body;
      const timestamp = new Date();
  
      const checkInRecord = await CheckTime.create({ employeeId, checkType: 'check-in', comment, timestamp });
  
      res.status(201).json(checkInRecord);
    } catch (error) {
      res.status(500).json({ error: 'Failed to check in.' });
    }
};


exports.checkOut = async (req, res) => {
  try {
    const { employeeId, comment } = req.body;
    const timestamp = new Date();

    //Find the latest check-in for the employee
    const checkInRecord = await CheckTime.findOne({
      where: {
        employeeId: employeeId,
        checkType: 'check-in',
      },
      order: [['timestamp', 'DESC']],
    });

    if (!checkInRecord) {
      return res.status(400).json({ error: 'No corresponding check-in record found.' });
    }

    //Calculate the time difference between check-in and check-out
    const checkInTime = checkInRecord.timestamp;
    const checkOutTime = timestamp;
    const timeDifference = (checkOutTime - checkInTime) / (1000 * 60); //Time diff in min

    const checkOutRecord = await CheckTime.create({ employeeId, checkType: 'check-out', comment, timestamp });

    checkInRecord.update({ timeDifference: timeDifference });

    res.status(201).json(checkOutRecord);
  } catch (error) {
    res.status(500).json({ error: 'Failed to check out.' });
  }
};
