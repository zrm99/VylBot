const config = require('../config.json');
const functions = require('../functions.js');
const discord = require('discord.js');

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;
var colourMod = config.messageColours.mod;

module.exports = {
	name: 'ban',
	description: 'Bans the mentioned user and DMs them with an optional reason',
	category: 'moderation',
	usage: '<user> [reason]',
	roles: 'Moderator',
	run: function (message, prefix, args) {
		if (message.member.roles.find(role => role.name == config.roles.moderator)) {
			let user = message.mentions.users.first();
			let serverName = message.guild.name;

			if (user) {
				let member = message.guild.member(user);

				if (member) {
					let reason = args;
					reason.splice(0, 2);
					reason.join(" ");

					if (message.guild.available) {
						if (member.bannable) {
							let embedLog = new discord.RichEmbed()
								.setTitle("Member Banned")
								.setColor(colourMod)
								.addField("User", `${user} \`${user.tag}\``)
								.addField("Moderator", `${message.author} \`${message.author.tag}\``)
								.addField("Reason", reason || "*none*")
								.setThumbnail(user.displayAvatarURL);

							let embedPublic = new discord.RichEmbed()
								.setColor(colourInfo)
								.setDescription(`${user.tag} has been banned`);

							member.ban(reason).then(() => {
								message.guild.channels.find(channel => channel.name == config.channels.logging).send(embedLog);
								message.channel.send(embedPublic);
							}).catch(() => {
								let embedError = new discord.RichEmbed()
									.setColor(colourWarn)
									.setDescription("An error has occured");

								message.channel.send(embedError);
							});
						} else {
							let embedError = new discord.RichEmbed()
								.setColor(colourWarn)
								.setDescription("I am unable to ban this user. Am I missing permissions?");

							message.channel.send(embedError);
						}
					}
				}
			}
		}
	}

}