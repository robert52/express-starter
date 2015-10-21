'use strict';

/**
 *  Module dependencies
 */
var _ = require('lodash');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var ObjectId = mongoose.Types.ObjectId;

/**
 *  Module exports
 */
module.exports.findById = findUserById;
module.exports.getAll = getAllUsers;
module.exports.update = updateUser;
module.exports.delete = deleteUser;

function findUserById(req, res, next) {
  if (!ObjectId.isValid(req.params.userId)) {
    return res.status(404).json({ message: '404 not found.'});
  }

  User.findById(req.params.userId, function(err, user) {
    if (err) {
      next(err);
    } else if (user) {
      req.resources.user = user;
      next();
    } else {
      next(new Error('failed to find user'));
    }
  });
};

function getAllUsers(req, res, next) {
  User.find(function(err, users) {
    if (err) {
      return next(err);
    }

    req.resources.users = users;
    next();
  });
};

function updateUser(req, res, next) {
  var user = req.resources.user;
  _.assign(user, req.body);

  user.save(function(err, updatedUser) {
    if (err) {
      return next(err);
    }

    res.resources.user = updatedUser;
    next();
  });
};

function deleteUser(req, res, next) {
  req.resources.user.remove(function(err) {
    if (err) {
      return next(err);
    }

    res.status(204).json();
  });
};
