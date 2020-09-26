// Required Constants
const config = require('../config.json');
const functions = require('../functions.js');
const discord = require('discord.js');

// Embed Colours
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
		// If user has the moderator role
		if (message.member.roles.find(role => role.name == config.roles.moderator)) {
			// Gets the first user pinged in the message
			let user = message.mentions.users.first();
			let serverName = message.guild.name;

			// If a user was pinged
			if (user) {
				let member = message.guild.member(user);

				// If the user pinged is in the server
				if (member) {
					// Get the reason from the params
					let reason = args;
					reason.splice(0, 2);
					reason.join(" ");

					// If the server is available, i.e. not offline
					if (message.guild.available) {
						// If the bot is able to ban the user
						if (member.bannable) {
							// The embed going into the mod log
							let embedLog = new discord.RichEmbed()
								.setTitle("Member Banned")
								.setColor(colourMod)
								.addField("User", `${user} \`${user.tag}\``)
								.addField("Moderator", `${message.author} \`${message.author.tag}\``)
								.addField("Reason", reason || "*none*")
								.setThumbnail(user.displayAvatarURL);

							// The embed going into the public channel where the command was sent
							let embedPublic = new discord.RichEmbed()
								.setColor(colourInfo)
								.setDescription(`${user.tag} has been banned`);

							// Attempt to ban the user, then send the embeds, or error out if something went wrong
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