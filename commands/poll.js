const config = require('../config.json');
const functions = require('../functions.js');
const fs = require('fs');
const discord = require('discord.js');

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

exports.run = function(message, prefix, args) {
    //checks if anyone was that dumb and tried to make a poll in a none poll channel... Idiots...
    if(message.channel.name == config.channels.poll) {
        var Poll
        //checks for length
        if(args.length >= 4){
            //checks for permissions because thats how it works right?
            if (message.member.roles.find(role => role.name == config.roles.moderator)) {
                //putting the options into a var to use later
                var optionOne = args[1];
                var optionTwo = args[2];

                let pollOptions = {
                    optionOne: args[1],
                    optionTwo: args[2]
                }
                let data = JSON.stringify(pollOptions, null, 2);
                fs.writeFileSync('poll.json', data);
                //putting the title into a var with a fancy loop
                var title = "";
                for(let i = 3; i < args.length; i++){
                    title += args[i] + " "
                }

                //actully sending the message
                //functions.embed(message.channel, title, colourInfo, `:one: ${optionOne} \n :two: ${optionTwo}`)
                var embed = new discord.RichEmbed()
                    .setTitle(title)
                    .setColor(colourInfo)
                    .setDescription(`:one: ${optionOne} \n :two: ${optionTwo}`);
		
	            message.channel.send(embed).then(message => {
                    // reacting with the vote options
                    // NOTE: needed to be done in an async .then() due to lastMessage not
                    // being able to find this message as it wasn't sent yet
                    message.react("1️⃣")
                        .then(() => message.react("2️⃣"));
                }).catch(console.error);

                // Delete the initial message
                message.delete();
            }else {
                //sending the: "no permissions" message
                functions.embed(message.channel, "", colourWarn, "You do not have permission to run this command");
            }
        } else {
            //sends a message for all the people not knowing how to make a poll... Idiots...
            message.delete()
            functions.embed(message.channel,"Not enough info",colourWarn, "Please use: " + prefix + "poll <option1> <option2> <title> or " + prefix + "poll end")
            }
        } else {
        //deleting the message because: 1. I like to 2. Because it was the wrong channel and 3. beacause
        message.delete()
        functions.embed(message.channel, "", colourWarn, `This command only works in the ${config.channels.poll} channel`);
    }
}
