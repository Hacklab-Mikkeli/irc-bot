var irc = require('irc');

function Bot(server, nick, channel) {
  this.server = server;
  this.nick = nick;
  this.channel = channel; // TODO: support multiple channels
  this.messageFunctions = {};
  this.pmFunctions = {};
}

Bot.prototype.message = function(msg, callback) {
  this.messageFunctions[msg] = callback;
};

Bot.prototype.message = function(msg, callback) {
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
  this.client = new irc.Client(this.server, this.nick, {
    channels : [ this.channel ],
  });
  this.client.addListener('message#', function (from, to, message) {
    if(_this.messageFunctions.hasOwnProperty(message)){
      _this.messageFunctions[message](from, to, message);
    }
  });
  this.client.addListener('pm', function (from, to, message) {
    if(_this.pmFunctions.hasOwnProperty(message)){
      _this.pmFunctions[message](from, to, message);
    }
  });
  this.client.addListener('error', function(message) {
    console.log('error: ', message);
  });
}

module.exports = Bot;