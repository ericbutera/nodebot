var Common = require("../common")
  , PrivateMessage = require("../privatemessage")
  , assert = require("assert");

var action = String.fromCharCode(1);
var parser = PrivateMessage.Parser;

var message = parser.parse({message: "PRIVMSG #moo :moo!"});
var expected = {
  to: '#moo',
  message: 'moo!',
  origin: parser.ORIGIN_CHANNEL,
  isAction: false
};
assert.deepEqual(message, expected);

var message = parser.parse({message: "PRIVMSG #moo :"+ action +"ACTION moo!"+ action });
var expected = {
  to: '#moo',
  message: 'moo!',
  origin: parser.ORIGIN_CHANNEL,
  isAction: true 
};
assert.deepEqual(message, expected);

