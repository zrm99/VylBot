const discord = require('discord.js');
const config = require('../config.json');
const functions = require('../functions.js');
const randomPuppy = require('random-puppy');

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

module.exports = {
	name: 'bunny',
	description: 'Gives you a bunny pic',
	category: 'fun',
	usage: '',
    roles: 'everyone',
    run: function(message, prefix, args) {
        //sets a var for the using a full image in the embed or just the thumbnail
        var fullImage = false
        //if statement for that thing i mention 2 lines above this ^^
        if (config.commands.bunnyImage) {
            fullImage = true
        }
        //put image in a var and call randompuppy
        var image = randomPuppy('Rabbits').then(function (image) {
            var embed = new discord.RichEmbed()
            //seting the embed stuff
            .setTitle("Bunny Appreciation Post")
            .setDescription("Just look at him aaaa")
            .setColor(colourInfo)
            if (fullImage) {
                embed.setImage(image)
            }else{
                embed.setThumbnail(image)
            }
            //sending the message
            message.channel.send(embed)
        })
    }
}