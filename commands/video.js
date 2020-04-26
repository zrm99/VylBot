const discord = require('discord.js');
const config = require('../config.json');
const functions = require('../functions.js');

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

exports.run = function(message, prefix, args) {
    if (message.member.roles.find(role => role.name == config.roles.moderator)) {
        var announcementParts = args;
        announcementParts.splice(0, 1);
        announcementParts = announcementParts.join(" ");
        announcementParts = announcementParts.split(";");

        var embed = new discord.RichEmbed()
            .setTitle(announcementParts[0])
            .setColor(colourInfo)
            .setDescription(announcementParts[1])
            .setURL(announcementParts[2])
            .setThumbnail(announcementParts[3]);
		
        message.channel.send(embed);

        message.delete();
    } else {
        functions.embed(message.channel, "", colourWarn, "You do not have permission to run this command");
    }
}