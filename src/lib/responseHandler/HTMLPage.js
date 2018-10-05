var cheerio = require('cheerio');
var request = require('request-promise');

/**
 * Convert HTMLPageResponse to HTML DOM Object
 *
 * @param {*} uri : URL to pages: Amazon Product Page, Vipon First Page...
 */
const handler = uri => {
  const options = {
    uri,
    headers: {
      'User-Agent': 'Request-Promise'
    },
    timeout: 3000,
    transform: body => {
      return cheerio.load(body);
    }
  };
  return request(options);
};

module.exports = handler;
