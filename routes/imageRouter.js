const imageRouter = require('express').Router();
const ImagesController = require('../controllers/image.controller');
const {findHero} = require('../middlewares/superhero.mw');
const upload = require('../middlewares/multer.mw');

imageRouter.post('/heroes/:heroId',upload.single('image'), findHero,ImagesController.addHeroImage);

imageRouter.get('/:id', ImagesController.getImage);
imageRouter.get('/all/:heroId', ImagesController.getAllHeroImages);

imageRouter.delete('/:id', ImagesController.deleteImage);
imageRouter.delete('/all/:heroId', ImagesController.deleteAllHeroImages);



module.exports = imageRouter;