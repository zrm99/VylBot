const config = require('../config.json');
const functions = require('../functions.js');
const discord = require('discord.js');

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

exports.run = function(message, prefix, args) {
	if (message.member.roles.find(role => role.name == config.roles.moderator)) {
		var user = message.mentions.users.first();
		var name = message.guild.name;
	
	    if (user) {
	        var member = message.guild.member(user);
	
	        if (member) {
	            var argsReason = args;
	            argsReason.splice(0, 2);
	
	            var reason = argsReason.join(" ");
				if(message.guild.available){
	            var mutedRole = message.guild.roles.find(role => role.name == config.roles.muted);
				var embed = new discord.RichEmbed()
						.setTitle(`You were muted from: ${name}`)
						.setColor(colourWarn)
						.setDescription(`For the reason: ${reason}`)
	            member.addRole(mutedRole).then(() => {
					member.send(embed).then(()=>{
	                functions.embed(message.channel, "", colourInfo, user.tag + " has been muted");
	                functions.embed(message.guild.channels.find(channel => channel.name == config.channels.logging), "Member Muted", colourInfo, "Member: " + user.tag + "\n Reason: " + reason + "\n Moderator: " + message.author.tag)
				}).catch(() => {
					functions.embed(message.guild.channels.find(channel => channel.name == config.channels.logging), "Error(While DMing user)", colourWarn, "An error occurred while DMing a user.\n Is the user in this Server?")
				});
				}).catch(err => {
					functions.embed(message.channel, "", colourWarn, "There was an error muting this user, maybe I'm missing permissions?");
					console.log(err);
				});
			}else{
				functions.embed(message.channel, "Err", colourWarn, "An unkown error occured")
			}
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