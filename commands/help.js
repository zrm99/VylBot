const config = require('../config.json');
const functions = require('../functions.js');
const fs = require('fs');
const discord = require('discord.js');

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

module.exports = {
	name: 'help',
	description: 'Gives a lost of commands available in the bot',
	category: 'general',
	usage: '',
	roles: 'everyone',
	run: function(message, prefix, args) {
		var categoryGeneral = "";
		var categoryModeration = "";
		var categoryOther = "";
	
		var files = fs.readdirSync('./commands');
	
		for(let i = 0; i < files.length; i++) {
			var file = require(`./${files[i]}`);

			if (file.category == 'general') {
				categoryGeneral += `\`${file.name}\``;
				if (i < files.length - 1) categoryGeneral += ', ';
			} else if (file.category == 'moderation') {
				categoryModeration += `\`${file.name}\``;
				if (i < files.length - 1) categoryModeration += ', ';
			} else {
				categoryOther += `\`${file.name}\``;
				if (i < files.length - 1) categoryOther += ', ';
			}
		}

		var embed = new discord.RichEmbed()
		.setTitle("Commands")
		.setColor(colourInfo)
		.setDescription("");

		if (categoryGeneral != "") embed.addField("General", categoryGeneral);
		if (categoryModeration != "") embed.addField("Moderation", categoryModeration);
		if (categoryOther != "") embed.addField("Other", categoryOther);
		
		message.channel.send(embed);
	}
}