/**
 * Retrieve Product URLs from HTML DOM page
 * 
 * @param {*} $ HTML Dom Page
 */
const process = $ => {
    var viponURLs = [];
    // Loop Through all Product in Page
    $('.title').each(function() {
      // Get ID of Product
      const productID = $(this)
        .attr('onclick')
        .replace('review_product(', '')
        .replace(')', '');
      // Push to an array
      viponURLs.push(`https://www.vipon.com/product/${productID}`);
    });
    return viponURLs;
  };
  module.exports = process;