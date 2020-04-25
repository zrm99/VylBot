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
        
        functions.embed(message.guild.channels.find(channel => channel.name == config.channels.announcements), announcementParts[0], colourInfo, announcementParts[1]);

        for (let i = 2; i < announcementParts.length; i++) {
            functions.embed(message.guild.channels.find(channel => channel.name == config.channels.announcements), "", colourInfo, announcementParts[i]);
        }

        message.delete();
    } else {
        functions.embed(message.channel, "", colourWarn, "You do not have permission to run this command");
    }
}