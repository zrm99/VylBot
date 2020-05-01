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
            .setColor(colourInfo)
        
        if (announcementParts[0]) embed.setTitle(announcementParts[0]);
        if (announcementParts[1]) embed.setDescription(announcementParts[1]);
        if (announcementParts[2]) embed.setURL(announcementParts[2]);
        if (announcementParts[3]) embed.setThumbnail(announcementParts[3]);
        
        message.channel.send(embed).catch(() => {
            functions.embed(message.channel, "", colourWarn, "An error occured. Are the url and/or thumbnail parameters actual links?");
        });

        message.delete();
    } else {
        functions.embed(message.channel, "", colourWarn, "You do not have permission to run this command");
    }
}