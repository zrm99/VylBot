const config = require('../config.json');
const functions = require('../functions.js');

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

module.exports = {
	name: 'rules',
	description: 'Server rules management',
	category: 'owner',
	usage: '<file|channel>\n- file: Generates sample rules text file\n- channel: Posts rules.txt to the rules channel',
	roles: 'vylpes',
	run: function(message, prefix, args) {
		if (args.length == 1) {
			functions.embed(message.channel, "Rules", colourInfo, "Options: file, channel");
		} else {
			if (args[1] == "file") {
				// TODO: Generate sample text file here
			} else if (args[1] == "channel") {
				// TODO: Read text file (if exists) and post to rules channel here
			} else {
				functions.embed(message.channel, "Incorrect usage", colourWarn, "The parameters should have been either `file` or `channel`");
			}
		}
	}
}