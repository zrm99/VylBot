const discord = require('discord.js');
const fs = require('fs');
const client = new discord.Client();
const config = require('./config.json');
const functions = require('./functions.js');

const devBuild = config.info.devBuild;

var prefix = config.prefix.live;
var time = config.generalConfigPoints.timeBetweenMessages
var random = config.generalConfigPoints.randomTimeMessage
if (devBuild) prefix = config.prefix.dev;

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

client.once('ready', () => {
	console.log('Ready');
});

client.on('message', (message) => {
	if (!message.guild) return;
	if (message.author.bot) return;
	var content = message.content;

	if (content.substring(0, prefix.length).toLowerCase() == prefix.toLowerCase()) {
		var args = content.substring(prefix.length).split(" ");
		if(!config.commands.disabled.includes(args[0])) {
			fs.stat(`./commands/${args[0]}.js`, function(err, stat) {
				if (err == null) {
					try {
						var commandFile = require(`./commands/${args[0]}`);
					let a
					var valid
					let  loopStop = false
					for (let index = 0; index < config.commandsWithCost.length; index++) {
						if(loopStop == false){
							if(config.commandsWithCost[index].name == args[0]){
								valid = true;
								loopStop = true
							}else if(config.commandsWithCost.length == index	){
								valid = false;
							}
						}
					}
					if(valid){
						for (let index = 0; index < config.commandsWithCost.length; index++) {
							if(config.commandsWithCost[index].name == args[0]){
							a = config.commandsWithCost[index].cost
							}
						}
						points = functions.pointManager("fetch",0,message.author.id)
						if(typeof points == "number"){
						if(points > a){
							functions.embed(message.channel,"",colourInfo,`You executed ${prefix}${args[0]} for ${a} points!`)
							functions.pointManager("take",a,message.author.id)
							commandFile['run'](message, prefix, args);
						}else{
							functions.embedWithFooter(message.channel,"Oops!",colourWarn,`You do not have enough points to run this command!\nYou need ${a} Points to execute this command\nAnd you have ${points} Points`,`Do ${prefix}help ${args[0]}\nTo see the cost`)
						}
						}else{
							functions.embed(message.channel,"Error",colourWarn,`An error occured...\nReturn code: ${points}!`)
						}
					}else{
					commandFile['run'](message, prefix, args);
					}
					} catch(err) {
						console.log(`${message.content}`);
						console.log(err);

						functions.embed(message.channel, "", colourWarn, "An error occured, please contact the bot owner");
					}
				} else if (err.code === 'ENOENT') {
					functions.embed(message.channel, "", colourWarn, "Command does not exist");	
				} else {
					console.log(err);

					functions.embed(message.channel, "", colourWarn, "An unexpected error has occured. Please contact the bot owner");
				}
			});
		} else {
			message.delete();
			functions.embed(message.channel, "", colourWarn, "This command has been disabled by the bot owner");
		}
	}else {
		if(functions.pointBanned(message.author.id)) return;
		var dbTickets = fs.readFileSync('./lines.json');
		var tableTickets = JSON.parse(dbTickets);
		var points = JSON.parse(fs.readFileSync('./points.json'))

		var author = message.author.id
		var user;
		var authorPoints;
			for (let i = 0; i < tableTickets.length; i++) {
				if (tableTickets[i].tag == author) {
					user = tableTickets[i];
			}}
			for (let i = 0; i < points.length; i++) {
				if(points[i].tag == author){
					authorPoints = points[i];
				}
				}
			if(user == null){
				if(random){
					var amount = Math.floor((Math.random() * config.generalConfigPoints.randomModifier) + time)
				}else{
					var amount = time
				}
				tableTickets.push({
					"tag": author,
					"time": amount
				});
				fs.writeFileSync('./lines.json', JSON.stringify(tableTickets));
				return;
			}
		if(user.time == 0){
		if(user == null){
			if(random){
				var amount = Math.floor((Math.random() * config.generalConfigPoints.randomModifier) + time)
			}else{
				var amount = time
			}
			tableTickets.push({
				"tag": author,
				"time": amount
			});
			if(authorPoints ==  null){
				points.push({
				"tag": author,
				"points": 1
			})
			}else{
				authorPoints.points++;
				return;
			}
		}else{
			if(random){
				var amount = Math.floor((Math.random() * config.generalConfigPoints.randomModifier) + time)
			}else{
				var amount = time
			}
			user.time=amount;
			if(authorPoints ==  null){
				points.push({
				"tag": author,
				"points": 1
			})
			}else{
				authorPoints.points++;
			}
		}
		if(config.generalConfigPoints.announcePoints){
			functions.embed(message.channel,"",0xf9ee11,"+1 Point")
		}
		fs.writeFileSync('./lines.json', JSON.stringify(tableTickets));
		fs.writeFileSync('./points.json', JSON.stringify(points));
	}else{
		user.time--;
		fs.writeFileSync('./lines.json', JSON.stringify(tableTickets));
	}
	}
});

client.on('messageDelete', (message) => {
	if(message.author.bot) return;
	
	functions.embed(message.guild.channels.cache.find(channel => channel.name == config.channels.logging), "Message Deleted", colourInfo, `Member: ${message.author.tag}\nMessage: ${message.content}\nChannel: ${message.channel}`);
});

client.on('messageUpdate', (oldMessage, newMessage) => {
	if (newMessage.author.bot) return;
	if (oldMessage.content == newMessage.content) return;
	
	functions.embed(newMessage.guild.channels.cache.find(channel => channel.name == config.channels.logging), "Message Edited", colourInfo, `Member: ${newMessage.author.tag}\nOld: ${oldMessage.content}\nNew: ${newMessage.content}\nChannel: ${newMessage.channel}`);
});

if (devBuild) {
	client.login(config.tokens.dev);
} else {
	client.login(config.tokens.live);
}

process.on('unhandledRejection', (err) => {
	console.error(err);
});
