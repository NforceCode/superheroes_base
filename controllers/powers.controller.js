const createError = require('http-errors');
const { Superpower, Superhero } = require('../db/models');

module.exports.createPower = async (req, res, next) => {
  try {
    const {
      body: { heroId, name }
    } = req;
    
    const power = await Superpower.create({ name });
    
    if (!power) {
      return next(createError(400, 'Power not created'));
    }
    
    // Если в запросе есть id героя то сразу привязать суперсилы к нему
    if(heroId) {
      const hero = await Superhero.findByPk(heroId);
  
      if (!hero) {
        return next(createError(404, 'Superhero not found'));
      }
      await power.addSuperhero(hero);
    }

    res.status(201).send({ data: power });
  } catch (err) {
    next(err);
  }
};

module.exports.bulkCreatePowers = async (req, res, next) => {
  try {
    const { body: {superpowers, heroId} } = req;
    
    const createdpowers = await Superpower.bulkCreate(superpowers);
    
    if(!createdpowers.length) {
      return (next(createError(400, "Superpowers not created")))
    }
    
    // Если в запросе есть id героя то сразу привязать суперсилы к нему
    if(heroId) {
      const hero = await Superhero.findByPk(heroId);
  
      if (!hero) {
        return next(createError(404, 'Superhero not found'));
      }
      
      await hero.addSuperpowers(createdpowers);
    }

    res.status(201).send({data: createdpowers});
  } catch (err) {
    next(err);
  }
};

module.exports.getPowers = async (req, res, next) => {
  try {
    const {pagination} = req;
    const powers = await Superpower.findAll({
      ...pagination
    });

    if (!powers.length) {
      return next(createError(404, 'Superpowers not found'));
    }

    res.status(200).send({ data: powers });
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
