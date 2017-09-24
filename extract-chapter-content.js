const cheerio = require('cheerio');

function extractChapterContent(html) {
  const $ = cheerio.load(html);
  if ($('.not-found').length > 0) {
    return {
      code: 'cancel',
      message: 'Could not find chapter'
    };
  }

  if ($('#chapterContent').html()) {
    return {
      code: 'content',
      message: $('#chapterContent').html().trim()
    };
  }

  return {
    code: 'content',
    message: $('div[itemprop="articleBody"]').html().trim()
  };
}

module.exports = extractChapterContent;
