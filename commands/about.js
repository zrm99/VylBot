const config = require('../config.json');
const functions = require('../functions.js');

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

exports.run = function(message, prefix, args) {
	var commands = "";
	
	commands += "Version: " + config.info.version + "\n";
	commands += "Author: " + config.info.author + "\n";
	commands += "Date: " + config.info.date + "\n";
	
	functions.embed(message.channel, "About", colourInfo, commands);
}