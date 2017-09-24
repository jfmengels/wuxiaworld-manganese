import test from 'ava';
import seriesNameToUrl from '../series-name-to-url';

test('should return the url associated to the series name', t => {
  const name = 'Emperor Of Solo Play';
  t.is(seriesNameToUrl(name), 'http://www.wuxiaworld.com/emperorofsoloplay-index/');
});
