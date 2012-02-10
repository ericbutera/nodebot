var Common = require("../common")
  , CommandNick = require("./nick");
;

function CommandRegister(bot) {
  this.bot = bot;
}
CommandRegister.prototype = {
  execute: function() {
    if (!this.bot.isRegistered) {
      var config = this.bot.config;
      console.log("registering bot!");

      var nick = new CommandNick(this.bot);
      nick.execute();

      var command = "USER "+ config.nick +" 8 "+ config.host +" "+ config.realname;
      Common.emitter.emit("Connection.write", command);

      this.bot.isRegistered = true;
    }
  }
};
module.exports = CommandRegister;

