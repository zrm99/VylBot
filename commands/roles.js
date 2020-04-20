const config = require('../config.json');
const functions = require('../functions.js');

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

exports.run = function(message, prefix, args) {
	if(config.disabledCommands.includes('about')){
		message.delete();
		if(config.commands.sendMessageIfOff == true){
			functions.embed(message.channel, "Whoops", colourInfo,"It seems that this Command is disabled!\n If you belive that this is an error,\n contact the bot Owner!");
		}
	}else{
	var roles = "";
	
	for (let i = 0; i < config.assignableRoles.length; i++) {
		roles += `${config.assignableRoles[i]}\n`;
	}
	
	functions.embed(message.channel, "Roles", colourInfo, roles);
}}
