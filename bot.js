const discord = require('discord.js');
const fs = require('fs');
const client = new discord.Client();
const config = require('./config.json');
const functions = require('./functions.js');

client.once('ready', onReady);
client.on('message', onMessage);
client.on('messageDelete', onDelete);
client.on('messageUpdate', onEdit);

const devbuild = true;

var prefix = config.prefix.live;
if (devbuild) prefix = config.prefix.dev;

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

function onReady() {
    client.user.setActivity("");
    console.log('Ready!');
}

function onMessage(message) {
    if (!message.guild) return;

    var content = message.content;

    if (content.substring(0, prefix.length).toLowerCase() == prefix.toLowerCase()) {
        var args = content.substring(prefix.length).split(" ");
        
        fs.stat('./commands/' + args[0] + '.js', function(err, stat) {
        	if(err == null) {
        		var commandFile = require(`./commands/${args[0]}.js`);
        		commandFile['run'](message, prefix, args);
        	} else if (err.code === 'ENOENT') {
        		functions.embed(message.channel, "", colourWarn, "Command does not exist");
        	}
        });
    }
}

function onDelete(message) {	
	if(message.author.bot) return;
	
	functions.embed(message.guild.channels.find(channel => channel.name == config.channels.logging), "Message Deleted", colourInfo, "Member: " + message.author.tag + "\nMessage: " + message.content + "\nChannel: " + message.channel);
}

function onEdit(oldMessage, newMessage) {
	if (newMessage.author.bot) return;
	if (oldMessage.content == newMessage.content) return;
	
	functions.embed(newMessage.guild.channels.find(channel => channel.name == config.channels.logging), "Message Edited", colourInfo, "Member: " + newMessage.author.tag + "\nOld: " + oldMessage.content + "\nNew: " + newMessage.content + "\nChannel: " + newMessage.channel);
}

if (devbuild) {
	client.login(config.tokens.dev);
} else {
	client.login(config.tokens.live);
}