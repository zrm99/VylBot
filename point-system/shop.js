const config = require('../config.json');
const functions = require('../functions.js');
const fs = require('fs');
const shop = require('../point-system/shop.json')
const discord = require('discord.js');


var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;
var colourGold = 0xf9ee11;

//list all stuff(done)
//buy stuff(done)
//pages(working on it)
//inventory
//look at things(done)
module.exports = {
    run: function(message, prefix, args) {
    var dbTickets = fs.readFileSync('./point-system/shop.json');
    var tableTickets = JSON.parse(dbTickets);
    var points = JSON.parse(fs.readFileSync('./points.json'))
    var items = JSON.parse(fs.readFileSync('./point-system/item.json'));
    
    if(args[1] === "list"){
        var pageConfig = JSON.parse(fs.readFileSync(`./point-system/pages.json`));
        function list(page) {
            var maxpages = Math.ceil(pageConfig.categories.length / pageConfig.config.maxItemsForPage)
            if(page > maxpages){
                page = maxpages
            }
            var argsNew = args  
            argsNew.splice(0,2);
            var argsJoined = args.join(' ');
            argsNew = argsJoined.split(';');
            var lines = "";
            var items = 0
            var count = pageConfig.config.maxItemsForPage * (page - 1)
            for (let i = 0; i < pageConfig.categories.length; i++) {
                //i had a lot of issues here lmao
                if(items !== pageConfig.config.maxItemsForPage){
                    if(count < i || count == i){
                        items = items + 1
                        lines += `Category: ${pageConfig.categories[i]}\nDo ` + "`" + `${prefix}shop list ${pageConfig.categories[i]}`+ "`" + ` to see this categories items.\n\n`;
                    }
                }
            }
        functions.embedWithFooter(message.channel, "Shop",colourGold,lines,`Page ${page} of ${maxpages}\nDo ${prefix}shop list all;${parseInt(page) + 1} To list the next page!`)
        }
        var argsNew = args
        argsNew.splice(0,2);
        var argsJoined = args.join(' ');
        argsNew = argsJoined.split(';');
        if(argsNew[0] === "all"){
            if(typeof argsNew[1] === "string"){
                list(Math.abs(argsNew[1]))
            }else{
                list(1);
            }
        }else{
            if (typeof argsNew[1] === "string") {
                var page = argsNew[1]
            }else{
                var page = 1
            }
            let shop = ``
            let items = 0
            //remember to make this not case sensitve lol
            //done
            var categoriesUpperCase = []
            let i = ""
            for (let index = 0; index < pageConfig.categories.length; index++) {
                i = pageConfig.categories[index].toString()
                categoriesUpperCase.push(i.toUpperCase())
                
            }

            if (categoriesUpperCase.includes(argsNew[0].toString().toUpperCase())) {
                //filter shop.json for the right category so the page system works
                var categories = []
                for (let index = 0; index < tableTickets.length; index++) {
                    try {
                        if(tableTickets[index].category.toUpperCase() == argsNew[0].toString().toUpperCase()){
                            categories.push(tableTickets[index])
                        }
                    } catch (error) {
                        console.log(`Item ${index} in shop.json has no category!\n${JSON.stringify(tableTickets[index])}`);
                    }

                }
                var maxpages = Math.ceil(categories.length / config.generalConfigPoints.maximumEntriesPerPage)
                if(page > maxpages){
                    page = maxpages
                }
                var count = config.generalConfigPoints.maximumEntriesPerPage * (page - 1)
                for (let index =0; index < categories.length; index++) {
                    if(items !== config.generalConfigPoints.maximumEntriesPerPage){
                        if(count < index || count == index){
                                    items = items + 1
                                    if(typeof tableTickets[index].description == "string"){
                                     shop += `Item: ${tableTickets[index].name}\nDescription:\n${tableTickets[index].description}\n\n`
                                    }else{
                                     shop += `Item: ${tableTickets[index].name}\n\n`
                                    }
                        }
                    }
                }
                functions.embedWithFooter(message.channel,"Shop",colourInfo,shop,`Page ${page} of ${maxpages}\nDo ${prefix}shop list ${argsNew[0]};${parseInt(page) + 1}`)
                /*/
                Old code
                for (let index = 0; index < tableTickets.length; index++) {
                   try {
                       if(tableTickets[index].category == argsNew[0]){
                           if(typeof tableTickets[index].description == "string"){
                            shop += `Item: ${tableTickets[index].name}\nDescription:\n${tableTickets[index].description}\n\n`
                           }else{
                            shop += `Item ${tableTickets[index.name]}\n\n`
                           }
                       }
                   } catch (error) {
                       functions.embed(message.channel,"Error",colourWarn,`It seems that an item in shop.json is missing the catogory property!\nDebug info: ${tableTickets[index]}`)
                   } 
                    
                }
                /*/
            }else{
                functions.embed(message.channel,"Oops!",colourWarn,`Category not found! \nPlease do ${prefix}shop list all`)
            }
        }



    }else if(args[1] === "info"){
        if(args.length == 3){
            var item = args[2]
            var item_table
            for (let i = 0; i < tableTickets.length; i++) {
                if (tableTickets[i].name == item) {
                    item_table = tableTickets[i];
                }
            }
            if (item_table) {
                var lines = ""
                for (let i = 0; i < tableTickets.length; i++) {
                    if(tableTickets[i].name == item){
                        lines += `Name: ${tableTickets[i].name}\n\n`
                        if (typeof tableTickets[i].description == "string") {
                        lines += `Description: ${tableTickets[i].description}\n\n`
                        }
                        var action;
                        for (let i = 0; i < tableTickets.length; i++) {
                            if (tableTickets[i].name == item) {
                                action = tableTickets[i]
                            }
                        }
                        lines += `Action: ${action.action}\n\n`
                        lines += `Action Value: ${action.action_parameter}\n\n`
                        if (typeof action.category == "string") {
                            lines += `Category: ${action.category}\n\n`    
                        } else {
                            lines += `Category: None\n\n`
                        }
                        
                        lines += `Other Parameters:\n`
                        if (typeof tableTickets[i].max_buys == "number") {
                        lines += `Parameter: max_buys\nValue: ${action.max_buys}\n\n`
                        }
                        if (typeof tableTickets[i].delay == "number") {
                        lines += `Parameter: delay\nValue: ${action.delay}\n\n`
                        }
                        if (typeof tableTickets[i].cooldown == "number") {
                        lines += `Parameter: cooldown\nValue: ${action.cooldown}\n\n`
                        }
                        if (typeof tableTickets[i].image == "string"){
                            var embed = new discord.MessageEmbed()
                            .setImage(tableTickets[i].image)
                            .setTitle("Info")
                            .setColor(colourInfo)
                            .setDescription(lines)
                        }else{
                            var embed = new discord.MessageEmbed()
                            .setTitle("Info")
                            .setColor(colourInfo)
                            .setDescription(lines)
                        }
                        message.channel.send(embed)
                    }
                }
            }else{
                functions.embed(message.channel,"Error",colourWarn,"Item not found.")
            }
        }else{
            functions.embed(message.channel,"Incorect usage",colourWarn,"Please specify the item...")
        }
    }else if(args[1]== "buy"){
        var itemRaw = args;
        itemRaw.splice(0,2);
        var item = itemRaw.join(" ")
        functions.shop(message,prefix,args,true,item);
    }else if(args[1]== "give"){
        var itemRaw = args;
        itemRaw.splice(0,2);
        var item = itemRaw.join(" ")
        if(message.member.roles.cache.find(role => role.name == config.roles.moderator)){
            functions.shop(message,prefix,args,false,item);
        }else{
        functions.embed(message.channel,"", colourWarn,"You do not have permission to run this command")
        }
    }else if(args[1]=="help"){
        var usage = ""
        usage += `${prefix}shop list;<page> [category]\n`
        usage += `This shows all categories or the category you specifed\n\n`
        usage += `${prefix}shop info <item>\n`
        usage += `This shows you all the information for a shop item\n\n`
        usage += `${prefix}shop buy <item>\n`
        usage += `This will let you buy an item from the shop\n\n`
        usage += `${prefix}shop give\n`
        usage += `This can be used to force buy an item\nNote: This is a Moderator only command and it will buy the item for yourself!`
        functions.embed(message.channel,"Shop help",colourInfo,usage)
    }else if(args[1]=="pain"){
        message.delete().then(() => {
            if(args[2] == "..."){
                let pain = ""
                pain += "Point/Shop system\n"
                pain += "Made with pain\n"
                functions.embed(message.channel,"bruh",colourGold,pain)
            }else{
                functions.embed(message.channel,"",colourWarn,"Please do `" + prefix + "shop help` for help.")
            }
        });
    }else{
        functions.embed(message.channel,"",colourWarn,"Please do `" + prefix + "shop help` for help.")
    }
}
}