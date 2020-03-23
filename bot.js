const discord = require('discord.js');
const client = new discord.Client();
const config = require('./config.json');
const functions = require('./functions.js');

client.once('ready', onReady);
client.on('message', onMessage);
client.on('messageDelete', onDelete);
client.on('messageUpdate', onEdit);

const devbuild = true;

var prefix = config.prefix.live;
if (devbuild) prefix = config.prefix.dev;

var colourRed = 0xe02702;
var colourPurple = 0x7200b5;
var colourBlue = 0x0754c6;
var colourGreen = 0x0ac97c;

function onReady() {
    client.user.setActivity("");
    console.log('Ready!');
}

function onMessage(message) {
    if (!message.guild) return;

    var content = message.content;

    if (content.substring(0, prefix.length).toLowerCase() == prefix.toLowerCase()) {
        var args = content.substring(prefix.length).split(" ");

        if (args[0] == "help") {
            var commands = "";
            
            commands += prefix + "about\n";
            commands += prefix + "ban <user> [reason]\n";
            commands += prefix + "help\n";
            commands += prefix + "kick <user> [reason]\n";
            commands += prefix + "mute <user> [reason]\n";
            commands += prefix + "role <name>\n";
            commands += prefix + "roles\n";
            commands += prefix + "unmute <user>\n";
            
            functions.embed(message.channel, "Commands", colourGreen, commands);
        }
        
        if (args[0] == "about") {
        	var commands = "";
        	
        	commands += "Version: 1.1.2b2\n";
        	commands += "Author: Vylpes\n";
        	commands += "Date: 23-Mar-20\n";
        	
        	functions.embed(message.channel, "About", colourGreen, commands);
        }

        if (args[0] == "roles") {
            var roles = "";

            roles += config.assignableRoles.notify + "\n";
            roles += config.assignableRoles.poll + "\n";

            functions.embed(message.channel, "Roles", colourGreen, roles);
        }

        if (args[0] == "role") {
            if (args[1] == config.assignableRoles.notify) {
                var role = message.guild.roles.find(role => role.name == config.assignableRoles.notify);

                if (message.member.roles.find(role => role.name == config.assignableRoles.notify)) {
                    message.member.removeRole(role).then(() => {
                        functions.embed(message.channel, "", colourGreen, "Removed the notify role");
                    }).catch(err => {
                        console.log(err);
                    });
                } else {
                    message.member.addRole(role).then(() => {
                        functions.embed(message.channel, "", colourGreen, "Given the notify role"); 
                    }).catch(err => {
                        console.log(err);
                    });
                }
            } else if (args[1] == config.assignableRoles.poll) {
                var role = message.guild.roles.find(role => role.name == config.assignableRoles.poll);

                if (message.member.roles.find(role => role.name == config.assignableRoles.poll)) {
                    message.member.removeRole(role).then(() => {
                        functions.embed(message.channel, "", colourGreen, "Removed the vote pings role");
                    }).catch(err => {
                        console.log(err);
                    });
                } else {
                    message.member.addRole(role).then(() => {
                        functions.embed(message.channel, "", colourGreen, "Given the vote pings role"); 
                    }).catch(err => {
                        console.log(err);
                    });
                }
            } else {
                functions.embed(message.channel, "", colourRed, "This role doesn't exist, you can view assignable roles with " + prefix + "roles");
            }
        }

        if (args[0] == "kick") {
            if (message.member.roles.find(role => role.name == config.roles.moderator)) {
                var user = message.mentions.users.first();

                if (user) {
                    var member = message.guild.member(user);

                    if (member) {
                        var argsReason = args;
                        argsReason.splice(0, 2);
                        
                        var reason = argsReason.join(" ");

                        member.kick(reason).then(() => {
                            functions.embed(message.channel, "", colourPurple, user.tag + " has been kicked");
                            functions.embed(message.guild.channels.find(channel => channel.name == config.channels.logging), "Member Kicked", colourRed, "Member: " + user.tag + "\n Reason: " + reason + "\n Moderator: " + message.author.tag);
                        }).catch(err => {
                            message.reply("I was unable to kick the member");
                            console.log(err);
                        });
                    } else {
                        functions.embed(message.channel, "", colourRed, "This user is not in the server");
                    }
                } else {
                    functions.embed(message.channel, "", colourRed, "Please specify a user by mentioning them");
                }
            } else {
                functions.embed(message.channel, "", colourRed, "You do not have permission to run this command");
            }

            message.delete();
        }

        if (args[0] == "ban") {
            if (message.member.roles.find(role => role.name == config.roles.moderator)) {
                var user = message.mentions.users.first();

                if (user) {
                    var member = message.guild.member(user);

                    if (member) {
                        var argsReason = args;
                        argsReason.splice(0, 2);

                        var reason = argsReason.join(" ");

                        member.ban(reason).then(() => {
                            functions.embed(message.channel, "", colourPurple, user.tag + " has been banned");
                            functions.embed(message.guild.channels.find(channel => channel.name == config.channels.logging), "Member Banned", colourRed, "Member: " + user.tag + "\n Reason: " + reason + "\n Moderator: " + message.author.tag);
                        }).catch(err => {
                            message.reply("I was unable to ban the member");
                            console.log(err);
                        });
                    } else {
                        functions.embed(message.channel, "", colourRed, "This user is not in the server");
                    }
                } else {
                    functions.embed(message.channel, "", colourRed, "Please specify a user by mentioning them");
                }
            } else {
                functions.embed(message.channel, "", colourRed, "You do not have permission to run this command");
            }

            message.delete();
        }

        if (args[0] == "mute") {
            if (message.member.roles.find(role => role.name == config.roles.moderator)) {
                var user = message.mentions.users.first();

                if (user) {
                    var member = message.guild.member(user);

                    if (member) {
                        var argsReason = args;
                        argsReason.splice(0, 2);

                        var reason = argsReason.join(" ");

                        var mutedRole = message.guild.roles.find(role => role.name == config.roles.muted);
                        
                        member.addRole(mutedRole).then(() => {
                            functions.embed(message.channel, "", colourPurple, user.tag + " has been muted");
                            functions.embed(message.guild.channels.find(channel => channel.name == config.channels.logging), "Member Muted", colourRed, "Member: " + user.tag + "\n Reason: " + reason + "\n Moderator: " + message.author.tag)
                        }).catch(err => {
                            console.log(err);
                        });
                    } else {
                        functions.embed(message.channel, "", colourRed, "This user is not in the server");
                    }
                } else {
                    functions.embed(message.channel, "", colourRed, "Please specify a user by mentioning them");
                }
            } else {
                functions.embed(message.channel, "", colourRed, "You do not have permssion to run this command");
            }

            message.delete();
        }

        if (args[0] == "unmute") {
            if (message.member.roles.find(role => role.name == config.roles.moderator)) {
                var user = message.mentions.users.first();

                if (user) {
                    var member = message.guild.member(user);

                    if (member) {
                        var mutedRole = message.guild.roles.find(role => role.name == config.roles.muted);
                        
                        member.removeRole(mutedRole).then(() => {
                            functions.embed(message.channel, "", colourPurple, user.tag + " has been unmuted");
                            functions.embed(message.guild.channels.find(channel => channel.name == config.channels.logging), "Member Unmuted", colourBlue, "Member: " + user.tag + "\n Moderator: " + message.author.tag)
                        }).catch(err => {
                            console.log(err);
                        });
                    } else {
                        functions.embed(message.channel, "", colourRed, "This user is not in the server");
                    }
                } else {
                    functions.embed(message.channel, "", colourRed, "Please specify a user by mentioning them");
                }
            } else {
                functions.embed(message.channel, "", colourRed, "You do not have permission to run this command");
            }

            message.delete();
        }
    }
}

function onDelete(message) {	
	if(message.author.bot) return;
	
	functions.embed(message.guild.channels.find(channel => channel.name == config.channels.logging), "Message Deleted", colourBlue, "Member: " + message.author.tag + "\nMessage: " + message.content + "\nChannel: " + message.channel);
}

function onEdit(oldMessage, newMessage) {
	if (newMessage.author.bot) return;
	if (oldMessage.content == newMessage.content) return;
	
	functions.embed(newMessage.guild.channels.find(channel => channel.name == config.channels.logging), "Message Edited", colourBlue, "Member: " + newMessage.author.tag + "\nOld: " + oldMessage.content + "\nNew: " + newMessage.content + "\nChannel: " + newMessage.channel);
}

if (devbuild) {
	client.login(config.tokens.dev);
} else {
	client.login(config.tokens.live);
}