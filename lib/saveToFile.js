const fs = require('fs');

module.exports = {
  save: (markdownTable, file) => {
    fs.writeFileSync(file, markdownTable, 'utf8');
    console.log(`Table saved to ${file}`);
  }
};
