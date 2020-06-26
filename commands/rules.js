const config = require('../config.json');
const functions = require('../functions.js');
const fs = require('fs');

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

module.exports = {
	name: 'rules',
	description: 'Generates the rules embeds from the rules.txt file',
	category: 'owner',
	usage: '',
	roles: 'vylpes',
	run: function(message, prefix, args) {
		if (fs.existsSync("rules.txt")) {
			var rulesText = fs.readFileSync('rules.txt').toString();
			rulesText = rulesText.split("> ");

			for (let i = 1; i < rulesText.length; i++) {
				let rulesLines = rulesText[i].split("\n");
				let rulesTitle = rulesLines[0];
				let rulesDescription = rulesLines.slice(1).join("\n");

				functions.embed(message.channel, rulesTitle, colourInfo, rulesDescription);
			}
		} else {
			functions.embed(message.channel, "Error", colourWarn, "rules.txt doesn't exist");
		}
	}
}