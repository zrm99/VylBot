const config = require('../config.json');
const functions = require("../functions.js");
const discord = require("discord.js");

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

module.exports = {
    run: function(client) {
        client.on('messageUpdate', (oldMessage, newMessage) => {
            if (newMessage.author.bot) return;
            if (oldMessage.content == newMessage.content) return;

            var embed = new discord.RichEmbed()
                .setTitle("Message Edited")
                .setColor(colourInfo)
                .addField("User", `${newMessage.author} \`${newMessage.author.tag}\``)
                .addField("Channel", newMessage.channel)
                .addField("Old Content", `\`\`\`${oldMessage.content || "*none*"}\`\`\``)
                .addField("New Content", `\`\`\`${newMessage.content || "*none*"}\`\`\``)
                .setThumbnail(newMessage.author.displayAvatarURL);
                
            newMessage.guild.channels.find(channel => channel.name == config.channels.logging).send(embed);
        });
    }
}