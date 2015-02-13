var conf = require('./config');
var irc = require('irc');

var bot = new irc.Client(conf.server, conf.nick, {
  channels: conf.channels,
});

bot.addListener('message', function (from, to, message) {
  switch(message) {
    case 'hello':
      bot.say(conf.channels[0], 'Hello world!');
      break;
    default:
      console.log('function '+message+' not found.');
  }
});

bot.addListener('error', function(message) {
  console.log('error: ', message);
});