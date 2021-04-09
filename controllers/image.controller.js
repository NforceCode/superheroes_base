const { Superhero, SuperheroImage } = require('../models/');
const createError = require('http-errors');

// добавлять, читать, удалять

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

    res.status(200).send({ data: image });
  } catch (err) {
    next(err);
  }
};

module.exports.getImage = async (req, res, next) => {
  try {
    const {
      params: { id }
    } = req;

    const image = await SuperheroImage.findByPk(id);

    if (!image) {
      return next(createError(404, 'Image not found'));
    }

    res.status(200).send({ data: image });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllHeroImages = async (req, res, next) => {
  try {
    const {
      params: { heroId }
    } = req;

    const heroImages = await SuperheroImage.findAll({
      where: { heroId }
    });

    if (!heroImages.length) {
      return next(createError(404, 'Image not found'));
    }

    res.status(200).send({ data: heroImages });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteImage = async (req, res, next) => {
  try {
    const {
      params: { id }
    } = req;

    const rows = await SuperheroImage.destroy({ where: { id } });

    if (rows !== 1) {
      return next(createError(404, 'Image not found'));
    }

    res.status(200).send({ data: 'Image deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteAllHeroImages = async (req, res, next) => {
  try {
    const {
      params: { heroId }
    } = req;

    const deletedRows = await SuperheroImage.destroy({ where: { heroId } });

    if (deletedRows === 0) {
      return next(createError(404, 'No images of such hero'));
    }

    res.status(200).send({ data: 'All images deleted' });
  } catch (err) {
    next(err);
  }
};
