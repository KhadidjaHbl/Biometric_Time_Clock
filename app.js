const express = require('express');
const sequelize = require('./database/connection');
const employeeRoutes = require('./routes/employee');
const checkRoutes = require('./routes/check');

const Employee = require('./models/Employee');
const CheckTime = require('./models/CheckTime');

Employee.hasMany(CheckTime);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.urlencoded());

app.use('/check', checkRoutes);
app.use('/', employeeRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

  