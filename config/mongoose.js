'use strict';

var mongoose = require('mongoose');
var config = require('./index');

module.exports.init = function(app) {
  mongoose.connect(config['mongodb'].uri);

  // add the mongoose object to the app instance
  if (app) {
    app.set('mongoose', mongoose);
  }

  return mongoose;
};
