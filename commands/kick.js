const config = require('../config.json');
const functions = require('../functions.js');
const discord = require(`discord.js`)

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
				var embed = new discord.RichEmbed()
						.setTitle(`You have been kicked from: ${name}`)
						.setColor(colourWarn)
						.setDescription(`For the reason: ${reason}`);
				member.send(embed).then(()=>{
	            	member.kick(reason).then(() => {
	                functions.embed(message.channel, "", colourInfo, user.tag + " has been kicked");
	                functions.embed(message.guild.channels.find(channel => channel.name == config.channels.logging), "Member Kicked", colourInfo, "Member: " + user.tag + "\n Reason: " + reason + "\n Moderator: " + message.author.tag);
	            }).catch(err => {
					functions.embed(message.channel, "", colourWarn, "There was an error kicking this user, maybe I'm missing permissions?");
					console.log(err);
				});
			}).catch(() => {
				functions.embed(message.guild.channels.find(channel => channel.name == config.channels.logging), "Error(While DMing user)", colourWarn,"An error occurred while DMing a user.\nIs the user in this Server?")
			});
			}else{

			}
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