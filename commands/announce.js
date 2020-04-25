const config = require('../config.json');
const functions = require('../functions.js');

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

exports.run = function(message, prefix, args) {
    var announcementText = args;
    announcementText.splice(0, 1);
    announcementText = announcementText.join(" ");
    
    functions.embed(message.guild.channels.find(channel => channel.name == config.channels.announcements), "Announcement", colourInfo, announcementText);
    message.delete();
}