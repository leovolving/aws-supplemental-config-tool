const { Router } = require('express');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const mongoose = require('mongoose');

// TODO: move to (and create) "models" directory
const schema = new mongoose.Schema({
  auth0Users: [{type: Map, of: String}], // array of objects - userId and email address
  customerName: String,
  projectName: String,
  allPropertiesRequired: Boolean,
  requiredProperties: [String],
  properties: Map,
  readData: Array,
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
// router.post(prefix, (req, res) => {
//   const customer = new Config(req.body);
//   customer.save((err) => {
//     if (err) return err;
//   });
//   res.status(201).send(customer);
// });

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

  await Config.findOneAndUpdate(WHERE(req), update, {new: true}, (e, c) => {
    if (e) return e;
    res.status(201).send(c);
  });
});

module.exports = router;