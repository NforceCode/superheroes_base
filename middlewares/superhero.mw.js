const { Superhero, Superpower, SuperheroImage } = require('../db/models');
const createError = require('http-errors');
const _ = require('lodash');

module.exports.findHero = async (req, res, next) => {
  try {
    const {
      params: { heroId },
    } = req;

    const hero = await Superhero.findByPk(heroId);

    if (!hero) {
      return next(createError(404, 'Superhero not found'));
    }
    req.hero = hero;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports.filterBody = body =>
  _.pick(body, ['nickname', 'realName', 'originDescription', 'catchPhrase']);

module.exports.includePicsAndPowers = {
  include: [
    {
      model: SuperheroImage,
      attributes: [['address', 'image name']],
    },
    {
      model: Superpower,
      attributes: [['name', 'superpower']],
      through: {
        attributes: [],
      },
    },
  ],
};
