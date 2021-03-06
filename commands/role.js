const config = require('../config.json');
const functions = require('../functions.js');

var colourInfo = config.messageColours.info
var colourWarn = config.messageColours.warn;

module.exports = {
    name: 'role',
    description: 'Toggles a role for the user to gain/remove',
    category: 'general',
    usage: '[name]',
    roles: 'everyone',
    run: function(message, prefix, args) {
		var roles = config.assignableRoles;
        var requestedRole = "";
        if (args.length > 1) {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].toLowerCase() == args[1].toLowerCase()) {
                    requestedRole = roles[i];
                }
            }

            if (requestedRole != "") {
                var role = message.guild.roles.find(r => r.name == requestedRole);

                if (message.member.roles.find(r => r.name == requestedRole)) {
                    message.member.removeRole(role).then(() => {
                        functions.embed(message.channel, "", colourInfo, `Removed role: ${requestedRole}`);
                    }).catch(err => {
                        console.log(err);
                        functions.embed(message.channel, "", colourWarn, "An error occured. Please contact the bot owner");
                    });
                } else {
                    message.member.addRole(role).then(() => {
                        functions.embed(message.channel, "", colourInfo, `Gave role: ${requestedRole}`);
                    }).catch(err => {
                        console.log(err);
                        functions.embed(message.channel, "", colourWarn, "An error occured. Please contact the bot owner");
                    });
                }
            } else {
                    functions.embed(message.channel, "", colourInfo, "This role does not exist, see assignable roles with the roles command");
            }
        } else {
            var roles = `Do ${prefix}role <role> to get the role!\n`;

            for (let i = 0; i < config.assignableRoles.length; i++) {
                 roles += `${config.assignableRoles[i]}\n`;
            }

            functions.embed(message.channel, "Roles", colourInfo, roles);
        }
    }

}