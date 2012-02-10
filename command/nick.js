var Common = require("../common");

function CommandNick(bot) {
  this.bot = bot;
}
CommandNick.prototype = {
  execute: function(nick) {
    if (!nick) {
      nick = this.bot.config.nick;
    }
    var command = "NICK "+ nick;
    Common.emitter.emit("Connection.write", command);
  }
};
module.exports = CommandNick;

