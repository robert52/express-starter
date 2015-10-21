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
module.exports.getOne = getOneUser;
module.exports.getAll = getAllUsers;
module.exports.update = updateUser;
module.exports.delete = deleteUser;

function findUserById(req, res, next, id) {
  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Not found.'});
  }

  User.findById(id, function(err, user) {
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

function getOneUser(req, res, next) {
  if (!req.resources.user) {
    return res.status(404).json({ message: 'Not found.'});
  }

  res.json(req._user);
};

function getAllUsers(req, res, next) {
  User.find(function(err, users) {
    if (err) {
      return next(err);
    }

    res.json(users);
  });
};

function updateUser(req, res, next) {
  var user = req.resources.user;
  _.assign(user, req.body);

  user.save(function(err, updatedUser) {
    if (err) {
      return next(err);
    }

    res.json(updatedUser);
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
