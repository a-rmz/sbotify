/* @flow */

// Load `*.js` under current directory as properties
//  i.e., `User.js` will become `exports['User']` or `exports.User`
require('fs').readdirSync(__dirname + '/').forEach(file => {
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    const name: string = file.replace('.js', '');
    const path: string = `./${file}`;
    const Service = require(path);
    module.exports[name] = new Service();
  }
});
