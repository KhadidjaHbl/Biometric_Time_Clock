# My Node.js Project

This is a Node.js Mini-project for managing “Biometric Time Clock” data.

## Getting Started

1. Clone this repository.
2. Install dependencies: `npm install`
3. Set up the database by configuring `src/database/connection.js`.
4. Start the server: `npm start`
5. Access the API at `http://localhost:3000` (or your specified port).

## API Endpoints

- '/' (GET) - Get a list of employees.
- '/' (POST) - Create a new employee.
-'/created/:date' - Filter to get employees based on a date of creation.
-'/check-in' - When an employee performs a Check-in.
-'/check-out' - When an employee performs a Check-out.

## Dependencies

- Express
- mysql

