const config = require('../config.json');
const functions = require('../functions.js');

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

module.exports = {
	name: 'about',
	description: 'About the bot',
	category: 'general',
	usage: '',
	roles: 'everyone',
	run: function(message, prefix, args) {
		var commands = "";
		
		commands += "Version: " + config.info.version + "\n";
		commands += "Author: " + config.info.author + "\n";
		commands += "Date: " + config.info.date + "\n";
		
		functions.embed(message.channel, "About", colourInfo, commands);
	}
}