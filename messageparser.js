var _ = require("underscore")
  , Message = require("./message");

function MessageParser(emitter) {
  this.emitter = emitter;
}
MessageParser.prototype = {
  buffer: '',
  add: function(data) {
    console.log("data byte length: "+ data.length);
    this.buffer += data.toString('utf8');
    this.parse();
  },
  parse: function() {
    if (!this.buffer.length) {
      return;
    }

    var offset = this.buffer.lastIndexOf("\r\n")
      , full = offset + 2;

    if (offset > 0) {
      var self = this;
      var tmp = this.buffer.slice(0, offset);
      if (full == this.buffer.length) {
        this.buffer = '';
      } else {
        this.buffer = this.buffer.slice(full, this.buffer.length);
      }

      var lines = tmp.split("\r\n");
      _.each(lines, function(raw){
        var message = new Message(raw);
        self.emitter.emit("MessageParser.parse", message);
      });

      this.parse();
    }
  }
};
module.exports = MessageParser;

