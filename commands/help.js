const config = require('../config.json');
const functions = require('../functions.js');

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

exports.run = function(message, prefix, args) {
	if(config.disabledCommands.includes('help')){
		message.delete();
		if(config.commands.sendMessageIfOff == true){
			functions.embed(message.channel, "Whoops", colourInfo,"It seems that this Command is disabled!\n If you belive that this is an error,\n contact the bot Owner!");
		}
	}else{
	var commands = "";
	
	commands += prefix + "about\n";
	commands += prefix + "ban <user> [reason]\n";
	commands += prefix + "help\n";
	commands += prefix + "kick <user> [reason]\n";
	commands += prefix + "mute <user> [reason]\n";
	commands += prefix + "role <name>\n";
	commands += prefix + "roles\n";
	commands += prefix + "unmute <user>\n";
	
	functions.embed(message.channel, "Commands", colourInfo, commands);
}}
