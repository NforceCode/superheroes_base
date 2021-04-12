const {Router} = require('express');
const heroRouter = require('./heroRouter');
const powerRouter = require('./powerRouter');

const router = Router();

router.use('/superheroes', heroRouter);
router.use('/superpowers', powerRouter);

module.exports = router;