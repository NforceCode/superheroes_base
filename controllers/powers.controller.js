const createError = require('http-errors');
const { Superpower, Superhero } = require('../models');

module.exports.createPower = async (req, res, next) => {
  try {
    const {
      body: { heroId, name }
    } = req;

    const hero = await Superhero.findByPk(heroId);

    if (!hero) {
      return next(createError(404, 'Superhero not found'));
    }

    const power = await Superpower.create({ name });

    if (!power) {
      return next(createError(404, 'Power not created'));
    }

    await power.addSuperhero(hero);

    res.status(201).send({ data: power });
  } catch (err) {
    next(err);
  }
};

module.exports.bulkCreatePowers = async (req, res, next) => {
  try {
    const { body: {powers, heroId} } = req;

    const hero = await Superhero.findByPk(heroId);

    if (!hero) {
      return next(createError(404, 'Superhero not found'));
    }

    const createdpowers = await Superpower.bulkCreate(powers);

    if(!createdpowers.length) {
      return (next(createError(400, "Superpowers not created")))
    }

    
    await hero.addSuperpowers(createdpowers);

    res.status(201).send({data: createdpowers});
  } catch (err) {
    next(err);
  }
};

module.exports.addPowerToHero = async (req, res, next) => {
  try {
    const {
      params: { powerId, heroId }
    } = req;

    const hero = await Superhero.findByPk(heroId);

    if (!hero) {
      return next(createError(404, 'Superhero not found'));
    }

    const power = await Superpower.findByPk(powerId);

    if (!power) {
      return next(createError(404, 'Power not found'));
    }

    await power.addSuperhero(hero);

    res.status(200).send({ data: power });
  } catch (err) {
    next(err);
  }
};

module.exports.bulkAddPowersToHero = async(req, res ,next) => {
  try {
    const {
      params: { heroId },
      body: {powers}
    } = req;


    const hero = await Superhero.findByPk(heroId);
    if (!hero) {
      return next(createError(404, 'Superhero not found'));
    }

    const heroReborn = await hero.addSuperpowers(powers);

    res.status(200).send({ data: heroReborn });
  } catch (err) {
    next(err);
  }
}

module.exports.getPower = async (req, res, next) => {
  try {
    const {
      params: { powerId }
    } = req;

    const power = await Superpower.findByPk(powerId);

    if (!power) {
      return next(createError(404, 'Superpower not found'));
    }

    res.status(200).send({ data: power });
  } catch (err) {
    next(err);
  }
};

module.exports.getPowers = async (req, res, next) => {
  try {
    const powers = await Superpower.findAll();

    if (!powers.length) {
      return next(createError(404, 'Superpowers not found'));
    }

    res.status(200).send({ data: powers });
  } catch (err) {
    next(err);
  }
};

module.exports.changePower = async (req, res, next) => {
  try {
    const {
      body,
      params: { powerId }
    } = req;

    const [rows, [power]] = await Superpower.update(body, {
      where: {
        id: powerId
      },
      returning: true
    });

    if (rows !== 1) {
      return next(createError(404, 'Power not found'));
    }

    res.status(200).send({ data: power });
  } catch (err) {
    next(err);
  }
};

module.exports.deletePower = async (req, res, next) => {
  try {
    const {
      params: { powerId }
    } = req;

    const destroyedRows = await Superpower.destroy({
      where: {
        id: powerId
      }
    });

    if (destroyedRows !== 1) {
      return next(createError(404, 'Superpower doesn`t exist already'));
    }

    res.status(200).send({ data: 'Superpower deleted' });
  } catch (err) {
    next(err);
  }
};
