const config = require('../config.json');
const functions = require("../functions.js")

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

module.exports = {
    run: function(client) {
        client.on('messageDelete', (message) => {
            if(message.author.bot) return;
            
            functions.embed(message.guild.channels.find(channel => channel.name == config.channels.logging), "Message Deleted", colourInfo, `Member: ${message.author.tag}\nMessage: ${message.content}\nChannel: ${message.channel}`);
        });
    }
}