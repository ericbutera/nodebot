var Common = require("../common")
  , http = require("http");


var say = {
  process: function(message) {
    var msg = message.message;
    if ('.say' != msg.slice(0, 4)) {
      return;
    }

    var response = msg.slice(5, msg.length);
    this.bot.privmsg(message.to, response);
  },
  init: function(bot) {
    this.bot = bot;
  }
};

module.exports = say;

