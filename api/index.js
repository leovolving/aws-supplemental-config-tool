require('dotenv').config();
const express = require("express");
const cors = require('cors');
const routes = require('./routes');
const morgan = require('morgan');
const mongoose = require('mongoose');
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
    if (res.headersSent) return next(error);
    const status = error.status >= 100 && error.status < 600 ? error.status : 500
    res.status(status).send(error.message || error.error);
});

// Connect to DB
mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost/harriet', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.info('Connected to the DB');
  // Establishing Port
  const PORT = process.env.PORT || 5050;
  app.listen(PORT, () => console.info(`API listening at port: ${PORT}`));
});