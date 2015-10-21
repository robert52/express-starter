'use strict';

/**
 *  Module exports
 */
module.exports.showPage = showPage;

function showPage(page, data) {
  return function(req, res, next) {
    res.locals.historyData = req.session.historyData || {};
    res.render(page, data);
    delete req.session.historyData;
  }
}
