const WHERE = req => ({
    'auth0Users.id': req.user.sub === process.env.MACHINE_CLIENT_ID 
        ? req.headers['x-user-id'] 
        : req.user.sub
});

module.exports = { WHERE };