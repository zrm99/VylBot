const discord = require('discord.js');
const config = require("../config.json")
const fs = require("fs")
const functions = require("../functions.js")
const devBuild = config.info.devBuild;

module.exports = {
    run: function(client) {
        var colourInfo = config.messageColours.info;
        var colourWarn = config.messageColours.warn;
        var prefix = config.prefix.live;
        if (devBuild) prefix = config.prefix.dev;
        client.on('message', (message) => {
            if (!message.guild) return;

            var content = message.content;
        
            if (content.substring(0, prefix.length).toLowerCase() == prefix.toLowerCase()) {
                var args = content.substring(prefix.length).split(" ");
                if(!config.commands.disabled.includes(args[0])) {
                    fs.stat(`./commands/${args[0]}.js`, function(err, stat) {
                        if (err == null) {
                            try {
                                var commandFile = require(`../commands/${args[0]}`);
                                commandFile['run'](message, prefix, args);
                            } catch(err) {
                                console.log(`${message.content}`);
                                console.log(err);
                                
                                functions.embed(message.channel, "", colourWarn, "An error occured!");
                            }
                        } else if (err.code === 'ENOENT') {
                            functions.embed(message.channel, "", colourWarn, "Command does not exist");
                            console.log(err)
                        } else {
                            console.log(err);
        
                            functions.embed(message.channel, "", colourWarn, "An unexpected error has occured. Please contact the bot owner");
                        }
                    });
                } else {
                    message.delete();
                    functions.embed(message.channel, "", colourWarn, "This command has been disabled by the bot owner");
                }
            }
        });
    }
}

