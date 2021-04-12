const fs = require('fs').promises;

module.exports.createFolder = async (path) => {
  await fs.mkdir(path, { recursive: true });
};;
