var EventEmitter = require("events").EventEmitter
  , _ = require("underscore")
;

module.exports = {
  emitter: new EventEmitter(),
  logger: {
    log: function(m) { 
      var date = new Date();
      console.log("["+ date.getFullYear() +"-"+ date.getMonth()+1 +"-"+ date.getDay() +"] "+ m);
    }
  },
  '_': _
};

