const imageRouter = require('express').Router();
const ImagesController = require('../controllers/image.controller');
const upload = require('../middlewares/multer.mw');

imageRouter.post('/');
imageRouter.post('/heroes/:heroId',upload.single('image'), ImagesController.addHeroImage);
imageRouter.post('/heroes/:heroId',upload.single('image'), ImagesController.addHeroImage);


module.exports = imageRouter;