'use strict';

const request = require('request-promise');
const Promise = require('bluebird');
const seriesNameToUrl = require('./series-name-to-url');
const listChaptersFromHtml = require('./list-chapters-from-html');

const callbackify = fn => (...args) => {
  const cb = args[args.length - 1];
  return Promise.resolve(fn(...args.slice(0, -1))).asCallback(cb);
};

async function listJobs(job, config) {
  const url = seriesNameToUrl(job.series);
  const res = await request.get(url);
  console.log(res);
  return listChaptersFromHtml(res, job);
}

module.exports = {
  seriesNameToUrl,
  listJobs: callbackify(listJobs)
};
