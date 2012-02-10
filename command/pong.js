var Common = require("../common");

function CommandPong(bot) {
  this.bot = bot;
}
CommandPong.prototype = {
  execute: function() {
    var command = "PONG "+ this.bot.serverName;
    Common.emitter.emit("Connection.write", command);
  }
};
module.exports = CommandPong;

