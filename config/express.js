'use strict';

var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var serveStatic = require('serve-static');
var expressValidator = require('express-validator');
var session = require('express-session');
var passport = require('passport');
var config = require('./index');

module.exports.init = function(app) {
  var env = app.get('env');
  var root = app.get('root');

  /**
   * Common express configs
   */
  app.use(expressValidator());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.disable('x-powered-by');

  switch(env) {
    case 'production':
    case 'test':
    case 'development':
    case 'staging':
    default:
      app.use(session({
        secret: config.session.secret,
        key: 'skey.sid',
        resave: false,
        saveUninitialized: true
      }));
  }

  /**
   * Use passport session
   */
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(function(req, res, next) {
    res.locals.app = config.app;

    next();
  });

  if (config.serveStatic) {
    app.use(serveStatic(path.join(root, 'public')));
  }
};
