const Discord = require('discord.js');
const fs = require('fs');

const {prefix} = require('../configurations/core.json');

const executer = new Discord.Collection();

let commandFolder = fs.readdirSync('./commands').filter(folder => {if(folder.indexOf('.') < 0) return folder});
if(commandFolder.length <= 0) {
    console.error('\x1b[31m%s\x1b[0m','Command modules are empty! Cannot proceed if no commands are present. Exiting...');
    return process.exit(-1);
} else {
    commandFolder.forEach(subFolder => {
        let commandFiles = fs.readdirSync(`./commands/${subFolder}`).filter(files => {if(files.indexOf('.js') > -1) return files});
        if(commandFiles.length <= 0) {
            console.error('\x1b[33m%s\x1b[0m',`Folder "${subFolder}" is empty. Ignoring...`);
        } else {
            commandFiles.forEach(files => {
                let pull = require(`../commands/${subFolder}/${files}`);
                executer.set(pull.name, pull);
                console.log('\x1b[36m%s\x1b[0m',`Loaded command [${pull.name}] from "./commands/${subFolder}/${files}"`);
            })
        }
    })
}

module.exports = {
    task: 'message',
    run: async message => {
        var args = message.content.split(/ +/);
        var coms = args.shift().slice(prefix.length);
        var execute = executer.get(coms) || executer.find(a => a.alias && a.alias.includes(coms));
        try {
            execute.run(message, args)
        } catch(e) {
            if(e) throw e;
        }
    }
}