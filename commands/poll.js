const config = require('../config.json');
const functions = require('../functions.js');
const fs = require('fs');
const discord = require('discord.js');

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

module.exports = {
	name: 'poll',
	description: 'Genereates a poll with reaction numbers.',
	category: 'moderation',
	usage: '<title>;<option 1>;<option 2>...',
    roles: 'Moderator',
    run: function(message, prefix, args) {
        //checks for permissions because thats how it works right?
        if(message.member.roles.find(role => role.name == config.roles.moderator)) {
            // Change the arguments to be split by semi colons instead
            args.splice(0, 1);
            var argsJoined = args.join(' ');
            args = argsJoined.split(';');
    
            //checks for length
            if(args.length >= 3 && args.length < 10){
                //putting the options into a var to use later
                var title = args[0];
                var optionOne = args[1];
                var optionTwo = args[2];
                var optionsString = "";
                
                // Used to convert digits to words
                // Example: running arrayOfNumbers[5] will result in 'five'
                var arrayOfNumbers = [
                    'zero',
                    'one',
                    'two',
                    'three',
                    'four',
                    'five',
                    'six',
                    'seven',
                    'eight',
                    'nine'
                ]
    
                for (let i = 1; i < args.length;i++) {
                    optionsString += `:${arrayOfNumbers[i]}: ${args[i]}\n`;
                }
    
                //actully sending the message
                var embed = new discord.RichEmbed()
                    .setTitle(title)
                    .setColor(colourInfo)
                    .setDescription(optionsString);
        
                message.channel.send(embed).then(message => {
                    // reacting with the vote options
                    // NOTE: needed to be done in an async .then() due to lastMessage not
                    // being able to find this message as it wasn't sent yet
                    if (args.length == 2) {
                        message.react("1️⃣");
                    } else if (args.length == 3) {
                        message.react("1️⃣")
                        .then(() => message.react("2️⃣"));
                    } else if (args.length == 4) {
                        message.react("1️⃣")
                        .then(() => message.react("2️⃣"))
                        .then(() => message.react("3️⃣"));
                    } else if (args.length == 5) {
                        message.react("1️⃣")
                        .then(() => message.react("2️⃣"))
                        .then(() => message.react("3️⃣"))
                        .then(() => message.react("4️⃣"));
                    } else if (args.length == 6) {
                        message.react("1️⃣")
                        .then(() => message.react("2️⃣"))
                        .then(() => message.react("3️⃣"))
                        .then(() => message.react("4️⃣"))
                        .then(() => message.react("5️⃣"));
                    } else if (args.length == 7) {
                        message.react("1️⃣")
                        .then(() => message.react("2️⃣"))
                        .then(() => message.react("3️⃣"))
                        .then(() => message.react("4️⃣"))
                        .then(() => message.react("5️⃣"))
                        .then(() => message.react("6️⃣"));
                    } else if (args.length == 8) {
                        message.react("1️⃣")
                        .then(() => message.react("2️⃣"))
                        .then(() => message.react("3️⃣"))
                        .then(() => message.react("4️⃣"))
                        .then(() => message.react("5️⃣"))
                        .then(() => message.react("6️⃣"))
                        .then(() => message.react("7️⃣"));
                    } else if (args.length == 9) {
                        message.react("1️⃣")
                        .then(() => message.react("2️⃣"))
                        .then(() => message.react("3️⃣"))
                        .then(() => message.react("4️⃣"))
                        .then(() => message.react("5️⃣"))
                        .then(() => message.react("6️⃣"))
                        .then(() => message.react("7️⃣"))
                        .then(() => message.react("8️⃣"));
                    } else if (args.length == 10) {
                        message.react("1️⃣")
                        .then(() => message.react("2️⃣"))
                        .then(() => message.react("3️⃣"))
                        .then(() => message.react("4️⃣"))
                        .then(() => message.react("5️⃣"))
                        .then(() => message.react("6️⃣"))
                        .then(() => message.react("7️⃣"))
                        .then(() => message.react("8️⃣"))
                        .then(() => message.react("9️⃣"));
                    }
                }).catch(console.error);
    
                // Delete the initial message
                message.delete();
            } else if (args.length >= 10) {
                functions.embed(message.channel, "", colourWarn, "The poll command can only accept up to 9 options");
            } else {
                //sends a message for all the people not knowing how to make a poll... Idiots...
                message.delete()
                functions.embed(message.channel,"Not enough info", colourWarn, `Please use: ${prefix}poll <title>;<option1>;<option2>...`)
            }
        } else {
        //sending the: "no permissions" message
        functions.embed(message.channel, "", colourWarn, "You do not have permission to run this command");
        }
    }
    
}