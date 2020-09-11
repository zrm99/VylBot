const config = require('../config.json');
const functions = require("../functions.js")
const discord = require('discord.js');

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

module.exports = {
    run: function(client) {
        client.on('messageDelete', (message) => {
            if(message.author.bot) return;

            var embed = new discord.RichEmbed()
                .setTitle("Message Deleted")
                .setColor(colourInfo)
                .addField("User", `${message.author} \`${message.author.tag}\``)
                .addField("Channel", message.channel)
                .addField("Content", `\`\`\`${message.content}\`\`\``);
                
            message.guild.channels.find(channel => channel.name == config.channels.logging).send(embed);
        });
    }
}