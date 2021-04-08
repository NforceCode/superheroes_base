const express = require('express');
const router = require('./routes');
const errorHander = require('./middlewares/error.handlers');

const app = express();

app.use(express.json());

app.use('/api', router);

app.use(errorHander);

module.exports = app;