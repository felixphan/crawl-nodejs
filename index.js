var cheerio = require('cheerio');
var request = require('request');

async function getViponURL() {
  // Get data from Vipon first page then push links into array
  var url = 'https://www.vipon.com';
  var viponURLs = [];
  request(url, function(err, resp, body) {
    if (err) throw err;
    $ = cheerio.load(body);
    $('.title').each(function() {
      //   console.log($(this).text());
      const viponID = $(this)
        .attr('onclick')
        .replace('review_product(', '')
        .replace(')', '');
      console.log(`https://www.vipon.com/product/${viponID}`);
      //   console.log('---');
      viponURLs.push(`https://www.vipon.com/product/${viponID}`);
    });
  });

  // Call each vipon to get amz url
  console.log(viponURLs);
  var amazonURLs = [];
  viponURLs.forEach(
    viponURL =>
      function() {
        console.log(viponURL);
        request(viponURL, function(err, resp, body) {
          if (err) throw err;
          $ = cheerio.load(body);
          const amzURL = $(
            'ul.list-unstyled:nth-child(3) > li:nth-child(1) > a:nth-child(1)'
          ).attr('href');
          amazonURLs.push(amzURL);
        });
      }
  );
  console.log(amazonURLs);
}

getViponURL();
