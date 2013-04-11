var Common = require("../common")
  , http = require("http");

var weather = {
  error: function(message) {
    this.bot.privmsg(message.to, "Unable to fetch your weather");
  },
  parse: function(message, data) {
    Common.logger.log("parsing weather");
    try {

      var raw = data.toString('utf8');
      var data = JSON.parse(raw);
      var item = data.query.results.channel.item;
      var response = item.title +": "+ item.condition.text +", "+ item.condition.temp +"F. High "+ item.forecast[0].high +"F Low "+ item.forecast[0].low +"F";
      this.bot.privmsg(message.to, response);
    } catch (e) { this.error(message); }
  },
  fetch: function(message, zip) {
    var self = this;

    /* cached version for testing 
    var fs = require("fs");
    var path = __dirname + "/moo.json";
    console.log("path: "+ path);
    fs.readFile(path, 'utf8', function(err, data){
      if (err) throw err;
      self.parse(message, data);
    });
    return;
    */

    var options = {
      host: 'query.yahooapis.com',
      post: 80,
      path: "/v1/public/yql?q=select%20item%20from%20weather.forecast%20where%20location%3D" + encodeURIComponent(zip)  + "&format=json"
    };

    try {
      http.get(options, function(res) {
          res.on("data", function(data){ self.parse(message, data); });
      }).on('error', function(e) {
        self.error(message);
      });
    } catch (e) { self.error(message); }
  },
  process: function(message) {
    var msg = message.message;
    if ('.weather' != msg.slice(0, 8)) {
      return;
    }

    var parts = msg.split(" ");
    try {
      if (parts[1]) {
        var zip = parts[1];
        Common.logger.log("Plugin weather fetching zip "+ zip);
        this.fetch(message, zip);
      }
    } catch (e) {}
  },
  init: function(bot) {
    this.bot = bot;
  }
};

module.exports = weather;

