const config = require('../config.json');
const functions = require('../functions.js');

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

module.exports = {
	run: function(message, prefix, args) { run(message, prefix, args); }
}

function run(message, prefix, args) {
	if (message.member.roles.find(role => role.name == config.roles.moderator)) {
	    var user = message.mentions.users.first();
	
	    if (user) {
	        var member = message.guild.member(user);
	
	        if (member) {
	            var argsReason = args;
	            argsReason.splice(0, 2);
	
	            var reason = argsReason.join(" ");
	
	            var mutedRole = message.guild.roles.find(role => role.name == config.roles.muted);
	            
	            member.addRole(mutedRole).then(() => {
	                functions.embed(message.channel, "", colourInfo, user.tag + " has been muted");
	                functions.embed(message.guild.channels.find(channel => channel.name == config.channels.logging), "Member Muted", colourInfo, "Member: " + user.tag + "\n Reason: " + reason + "\n Moderator: " + message.author.tag)
	            }).catch(err => {
	                console.log(err);
	            });
	        } else {
	            functions.embed(message.channel, "", colourWarn, "This user is not in the server");
	        }
	    } else {
	        functions.embed(message.channel, "", colourWarn, "Please specify a user by mentioning them");
	    }
	} else {
	    functions.embed(message.channel, "", colourWarn, "You do not have permssion to run this command");
	}
	
	message.delete();
}