const powerRouter = require('express').Router();
const PowerController = require('../controllers/powers.controller');

powerRouter.get('/', PowerController.getPowers);
powerRouter.post('/', PowerController.createPower);
powerRouter.post('/bulk', PowerController.bulkCreatePowers);
powerRouter.delete('/:powerId', PowerController.deletePower);

module.exports = powerRouter;