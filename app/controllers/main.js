'use strict';

/**
 *  Module exports
 */
module.exports.showPage = showPage;
module.exports.toJSON = responseToJSON;

function showPage(page, data) {
  return function(req, res, next) {
    res.locals.historyData = req.session.historyData || {};
    res.render(page, data);
    delete req.session.historyData;
  }
}

function responseToJSON(prop) {
  return function(req, res, next) {
    res.json(req.resources[prop]);
  }
}
