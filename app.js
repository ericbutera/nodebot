var EventEmitter = require("events").EventEmitter
  , Connection = require("./connection")
  , MessageParser = require("./messageparser")
  , Command = require("./command")
;


function Bot() {
  var self = this;
  this.emitter = new EventEmitter;
  this.messageParser = new MessageParser(this.emitter);
  this.command = new Command(this.emitter);

  this.emitter.on("Connection.data", function(data){ self.messageParser.add(data); });
  this.emitter.on("MessageParser.parse", function(message){ self.command.factory(message); });
}
Bot.prototype = {
  connection: null,
  run: function() {
    this.connection = new Connection(this.emitter, 'localhost', 6668);
  }
};



var b = new Bot;
b.run();


