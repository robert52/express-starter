'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var ObjectId = mongoose.Types.ObjectId;

module.exports.findById = function findById(req, res, next, id) {
  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Not found.'});
  }

  User.findById(id, function(err, user) {
    if (err) {
      next(err);
    } else if (user) {
      req._user = _user;
      next();
    } else {
      next(new Error('failed to find user'));
    }
  });
};

module.exports.getOne = function getOneExpense(req, res, next) {
  if (!req._user) {
    return res.status(404).json({ message: 'Not found.'});
  }

  res.json(req._user);
};

module.exports.getAll = function getAllExpenses(req, res, next) {
  User.find(function(err, users) {
    if (err) {
      return next(err);
    }

    res.json(users);
  });
};

module.exports.update = function updateExpense(req, res, next) {
  var expense = req._user;

  _.assign(_user, req.body);

  _user.save(function(err, updatedUser) {
    if (err) {
      return next(err);
    }

    res.json(updatedUser);
  });
};

module.exports.delete = function deleteExpense(req, res, next) {
  req._user.remove(function(err) {
    if (err) {
      return next(err);
    }

    res.status(204).json();
  });
};
