const config = require('../config.json');
const functions = require('../functions.js');

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

exports.run = function(message, prefix, args) {
	var roles = "";
	
	roles += config.assignableRoles.notify + "\n";
	roles += config.assignableRoles.poll + "\n";
	
	functions.embed(message.channel, "Roles", colourInfo, roles);
}