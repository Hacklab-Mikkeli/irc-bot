var conf = require('./config');
var Bot = require('./bot/bot.js');

var bot = new Bot(conf.server, conf.nick, conf.channel);

bot.message('hello', function(from, to, message){
  console.log('Hello function called!');
  bot.say('Hello world!');
});

bot.start();