const Discord = require('discord.js');
const fs = require('fs');

const {prefix} = require('../configurations/core.json');

module.exports = {
    task: 'message',
    run: async message => {
        var args = message.content.split(/ +/);
        var coms = args.shift().slice(prefix.length);
        var execute = message.client.commands.get(coms) || message.client.commands.find(a => a.alias && a.alias.includes(coms));
        try {
            execute.run(message, args)
        } catch(e) {
            if(e) throw e;
        }
    }
}