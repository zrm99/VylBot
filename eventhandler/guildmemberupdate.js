const config = require('../config.json');
const functions = require("../functions.js")

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

module.exports = {
    run: function(client) {
        client.on('guildMemberUpdate', (oldMember, newMember) => {
            if (oldMember.nickname != newMember.nickname) {
                let memberName = newMember.user.tag;
                let oldNickname = oldMember.nickname || "*none*";
                let newNickname = newMember.nickname || "*none*";
        
                functions.embed(newMember.guild.channels.find(channel => channel.name == config.channels.logging), "Nickname Changed", colourInfo, `Member: ${memberName}\nOld: ${oldNickname}\nNew: ${newNickname}`);
            }
        });
    }
}