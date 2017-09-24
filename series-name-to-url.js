function seriesNameToUrl(name) {
  const series = name
    .toLowerCase()
    .replace(/ /g, '');
  return `http://www.wuxiaworld.com/${series}-index/`;
}

module.exports = seriesNameToUrl;
