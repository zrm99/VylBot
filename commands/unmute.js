const config = require('../config.json');
const functions = require('../functions.js');
const discord = require('discord.js');

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;
var colourMod = config.messageColours.mod;

module.exports = {
	name: 'unmute',
	description: 'Unmutes the mentioned user and DMs them',
	category: 'moderation',
	usage: '<user>',
	roles: 'Moderator',
	run: function(message, prefix, args) {
		if (message.member.roles.find(role => role.name == config.roles.moderator)) {
			var user = message.mentions.users.first();
		
			if (user) {
				var member = message.guild.member(user);
		
				if (member) {
					var mutedRole = message.guild.roles.find(role => role.name == config.roles.muted);
					
					member.removeRole(mutedRole).then(() => {
						functions.embed(message.channel, "", colourInfo, user.tag + " has been unmuted");
						
						let embed = new discord.RichEmbed()
							.setTitle("Member Unmuted")
							.setColor(colourMod)
							.addField("User", `${user} \`${user.tag}\``)
							.addField("Moderator", `${message.author} \`${message.author.tag}\``)
							.setThumbnail(user.displayAvatarURL);
									
						message.guild.channels.find(channel => channel.name == config.channels.logging).send(embed);
					}).catch(err => {
						functions.embed(message.channel, "", colourWarn, "There was an error unmuting this user, maybe I'm missing permissions?");
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
}