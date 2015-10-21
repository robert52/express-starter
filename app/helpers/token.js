'use strict';

/**
 * Constants
 */
var LEN = 16;

/**
 * Module dependencies
 */
var crypto = require('crypto');

/**
 * Module exports
 */
module.exports.generate = generateToken;

/**
 * Generates a random token using Node's crypto RNG
 *
 * @param {Number} randomBytes - random bytes to generate
 * @param {Function} callback
 */
function generateToken(randomBytes, callback) {
  if (typeof randomBytes === 'function') {
    callback = randomBytes;
    randomBytes = LEN;
  }

  // we will return the token in `hex`
  randomBytes = randomBytes / 2;

  crypto.randomBytes(randomBytes, function(err, buf) {
    if (err) {
      return callback(err);
    }

    var token = buf.toString('hex');

    callback(null, token);
  });
};
