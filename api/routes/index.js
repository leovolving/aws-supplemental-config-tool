const express = require('express');
const healthCheck = require('./health-check');
const config = require('./config');

const {Router} = express;
const router = new Router();

router.use(healthCheck);
router.use(config);

module.exports = router;