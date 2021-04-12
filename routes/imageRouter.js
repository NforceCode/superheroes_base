const imageRouter = require('express').Router();
const ImagesController = require('../controllers/image.controller');
const upload = require('../middlewares/multer.mw');

imageRouter.post('/', upload.single('image'), ImagesController.addHeroImage);

imageRouter.get('/', ImagesController.getAllHeroImages);

imageRouter.delete('/:id', ImagesController.deleteHeroImage);
imageRouter.delete('/', ImagesController.deleteAllHeroImages);

module.exports = imageRouter;
