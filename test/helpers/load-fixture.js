import fs from 'fs';
import Promise from 'bluebird';

function loadFixture(filePath) {
  // eslint-disable-next-line no-use-extend-native/no-use-extend-native
  return Promise.fromCallback(cb => fs.readFile(filePath, 'utf-8', cb));
}

export default loadFixture;
