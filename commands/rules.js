const config = require('../config.json');
const functions = require('../functions.js');
const discord = require('discord.js');
const fs = require('fs');

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

module.exports = {
	name: 'rules',
	description: 'Generates the rules embeds from the rules.txt file',
	category: 'owner',
	usage: '',
	roles: 'vylpes',
	run: function(message, prefix, args) {
		if (message.member.roles.find(role => role.name == config.roles.owner)) {
			if (fs.existsSync("rules.txt")) {
				var rulesText = fs.readFileSync('rules.txt').toString();
				rulesText = rulesText.split("> ");

				for (let i = 1; i < rulesText.length; i++) {
					if (rulesText[i].charAt(0) == '#') {
						var embed = new discord.RichEmbed()
						.setColor(colourInfo)
						.setImage(rulesText[i].substring(1));
						
						message.guild.channels.find(channel => channel.name == config.channels.rules).send(embed);
					} else {
						let rulesLines = rulesText[i].split("\n");
						let rulesTitle = rulesLines[0];
						let rulesDescription = rulesLines.slice(1).join("\n");

						functions.embed(message.guild.channels.find(channel => channel.name == config.channels.rules), rulesTitle, colourInfo, rulesDescription);
					}
				}
			} else {
				functions.embed(message.channel, "Error", colourWarn, "rules.txt doesn't exist");
			}
		} else {
			functions.embed(message.channel, "", colourWarn, "You do not have permission to run this command");
		}
	}
}