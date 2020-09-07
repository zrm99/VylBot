const discord = require('discord.js');
const client = new discord.Client();
const config = require('./config.json');
const fs = require("fs");

var cmdArgs = process.argv.slice(2);

if(cmdArgs.includes("-dev")){
    console.log("Starting VylBot in Development Mode")
    client.login(config.tokens.dev)
}else{
    console.log("Starting VylBot");
    client.login(config.tokens.live)
}
var files = fs.readdirSync("./eventhandler/")
for (let index = 0; index < files.length; index++) {
    var commandFile = require(`./eventhandler/${files[index]}`);
	commandFile['run'](client);
}
