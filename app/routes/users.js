'use strict';

var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user');
var mainCtrl = require('../controllers/main');
var auth = require('../middlewares/authentication');

router.get('/users', auth.ensured, userCtrl.getAll, mainCtrl.toJSON('users'));
router.get('/users/:userId', auth.ensured, userCtrl.findById, mainCtrl.toJSON('user'));
router.put('/users/:userId', auth.ensured, userCtrl.findById, userCtrl.update, mainCtrl.toJSON('user'));
router.delete('/users/:userId', auth.ensured, userCtrl.delete);

module.exports = router;
