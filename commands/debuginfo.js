const config = require('../config.json');
const functions = require('../functions.js');
const fs = require('fs')

var colourInfo = config.messageColours.info;

module.exports = {
    name: 'debuginfo',
	description: 'Gives you some details about some stuff',
	category: 'point-system',
	usage: '<help|file path>',
	roles: 'Moderator',
    cost: functions.commandCost("pointban"),
    //remeber to remove this command lmao
    run: function(message, prefix, args) {
        if (message.member.roles.cache.find(role => role.name == config.roles.moderator)) {
            if(args[1] == "help"){
                functions.embed(message.channel,"Help",colourInfo,"lol this is a debug command lmao you use this to look into a JSON file")
            }else{
                try {
                    var argsReason = args;
                    argsReason.splice(0,1);
                    var reason = argsReason.join(" ");
                    var json = JSON.stringify(JSON.parse(fs.readFileSync(reason)))
                    functions.embed(message.channel,"lmao heres your file",colourInfo,json)
                } catch (error) {
                    if(error.code === 'ENOENT'){
                        functions.embed(message.channel,"lmao that file wrong",colourInfo,"lmao u dumb or something that file is a no show like bro do you even know what your doing lmao")
                    }else{
                        functions.embed(message.channel,"bruh something went wrong",colourInfo,"look in log or somethnng idk and idc")
                        console.log(error)
                        
                    }
                }
            }
        }else{
            functions.embed(message.channel,"lol",colourInfo,"lmao you dont have perms for this debug command")
        }
    }
}