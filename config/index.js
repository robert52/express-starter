'use strict';

var ENV = process.env.NODE_ENV || 'development';
var config = require('./environments/'+ENV.toLowerCase());

module.exports = config;
