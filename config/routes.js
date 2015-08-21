'use strict';

module.exports.init = function(app) {
  var routesPath = app.get('root') + '/app/routes';

  app.use('/auth', require(routesPath + '/authentication'));
  app.use('/', require(routesPath + '/users'));
};
