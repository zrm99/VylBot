const config = require('../config.json');
const functions = require("../functions.js")
const discord = require('discord.js');

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;
var colourMember = config.messageColours.member;

module.exports = {
    run: function(client) {
        client.on('guildMemberRemove', (member) => {
            var embed = new discord.RichEmbed()
                .setTitle("Member Left")
                .setColor(colourMember)
                .addField("User", `${member} \`${member.user.tag}\``)
                .addField("Joined", `${member.joinedAt}`)
                .setFooter(`User ID: ${member.user.id}`)
                .setThumbnail(member.user.displayAvatarURL);
                
            member.guild.channels.find(channel => channel.name == config.channels.logging).send(embed);
        });
    }
}

