const config = require('../config.json');
const functions = require('../functions.js');

var colourInfo = config.messageColours.info
var colourWarn = config.messageColours.warn;

exports.run = function(message, prefix, args) {
	if(config.disabledCommands.includes('about')){
		message.delete();
		if(config.commands.sendMessageIfOff == true){
			functions.embed(message.channel, "Whoops", colourInfo,"It seems that this Command is disabled!\n If you belive that this is an error,\n contact the bot Owner!");
		}
	}else{
	var roles = config.assignableRoles;
	var requestedRole = "";
	
	for (let i = 0; i < roles.length; i++) {
		if (roles[i].toLowerCase() == args[1].toLowerCase()) {
			requestedRole = roles[i];
		}
	}
	
	if (requestedRole != "") {
		var role = message.guild.roles.find(r => r.name == requestedRole);
		
		if (message.member.roles.find(r => r.name == requestedRole)) {
			message.member.removeRole(role).then(() => {
				functions.embed(message.channel, "", colourInfo, `Removed role: ${requestedRole}`);
			}).catch(err => {
				console.log(err);
				functions.embed(message.channel, "", colourWarn, "An error occured. Please contact the bot owner");
			});
		} else {
			message.member.addRole(role).then(() => {
				functions.embed(message.channel, "", colourInfo, `Gave role: ${requestedRole}`);
			}).catch(err => {
				console.log(err);
				functions.embed(message.channel, "", colourWarn, "An error occured. Please contact the bot owner");
			});
		}
	} else {
		functions.embed(message.channel, "", colourInfo, "This role does not exist, see assignable roles with the roles command");
	}
}}
