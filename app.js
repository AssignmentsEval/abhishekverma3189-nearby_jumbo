const express = require('express');
const path = require('path');
const logger = require('morgan');
const auth = require('./routes/auth');
const stores = require('./routes/stores');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/auth', auth);
app.use('/stores', stores);

module.exports = app;
