'use strict';

module.exports.init = function(app) {
  var routesPath = app.get('root') + '/app/routes';

  app.use('/', require(routesPath + '/main'));
  app.use('/auth', require(routesPath + '/authentication'));
  app.use('/', require(routesPath + '/account'));
  app.use('/', require(routesPath + '/users'));
};
