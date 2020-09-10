const config = require('../config.json');
const functions = require('../functions.js');
const fs = require('fs')
const bannedUsers = require("../point-system/bannedUsers.json")

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

module.exports = {
    name: 'pointban',
	description: 'A ban for the point-system',
	category: 'point-system',
	usage: '<user> [reason]| info <page>',
	roles: 'Moderator',
    cost: functions.commandCost("pointban"),
    run: function(message, prefix, args) {
        if (message.member.roles.cache.find(role => role.name == config.roles.moderator)) {
            if(args.length > 1){
                if(args[1] == "info"){
                    let banned = JSON.parse(fs.readFileSync("./point-system/bannedUsers.json"))
                    var maxpages = Math.ceil(banned.length / config.generalConfigPoints.maximumEntriesPerPage)
                    var lines = "All users that have been banned once:\n";
                    var page = Math.abs(parseInt(args[2]))
                    var items = 0

                    if (typeof args[2] == "undefined") {
                        page = 1
                    }
                    var count = config.generalConfigPoints.maximumEntriesPerPage * (page - 1)
                    for (let index = 0; index < banned.length; index++) {
                       if (items !== config.generalConfigPoints.maximumEntriesPerPage) {
                           if (count < index  || count == index) {
                               items == items + 1
                               lines += `Tag: ${banned[index].tag} ID: ${banned[index].id} Reason:\n${banned[index].reason}\nBanned: ${banned[index].banned}\n\n`
                           }
                       }
                        
                    }
                    functions.embedWithFooter(message.channel,"Info",colourInfo,lines,`Page ${page} of ${maxpages}`)
                }else{
                    var user
                    try {
                        user = message.mentions.users.first().id;
                        var banned = JSON.parse(fs.readFileSync("./point-system/bannedUsers.json"))
                        var isBanned = false
                        var forIndex
                        var isFound = false
                        for (let index = 0; index < banned.length; index++) {
                            if (banned[index].id == user) {
                                isFound = true;
                                if(banned[index].banned == true){
                                    isBanned = true
                                    forIndex = index
                                }else{
                                    forIndex = index
                                }
                            }
                        }
                        if (isBanned == true) {
                            banned[forIndex].banned = false
                            fs.writeFileSync('./point-system/bannedUsers.json', JSON.stringify(banned))
                            functions.embed(message.channel,"Success",colourInfo,`Unbanned ${message.mentions.users.first().tag}!`)
                        }else{
                            var argsReason = args;
					        argsReason.splice(0, 2);
					        var reason = argsReason.join(" ");
                            if(isFound == true){
                                banned[forIndex].banned = true
                                banned[forIndex].reason = reason
                                fs.writeFileSync('./point-system/bannedUsers.json', JSON.stringify(banned))
                                functions.embed(message.channel,"Success",colourInfo,`Banned ${message.mentions.users.first().tag}!\nFor the reason: ${reason}`)
                            }else{
                                banned.push({
                                    "id": user,
                                    "reason": reason,
                                    "banned": true,
                                    "tag": message.mentions.users.first().tag
                                })
                                fs.writeFileSync('./point-system/bannedUsers.json', JSON.stringify(banned))
                                functions.embed(message.channel,"Success",colourInfo,`Banned ${message.mentions.users.first().tag}!\nFor the reason: ${reason}`)
                            }
                        }
                    } catch (error) {
                        console.log(error)
                        functions.embed(message.channel, "", colourWarn, "Please specify a user by mentioning them");
                    }
                }
            }else{
                functions.embed(message.channel,"Incorect usage",colourWarn, `Please do ${prefix}pointban <user> [reason]`)
            }
        }else{
            functions.embed(message.channel,"",colourWarn,"You do not have permission to run this command!")
        }
    }
}