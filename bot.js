const discord = require('discord.js');
const client = new discord.Client();
const config = require('./config.json');
const fs = require("fs")

if(config.info.devBuild){
    client.login(config.tokens.dev)
}else{
    client.login(config.tokens.live)
}
var files = fs.readdirSync("./eventhandler/")
for (let index = 0; index < files.length; index++) {
    var commandFile = require(`./eventhandler/${files[index]}`);
	commandFile['run'](client);
}
