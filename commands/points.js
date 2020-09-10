const config = require('../config.json');
const functions = require('../functions.js');
const fs = require('fs');

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;
var colourGold = 0xf9ee11;
//add (done)
//set (done)
//reset (done)
//give (done)
if(config.info.devBuild === false){
var prefixHelp = config.prefix.live
}else{
var prefixHelp = config.prefix.dev
}
var usage = "";
usage += prefixHelp + "points\n";
/*/
if(config.generalConfigPoints.enableRanks){
usage += "This will show you your rank and your points\n";
}else{
usage += "This will show you your points\n"
}
/*/
usage += prefixHelp + "points set <user> <amount>\n";
usage += "This will set the points of the specified user to the given amount\n";
usage += prefixHelp + "points add <user> <amount>\n";
usage += "This will add points to the specified user\n";
usage += prefixHelp + "points reset\n";
usage += "This will reset all Points\n";
usage += prefixHelp + "points give <user> <amount>\n";
usage += "This will give the specified user a cetain amount of points\n";
//pain
module.exports = {
name: 'points',
description: `A command for accessing points`,
category: 'point-system',
usage: '[help]',
roles: 'Everyone',
cost: functions.commandCost("points"),
run: function(message, prefix, args) {
    var dbTickets = fs.readFileSync('./points.json');
    var tableTickets = JSON.parse(dbTickets);
    if(functions.pointBanned(message.author.id) == true){
        functions.embed(message.channel,"",colourInfo,"You are point-banned and because of that you cannot access the shop!")
    }else{
    if (args[1] == "all") {
        if(args.length > 1){
        var maxpages = Math.ceil(tableTickets.length / config.generalConfigPoints.maximumEntriesPerPage)
        var page = Math.abs(parseInt(args[2]))
        var lines = "";
        var items = 0
        if(page > maxpages){
            page = maxpages
        }
        if(typeof args[2] == "undefined"){
            page = 1
        }
        tableTickets.forEach(element => {
            
        });
        var count = config.generalConfigPoints.maximumEntriesPerPage * (page - 1)
        for (let i = 0; i < tableTickets.length; i++) {
            if(items !== config.generalConfigPoints.maximumEntriesPerPage){
                if(count < i || count == i){
                    items = items + 1
                    lines += `${tableTickets[i].tag}: ${tableTickets[i].points}\n\n`;
                }
            }
        }
        functions.embedWithFooter(message.channel,"All Points",colourGold,lines,`Page ${page} of ${maxpages}`)
        }else{
            functions.embed(message.channel,"Incorect usage",colourWarn,`Please do ${prefix}points all <page>`)
        }
    }else if(args[1] == "add"){
        if (message.member.roles.cache.find(role => role.name == config.roles.moderator)) {
        if(args.length === 4){
        var user = message.mentions.users.first().id;
        var userTag = message.mentions.users.first().tag;
        var amount = parseInt(args[3]);
        if(user){
        if(amount){
            if(amount > 0){
                functions.pointManager("give",amount,user,userTag)
            }else{
                functions.pointManager("take",Math.abs(amount),user,userTag)
            }
            functions.embed(message.channel,"Success!",colourInfo,`Added ${amount} Points!`)
        }else{
            functions.embed(message.channel,"Incorect usage",colourWarn,"Please specify the amount")
        }
        }else{
            functions.embed(message.channel,"Incorect usage",colourWarn,"Please specify the user")
        }
    }else{
        functions.embed(message.channel,"Incorect usage",colourWarn,`Please do ${prefix}points add <user> <amount>`)
    }
    }else{
        functions.embed(message.channel,"",colourWarn,"You do not have permissons to run this command")
    }
    }else if(args[1] == "set"){
        if (message.member.roles.cache.find(role => role.name == config.roles.moderator)) {
        if(args.length === 4){
            var user = message.mentions.users.first().id;
            var amount = args[3];
            let userTag = message.mentions.users.first().tag;
            if(user){
                if(amount){
                    functions.pointManager("set",amount,user,userTag)
                    functions.embed(message.channel,"Success!",colourInfo,`Set points for ${userTag} to ${amount}!`)
                }else{
                    functions.embed(message.channel, "Incorect usage",colourWarn,`Please do ${prefix}points set <use> <amount>`)
                }
            }else{
                functions.embed(message.channel, "Incorect usage",colourWarn,`Please do ${prefix}points set <use> <amount>`)
            }
        }else{
            functions.embed(message.channel, "Incorect usage",colourWarn,`Please do ${prefix}points set <use> <amount>`)
        }
    }else{
        functions.embed(message.channel,"",colourWarn,"You do not have permissions to run this command")
    }
    }else if(args[1] == "reset"){
        if (message.member.roles.cache.find(role => role.name == config.roles.moderator)) {
        fs.writeFileSync('./points.json',"[]");
        
        functions.embed(message.channel, "Success!", colourGold, `All points were reset`)
        }else{
            functions.embed(message.channel,"",colourWarn,"You do not have permissions to run this command")
        }
    }else if(args[1] == "give"){
        if(args.length === 4){
            var user = message.mentions.users.first().id;
            let tag = message.mentions.users.first().tag;
            var amount = args[3];
            if(amount == Math.ceil(amount)){
            var authorPoints;
            var targetPoints;
            targetPoints = parseInt(functions.pointManager("fetch",0,user,tag))
            authorPoints = parseInt(functions.pointManager("fetch",0,message.author.id,message.author.tag))
            if(user){
                if(amount){
                    if(authorPoints > amount){
                        function error(Return) {
                            functions.embed(message.channel,"Error",colourWarn,`Code: ${Return}`)
                        }
                        let return1 = functions.pointManager("take",amount,message.author.id,message.author.tag)
                        if(return1 = "0"){
                            let return2 = functions.pointManager("give",amount,user,tag)
                            if(return2 = "0"){
                                functions.embedWithFooter(message.channel,"Success!",colourInfo,`${amount} Points were transfered! You now have ${functions.pointManager("fetch",0,message.author.id,message.author.tag)} Points\nAnd ${tag} now has ${functions.pointManager("fetch",0,user,tag)}`,`Do ${prefix}points to see your points!`)
                            }else{
                                error(return2)
                            }
                        }else{
                            error(return1)
                        }
                    }else{
                        functions.embed(message.channel,"Oops!",colourWarn,`You do not have enough points!\nYou need ${amount} Point(s) and you have ${authorPoints}`)
                    }
                }else{
                    functions.embed(message.channel,"Incorect usage",colourWarn,`Please do ${prefix}points give <user> <amount>`)
                }
            }else{
                functions.embed(message.channel,"Incorect usage",colourWarn,`Please do ${prefix}points give <user> <amount>`)
            }
        }else{
            functions.embed(message.channel,"Incorect usage",colourWarn,`Please do ${prefix}points give <user> <amount>`)
        }
        }else{
            functions.embed(message.channel,"Incorect usage",colourWarn,`Please do ${prefix}points give <user> <amount>`)
        }
    }else if(args[1] == "info"){
        let info =
        `Time between points: ${config.generalConfigPoints.timeBetweenMessages}`
        functions.embed(message.channel, "Info:",colourInfo,info);
    }else if(args[1] == "help"){
        functions.embed(message.channel,"Help",colourInfo,usage);
    }else{
        if(args.length < 2){
        functions.embed(message.channel, "Points", colourGold, `${message.author.tag} has ${functions.pointManager("fetch",0,message.author.id,message.author.tag)} points`);
        }else{
            try {
                var user = message.mentions.users.first().id
                var userTag = message.mentions.users.first().tag
                functions.embed(message.channel, "Points", colourGold, `${userTag} has ${functions.pointManager("fetch",0,user,userTag)} points`)
            } catch (error) {
                functions.embed(message.channel,"Incorect usage",colourWarn,`Please do ${prefix}points [user]`)
            }
        }
    }
    }
}
}