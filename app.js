var Common = require("./common")
  , _ = require("underscore")
  , Connection = require("./connection")
  , MessageParser = require("./messageparser")
  , Command = require("./command")
  , path = require("path")
  , fs = require("fs")
  , CommandPrivateMessage = require("./command/privatemessage")
  // , pluginWeather = require("./plugin/weather")
;

var logger = {
  log: function(message) {
    console.log(message);
  }
};

function Bot() {
  var self = this;
  this.messageParser = new MessageParser();
  this.command = new Command(this);

  Common.emitter.on("Connection.write", function(message){ self.connection.write(message); });
  Common.emitter.on("Connection.data", function(data){ self.messageParser.add(data); });
  Common.emitter.on("MessageParser.parse", function(message){ self.command.factory(message); });
  Common.emitter.on("Command.disconnect", function(message){ self.connection.close(); });
  Common.emitter.on("Command.privmsg", function(message){ self.runPlugins(message); });
}
Bot.prototype = {
  config: {
    nick: 'moo',
    host: 'localhost',
    realname: 'Butters Scotch',
    channels: ['#moo']
  },
  plugins: {},
  serverName: null,
  isRegistered: false,
  connection: null,
  run: function() {
    this.registerPlugins();
    this.connection = new Connection('localhost', 6668);
    this._privmsg = new CommandPrivateMessage(this);

    var self = this;
    this.updateConsole();
    setInterval(function(){ self.updateConsole() }, 30000);
  },
  privmsg: function(to, message) {
    // convenience method for being lazy
    this._privmsg.execute(to, message);
  },
  updateConsole: function() {
    logger.log("in("+ this.connection.getBytesRead() +") out("+ this.connection.getBytesWritten() +") ");
  },
  registerPlugins: function() {
    var self = this
      , pluginPath = __dirname +"/plugin";

    fs.readdir(pluginPath, function (er, files){
      files.forEach(function (file){
        if (!file.match(/\.js$/)) { return; }
        var name = file.replace(/\.js$/, '')
          , current = path.join(pluginPath, name);

        Common.logger.log("Registering plugin "+ name +" path: "+ current);
        var plugin = require(current);
        plugin.init(self);
        self.plugins[file] = plugin;
      });
    });
  },
  runPlugins: function(message) {
    _(this.plugins).each(function(plugin, name){
      plugin.process(message);
    });
  }
};

var b = new Bot;
b.run();

