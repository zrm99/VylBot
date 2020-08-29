const config = require('../config.json');
const functions = require("../functions.js")

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

module.exports = {
    run: function(client) {
        process.on('unhandledRejection', (err) => {
            console.error(err);
        });
    }
}