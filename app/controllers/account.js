'use strict';

/**
 *  Module dependencies
 */
var _ = require('lodash');
var mongoose = require('mongoose');
var User = mongoose.model('User');

/**
 *  Module exports
 */
module.exports.signup = signupUser;

function signupUser(req, res, next) {
  req.session.historyData = _.omit(req.body, 'password');

  // TODO: refactor validation
  if (!req.body.email) {
    req.session.historyData.message = 'E-mail is required.'
    return res.redirect('signup');
  }

  if (!req.body.password) {
    req.session.historyData.message = 'Password is required.'
    return res.redirect('signup');
  }

  if (req.body.password !== req.body.password_confirm) {
    req.session.historyData.message = 'Password confirmation should match password.'
    return res.redirect('signup');
  }

  var userData = _.pick(req.body, 'name', 'email', 'password');
  User.register(userData, function(err, user) {
    if (err && (11000 === err.code || 11001 === err.code)) {
      req.session.historyData.message = 'E-mail is already in use.'
      return res.redirect('signup');
    }

    if (err) {
      req.session.historyData.message = 'Something went wrong, please try later.'
      return res.redirect('signup');
    }

    req.logIn(user, function(err) {
      delete req.session.historyData;
      res.redirect('/');
    });
  });
};
