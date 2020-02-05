const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'help',
    alias: ['help', 'h'],
    desc: 'Get help',
    run: async (msg, args) => {
        if(args[0]) {
            let finalCommand = msg.client.commands.find(n => n.name == args[0]);
            var helpEmbed = new Discord.MessageEmbed()
            .setThumbnail(msg.client.user.displayAvatarURL)
            .addField('Name', finalCommand.name)
            .addField('Alias', finalCommand.alias)
            .addField('Description', finalCommand.desc)
            .addField('Type', finalCommand.type)
            .addField('Location', finalCommand.location);
        } else {
            let commandTypes = msg.client.commands.map(n => n.type).filter((v, i, s) => {return s.indexOf(v) === i});
            var helpEmbed = new Discord.MessageEmbed()
            .setTitle('Available Commands')
            .setThumbnail(msg.client.user.displayAvatarURL);
            for(let i = 0; i < commandTypes.length; i++) {
                helpEmbed.addField(commandTypes[i], msg.client.commands.filter(t => t.type == commandTypes[i]).map(c => c.name), true);
            }
        }

        return msg.channel.send({embed: helpEmbed});
    }
}