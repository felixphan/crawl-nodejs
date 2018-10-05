var cheerio = require('cheerio');
var request = require('request-promise');
var jsonParser = require('json-parser');

const getHTMLPageContent = uri => {
  const options = {
    uri,
    headers: {
      'User-Agent': 'Request-Promise'
    },
    transform: body => {
      return cheerio.load(body);
    }
  };
  return request(options);
};
async function index() {
  await getHTMLPageContent(
    'https://www.amazon.com/PAERDE-Polarized-Sunglasses-Driving-Cycling/dp/B07DDCD6PH'
  )
    .then($ => titleAMZ($))
    .then(result => {
      console.log(result);
    });
}

const titleAMZ = $ => {
  const result = $('#productTitle').text();
  return result;
};
index();
