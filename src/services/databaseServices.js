// src/services/databaseService.js

const fs = require('fs');
const path = require('path');

const dbFilePath = path.join(__dirname, '..', 'data', 'database.json');

const getDatabase = () => {
  if (!fs.existsSync(dbFilePath)) {
    return {}; // Return an empty object if the database file doesn't exist
  }

  const data = fs.readFileSync(dbFilePath, 'utf-8');
  return JSON.parse(data);
};

const updateDatabase = (newData) => {
  const data = JSON.stringify(newData, null, 2);
  fs.writeFileSync(dbFilePath, data, 'utf-8');
};

module.exports = { getDatabase, updateDatabase };
