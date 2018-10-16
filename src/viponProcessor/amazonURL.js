const htmlPageHandler = require('../lib/responseHandler/HTMLPage');
/**
 * Retrieve Amz URL from HTML Vipon Product DOM page
 *
 * @param {*} $ HTML Dom Page
 */
const process = $ => {
  var amazonURL = $(
    'ul.list-unstyled:nth-child(3) > li:nth-child(1) > a:nth-child(1)'
  ).attr('href');
  
  //TODO: There is two known selector for url of amz, if there is more than two, implement must be added.
  if(amazonURL === undefined){
    amazonURL = $(
      '.col-md-offset-1 > div:nth-child(1) > ul:nth-child(2) > li:nth-child(1) > a:nth-child(1)'
    ).attr('href');
  }
  return amazonURL;
};

function index(url){
  return htmlPageHandler(url).then($ => {
    // Get amz url
    return process($);
  });
}
module.exports = index;
