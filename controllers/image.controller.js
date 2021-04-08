const {Superhero} = require('../models/');


module.exports.addHeroImage = async (req, res, next) => {
  try {
    const {
      file: { filename },
      params: { heroId }
    } = req;

    const superhero = await Superhero.findByPk(heroId);

    if (!superhero) {
      return next(createError(404));
    }

    const image = await superhero.createSuperheroImage({
      address: filename
    });

    if (!image) {
      return next(createError(404, 'Error while creating image'));
    }

    res.status(200).send({data: image});
  } catch (err) {
    next(err);
  }
};
