import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import test from 'ava';
import listChaptersFromHtml from '../list-chapters-from-html';

function loadFixture(filePath) {
  return Promise.fromCallback(cb => fs.readFile(filePath, 'utf-8', cb));
}

test('should list chapters to download from the HTML page', async t => {
  const html = await loadFixture(path.join(__dirname, './fixtures/emperorofsoloplay-index.html'));
  const job = {
    series: 'Emperor Of Solo Play',
    chapters: [{
      start: 0,
      end: 5
    }, {
      start: 160,
      end: 170
    }]
  };
  const downloadJobs = listChaptersFromHtml(html, job);
  downloadJobs.forEach(j => {
    t.is(j.series, 'Emperor Of Solo Play');
    t.is(typeof j.chapter, 'number');
    t.is(j.url, `http://www.wuxiaworld.com/emperorofsoloplay-index/esp-chapter-${j.chapter}`);
  });
  t.deepEqual(downloadJobs.map(j => j.chapter), [0, 1, 2, 3, 4, 5, 160, 161]);
});
