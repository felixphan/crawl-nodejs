const retrieve = ($, url, amazonURL) => {
  const title = $('#productTitle')
    .text()
    .trim();
//   if (title === '') {
//     console.log(amazonURL);
//   }
//   console.log(title);
  return {
    title: title,
    url: url,
    amazonURL: amazonURL
  };
};
module.exports = retrieve;


