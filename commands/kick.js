const config = require('../config.json');
const functions = require('../functions.js');

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

exports.run = function(message, prefix, args) {
	if (message.member.roles.find(role => role.name == config.roles.moderator)) {
	    var user = message.mentions.users.first();
	
	    if (user) {
	        var member = message.guild.member(user);
	
	        if (member) {
	            var argsReason = args;
	            argsReason.splice(0, 2);
	            
	            var reason = argsReason.join(" ");
	
	            member.kick(reason).then(() => {
			user.sendMessage(user,"You have been kicked from **" + guild.name + "** for the reason:" + reason);
	                functions.embed(message.channel, "", colourInfo, user.tag + " has been kicked");
	                functions.embed(message.guild.channels.find(channel => channel.name == config.channels.logging), "Member Kicked", colourInfo, "Member: " + user.tag + "\n Reason: " + reason + "\n Moderator: " + message.author.tag);
	            }).catch(err => {
					functions.embed(message.channel, "", colourWarn, "There was an error kicking this user, maybe I'm missing permissions?");
					console.log(err);
	            });
	        } else {
	            functions.embed(message.channel, "", colourWarn, "This user is not in the server");
	        }
	    } else {
	        functions.embed(message.channel, "", colourWarn, "Please specify a user by mentioning them");
	    }
	} else {
	    functions.embed(message.channel, "", colourWarn, "You do not have permission to run this command");
	}
	
	message.delete();
}
