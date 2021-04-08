const {Router} = require('express');
const heroRouter = require('./heroRouter');
const powerRouter = require('./powerRouter');
const imageRouter = require('./imageRouter');

const router = Router();

router.use('/superheroes', heroRouter);
router.use('/superpowers', powerRouter);
router.use('/images', imageRouter);

module.exports = router;