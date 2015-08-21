'use strict';

var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user');
var auth = require('../middlewares/authentication');

router.param('userId', userCtrl.findById);

router.get('/users', auth.ensured, userCtrl.getAll);
router.get('/users/:userId', auth.ensured, userCtrl.getOne);
router.put('/users/:userId', auth.ensured, userCtrl.update);
router.delete('/users/:userId', auth.ensured, userCtrl.delete);

module.exports = router;
