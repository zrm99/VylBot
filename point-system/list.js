const config = require('../config.json');
const functions = require('../functions.js');
const fs = require('fs');
const shop = require('../point-system/shop.json')

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;
var colourGold = 0xf9ee11;

exports.run = function(message, prefix, args,page) {
    var tableTickets = JSON.parse(fs.readFileSync('./point-system/shop.json'));
    var points = JSON.parse(fs.readFileSync('./points.json'))
    var items = JSON.parse(fs.readFileSync('./point-system/item.json'));
    var pageConfig = JSON.parse(fs.readFileSync(`./point-system/pages.json`));
    var argsNew = args
    argsNew.splice(0,2);
    var argsJoined = args.join(' ');
    argsNew = argsJoined.split(';');
        var lines = "";
        var items = 0
        for (let i = 0; i < pageConfig.categories.length; i++) {
            if(!items == pageConfig.config.maxItemsForPage){
                items + 1
            lines += `Category: ${pageConfig.categories[i]}\nDo ` + "`" + `${prefix}shop list ${pageConfig.categories[i]}`+ "`" + ` to see this categories items.\n\n`;
            }else{
                return;
            }
        }
        functions.embed(message.channel,"Shop",colourGold,lines)
}