'use strict';

/**
 *  Module exports
 */
module.exports.showPage = showPage;

function showPage(page, data) {
  return function(req, res, next) {
    res.render(page, data);
  }
}
