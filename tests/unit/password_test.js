'use strict';

var chai = require('chai');
var should = chai.should();
var passwordHelper = require('../../app/helpers/password');

describe('Password Helper', function() {
  describe('#hash() - password hashing', function() {
    it('should return a hash and a salt from a plain string', function(done) {
      passwordHelper.hash('P@ssw0rd!', function(err, hash, salt) {
        if (err) throw err;

        should.exist(hash);
        should.exist(salt);
        hash.should.be.a('string');
        salt.should.be.a('string');
        hash.should.not.equal('P@ssw0rd!');
        done();
      });
    });

    it('should return only a hash from a plain string if salt is given', function(done) {
      passwordHelper.hash('P@ssw0rd!', 'secret salt', function(err, hash, salt) {
        if (err) throw err;

        should.exist(hash);
        should.not.exist(salt);
        hash.should.be.a('string');
        hash.should.not.equal('P@ssw0rd!');
        done();
      });
    });

    it('should return the same hash if the password and salt ar the same', function(done) {
      passwordHelper.hash('P@ssw0rd!', function(err, hash, salt) {
        if (err) throw err;

        passwordHelper.hash('P@ssw0rd!', salt, function(err, hashWithSalt) {
          if (err) throw err;

          should.exist(hash);
          hash.should.be.a('string');
          hash.should.not.equal('P@ssw0rd!');
          hash.should.equal(hashWithSalt);
          done();
        });
      });
    });
  });

  describe('#verify() - compare a password with a hash', function() {
    it('should return true if the password matches the hash', function(done) {
      passwordHelper.hash('P@ssw0rd!', function(err, hash, salt) {
        if (err) throw err;

        passwordHelper.verify('P@ssw0rd!', hash, salt, function(err, result) {
          if (err) throw err;

          should.exist(result);
          result.should.be.a('boolean');
          result.should.equal(true);
          done();
        });
      });
    });

    it('should return false if the password does not matches the hash', function(done) {
      passwordHelper.hash('P@ssw0rd!', function(err, hash, salt) {
        if (err) throw err;

        passwordHelper.verify('password!', hash, salt, function(err, result) {
          if (err) throw err;

          should.exist(result);
          result.should.be.a('boolean');
          result.should.equal(false);
          done();
        });
      });
    });
  });
});
