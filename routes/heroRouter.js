const {Router}= require('express');
const HeroController = require('../controllers/superhero.controller');
const pagination = require('../middlewares/pagination.mw');
const upload = require('../middlewares/multer.mw');
const heroRouter = Router();

heroRouter.post('/', HeroController.createSuperhero);
heroRouter.get('/', pagination, HeroController.getSuperheroes);
heroRouter.get('/:id', HeroController.getSuperhero);
heroRouter.patch('/:id', HeroController.updateSuperhero);
heroRouter.delete('/:id', HeroController.deleteSuperhero);

heroRouter.post('/withimage/',upload.single('image'), HeroController.addHeroWithImage);
heroRouter.post('/withimages/',upload.array('images', 5), HeroController.addHeroWithImages);
heroRouter.post('/withall/',upload.array('images', 10), HeroController.createWithAll);

module.exports = heroRouter;