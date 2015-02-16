var conf = require('./config');
var Bot = require('./bot/bot.js');
var webhook = require('./modules/mailchimp/webhookListener.js');

var bot = new Bot(conf.server, conf.nick, conf.channel);

webhook.on('subscribe', function (data, meta) {
  bot.say('New subscriber joined to the mailing list!');
});

bot.message('hello', function(from, to, text, raw){
  bot.say('Hello world!');
});

bot.pm('hello', function (from, text, raw) { 
  bot.sendPm(from, 'Private hello');
});

bot.start();