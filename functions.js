const discord = require('discord.js');

exports.embed = function(channel, title, colour, message) {
	var embed = new discord.RichEmbed()
		.setTitle(title)
		.setColor(colour)
		.setDescription(message);
		
	channel.send(embed);
}