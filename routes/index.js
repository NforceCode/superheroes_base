const {Router} = require('express');
const heroRouter = require('./heroRouter');

const router = Router();

router.use('/superheroes', heroRouter)

module.exports = router;