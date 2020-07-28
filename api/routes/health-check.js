const {Router} = require('express');

const router = new Router();

router.get('/health-check', (_req, res) => {
    res.status(200).send('OK. ' + new Date().toISOString());
});

module.exports = router;