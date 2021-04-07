const { Superhero } = require('../models');
const createError = require('http-errors');

module.exports.findHero = async (req, res, next) => {
  try {
    const {
      params: { id }
    } = req;

    const hero = await Superhero.findByPk(id);

    if (!hero) {
      return next(createError(404, 'Superhero not found'));
    }
    req.heroInstance = hero;
    next();
  } catch (err) {
    next(err);
  }
};
