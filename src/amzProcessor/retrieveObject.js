/**
 * Retrieve product data from amz
 * 
 * @param {*} $ 
 * @param {*} url 
 * @param {*} amazonURL 
 */
const retrieve = ($, url, amazonURL) => {
  const title = $('#productTitle')
    .text()
    .trim();
  return {
    title: title,
    url: url,
    amazonURL: amazonURL
  };
};
module.exports = retrieve;


