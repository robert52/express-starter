'use strict';

var chai = require('chai');
var should = chai.should();
var tokenHelper = require('../../app/helpers/token');

describe('Token Helper', function() {
  describe('#generate() - generate token', function() {
    it('should generate a random 16 length token', function(done) {
      tokenHelper.generate(function(err, token) {
        if (err) throw err;

        should.exist(token);
        token.should.be.a('string');
        token.length.should.equal(16);
        done();
      });
    });

    it('should generate a random 32 length token', function(done) {
      tokenHelper.generate(32, function(err, token) {
        if (err) throw err;

        should.exist(token);
        token.should.be.a('string');
        token.length.should.equal(32);
        done();
      });
    });
  });

});
