var Common = require("./common");

function PrivateMessage(to, message, origin, isAction) {
  this.to = to;
  this.message = message;
  this.origin = origin;
  this.isAction = isAction;
}
PrivateMessage.prototype = {
  to: null,
  message: null,
  origin: null,
  isAction: false,
};
module.exports.Message = PrivateMessage;

var Parser = {
  ORIGIN_MSG: 'msg',
  ORIGIN_CHANNEL: 'channel',
  ORIGIN_CTCP: 'ctcp',
  parse: function(message) {
    var raw = message.message;

    /*
    for (var x=0; x < raw.length; ++x) {
      console.log("x "+ x +" chr: "+ raw.slice(x, x+1) +" code: "+ raw.charCodeAt(x));
    }
    return;
    */

    var toEndOffset = raw.indexOf(" ", 8);
    var to = raw.slice(8, toEndOffset);

    // PRIVMSG + 1space + recipient + (1space + 1colon)
    var messageOffset = toEndOffset + 1 + 1;
    var privmsg = raw.slice(messageOffset, raw.length);

    // PRIVMSG #moo :\u0001ACTION moo\u0001
    var actionChar = String.fromCharCode(1);
    var isAction = (actionChar+"ACTION" == privmsg.slice(0, 7)) ? true : false;
    
    var firstChr = to.slice(0, 1);
    if ("#" == firstChr) {
      var origin = this.ORIGIN_CHANNEL;
    } else if (true != isAction && actionChar == firstChr) { 
      var origin = this.ORIGIN_CTCP;
      privmsg = raw.slice(1, (raw.length-1));
    } else {
      var origin = this.ORIGIN_MSG;
    }
    
    if (isAction) {
      privmsg = privmsg.slice(8, (privmsg.length-1));
    }

    return new PrivateMessage(to, privmsg, origin, isAction);
  }
};
module.exports.Parser = Parser;

