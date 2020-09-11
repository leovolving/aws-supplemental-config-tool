const { Router } = require('express');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

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

router.get(prefix, checkJwt, (_req, res) => {
    res.status(200).send('JWT worked. ' + new Date().toISOString());
});

module.exports = router;