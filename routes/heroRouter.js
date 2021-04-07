const {Router}= require('express');
const { Model } = require('sequelize');
const HeroController = require('../controllers/superhero.controller');


const heroRouter = Router();

heroRouter.post('/', HeroController.createSuperhero);
heroRouter.get('/', HeroController.getSuperheroes);
heroRouter.get('/:id', HeroController.getSuperhero);
heroRouter.patch('/:id', HeroController.updateSuperhero);
heroRouter.delete('/:id', HeroController.deleteSuperhero);


module.exports = heroRouter;