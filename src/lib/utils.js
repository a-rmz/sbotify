/* @flow */

const fs = require('fs');

const flattenArray = (array: any[]) => [].concat.apply([], array);

const getCurrentDirectoryFilenames = (dir: string) => fs.readdirSync(dir + '/');
const isJavascriptFile = (file: string) => file.match(/\.js$/) !== null;
const isIndexFile = (file: string) => file === 'index.js';

const parseIndex = (dir: string, callback: Function) => {
  getCurrentDirectoryFilenames(dir).forEach((file: string) => {
    if (isJavascriptFile(file) && !isIndexFile(file)) {
      const name: string = file.replace('.js', '');
      const module = require(`${dir}/${name}`);
      callback(name, module);
    }
  });
};

module.exports = {
  flattenArray,
  parseIndex
};
