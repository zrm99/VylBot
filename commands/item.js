const config = require('../config.json');
const functions = require('../functions.js');
const fs = require('fs');
const Discord = require("discord.js")

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

module.exports = {
    name: 'item',
    description: `Used to access the item system`,
    category: 'point-system',
    usage: '<help>',
    roles: 'Everyone',
    cost: functions.commandCost("points"),
    run: function(message, prefix, args) {
        function help() {
            let sp = "`"
            let usage = []
            usage.push(`${sp}${prefix}item help${sp}`)
            usage.push(`This will display this message`)
            usage.push(`${sp}${prefix}item <itemname>${sp}`)
            usage.push(`This will give you info for a item`)
            usage.push(`${sp}${prefix}item list <page>${sp}`)
            usage.push(`This will list all items`)

            usage = usage.join("\n")
            functions.embed(message.channel,"Help",colourInfo,usage)
        }
        switch (args[1]) {
            case "help":
                help()
                break;
            case "list":
                    var file = JSON.parse(fs.readFileSync("./point-system/item.json"))
                    var pageConfig = JSON.parse(fs.readFileSync("./point-system/pages.json"))
                    var maxpages = Math.ceil(file.length / pageConfig.config.maxItemsForPage)  
                    var page = parseInt(args[2])
                    if(isNaN(page)){
                        page = 1
                    }
                    if(page > maxpages || page < 1){
                        page = maxpages
                    }
                    var lines = "";
                    var items = 0
                    var count = pageConfig.config.maxItemsForPage * (page - 1)
                    var sp_ = "`"
                    for (let i = 0; i < file.length; i++) {
                        if(items !== pageConfig.config.maxItemsForPage){
                            if(count < i || count == i){
                                items = items + 1
                                lines += `Name: ${sp_}${file[i].name}${sp_}\n`;
                            }
                        }
                    }
                functions.embedWithFooter(message.channel, "Items",colourInfo,lines,`Page ${page} of ${maxpages}\nDo ${prefix}item list;${parseInt(page) + 1} To list the next page!`)
                break;
            default:
                let sp = "`"
                var itemRaw = args;
                itemRaw.splice(0,1);
                var item = itemRaw.join(" ") 
                    var Return = functions.itemManager("fetch",false,0,0,item)
                    if (Return[1] == "undefined") {
                        functions.embed(message.channel,"Error",colourWarn,"This item does not exits!")
                    }else{
                        var message_ = []
                        message_.push(`Name: ${sp}${Return[1].name}${sp}`)
                        message_.push(`Description:\n${sp}${Return[1].description}${sp}`)
                        if (typeof Return[1].image !== "undefined") {
                            var embed = new Discord.MessageEmbed()
                            .setColor(colourInfo)
                            .setTitle(item)
                            .setImage(Return[1].image)
                            .setDescription(message_)
                        }else{
                            var embed = new Discord.MessageEmbed()
                            .setColor(colourInfo)
                            .setTitle(item)
                            .setDescription(message_)
                        }
                        message.channel.send(embed)
                    }
                break;
        }
    }
}