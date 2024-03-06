// src/services/moduleManager.js

const fs = require('fs');
const path = require('path');

const loadModules = () => {
  const modulesDir = path.join(__dirname, '..', 'modules');

  fs.readdirSync(modulesDir).forEach(file => {
    if (file.endsWith('.js')) {
      const module = require(path.join(modulesDir, file));
      if (typeof module.init === 'function') {
        module.init();
      }
    }
  });

  console.log('All modules loaded');
};

module.exports = { loadModules };
