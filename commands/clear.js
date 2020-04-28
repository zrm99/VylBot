const config = require('../config.json');
const functions = require('../functions.js');

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

exports.run = function(message, prefix, args){
    if (message.member.roles.find(role => role.name == config.roles.moderator || config.roles.admin)) {
        if(args.length > 1){
            if(args[1] < 101){
            message.channel.bulkDelete(args[1]).then(() =>{
                functions.embed(message.channel,"Success", colourInfo,`${args[1]} messages were removed!`)
            }).catch(() => {
              functions.embed(message.guild.channels.find(channel => channel.name == config.channels.logging),"Error",colourWarn,"A error occurred while deleting messages")
            });
        }else{
            functions.embed(message.channel,"Incorrect usage!",colourInfo,`Please use:\n${config.prefix.live}clear <Amount of Messages to delete(Max is 100)>`)
        }
        }else{
            functions.embed(message.channel,"Incorrect usage!",colourInfo,`Please use:\n${config.prefix.live}clear <Amount of Messages to delete>`)
        }
    }else{
        functions.embed(message.channel,"",colourInfo,"You do not have permission to run this command")
    }
    message.delete();
}