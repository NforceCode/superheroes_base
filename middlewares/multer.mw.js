const multer = require('multer');
const {STATIC_IMAGES_PATH} = require('../config');
const {createFolder} = require('../utils');

createFolder(STATIC_IMAGES_PATH);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, STATIC_IMAGES_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.${file.originalname}`);
  }
});


module.exports =  multer({storage});