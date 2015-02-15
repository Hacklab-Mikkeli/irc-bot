var MailChimpWebhook = require('mailchimp').MailChimpWebhook;
var conf = require('./config.js');

var webhook = new MailChimpWebhook({
  'port': conf.port,
  'secret': conf.secret
});

webhook.on('error', function (error) {
  console.log(error.message);
});

module.exports = webhook;

//TODO: add support for other events