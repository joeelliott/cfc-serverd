// Import necessary modules
const express = require('express');
const { initializeModules, shutdownModules } = require('./src/modules/moduleManager');
const { setupLogging } = require('./src/utils/generalUtils');
const { connectDatabase } = require('./src/database/dbTool');

// Create an Express application
const app = express();
const port = process.env.PORT || 3000; // Default to port 3000 if not specified

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const startServer = async () => {
  try {
    // Initialize logging, database, and other modules
    setupLogging();
    await connectDatabase();
    initializeModules();

    // Start the Express server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1); // Exit with a failure code
  }
};

const stopServer = async () => {
  try {
    // Perform any necessary cleanup
    shutdownModules();
    console.log('Server gracefully stopped.');
  } catch (error) {
    console.error('Error during server shutdown:', error);
  }
};

process.on('SIGINT', stopServer);
process.on('SIGTERM', stopServer);

startServer();
