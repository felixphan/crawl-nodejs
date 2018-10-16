const jsonPageHandler = require('../lib/responseHandler/JSONPage');
const crawlVipon = require('./vipon');
const retrieveAmazon = require('./amazonURL');
const amzProcessor = require('../amzProcessor/index');
const uniq = require('lodash.uniq');
const Promise = require('bluebird');

/**
 * Crawl Amazon Products with Vipon Coupon
 */
var rootURL = `https://www.vipon.com/promotion/search?domain=www.amazon.com&page=1`;
// https://www.vipon.com/promotion/search?&domain=www.amazon.com&type=upcoming&page=1
var viponURLs = [];
var isEnd = false;
async function index(input) {
  populateRootURL(input)
  // Loop to Crawl All Vipon Coupon inside Root URL
  while (!isEnd) {
    await jsonPageHandler(
      //TODO: Update ${i} of Page Each Time.
      rootURL
    )
      .then($ => crawlVipon($))
      .then(urls => {
        populateViponURLs(urls);
      });
  }
  crawlAmazon();
}

function populateRootURL(input){
  if(input["type"]!== ''){
    rootURL = rootURL.concat("&type=",input["type"]);
  }
  if(input["group"] !== ''){
    rootURL = rootURL.concat("&group=",encodeURIComponent(input["group"]));
  }
}
/**
 * Crawl Amazon Data from Vipon URL
 */
function crawlAmazon() {
  // Remove Duplicates Vipon URLs by uniq of lodash
  Promise.mapSeries(
    uniq(viponURLs),
    function(url) {
      return retrieveAmazon(url).then(amazonURL =>
        amzProcessor(url, amazonURL)
      );
    },
    {
      // Open One Page at a Time.
      concurrency: 1
    }
  );
}
/**
 * Populate Vipon Urls from Vipon Crawled Data
 * @param {*} urls 
 */
function populateViponURLs(urls) {
  // If Crawl but Found No Coupon, End Loop
  if (urls.length !== 0) {
    viponURLs.push(...urls);
    //TODO: Testing Only
    isEnd = true;
  } else {
    isEnd = true;
  }
}

module.exports = index;
