const config = require('../config.json');
const functions = require('../functions.js');
const fs = require('fs');
const discord = require('discord.js');

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

module.exports = {
	name: 'help',
	description: 'Gives a list of commands available in the bot',
	category: 'general',
	usage: '[command]',
	roles: 'everyone',
	run: function(message, prefix, args) {
		if (args.length == 1) {
			var categories = config.commands.categories;
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
		} else if (args.length >= 2) {
			fs.stat(`./commands/${args[1]}.js`, function(err, stat) {
				if (err == null) {
					var commandFile = require(`./${args[1]}.js`);

					var cmdName = commandFile['name'];
					var cmdDesc = commandFile['description'];
					var cmdCategory = commandFile['category'];
					var cmdUsage = commandFile['usage'];
					var cmdRoles = commandFile['roles'];

					cmdName = cmdName.charAt(0).toUpperCase() + cmdName.slice(1);
					cmdCategory = cmdCategory.charAt(0).toUpperCase() + cmdCategory.slice(1);
					cmdRoles = cmdRoles.charAt(0).toUpperCase() + cmdRoles.slice(1);

					functions.embed(message.channel, cmdName, colourInfo, `Description: ${cmdDesc}\nCategory: ${cmdCategory}\nUsage: ${cmdUsage}\nRoles: ${cmdRoles}`);
				} else if (err.code === 'ENOENT') {
					functions.embed(message.channel, "", colourWarn, "Specified command does not exist");
				} else {
					console.log(err);

					functions.embed(message.channel, "", colourWarn, "An unexpected error has occured. Please contact the bot owner");
				}
			});
		}
	}
}