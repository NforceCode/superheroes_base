const {Router}= require('express');
const HeroController = require('../controllers/superhero.controller');
const pagination = require('../middlewares/pagination.mw');
const upload = require('../middlewares/multer.mw');
const imageRouter = require('./imageRouter');
const heroRouter = Router();

heroRouter.post('/', upload.array('images', 10), HeroController.createSuperhero);
heroRouter.get('/', pagination, HeroController.getSuperheroes);
heroRouter.get('/:id', HeroController.getSuperhero);
heroRouter.patch('/:id',upload.array('images', 10), HeroController.updateSuperhero);
heroRouter.delete('/:id', HeroController.deleteSuperhero);

heroRouter.use('/:heroId/images', imageRouter);
module.exports = heroRouter;