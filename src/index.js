const jsonPageHandler = require('./lib/responseHandler/JSONPage');
const htmlPageHandler = require('./lib/responseHandler/HTMLPage');
const viponProductURLsProcessor = require('./viponProcessor/productURL');
const viponToAMZURLProcessor = require('./viponProcessor/amzURL');
const retriveAmzObject = require('./amzProcessor/retrieveObject');
const uniq = require('lodash.uniq');
const Promise = require('bluebird');
const includes = require('lodash.includes');

// Run normal
async function index() {
  var all = [];
  var isEnd = false;
  while (!isEnd) {
    await jsonPageHandler(
      //TODO: change 1 to ${i};
      `https://www.vipon.com/promotion/search?domain=www.amazon.com&page=1`
    )
      .then($ => viponProductURLsProcessor($))
      .then(urls => {
        if (urls.length !== 0) {
          all.push(...urls);
          //TODO: Remove isEnd here
          isEnd = true;
        } else {
          isEnd = true;
        }
      });
  }

  // Remove duplicates
  let result = [];
  Promise.mapSeries(
    uniq(all),
    function(url) {
      return htmlPageHandler(url)
        .then($ => {
          return viponToAMZURLProcessor($);
        })
        .then(amazonURL => {
          htmlPageHandler(amazonURL)
            .then($ => {
              return retriveAmzObject($,url, amazonURL);
            })
            .then(value => {
              return result.push(value);
            });
        })
        .catch(err => {});
    },
    { concurrency: 1 }
  ).then(() => {
    console.log(result);
  });
}
index();
