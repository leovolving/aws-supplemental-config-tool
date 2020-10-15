const { Router } = require('express');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const mongoose = require('mongoose');

const validators = require('../utils/validators');

// TODO: move to (and create) "models" directory
const schema = new mongoose.Schema({
  allPropertiesRequired: Boolean,
  auth0Users: [{type: Map, of: String}], // array of objects - userId and email address
  createdAt: String,
  customerName: String,
  functionName: String,
  lastUpdated: String,
  projectName: String,
  properties: Map,
  readData: Array,
  requiredProperties: [String],
  updatedBy: String,
  writeData: Array
});

const Config = new mongoose.model('Config', schema);

// TODO: move to (and create) "middleware" directory
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}.us.auth0.com/.well-known/jwks.json`
  }),
  audience: `https://${process.env.AUTH0_DOMAIN}.us.auth0.com/api/v2/`,
  issuer: `https://${process.env.AUTH0_DOMAIN}.us.auth0.com/`,
  algorithms: ['RS256']
});

const getConfig = async (req ,_res, next) => {
  Config.findOne(WHERE(req), (e, c) => {
    if (e) return next(e);
    req.customerConfig = c;
    return next();
  });
}

const validate = async (req, _res ,next) => {
  const { functionName } = req.customerConfig;
  if (validators[functionName]) {
    const errors = validators[functionName](req);
    if (errors && errors.length) return next({status: 409, error: errors});
  }
  return next();
}

const router = new Router();
const prefix = '/config'

const WHERE = req => ({'auth0Users.id': req.user.sub === process.env.MACHINE_CLIENT_ID ? req.headers['x-user-id'] : req.user.sub});

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