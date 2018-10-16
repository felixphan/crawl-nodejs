const populateData = require('./populateData');
const htmlPageHandler = require('../lib/responseHandler/HTMLPage');
const persist = require('./persist');
function index(couponUrl, amazonURL) {
  htmlPageHandler(amazonURL)
    .then($ => {
      // TODO: need more implementing
      return populateData($, couponUrl, amazonURL);
    })
    .then(value => {
      persist(value);
    });
}

module.exports = index;
