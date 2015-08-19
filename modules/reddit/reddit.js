var Snoocore = require('snoocore');
var config = require('./config');

var reddit = new Snoocore({
  userAgent: 'Spudnik 0.0.1 by Belvain',
  oauth: { 
    type: 'script',
    key: config.key, 
    secret: config.secret,
    username: config.username,
    password: config.password,
    scope: [ 'submit' ] 
  }
});

exports.submitLink = function(sr, title, link){
    return reddit('/api/submit').post({
      api_type: 'json',
      sr: sr,
      title: title,
      url: link,
      kind: 'link',
      resubmit: false
    });
}