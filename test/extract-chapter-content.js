import path from 'path';
import test from 'ava';
import extractChapterContent from '../extract-chapter-content';
import loadFixture from './helpers/load-fixture';

test('should return cancel code if the page is a 404 page', async t => {
  const html = await loadFixture(path.join(__dirname, './fixtures/404.html'));
  t.deepEqual(extractChapterContent(html), {
    code: 'cancel',
    message: 'Could not find chapter'
  });
});

test('should return content of the chapter (with #chapterContent)', async t => {
  const html = await loadFixture(path.join(__dirname, './fixtures/emperorofsoloplay-chapter-4.html'));
  t.deepEqual(extractChapterContent(html), {
    code: 'content',
    message: `<hr>
<p style="text-align: center"><span style="font-weight: 400"> A Class You Can Play Alone (2)</span></p>
<p>Most men fell into a bit of narcissism, looking at themselves in the mirror after showers. It was a strange, unfortunate, and rather sad habit of the male species.</p>
<p>But An Jaehyun detested looking at mirrors. He didn&#x2019;t have any particularly handsome feature, and he couldn&#x2019;t even look at the mirror without his thick glasses.</p>
<hr>`
  });
});

test('should return content of the chapter (with div[itemprop="articleBody"])', async t => {
  const html = await loadFixture(path.join(__dirname, './fixtures/emperorofsoloplay-chapter-161.html'));
  t.deepEqual(extractChapterContent(html), {
    code: 'content',
    message: `<p><a title="ESP: Chapter 161 - Catch it or Be Caught (3)" href="http://www.wuxiaworld.com/emperorofsoloplay-index/esp-chapter-160/">Previous Chapter</a> <span style="float: right"><a title="" href="http://www.wuxiaworld.com/emperorofsoloplay-index/esp-chapter-162/">Next Chapter</a></span></p>
<p>Chapter 161 &#x2013; Catch it or Be Caught (4)</p>
<p>&#xA0;</p>
<p>10.</p>
<p><span style="font-weight: 400">A report came in.</span></p>
<p><span style="font-weight: 400">&#x201C;What did you just say?&#x201D; </span></p>
<p><span style="font-weight: 400">&#x2013; There is an ongoing battle at the Heard Fortress. &#xA0;It seems someone disturbed Anugas.</span></p>
<p><span style="font-weight: 400">When he received the report, Sinclair didn&#x2019;t ask for the identity of the person or group fighting Anugas.</span></p>`
  });
});
