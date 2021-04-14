const { SuperheroImage } = require('../db/models/');
const createError = require('http-errors');

module.exports.addHeroImage = async (req, res, next) => {
  try {
    const {
      file: { filename },
      hero: superhero
    } = req;

    const image = await superhero.createSuperheroImage({
      address: filename
    });

    if (!image) {
      return next(createError(404, 'Error while creating image'));
    }

    res.status(201).send({ data: image });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllHeroImages = async (req, res, next) => {
  try {
    const { hero } = req;

    const heroImages = await hero.getSuperheroImages();

    if (!heroImages.length) {
      return next(createError(404, 'Images not found'));
    }

    res.status(200).send({ data: heroImages });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteHeroImage = async (req, res, next) => {
  try {
    const {
      params: { id },
      hero
    } = req;

    const rows = await SuperheroImage.destroy({
      where: {
        id,
        heroId: hero.id
      }
    });

    if (rows !== 1) {
      return next(createError(404, 'Image not found'));
    }

    res.status(200).send({ data: id });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteAllHeroImages = async (req, res, next) => {
  try {
    const { hero } = req;

    const deletedRows = await SuperheroImage.destroy({
      where: { heroId: hero.id }
    });

    if (deletedRows === 0) {
      return next(createError(404, 'No images of such hero'));
    }

    res.status(200).send({ data: 'All images deleted' });
  } catch (err) {
    next(err);
  }
};
