const express = require('express');
const path = require('path');
const logger = require('morgan');
const auth = require('./routes/auth');
const stores = require('./routes/stores');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Register application routes.
 */
// Authentication routes
app.use('/api/auth', auth);

// routes for CRUD actions on Store Model
app.use('/stores', stores);

module.exports = app;
