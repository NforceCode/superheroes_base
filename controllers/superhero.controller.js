const { Superhero, Superpower , SuperheroImage } = require('../models');
const createError = require('http-errors');
const _ = require('lodash');

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

    res.status(200).send('Deleted');
  } catch (err) {
    next(err);
  }
};

module.exports.addHeroWithImage = async(req, res, next) => {
  try {
    const {
      body,
      file: {filename}
     } =req;

     const newHero = await Superhero.create(body);
     if(!newHero) {
       return(next(createError(404, "Hero not created")));
     }

     const image = await newHero.createSuperheroImage({
      address: filename
    });

    if (!image) {
      return next(createError(404, 'Error while creating image'));
    }

     res.send({data: {hero: newHero, image}});
  } catch (err) {
    next(err);
  }
}

module.exports.addHeroWithImages = async(req, res, next) => {
  try {
    const {
      body,
      files
     } =req;

     const newHero = await Superhero.create(body);
     if(!newHero) {
       return(next(createError(404, "Hero not created")));
     }
     
    const imageNames = files.map(file => {return {address: file.filename, heroId: newHero.id}});
    const images = await SuperheroImage.bulkCreate(imageNames);

    if (!images) {
      return next(createError(404, 'Error while creating image'));
    }

     res.send({data: {hero: newHero, images}});
  } catch (err) {
    next(err);
  }
};

module.exports.createWithAll = async (req, res ,next) => {
  try {
    const {
      body,
      files
    } = req;
    console.log(body);

    const heroBody = _.pick(body, ['nickname', 'realName', 'originDescription', 'catchPhrase',]);

    const newHero = await Superhero.create(heroBody);
    if(!newHero) {
      return(next(createError(404, "Hero not created")));
    }

    const superpowersArray = body.superpowers.map(power => {return{name : power}});

    const superpowers = await Superpower.bulkCreate(superpowersArray);


    const imageNames = files.map(file => {return {address: file.filename, heroId: newHero.id}});
    const images = await SuperheroImage.bulkCreate(imageNames);

    if (!images) {
      return next(createError(404, 'Error while creating image'));
    }

    res.send(superpowersArray);
  } catch (err) {
    next(err);
  }
}