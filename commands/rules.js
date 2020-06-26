const config = require('../config.json');
const functions = require('../functions.js');

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

module.exports = {
	name: 'rules',
	description: 'Generates the rules embeds from the rules.txt file',
	category: 'owner',
	usage: '',
	roles: 'vylpes',
	run: function(message, prefix, args) {
		
	}
}