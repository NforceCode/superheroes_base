const {Router}= require('express');
const { Model } = require('sequelize');
const HeroController = require('../controllers/superhero.controller');
const pagination = require('../middlewares/pagination.mw');
const path = require('path');
const multer = require('multer');
const {STATIC_IMAGES_PATH} = require('../config');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, STATIC_IMAGES_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.${file.originalname}`);
  }
});

const upload = multer({storage});


const heroRouter = Router();

heroRouter.post('/', HeroController.createSuperhero);
heroRouter.get('/', pagination, HeroController.getSuperheroes);
heroRouter.get('/:id', HeroController.getSuperhero);
heroRouter.patch('/:id', HeroController.updateSuperhero);
heroRouter.delete('/:id', HeroController.deleteSuperhero);

heroRouter.post('/:id/image',upload.single('image'), HeroController.addHeroImage);

module.exports = heroRouter;