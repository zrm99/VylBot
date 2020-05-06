const config = require('../config.json');
const functions = require('../functions.js');
const fs = require('fs');

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

module.exports = {
	name: 'help',
	description: 'Gives a lost of commands available in the bot',
	category: 'general',
	usage: '',
	roles: 'everyone'
}

exports.run = function(message, prefix, args) {
	var commands = "";
	
	commands += prefix + "about\n";
	commands += prefix + "announce <title>;[description];[url];[thumbnail]\n";
	commands += prefix + "ban <user> [reason]\n";
	commands += prefix + "help\n";
	commands += prefix + "kick <user> [reason]\n";
	commands += prefix + "mute <user> [reason]\n";
	commands += prefix + "poll <title>;<option 1>;<option 2>...\n";
	commands += prefix + "role <name>\n";
	commands += prefix + "roles\n";
	commands += prefix + "unmute <user>\n";

	var files = fs.readdirSync('./commands');

	for(let i = 0; i < files.length; i++) {
		
	}

	var file = require(`./${files[0]}`);
	console.log(file.name);
	
	functions.embed(message.channel, "Commands", colourInfo, commands);
}