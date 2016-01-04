// auth.js

var auth = require('basic-auth');

var admins = {
  'moen': { password: '*' },
};


module.exports = function(req, res, next) {

  var user = auth(req);
  if (!user || !admins[user.name] || admins[user.name].password !== user.pass) {
    res.set('WWW-Authenticate', 'Basic realm="iammoen.com"');
    return res.status(401).send();
  }
  return next();
};
