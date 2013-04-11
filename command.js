var Common = require("./common")
  , CommandRegister = require("./command/register")
  , CommandJoinChannel = require("./command/joinchannel")
  , CommandPong = require("./command/pong")
  , CommandPrivateMessage = require("./command/privatemessage")
  , PrivateMessage = require("./privatemessage")
;

function Command(bot) {
  this.bot = bot;
  this.privmsgParser = PrivateMessage.Parser;
}
Command.prototype = {
  bot: null,
  privmsgParser: null,
  factory: function(message) {
    var three = message.message.substr(0,3);
    if ("372" != three) {
      Common.logger.log("command.factory:");
      console.log(message);
    }

    var msg = message.message;
    if ("PRIVMSG" == msg.substr(0,7)) {
      var privMsg = this.privmsgParser.parse(message);
      console.log(privMsg);
      Common.emitter.emit("Command.privmsg", privMsg);
    } else if ("PING" == msg.substr(0,4)) {
      var c = new CommandPong(this.bot);
      c.execute();
    } else if ("004" == three) {
      var c = new CommandJoinChannel();
      c.execute(this.bot.config.channels);
    } else if ("001" == three) {
      this.bot.serverName = message.source
    } else if ("NOTICE" == msg.substr(0,6)) {
      console.log("got NOTICE");
      var register = new CommandRegister(this.bot);
      register.execute();
    } else if ("433" == three) {
      console.log("got 433"); // handleNickInUse
    } else if ("ERROR" == msg.substr(0,5)) {
      Common.emitter.emit("Command.disconnect", message);
    }
  }
};

module.exports = Command;

