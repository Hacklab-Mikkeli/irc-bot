var conf = require('./config');
var Bot = require('./bot/bot.js');
var webhook = require('./modules/mailchimp/webhookListener.js');
var reddit = require('./modules/reddit/reddit.js');
var http = require('http');
var URI = require('URIjs');

var bot = new Bot(conf.server, conf.nick, conf.channel);

webhook.on('subscribe', function (data, meta) {
  bot.say('New subscriber joined to the mailing list!');
});

bot.onEachMessage(function(from, to, text, raw){
	 var link = URI.withinString(text, function(url) {
		if(url){
			reddit.submitLink('hacklabmikkeli', url, url);
		}
		return false;
	});
	
});

bot.message('hello', function(from, to, text, raw){
  bot.say('Hello world!');
});

bot.pm('hello', function (from, text, raw) { 
  bot.sendPm(from, 'Private hello');
});

http.createServer(function (req, res) {
	if(req.method == 'POST'){
		var body = '';
		req.on('data', function(data) {
			body += data;
			if (body.length > 1e6) // If body gets too large, kill the request.
			req.connection.destroy(); // (In case someone is doing naughty things like sending endless post requests)
		});
		req.on('end', function (){
		  bot.say('Hacklab door opened!');
		  res.writeHead(200, { 'Content-Type': 'text/plain' });
		  res.end('ok');
		});
	}
}).listen(9051);

bot.start();