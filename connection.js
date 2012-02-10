var Common = require("./common")
  , net = require("net")

function Connection(server, port) {
  this.server = server;
  this.port = port;
  this.create();
}
Connection.prototype = {
  attempts: 1,
  server: null,
  port: null,
  alive: false,
  getBytesRead: function() { return this.connection.bytesRead; },
  getBytesWritten: function() { return this.connection.bytesWritten; },
  create: function() {
    Common.logger.log("creating bot connection");
    var self = this;
    this.connection = net.createConnection(this.port, this.server);
    this.connection.on("connect", function(){ self.connect() });
    this.connection.on("data", function(data){ Common.emitter.emit("Connection.data", data); });
    this.connection.on("end", function(){ self.end() });
    this.connection.on("timeout", function(){ self.timeout() });
    this.connection.on("error", function(ev){ self.error(ev) });
    this.connection.on("close", function(){ self.close() });
  },
  write: function(message) {
    Common.logger.log("Connection.write message: "+ message);
    this.connection.write(message + "\r\n");
  },
  connect: function() {
    Common.logger.log("connect");
    this.attempts = 1;
    this.alive = true;
  },
  timeout: function() {
    // TODO make this call close (maybe?)
    Common.logger.log("timeout");
    Common.logger.log(ev);
  },
  error: function(ev) {
    Common.logger.log("error");
    Common.logger.log(ev);
  },
  close: function() {
    Common.logger.log("close");
    this.alive = false;

    var seconds = 5000 * (this.attempts+.9);
    this.attempts = this.attempts + 1;
    Common.logger.log("close calling reconnect in "+ (seconds/1000) +" attempts "+ this.attempts);

    var self = this;
    setTimeout(function(){ 
      self.create(); 
    }, seconds);
  },
  end: function() {
    Common.logger.log("end");
    this.alive = false;
  }
};

module.exports = Connection;

