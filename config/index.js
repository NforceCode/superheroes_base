const path = require('path');
const { env } = require('process');

module.exports = {
  STATIC_IMAGES_PATH: env.STATIC_PATH || path.resolve(__dirname, '../public/images'),
  DB_CONFIG: path.resolve(__dirname, 'db.json'),
};