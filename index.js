'use strict';

const fs = require('fs');
const path = require('path');
const util = require('util');
const request = require('request-promise');
const Promise = require('bluebird');
const seriesNameToUrl = require('./series-name-to-url');
const listChaptersFromHtml = require('./list-chapters-from-html');
const extractChapterContent = require('./extract-chapter-content');

const writeFile = util.promisify(fs.writeFile);

const callbackify = fn => (...args) => {
  const cb = args[args.length - 1];
  return Promise.resolve(fn(...args.slice(0, -1))).asCallback(cb);
};

async function listJobs(job) {
  const url = seriesNameToUrl(job.series);
  const res = await request.get(url);
  return listChaptersFromHtml(res, job);
}

async function downloadChapter(downloadJob) {
  const html = await request.get(downloadJob.url);
  const content = extractChapterContent(html);
  if (content.code === 'cancel') {
    return content;
  }

  const outputFile = path.resolve(downloadJob.dest, 'chapter.html');

  await writeFile(outputFile, content.message);
  return {
    code: 'end'
  };
}

module.exports = {
  seriesNameToUrl,
  downloadChapter: callbackify(downloadChapter),
  listJobs: callbackify(listJobs)
};
