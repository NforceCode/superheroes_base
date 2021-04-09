const { Superhero } = require('../models');
const createError = require('http-errors');

module.exports.findHero = async (req, res, next) => {
  try {
    const {
      params: { heroId }
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
