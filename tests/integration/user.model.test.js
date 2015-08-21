'use strict';

/**
 * Important! Set the environment to test
 */
process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();
var config = require('../../config/environments/test');
var mongoose = require('../../config/mongoose').init();
var User = require('../../app/models/user');

describe('User Model Integration', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function(err) {
      if (err) throw err;

      mongoose.disconnect(function() {
        setTimeout(done, 200);
      });
    });
  });

  describe('#register()', function() {
    var newUserData = {
      email: 'register_user@test.com',
      password: 'user_password',
      name: 'New Test User'
    };

    it('should create a new user', function(done) {
      User.register(newUserData, function(err, user) {
        if (err) throw err;

        should.exist(user);
        user.email.should.equal(newUserData.email);
        should.not.exist(user.password);
        should.not.exist(user.passwordSalt);
        should.exist(user.createdAt);
        user.active.should.equal(true);
        done();
      });
    });

    it('should not create a new user if email already exists', function(done) {
      User.register(newUserData, function(err, user) {
        should.exist(err);
        err.code.should.equal(11000); // duplicate key error
        should.not.exist(user);
        done();
      });
    });
  });

  describe('#authenticate()', function() {
    var _user;

    before(function(done) {
      User.register({
        email: 'auth_user@test.com',
        password: 'user_password',
        name: 'New Test User'
      }, function(err, user) {
        if (err) throw err;

        _user = user;
        done();
      });
    });

    it('should return the user if the credentials are valid', function(done) {
      User.authenticate(_user.email, 'user_password', function(err, user) {
        if (err) throw err;

        should.exist(user);
        should.not.exist(user.password);
        should.not.exist(user.passwordSalt);
        user.email.should.equal(_user.email);
        done();
      });
    });

    it('should return nothing if the credential of the user are invalid', function(done) {
      User.authenticate(_user.email, 'notuserpassowrd', function(err, user) {
        if (err) throw err;

        should.not.exist(user);
        done();
      });
    });
  });

  describe('#changePassword()', function() {
    var _user;

    before(function(done) {
      User.register({
        email: 'changePassword_user@test.com',
        password: 'user_password',
        name: 'New Test User'
      }, function(err, user) {
        if (err) throw err;

        _user = user;
        done();
      });
    });

    it('should change the password of a user', function(done) {
      _user.changePassword('user_password', 'new_user_password', function(err, result) {
        if (err) throw err;

        should.exist(result);
        result.success.should.equal(true);
        result.message.should.equal('Password changed successfully.');
        result.type.should.equal('password_change_success');

        // run a check credential with the new password
        User.authenticate(_user.email, 'new_user_password', function(err, user) {
          if (err) throw err;

          should.exist(user);
          user.email.should.equal(_user.email);
          done();
        });
      });
    });

    it('should not change password if old password does not match', function(done) {
      _user.changePassword('not_good', 'new_user_password', function(err, result) {
        should.not.exist(result);
        should.exist(err);
        err.type.should.equal('old_password_does_not_match');

        // run a check credential with the old password
        User.authenticate(_user.email, 'new_user_password', function(err, user) {
          if (err) throw err;

          should.exist(user);
          user.email.should.equal(_user.email);
          done();
        });
      });
    });
  });
});
