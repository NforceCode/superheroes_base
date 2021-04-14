const { Superhero, Superpower, SuperheroImage } = require('../db/models');
const createError = require('http-errors');
const _ = require('lodash');
const { Op } = require('sequelize');

module.exports.createSuperhero = async (req, res, next) => {
  try {
    const { body, files } = req;

    if (_.isEmpty(body.superpowers)) {
      return next(createError(400, 'Superpowers not provided'));
    }

    //Самые отборные итальянские макаронные изделия!
    // если Postman прислал только одну строчку то переделать ее к булкоСоздающему виду
    if (typeof body.superpowers === 'string' && body.superpowers !== '') {
      body.superpowers = [body.superpowers];
    }

    // Суперсилы, которые уже есть в базе
    const dbpowers = await Superpower.findAll({
      where: {
        name: { [Op.in]: body.superpowers }
      }
    });

    // Массив со строками имен суперсил, которые есть в базе
    const existingPowers = dbpowers.map(
      powerInstance => powerInstance.dataValues.name
    );

    // Макаронный монстр по убиранию из массива тех суперсил, которые уже были в базе
    body.superpowers = body.superpowers.filter(
      power => !existingPowers.includes(power)
    );

    // выбираем из body запчасти героя
    const heroBody = _.pick(body, [
      'nickname',
      'realName',
      'originDescription',
      'catchPhrase'
    ]);

    const newHero = await Superhero.create(heroBody);
    if (!newHero) {
      return next(createError(404, 'Hero not created'));
    }

    if (dbpowers) {
      await newHero.addSuperpowers(dbpowers);
    }

    if (body.superpowers.length) {
      const createdSuperpowers = await Superpower.bulkCreate(
        body.superpowers.map(power => {
          return { name: power };
        }, {})
      );

      if (!createdSuperpowers) {
        return next(createError(404, 'Superpowers were not created'));
      }

      await newHero.addSuperpowers(createdSuperpowers);
    }

    if (!_.isEmpty(files)) {
      const imageNames = files.map(file => {
        return { address: file.filename, heroId: newHero.id };
      });
      const images = await SuperheroImage.bulkCreate(imageNames);

      // Проверка что картинки не создались хотя в файлах что-то прилетало
      if (!images) {
        return next(createError(404, 'Error while creating image'));
      }
    }

    const assembledHero = await Superhero.findByPk(newHero.dataValues.id, {
      include: [
        {
          model: SuperheroImage,
          attributes: [['address', 'image name']]
        },
        {
          model: Superpower,
          name: [['name', 'superpower']],
          through: { attributes: [] }
        }
      ]
    });

    res.send({ data: assembledHero });
  } catch (err) {
    next(err);
  }
};

module.exports.getSuperhero = async (req, res, next) => {
  try {
    const {
      params: { id }
    } = req;

    const superhero = await Superhero.findByPk(id, {
      include: [
        {
          model: Superpower,
          attributes: [['name', 'superpower']],
          through: {
            attributes: []
          }
        },
        {
          model: SuperheroImage,
          attributes: [['address', 'image name']]
        }
      ]
    });

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
      ...pagination,
      include: [
        {
          model: SuperheroImage,
          attributes: [['address', 'image name']]
        },
        {
          model: Superpower,
          attributes: [['name', 'superpower']],
          through: {
            attributes: []
          }
        }
      ]
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
      params: { id },
      files
    } = req;

    const heroBody = _.pick(body, [
      'nickname',
      'realName',
      'originDescription',
      'catchPhrase'
    ]);

    const hero = await Superhero.findByPk(id);

    if (!hero) {
      return next(createError(400, 'Error while updating Superhero'));
    }

    if (!_.isEmpty(heroBody)) {
      hero.update(heroBody);
    }

    if (!_.isEmpty(files)) {
      await SuperheroImage.destroy({
        where: { heroId: id }
      });

      const images = await SuperheroImage.bulkCreate(
        files.map(file => {
          return { address: file.filename, heroId: hero.id };
        })
      );

      if (!images && !_.isEmpty(files)) {
        return next(createError(404, 'Error while creating image'));
      }
    }

    if (!_.isEmpty(body.superpowers)) {
      if (typeof body.superpowers === 'string' && body.superpowers !== '') {
        body.superpowers = [body.superpowers];
      }

      const existingPowers = await Superpower.findAll({
        where: {
          name: { [Op.in]: body.superpowers }
        }
      });

      if (existingPowers.length) {
        await hero.setSuperpowers(existingPowers);
      }

      const existingPowersArray = existingPowers.map(
        powerInstance => powerInstance.dataValues.name
      );

      body.superpowers = body.superpowers.filter(
        power => !existingPowersArray.includes(power)
      );

      if (body.superpowers.length) {
        const newPowers = await Superpower.bulkCreate(
          body.superpowers.map(power => {
            return { name: power };
          })
        );

        if (!newPowers) {
          return next(createError(400, 'Cant create new powers'));
        }

        if (!existingPowers.length) {
          await hero.setSuperpowers(newPowers);
        } else {
          await hero.addSuperpowers(newPowers);
        }
      }
    }

    const updatedHero = await Superhero.findByPk(id, {
      include: [
        {
          model: SuperheroImage,
          attributes: [['address', 'image name']]
        },
        {
          model: Superpower,
          attributes: [['name', 'superpower']],
          through: { attributes: [] }
        }
      ]
    });
    res.send(updatedHero);
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

    res.status(200).send({ data: id });
  } catch (err) {
    next(err);
  }
};
