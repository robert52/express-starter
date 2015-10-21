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
module.exports.signout = signoutUser;

/**
 *  Uses Passport's local strategy to sign in a user
 */
function signinUser(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err || !user) {
      return res.format({
        html: function() {
          req.session.historyData = info;
          res.redirect('/signin');
        },
        // just in case :)
        text: function() {
          req.session.historyData = info;
          res.redirect('/signin');
        },
        json: function() {
          res.status(400).json(info);
        }
      });
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }

      res.format({
        html: function() {
          delete req.session.historyData;
          res.redirect('/');
        },
        // just in case :)
        text: function() {
          delete req.session.historyData;
          res.redirect('/');
        },
        json: function() {
          delete req.session.historyData;
          res.status(200).json(user);
        }
      });
    });
  })(req, res, next);
};

function signoutUser(req, res, next) {
  req.logout();
  delete req.session.historyData;
  res.redirect('/');
}
