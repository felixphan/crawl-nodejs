/**
 * Retrieve Amz URL from HTML Vipon Product DOM page
 *
 * @param {*} $ HTML Dom Page
 */
const process = $ => {
  const amazonURL = $(
    'ul.list-unstyled:nth-child(3) > li:nth-child(1) > a:nth-child(1)'
  ).attr('href');
  
  if(amazonURL === undefined){
    amazonURL = $(
      '.col-md-offset-1 > div:nth-child(1) > ul:nth-child(2) > li:nth-child(1) > a:nth-child(1)'
    ).attr('href');
  }
  return amazonURL;
};

module.exports = process;
