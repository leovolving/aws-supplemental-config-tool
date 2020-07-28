const express = require('express');
const healthCheck = require('./health-check');

const {Router} = express;
const router = new Router();

router.use(healthCheck);

module.exports = router;