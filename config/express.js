'use strict';

var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var serveStatic = require('serve-static');
var expressValidator = require('express-validator');
var session = require('express-session');
var passport = require('passport');
var MongoStore = require('connect-mongo')(session);
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
      app.use(session({
        secret: config.session.secret,
        key: 'skey.sid',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({
          url: config.mongodb.uri
        })
      }));

      break;
    case 'staging':
    case 'test':
    case 'development':
    default:
      app.use(session({
        secret: config.session.secret,
        key: 'skey.sid',
        resave: false,
        saveUninitialized: false
      }));
  }

  /**
   * Use passport session
   */
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(function(req, res, next) {
    // a simple object that holds resources for each request
    req.resources = req.resources || {};
    res.locals.app = config.app;

    next();
  });

  if (config.serveStatic) {
    app.use(serveStatic(path.join(root, 'public')));
  }
};
