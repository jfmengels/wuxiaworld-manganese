const cheerio = require('cheerio');
const ranger = require('number-ranger');

const chapterNumberRegex = /hapter (\d+)/;

function listChaptersFromHtml(html, job) {
  const $ = cheerio.load(html);
  const chapters = $('div.entry-content p > a[href^="http://"]')
  .map((i, e) => {
    const chapter = chapterNumberRegex.exec($(e).text());
    return {
      series: job.series,
      chapter: parseFloat(chapter[1]),
      url: $(e).attr('href')
    };
  })
  .get()
  .filter(ranger.isInRangeFilter(job.chapters, 'chapter'))
  .sort((a, b) => parseFloat(a.chapter) - parseFloat(b.chapter));

  return chapters;
}

module.exports = listChaptersFromHtml;
