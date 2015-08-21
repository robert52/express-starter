'use strict';

var express = require('express');
var router = express.Router();
var authCtrl = require('../controllers/authentication');

router.post('/signin', authCtrl.signin);

module.exports = router;
