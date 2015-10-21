'use strict';

/**
 *  Module dependencies
 */
var passport = require('passport');
var mongoose = require('mongoose');

/**
 *  Module exports
 */
module.exports.signin = signinUser;

/**
 *  Uses Passport's local strategy to sign in a user
 */
function signinUser(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err || !user) {
      return res.status(400).send(info);
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }

      res.format({
        html: function() {
          res.redirect('/signin');
        },
        text: function() {
          res.redirect('/signin');
        },
        json: function() {
          res.status(200).json(user);
        }
      });
    });
  })(req, res, next);
};
