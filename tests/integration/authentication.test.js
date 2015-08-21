'use strict';

/**
 * Important! Set the environment to test
 */
process.env.NODE_ENV = 'test';

var http = require('http');
var request = require('request');
var chai = require('chai');
var mongoose = require('mongoose');

var app = require('../../server');
var userFixture = require('../fixtures/user');

var should = chai.should();
var config = app.get('config');
var baseUrl = config.baseUrl;
var User = mongoose.model('User');
var appServer;

describe('Authentication', function() {

  before(function(done) {
    appServer = http.createServer(app);

    appServer.on('listening', function() {
      User.create(userFixture, function(err, user) {
        if (err) throw err;

        done();
      });
    });

    appServer.listen(config.port);
  });

  after(function(done) {
    appServer.on('close', function() {
      setTimeout(done, 200);
    });

    mongoose.connection.db.dropDatabase(function(err) {
      if (err) throw err;

      mongoose.disconnect(function() {
        appServer.close();
      });
    });
  });

  describe('Sign in user', function() {
    it('should sign in a user with valid credentials', function(done) {
      request({
        method: 'POST',
        url: baseUrl + '/auth/signin',
        form: {
          'email': userFixture.email,
          'password': 'P@ssw0rd!'
        },
        json:true
      }, function(err, res, body) {
        if (err) throw err;

        res.statusCode.should.equal(200);
        body.email.should.equal(userFixture.email);
        should.not.exist(body.password);
        should.not.exist(body.passwordSalt);
        done();
      });
    });

    it('should not sign in a user with invalid credentials', function(done) {
      request({
        method: 'POST',
        url: baseUrl + '/auth/signin',
        form: {
          'email': userFixture.email,
          'password': 'incorrectpassword'
        },
        json:true
      }, function(err, res, body) {
        if (err) throw err;

        res.statusCode.should.equal(400);
        body.message.should.equal('Invalid email or password.');
        done();
      });
    });
  });

});
