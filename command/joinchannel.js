var Common = require("../common");

function CommandJoinChannel(bot) {
  this.bot = bot;
}
CommandJoinChannel.prototype = {
  execute: function(channels) {
    if (!channels.length) {
      return;
    }
    var command = "JOIN "+ channels.join(" ");
    Common.emitter.emit("Connection.write", command);
  }
};
module.exports = CommandJoinChannel;

