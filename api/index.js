const express = require("express");
const cors = require('cors');
const routes = require('./routes');
const morgan = require('morgan');
const config = require('./config.json');

const app = express();

const origin = config.origins || '*';

// Middleware
app.use(cors({origin}));
app.use(express.json());
app.use(morgan('dev'));
app.use('/', routes);

// Error Handlers
app.use((error, _req, res, next) => {
    console.warn(error.stack);

    if (res.headersSent) return next(error);

      res.status(500);
      res.render('Something broke!', { error });
});

// Establishing Port
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.info(`API listening at port: ${PORT}`));