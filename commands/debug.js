const config = require('../config.json');
const functions = require('../functions.js');

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;
var colourGold = 0xf9ee11;

module.exports = {
    name: 'debug',
	description: 'Used to call a point-syste function',
	category: 'point-system',
	usage: '<function>|<help> <parameters>',
	roles: 'Moderator',
	cost: functions.commandCost("debug"),
        run: function(message, prefix, args) {
        if (message.member.roles.cache.find(role => role.name == config.roles.moderator)) {
            var Function = args[1] 
            if (args[1] == "help"){
                var allFunctions = [
                    "embed",
                    "embedWithFooter",
                    "commandCost",
                    "pointManager",
                    "itemManager",
                    "pointBanned",
                    "shop"
                ]
                var usage = ""
                let specialChar = "`"
                usage += `You can do: ${specialChar}id${specialChar} in any parameter to fill in the ID of any user you mention\nNote: The max parameters is 10\n\nAllowed functions:\n\n`
                allFunctions.forEach(element => {
                    if(config.debugFunctions.includes(element)){
                        usage += `${element}\n\n`
                    }
                });
                functions.embed(message.channel,"Help",colourInfo,usage);
            }else{
                if(config.debugFunctions.includes(args[1])){
                    args.splice(0,2)
                    let argsJoined = args.join(' ');
                    args = argsJoined.split(';');
                    var Return = ""
                    for (let index = 0; index < args.length; index++) {
                        if(args[index] == "id"){
                            var user
                            try {
                                args[index] = message.mentions.users.first().id
                            } catch (error) {
                                user = 0
                                functions.embed(message.channel,"Error",colourWarn,"You failed to mention a user a ID, ID set to 0")
                            }
                        }
                    }
                    try {
                        if(args.length > 10){
                            functions.embed(message.channel,"Error",colourWarn,"Parameter limit is 10")
                        }else{
                            switch (args.length) {
                              case 1:
                                   Return = functions[Function](args[0])
                                    break;
                                case 2:
                                    Return = functions[Function](args[0],args[1])
                                    break;
                                 case 3:
                                    Return = functions[Function](args[0],args[1],args[2])
                                    break;
                                case 4:
                                    Return = functions[Function](args[0],args[1],args[2],args[3])
                                    break;
                                case 5:
                                    Return = functions[Function](args[0],args[1],args[2],args[3],args[4])
                                    break;
                                case 6:
                                    Return = functions[Function](args[0],args[1],args[2],args[3],args[4],args[5])
                                    break;
                                case 7:
                                    Return = functions[Function](args[0],args[1],args[2],args[3],args[4],args[5],args[6])
                                    break;
                                case 8:
                                    Return = functions[Function](args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7])
                                    break;
                                case 9:
                                    Return = functions[Function](args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7],args[8])
                                    break;
                                case 10:
                                    Return = functions[Function](args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7],args[8],args[9])
                                    break;
                                default:
                                    Return = functions[Function]("")
                                    break;
                        }
                        functions.embed(message.channel,"Debug",colourInfo,Return)
                        }
                    } catch (error) {
                        functions.embed(message.channel,"",colourWarn,"Function is not valid")
                    }
                }else{
                    functions.embed(message.channel,"",colourWarn,"The function either is not valid or you are not allowed to use it")
                }
            }
        }else{
            functions.embed(message.channel, "", colourWarn, "You do not have permission to run this command");
        }
    }
}