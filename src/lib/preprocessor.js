// src/lib/preprocessor.js

const fs = require('fs');
const path = require('path');

const processFile = (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const lines = fileContent.split('\n');

  lines.forEach(line => {
    if (line.startsWith('#include')) {
      // Handle include directive
      const includePath = line.split(' ')[1].trim();
      const fullIncludePath = path.resolve(path.dirname(filePath), includePath);
      processFile(fullIncludePath); // Recursively process included file
    }
    // Add handling for other directives as needed
  });

  // Further processing based on the directives
};

module.exports = { processFile };
