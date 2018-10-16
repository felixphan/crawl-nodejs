/**
 * Populate product data from amz
 *
 * @param {*} $
 * @param {*} url
 * @param {*} amazonURL
 */
const populate = ($, url, amazonURL) => {
  const title = $('#productTitle')
    .text()
    .trim();
  return {
    title: title,
    url: url,
    amazonURL: amazonURL
  };
};
module.exports = populate;
