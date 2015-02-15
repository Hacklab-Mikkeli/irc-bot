var irc = require('irc');

function Bot(server, nick, channel) {
  this.server = server;
  this.nick = nick;
  this.channel = channel; // TODO: support multiple channels
  this.messageFunctions = {};
  this.pmFunctions = {};
  this.client = new irc.Client(this.server, this.nick, {
    autoConnect: false
  });
}

Bot.prototype.message = function(msg, callback) {
  this.messageFunctions[msg] = callback;
};

Bot.prototype.pm = function(msg, callback) {
  this.pmFunctions[msg] = callback;
};

Bot.prototype.say = function(message) {
  var channel = this.channel;
  this.client.say(channel, message);
};

Bot.prototype.sendPm = function(target, message){
  this.client.say(target, message);
};

Bot.prototype.start = function() {
  var _this = this;
  this.client.connect(3, function () {
    console.log('Bot connected to '+_this.server);
    _this.client.join(_this.channel, function () {
      console.log('Connected to channel '+_this.channel);
    });
  });
  this.client.addListener('message#', function (from, to, text, rawMessage) {
    if(_this.messageFunctions.hasOwnProperty(text)){
      _this.messageFunctions[text](from, to, text, rawMessage);
    }
  });
  this.client.addListener('pm', function (from, text, rawMessage) {
    if(_this.pmFunctions.hasOwnProperty(text)){
      _this.pmFunctions[text](from, text, rawMessage);
    }
  });
  this.client.addListener('error', function(message) {
    console.log('error: ', message);
  });
}

module.exports = Bot;