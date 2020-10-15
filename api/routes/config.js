const { Router } = require('express');
const { checkJwt, getConfig, validate } = require('../utils/middleware');
const { WHERE } = require('../utils/where');
const { Config } = require('../models/config');


const router = new Router();
const prefix = '/config'

// TODO: only allow admins to access this endpoint
router.post(prefix, (req, res) => {
  const newConfig = {
    ...req.body,
    createdAt: new Date().toISOString()
  }
  const customer = new Config(newConfig);
  customer.save((err) => {
    if (err) return err;
  });
  res.status(201).send(customer);
});

router.get(prefix, checkJwt, (req, res) => {
  Config.findOne(WHERE(req), (e, c) => {
    if (e) return e;
    res.status(200).send(c);
  });
});

router.put(prefix, checkJwt, getConfig, validate, async (req, res, next) => {
    const update = {};
    for (let property in req.body) {
      update[`properties.${property}`] = req.body[property];
    }
    
    update.lastUpdated = new Date().toISOString();
    update.updatedBy = req.user.sub;
    
    await req.customerConfig.updateOne(update, (e, c) => {
      if (e) return next(e);
      res.status(201).send(c);
    });
});

module.exports = router;