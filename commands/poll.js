const config = require('../config.json');
const functions = require('../functions.js');
const fs = require('fs');

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
         var optionOne = args[0];
         var optionTwo = args[1];
         let pollOptions = {
            optionOne = args[0],
            optionTwo = args[1]
         }
         let data = JSON.stringify(pollOptions, null, 2);
         fs.writeFileSync('poll.json', data);
         //putting the title into a var with a fancy loop
         var temp = 2;
         var title
         for(temp < args.length){
         title = title + args[temp] + " "
         }
         //actully sending the message
         functions.embed(config.poll,title,colourInfo, `:one: ${optionOne} \n :two: ${optionTwo}`)
         //putting the last message(the poll) into a var for later use
         var lastMessage = message.channel.last_message;
         //reacting with the vote options
         lastMessage.react("👍");
         lastMessage.react("👎");
     }else {
        //sending the: "no permissions" message
        functions.embed(message.channel, "", colourWarn, "You do not have permission to run this command");
     }
   }if(args.length === 1){
     if(args[0] == "end"){
             let rawdata = fs.readFileSync('poll.json');
             let options = JSON.parse(rawdata);
             var optionOne = options.optionOne
             var optionTwo = options.optionTwo
             //deleting the sender message for the reaction collection thing...
             message.delete();
             //setting up stuff
             var lastMessage = message.channel.last_message;
             //collection 1
             const filter = (reaction) => reaction.emoji.name === '👍';
             const collector = message.createReactionCollector(filter);
             var optionEndOne 
             collector.on('end', collected => optionEndOne = `${collected.size}`);
             //collection 2
             const filter2 = (reaction) => reaction.emoji.name === '👎';
             const collector2 = message.createReactionCollector(filter2);
             var optionEndTwo 
             collector2.on('end', collected => optionEndTwo = `${collected.size}`);
             //sending the result
             var winner
             if(optionEndTwo < optionEndOne) {
             winner = `${optionOne} has won!`;
             }else{
             winner = `${optionTwo} has won!`;
             }
             functions.embed(message.channel,"The Poll has ended:", colourInfo, `${optionEndOne} have chosen the option: ${optionOne}\n and ${optionEndTwo} have chosen the option: ${optionTwo}\n${winner}`);
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
