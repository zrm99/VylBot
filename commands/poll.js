const config = require('../config.json');
const functions = require('../functions.js');

var colourInfo = config.messageColours.info;
var colourWarn = config.messageColours.warn;

exports.run = function(message, prefix, args) {
    //checks if anyone was that dumb and tried to make a poll in a none poll channel... Idiots...
    if(message.channel.name = config.channels.poll){
        var Poll
        //checks for length
        if(args.length === 3){
    //checks for permissions because thats how it works right?
    if (message.member.roles.find(role => role.name == config.roles.moderator)) {
        //putting the options into a var to use later
        var option_one = args[0];
        var option_two = args[1];
        //putting the title into a var with a fancy loop
        var temp = 2;
        for(temp < args.length){
        var title = title + args[i] + " "
        }
        //actully sending the message
        functions.embed(config.poll,title,colourInfo, ":one:" + option_one + "\n"+ option_two)
        //putting the last message(the poll) into a var for later use
        var last_message = message.channel.last_message;
        //reacting with the vote options
        last_message.react("👍");
        last_message.react("👎");
    }else {
        //sending the: "no permissions" message
        functions.embed(message.channel, "", colourWarn, "You do not have permission to run this command");
    }
   }if(args.length === 0){
    if(agrs[0] == "end"){
            //deleting the sender message for the reaction collection thing...
            message.delete();
            //setting up stuff
            var last_message = message.channel.last_message;
            //collection 1
            const filter = (reaction) => reaction.emoji.name === '👍';
            const collector = message.createReactionCollector(filter);
            var option_end_one 
            collector.on('end', collected => option_end_one = `${collected.size}`);
            //collection 2
            const filter2 = (reaction) => reaction.emoji.name === '👎';
            const collector2 = message.createReactionCollector(filter2);
            var option_end_two 
            collector2.on('end', collected => option_end_two = `${collected.size}`);
            //sending the result
            functions.embed(message.channel, "The Poll has ended:", colourInfo, option_end_one + ` have chosen the first option. \n` + option_end_two + " have chosen the second option.");
    }
   }else{
       //sends a message for all the people not knowing how to make a poll... Idiots...
       message.delete()
       functions.embed(message.channel,"Not enough info",colourWarn, "Please use: " + config.prefix + "poll <option1> <option2> <title> or " + config.prefix + "poll end")
   }
  }else {
      //deleting the message because: 1. I like to 2. Because it was the wrong channel and 3. beacause
      message.delete()
  }
}
