const { Router } = require('express');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const mongoose = require('mongoose');

// TODO: move to (and create) "models" directory
const schema = new mongoose.Schema({
  allPropertiesRequired: Boolean,
  auth0Users: [{type: Map, of: String}], // array of objects - userId and email address
  createdAt: String,
  customerName: String,
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

router.put(prefix, checkJwt, async (req, res) => {
  const update = {};
  for (let property in req.body) {
    update[`properties.${property}`] = req.body[property];
  }

  update.lastUpdated = new Date().toISOString();
  update.updatedBy = req.user.sub;

  await Config.findOneAndUpdate(WHERE(req), update, {new: true, useFindAndModify: false}, (e, c) => {
    if (e) return e;
    res.status(201).send(c);
  });
});

module.exports = router;