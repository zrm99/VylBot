const config = require('../config.json');
const functions = require('../functions.js');
const fs = require('fs');

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;
var colourGold = 0xf9ee11;
//add (done)
//set (done)
//reset (done)
//give
if(config.info.devBuild === false){
var prefixHelp = config.prefix.live
}else{
var prefixHelp = config.prefix.dev
}
var usage = "";
usage += prefixHelp + "points\n";
if(config.generalConfigPoints.enableRanks){
usage += "This will show you your rank and your points\n";
}else{
usage += "This will show you your points\n"
}
usage += prefixHelp + "points set <user> <amount>\n";
usage += "This will set the points of the specified user to the given amount\n";
usage += prefixHelp + "points add <user> <amount>\n";
usage += "This will add points to the specified user\n";
usage += prefixHelp + "points reset";
usage += "This will reset all Points";
usage += prefixHelp + "points give <user> <amount>\n";
usage += "This will give the specified user a cetain amount of points\n";
//pain
exports.run = function(message, prefix, args) {
    var dbTickets = fs.readFileSync('./points.json');
    var tableTickets = JSON.parse(dbTickets);
    
    if (args[1] == "all") {
        var lines = "";
        
        for (let i = 0; i < tableTickets.length; i++) {
            lines += `${tableTickets[i].tag}: ${tableTickets[i].points}\n`;
        }
        functions.embed(message.channel, "All Points", colourGold, lines);
    }else if(args[1] == "add"){
        if(args.length === 4){
        var user = message.mentions.users.first().tag;
        var amount = args[3];
        let userPoints;
        for (let i = 0; i < tableTickets.length; i++) {
            if (tableTickets[i].tag == user) {
                userPoints = tableTickets[i];
        }}
        if(user){
        if(amount){
            if (userPoints == null) {
				tableTickets.push({
					"tag": user,
					"points": amount
                });
                functions.embed(message.channel,"Success!",colourGold,`You added ${amount} Point(s) to ${user}!`)
			} else {
				for (let i = 0; i < tableTickets.length; i++) {
					if (tableTickets[i].tag == user) {
                        let loop = amount
                        while(loop > 0){
                        tableTickets[i].points++;
                        loop = loop - 1;
                        }
					}
                }
                functions.embed(message.channel,"Success!",colourGold,`You added ${amount} Point(s) to ${user}!`)
            }
            fs.writeFileSync('./points.json', JSON.stringify(tableTickets));
        }else{
            functions.embed(message.channel,"Incorect usage",colourWarn,"Please specify the amount")
        }
        }else{
            functions.embed(message.channel,"Incorect usage",colourWarn,"Please specify the user")
        }
    }else{
        functions.embed(message.channel,"Incorect usage",colourWarn,`Please do ${prefix}points add <user> <amount>`)
    }
    }else if(args[1] == "set"){
        if(args.length === 4){
            var user = message.mentions.users.first().tag;
            var amount = args[3];
            let userPoints;
            for (let i = 0; i < tableTickets.length; i++) {
                if (tableTickets[i].tag == user) {
                    userPoints = tableTickets[i];
            }}
            if(user){
                if(amount){
                    if(userPoints == null){
                        tableTickets.push({
                            "tag": user,
                            "points": amount
                        });
                        functions.embed(message.channel,"Success!",colourGold,`You set the amount of Points for: ${user} to ${amount}`)
                    }else{
                        for (let i = 0; i < tableTickets.length; i++) {
                            if (tableTickets[i].tag == user) {
                                tableTickets[i].points=amount;
                            }
                        }
                        functions.embed(message.channel,"Success!",colourGold,`You set the amount of Points for: ${user} to ${amount}`)
                    }
                    fs.writeFileSync('./points.json', JSON.stringify(tableTickets));
                    
                }else{
                    functions.embed(message.channel, "Incorect usage",colourWarn,`Please do ${prefix}points set <use> <amount>`)
                }
            }else{
                functions.embed(message.channel, "Incorect usage",colourWarn,`Please do ${prefix}points set <use> <amount>`)
            }
        }else{
            functions.embed(message.channel, "Incorect usage",colourWarn,`Please do ${prefix}points set <use> <amount>`)
        }
        
    }else if(args[1] == "reset"){
        //oof moment comes
        fs.writeFileSync('./points.json',"[]");
        
        functions.embed(message.channel, "Success!", colourGold, `All points were reset`)
    }else if(args[1] == "give"){
        if(args.length === 4){
            var user = message.mentions.users.first().tag;
            var amount = args[3];
            var target;
            var author;
            var authorPoints;
            var targetPoints;
            for (let i = 0; i < tableTickets.length; i++) {
                if (tableTickets[i].tag == user) {
                    target = tableTickets[i];
            }
            if(tableTickets[i].tag == message.author.tag){
                author = tableTickets[i];
            }
            }
            authorPoints = author.points;
            targetPoints = target.points;
            if(user){
                if(amount){
                    if(authorPoints > amount){
                        if(target == null){
                            tableTickets.push({
                                "tag": user,
                                "points": amount
                            });
                            for (let i = 0; i < tableTickets.length; i++) {
                                if (tableTickets[i].tag == message.author.tag) {
                                    tableTickets[i].points=authorPoints-amount
                                }
                            }
                        }else{
                            for (let i = 0; i < tableTickets.length; i++) {
                                if (tableTickets[i].tag == user) {
                                    tableTickets[i].points=targetPoints+amount;
                                }
                            }
                            for (let i = 0; i < tableTickets.length; i++) {
                                if (tableTickets[i].tag == message.author.tag) {
                                    tableTickets[i].points=authorPoints-amount
                                }
                            }
                        }
                        fs.writeFileSync('./points.json', JSON.stringify(tableTickets));
                        for (let i = 0; i < tableTickets.length; i++) {
                            if (tableTickets[i].tag == user) {
                                target = tableTickets[i];
                        }}
                        for(let i = 0; i < tableTickets.length; i++){
                            if(tableTickets[i].tag == message.author.tag){
                                author = tableTickets[i];
                            }
                        authorPoints = author.points;
                        targetPoints = target.points;
                        }
                        functions.embed(message.channel,"Succsess",colourInfo,`${amount} Point(s) were given to ${user}\n ${user} now has ${targetPoints} Point(s)\nYou now have ${authorPoints} Point(s)`)
                    }else{
                        functions.embed(message.channel, "Not enouh points",colourWarn,`You dont have enough points\nYou have ${authorPoints} point(s)\nAnd you tried to give ${amount} Point(s)`)
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
        `Time between points: ${config.generalConfigPoints.timeBetweenMessages}\n`
        +`Tick-Rate: ${config.generalConfigPoints.tickRate}\n`
        functions.embed(message.channel, "Info:",colourInfo,info);
    }else if(args[1] == "help"){
        functions.embed(message.channel,"Help",colourInfo,usage);
    }else{
        let user;
        for (let i = 0; i < tableTickets.length; i++) {
        if (tableTickets[i].tag == message.author.tag) {
            user = tableTickets[i];
        }
    }

        if (user == null) {
            user = {
                "tag": message.author.tag,
                "points": 0
            };
        }
    
        functions.embed(message.channel, "", colourGold, `${message.author.tag} has ${user.points} points`);
    }
    }