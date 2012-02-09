var net = require("net");

function Connection(emitter, server, port) {
  this.emitter = emitter;
  this.server = server;
  this.port = port;
  this.create();
}
Connection.prototype = {
  attempts: 1,
  server: null,
  port: null,
  alive: false,
  create: function() {
    console.log("creating bot connection");
    var self = this;
    this.connection = net.createConnection(this.port, this.server);
    this.connection.on("connect", function(){ self.connect() });
    this.connection.on("data", function(data){ self.emitter.emit("Connection.data", data); });
    this.connection.on("end", function(){ self.end() });
    this.connection.on("timeout", function(){ self.timeout() });
    this.connection.on("error", function(ev){ self.error(ev) });
    this.connection.on("close", function(ev){ self.close(ev) });
  },
  connect: function() {
    console.log("connect");
    this.attempts = 1;
    this.alive = true;
  },
  timeout: function() {
    // TODO make this call close (maybe?)
    console.log("timeout");
    console.log(ev);
  },
  error: function(ev) {
    console.log("error");
    console.log(ev);
  },
  close: function(ev) {
    console.log("close");
    this.alive = false;

    var seconds = 5000 * (this.attempts+.9);
    this.attempts = this.attempts + 1;
    console.log("close calling reconnect in "+ (seconds/1000) +" attempts "+ this.attempts);

    var self = this;
    setTimeout(function(){ 
      self.create(); 
    }, seconds);
  },
  end: function() {
    console.log("end");
    this.alive = false;
  }
};

module.exports = Connection;

