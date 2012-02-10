var Common = require("../common");

function CommandPrivateMessage(bot) {
  this.bot = bot;
}
CommandPrivateMessage.prototype = {
  execute: function(to, message) {
    message = message.replace(/(\r\n|\n|\r)/gm,""); // try and prevent people from being able to tamper
    var command = "PRIVMSG "+ to +" :"+ message;
    Common.emitter.emit("Connection.write", command);
  }
};
module.exports = CommandPrivateMessage;

