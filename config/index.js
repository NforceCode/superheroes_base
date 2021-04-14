const path = require('path');
const { env } = require('process');

module.exports = {
  STATIC_IMAGES_PATH:
    env.STATIC_PATH || path.resolve(__dirname, '../public/images'),
  PORT: process.env.port || 3000,
};
