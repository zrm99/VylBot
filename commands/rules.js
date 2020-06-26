const config = require('../config.json');
const functions = require('../functions.js');

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

module.exports = {
	name: 'rules',
	description: 'Server rules management',
	category: 'owner',
	usage: '<File|Channel>',
	roles: 'vylpes',
	run: function(message, prefix, args) {
		if (args.length == 1) {
			functions.embed(message.channel, "Rules", colourInfo, "Options: File, Channel");
		}
	}
}