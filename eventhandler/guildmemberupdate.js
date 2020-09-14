const config = require('../config.json');
const functions = require("../functions.js")
const discord = require('discord.js');

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

module.exports = {
    run: function(client) {
        client.on('guildMemberUpdate', (oldMember, newMember) => {
            if (oldMember.nickname != newMember.nickname) {
                let memberName = newMember.user.tag;
                let oldNickname = oldMember.nickname || "*none*";
                let newNickname = newMember.nickname || "*none*";

                var embed = new discord.RichEmbed()
                    .setTitle("Nickname Changed")
                    .setColor(colourInfo)
                    .addField("User", `${newMember} \`${newMember.user.tag}\``)
                    .addField("Old Nickname", oldNickname)
                    .addField("New Nickname", newNickname)
                    .setFooter(`User ID: ${newMember.user.id}`)
                    .setThumbnail(newMember.user.displayAvatarURL);
                    
                newMember.guild.channels.find(channel => channel.name == config.channels.logging).send(embed);
            }
        });
    }
}