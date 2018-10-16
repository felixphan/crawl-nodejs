const populateData = require('./populateData');
const htmlPageHandler = require('../lib/responseHandler/HTMLPage');
function index(couponUrl, amazonURL) {
  htmlPageHandler(amazonURL)
    .then($ => {
      // TODO: need more implementing
      return populateData($, couponUrl, amazonURL);
    })
    .then(value => {
      console.log(value);
    });
}

module.exports = index;
