const { Superhero } = require('../models');
const createError = require('http-errors');

module.exports.createSuperhero = async (req, res, next) => {
  try {
    const { body } = req;

    const superhero = await Superhero.create(body);

    if (!superhero) {
      return next(createError(400));
    }

    res.send({ data: superhero });
  } catch (err) {
    next(err);
  }
};

module.exports.getSuperhero = async (req, res, next) => {
  try {
    const {
      params: { id }
    } = req;

    const superhero = await Superhero.findByPk(id);

    if (!superhero) {
      return next(createError(404));
    }

    res.send({ data: superhero });
  } catch (err) {
    next(err);
  }
};

module.exports.getSuperheroes = async (req, res, next) => {
  try {
    const { pagination = {} } = req;

    const allHeroes = await Superhero.findAll({
      ...pagination
    });

    if (!allHeroes.length) {
      return next(createError(404));
    }

    res.send({ data: allHeroes });
  } catch (err) {
    next(err);
  }
};

module.exports.updateSuperhero = async (req, res, next) => {
  try {
    const {
      body,
      params: { id }
    } = req;

    const [rows, [heroInstance]] = await Superhero.update(body, {
      where: { id },
      returning: true
    });

    if (!heroInstance) {
      return next(createError(400, 'Error while updating Superhero'));
    }

    res.send(heroInstance);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteSuperhero = async (req, res, next) => {
  try {
    const {
      params: { id }
    } = req;

    const deletedRows = await Superhero.destroy({ where: { id } });

    if (deletedRows !== 1) {
      return next(createError(404, 'Error while deleting Superhero'));
    }

    res.status(200).send("Deleted");
  } catch (err) {
    next(err);
  }
};
