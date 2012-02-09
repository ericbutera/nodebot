function Netmask(raw) {
  this.netmask = raw;

  var reg = new RegExp(/^([^!@]+)!([^@]+)@(.*)$/);
  var m = reg.exec(raw);
  if (m) {
    this.nick = m[1];
    this.ident = m[2];
    this.host = m[3];
    this.origin = this.USER;
  } else {
    this.origin = this.SERVER;
  }
}
Netmask.prototype = {
  USER: 'user',
  SERVER: 'server',
  nick: null,
  ident: null,
  host: null,
  origin: null
};

module.exports = Netmask;

