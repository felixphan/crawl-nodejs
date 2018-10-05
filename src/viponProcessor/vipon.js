const jsonPageHandler = require('../lib/responseHandler/JSONPage');
const htmlPageHandler = require('../lib/responseHandler/HTMLPage');
const viponProductURLsProcessor = require('./productURL');
const viponToAMZURLProcessor = require('./amzURL');
const retriveAmzObject = require('../amzProcessor/retrieveObject');
const uniq = require('lodash.uniq');
const Promise = require('bluebird');

/**
 * Search all because response from Vipon is JSON
 */
var rootURL = `https://www.vipon.com/promotion/search?domain=www.amazon.com&page=1`;
// https://www.vipon.com/promotion/search?&domain=www.amazon.com&type=upcoming&page=1
//TODO: add type implement
async function index() {
  var all = [];
  var isEnd = false;
  // Re set URL for type
  if (process.argv[2] !== 'all') {
    rootURL = ` https://www.vipon.com/promotion/search?&domain=www.amazon.com&type=${
      process.argv[2]
    }&page=1`;
  }
  // Loop to get all data of all pages
  while (!isEnd) {
    await jsonPageHandler(
      //TODO: change 1 to ${i};
      rootURL
    )
      .then($ => viponProductURLsProcessor($))
      .then(urls => {
        // If request but found no result, end loop
        if (urls.length !== 0) {
          all.push(...urls);
          //TODO: Remove isEnd here
          isEnd = true;
        } else {
          isEnd = true;
        }
      });
  }

  // Remove duplicates by uniq of lodash
  let result = [];
  Promise.mapSeries(
    uniq(all),
    function(url) {
      // Get vipon page of product
      return htmlPageHandler(url)
        .then($ => {
          // Get amz url
          return viponToAMZURLProcessor($);
        })
        .then(amazonURL => {
          // Get amz page of product
          htmlPageHandler(amazonURL)
            .then($ => {
              // Parse data
              // TODO: need more implementing
              return retriveAmzObject($, url, amazonURL);
            })
            .then(value => {
              return result.push(value);
            });
        })
        .catch(err => {});
    },
    {
      // Open one page at a time
      concurrency: 1
    }
  ).then(() => {
    console.log(result);
  });
}

index();
