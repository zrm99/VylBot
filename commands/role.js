const config = require('../config.json');
const functions = require('../functions.js');

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;module.exports = {
	run: function(message, prefix, args) { run(message, prefix, args); }
}

function run(message, prefix, args) {
	if (args[1] == config.assignableRoles.notify) {
	    var role = message.guild.roles.find(role => role.name == config.assignableRoles.notify);
	
	    if (message.member.roles.find(role => role.name == config.assignableRoles.notify)) {
	        message.member.removeRole(role).then(() => {
	            functions.embed(message.channel, "", colourInfo, "Removed the notify role");
	        }).catch(err => {
	            console.log(err);
	        });
	    } else {
	        message.member.addRole(role).then(() => {
	            functions.embed(message.channel, "", colourInfo, "Given the notify role"); 
	        }).catch(err => {
	            console.log(err);
	        });
	    }
	} else if (args[1] == config.assignableRoles.poll) {
	    var role = message.guild.roles.find(role => role.name == config.assignableRoles.poll);
	
	    if (message.member.roles.find(role => role.name == config.assignableRoles.poll)) {
	        message.member.removeRole(role).then(() => {
	            functions.embed(message.channel, "", colourInfo, "Removed the vote pings role");
	        }).catch(err => {
	            console.log(err);
	        });
	    } else {
	        message.member.addRole(role).then(() => {
	            functions.embed(message.channel, "", colourInfo, "Given the vote pings role"); 
	        }).catch(err => {
	            console.log(err);
	        });
	    }
	} else {
	    functions.embed(message.channel, "", colourWarn, "This role doesn't exist, you can view assignable roles with " + prefix + "roles");
	}
}