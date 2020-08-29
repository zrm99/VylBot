const config = require('../config.json');
const functions = require("../functions.js")

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

module.exports = {
    run: function(client) {
        client.on('messageUpdate', (oldMessage, newMessage) => {
            if (newMessage.author.bot) return;
            if (oldMessage.content == newMessage.content) return;
            
            functions.embed(newMessage.guild.channels.find(channel => channel.name == config.channels.logging), "Message Edited", colourInfo, `Member: ${newMessage.author.tag}\nOld: ${oldMessage.content}\nNew: ${newMessage.content}\nChannel: ${newMessage.channel}`);
        });
    }
}