const config = require('../config.json');
const functions = require('../functions.js');
const discord = require('discord.js');

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

module.exports = {
	name: 'ban',
	description: 'Bans the mentioned user and DMs them with an optional reason',
	category: 'moderation',
	usage: '<user> [reason]',
	roles: 'Moderator',
	run: function(message, prefix, args) {
		if (message.member.roles.find(role => role.name == config.roles.moderator)) {
			var user = message.mentions.users.first();
			var serverName = message.guild.name;
			if (user) {
				var member = message.guild.member(user);
		
				if (member) {
					var argsReason = args;
					argsReason.splice(0, 2);
		
					var reason = argsReason.join(" ");
					if(message.guild.available){
						var embed = new discord.RichEmbed()
								.setTitle(`You were banned from: ${serverName}`)
								.setColor(colourWarn)
								.setDescription(`For the reason: ${reason}`);
						member.send(embed).then(()=>{
							member.ban().then(() => {
								functions.embed(message.channel, "", colourInfo, user.tag + " has been banned");
								
								let embed = new discord.RichEmbed()
									.setTitle("Member Banned")
									.setColor(colourInfo)
									.addField("User", `${user} \`${user.tag}\``)
									.addField("Moderator", `${message.author} \`${message.author.tag}\``)
									.addField("Reason", reason || "*none*")
									.setThumbnail(user.displayAvatarURL);
									
								message.guild.channels.find(channel => channel.name == config.channels.logging).send(embed);
							}).catch(() => {
								functions.embed(message.channel, "", colourWarn, "There was an error banning this user, maybe I'm missing permissions?");
							});
						}).catch(() => {
							member.ban().then(() => {
								functions.embed(message.channel, "", colourInfo, user.tag + " has been banned");

								let embed = new discord.RichEmbed()
									.setTitle("Member Banned")
									.setColor(colourInfo)
									.addField("User", `${user} \`${user.tag}\``)
									.addField("Moderator", `${message.author} \`${message.author.tag}\``)
									.addField("Reason", reason || "*none*")
									.setThumbnail(user.displayAvatarURL);
									
								message.guild.channels.find(channel => channel.name == config.channels.logging).send(embed);
							}).catch(() => {
								functions.embed(message.channel, "", colourWarn, "There was an error banning this user, maybe I'm missing permissions?");
							});
						});
					}else{
					functions.embed(message.channel, "Err", colourWarn, "An unkown error occurerd")
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
	
}