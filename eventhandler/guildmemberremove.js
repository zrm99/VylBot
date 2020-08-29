const config = require('../config.json');
const functions = require("../functions.js")

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

module.exports = {
    run: function(client) {
        client.on('guildMemberRemove', (member) => {
            functions.embed(member.guild.channels.find(channel => channel.name == config.channels.logging), "Member left/kicked/banned", colourInfo, `Member: ${member.user.tag}\nID: ${member.id}`);
        });
    }
}

