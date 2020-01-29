const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'help',
    alias: ['help', 'h'],
    desc: 'Get help',
    run: async (msg, args) => {
        var commands = [];
        var index = 0;

        //retrieving information and get the command type and location data dynamically as well.
        let commandFolder = fs.readdirSync('./commands').filter((folder) => {if(folder.indexOf('.') < 0) return folder});
        commandFolder.forEach(subFolder => {
            let commandFiles = fs.readdirSync(`./commands/${subFolder}`).filter(files => {if(files.indexOf('.js') > -1) return files});
            commandFiles.forEach((files) => {
                let pull = require(`../${subFolder}/${files}`);
                commands[index++] = {
                    name: pull.name,
                    alias: pull.alias,
                    desc: pull.desc,
                    type: subFolder.toString(),
                    location: `./commands/${subFolder}/${files}`
                };
            });
        });

        if(args[0]) {
            let finalCommand = commands.find(n => n.name == args[0]);
            var helpEmbed = new Discord.MessageEmbed()
            .setThumbnail(msg.client.user.displayAvatarURL)
            .addField('Name', finalCommand.name)
            .addField('Alias', finalCommand.alias)
            .addField('Description', finalCommand.desc)
            .addField('Type', finalCommand.type)
            .addField('Location', finalCommand.location);
        } else {
            var helpEmbed = new Discord.MessageEmbed()
            .setTitle('Available Commands')
            .setThumbnail(msg.client.user.displayAvatarURL)
            .addField('Commands', commands.map(n => n.name));
        }

        return msg.channel.send({embed: helpEmbed});
    }
}