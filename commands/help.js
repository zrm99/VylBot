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
		var categories = config.commandCategories;
		var files = fs.readdirSync('./commands');

		var embed = new discord.RichEmbed()
			.setTitle("Commands")
			.setColor(colourInfo)
			.setDescription("");

		for (let i = 0; i < categories.length; i++) {
			var categoryText = "";
			var categoryName = categories[i].charAt(0).toUpperCase() + categories[i].substring(1);

			for (let j = 0; j < files.length; j++) {
				var file = require(`./${files[j]}`);

				if (file.category == categories[i]) {
					categoryText += `\`${file.name}\`, `;
				}
			}

			embed.addField(categoryName, categoryText);
		}
		
		message.channel.send(embed);
	}
}