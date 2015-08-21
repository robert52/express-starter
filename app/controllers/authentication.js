'use strict';

var _ = require('lodash');
var passport = require('passport');
var mongoose = require('mongoose');

module.exports.signin = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err || !user) {
      return res.status(400).send(info);
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }

      res.status(200).json(user);
    });
  })(req, res, next);
};
