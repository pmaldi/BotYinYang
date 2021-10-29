fs = require('fs');

exports.log = function (name, message) {
    fs.writeFile('./logs/test.txt', `<${name}>: ${message}\n`, { flag: 'a+' }, err => { })
}
