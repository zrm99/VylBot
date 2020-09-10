const config = require('../config.json');
const functions = require('../functions.js');

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

module.exports = {
	name: 'roles',
	description: 'Lists all the roles available to get',
	category: 'general',
	usage: '',
	roles: 'everyone',
	cost: functions.commandCost("roles"),
	run: function(message, prefix, args) {
		var roles = "";
		
		for (let i = 0; i < config.assignableRoles.length; i++) {
			roles += `${config.assignableRoles[i]}\n`;
		}
		
		functions.embed(message.channel, "Roles", colourInfo, roles);
	}
}