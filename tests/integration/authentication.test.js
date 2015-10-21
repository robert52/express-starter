'use strict';

/**
 * Important! Set the environment to test
 */
process.env.NODE_ENV = 'test';

var http = require('http');
var request = require('request');
var chai = require('chai');
var userFixture = require('../fixtures/user');
var should = chai.should();

describe('Authentication', function() {
  var mongoose;
  var app;
  var appServer;
  var config;
  var baseUrl;
  var User;

  before(function(done) {
    app = require('../../server');
    config = app.get('config');
    baseUrl = config.baseUrl;
    appServer = http.createServer(app);

    appServer.on('listening', function() {
      mongoose = app.get('mongoose');
      User = mongoose.model('User');
      User.create(userFixture, function(err, user) {
        if (err) throw err;

        done();
      });
    });

    appServer.listen(config.port);
  });

  after(function(done) {
    appServer.on('close', function() {
      setTimeout(function() { done(); }, 1000);
    });

    User.remove({}).exec(function(err) {
      if (err) throw err;

      mongoose.connection.close(function() {
        appServer.close();
      });
    });
  });

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
