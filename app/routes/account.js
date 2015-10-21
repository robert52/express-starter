'use strict';

var express = require('express');
var router = express.Router();
var accountCtrl = require('../controllers/account');
var mainCtrl = require('../controllers/main');

router.get('/signin', mainCtrl.showPage('signin'));
router.get('/signup', mainCtrl.showPage('signup'));
router.post('/signup', accountCtrl.signup);
router.get('/account', mainCtrl.showPage('account'));

module.exports = router;
