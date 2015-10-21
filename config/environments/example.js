'use strict';

module.exports = {
  port: 3000,
  hostname: "127.0.0.1",
  baseUrl: 'http://localhost:3000',
  mongodb: {
    uri: "mongodb://localhost/es_dev_db"
  },
  app: {
    name: "express starter"
  },
  serveStatic: true,
  session: {
    secret: 'someVeRyN1c3S#cr3tHer34U'
  },
  proxy: {
    trust: true
  },
  swig: {
    cache: false
  },
};
