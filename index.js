var cheerio = require('cheerio');
var request = require('request-promise');
var jsonParser = require('json-parser');

// Get JSON page content for category pages of vipon
const getJSONPageContent = uri => {
  const options = {
    uri,
    headers: {
      'User-Agent': 'Request-Promise'
    },
    transform: body => {
      var jsonObject = jsonParser.parse(body);
      return cheerio.load(jsonObject.html);
    }
  };

  return request(options);
};

// Get HTML page content for product pages of vipon and amz
const getHTMLPageContent = uri => {
  const options = {
    uri,
    headers: {
      'User-Agent': 'Request-Promise'
    },
    transform: body => {
      console.log(uri);
      return cheerio.load(body);
    }
  };
  return request(options);
};

// Get product link from vipon HTML page if possible
const htmlToViponURL = $ => {
  var viponURLs = [];
  $('.title').each(function() {
    const viponID = $(this)
      .attr('onclick')
      .replace('review_product(', '')
      .replace(')', '');
    viponURLs.push(`https://www.vipon.com/product/${viponID}`);
  });
  return viponURLs;
};

// Get amz product link from vipon HTML page if possible
const htmlToAmazonURL = $ => {
  const amazonURL = $(
    'ul.list-unstyled:nth-child(3) > li:nth-child(1) > a:nth-child(1)'
  ).attr('href');
  return amazonURL;
};

// Get title
const titleAMZ = $ => {
  const result = $('#productTitle').text();
  return result;
};

// Run normal
async function index() {
  var all = [];
  var i = 1;
  var isEnd = false;
  while (!isEnd) {
    await getJSONPageContent(
      //TODO: change 1 to ${i};
      `https://www.vipon.com/promotion/search?domain=www.amazon.com&page=1`
    )
      .then($ => htmlToViponURL($))
      .then(viponURLs => {
        if (viponURLs.length !== 0) {
          all.push(...viponURLs);
          i++;
          //TODO: Remove isEnd here
          isEnd = true;
        } else {
          isEnd = true;
        }
      });
  }

  await getHTMLPageContent(all[0])
    .then($ => htmlToAmazonURL($))
    .then(url => {
      getHTMLPageContent(url)
        .then($ => titleAMZ($))
        .then(result => {
          console.log(result);
        });
    });
}

index();
