const functions = require("../functions.js")
const config = require('../config.json');

var colourInfo = config.messageColours.info;

module.exports = {
	name: 'shop',
	description: 'Used to use the shop',
	category: 'point-system',
	usage: '[help]',
	roles: 'everyone',
	cost: functions.commandCost("shop"),
	run: function(message, prefix, args) {
		if(functions.pointBanned(message.author.id) == false){
        var commandFile = require(`../point-system/shop.js`);
		commandFile['run'](message, prefix, args);
		}else{
			functions.embed(message.channel,"",colourInfo,"You are point-banned and because of that you cannot access the shop!")
		}
    }
}