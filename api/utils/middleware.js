const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const validators = require('./validators');
const { Config } = require('../models/config');
const { WHERE } = require('./where');

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

module.exports = { checkJwt, getConfig, validate };
  