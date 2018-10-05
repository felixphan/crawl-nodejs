const cheerio = require('cheerio');
const request = require('request-promise');
const jsonParser = require('json-parser');

/**
 * Convert JSONPageResponse to HTML DOM Object
 *
 * @param {*} uri : URL to pages: Vipon Search All...
 */
const handler = uri => {
  const options = {
    uri,
    headers: {
      'User-Agent': 'Request-Promise'
    },
    transform: body => {
      // Parse from JSON data to JSON object
      var jsonObject = jsonParser.parse(body);
      return cheerio.load(jsonObject.html);
    }
  };
  return request(options);
};

module.exports = handler;
