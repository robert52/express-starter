'use strict';

/**
 * Module exports
 */
module.exports.ensured = ensureAuthenticated

/**
 *  Checks if a user is authenticated or not
 *  content negotiation is present
 */
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.format({
    html: function() {
      res.redirect('/signin');
    },
    // just in case :)    
    text: function() {
      res.redirect('/signin');
    },
    json: function() {
      res.status(401).json({ message: 'Unauthorized' });
    }
  });
};
