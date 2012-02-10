var Netmask = require("./netmask");

function Message(raw) {
  if (':' == raw.charAt(0)) {
    var offset = raw.indexOf(" ");
    this.source = raw.slice(1, offset);
    this.message = raw.slice(offset+1, raw.length);
  } else {
    this.source = 'local-server';
    this.message = raw;
  }

  this.netmask = new Netmask(this.source);
}
Message.prototype = {
  netmask: null,
  source: null,
  message: null
}

module.exports = Message;

