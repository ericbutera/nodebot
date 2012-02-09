function Command() {}

Command.prototype = {
  factory: function(message) {
    console.log("command.factory");
    console.log(message);
  }
};

module.exports = Command;

