const Discord = require('discord.js');
const fs = require('fs');

const {prefix} = require('../configurations/core.json');

let command = [];
let index = 0;

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
                try {
                    let pull = require(`../commands/${subFolder}/${files}`);
                    command[index++] = {
                        name: pull.name,
                        alias: pull.alias,
                        desc: pull.desc,
                        run: pull.run,
                        type: subFolder,
                        location: `./commands/${subFolder}/${files}`
                    }
                    console.log('\x1b[36m%s\x1b[0m',`Loaded command [${pull.name}] from "./commands/${subFolder}/${files}"`);
                } catch(e) {
                    console.error('\x1b[31m%s\x1b[0m',e);
                }
            })
        }
    })
}

if(!command || command.length <= 0) {
    console.error('\x1b[31m%s\x1b[0m', 'All command subfolders are empty! Cannot proceed without any command modules installed. Exiting...');
    return process.exit(-1);
}

module.exports = {
    task: 'message',
    run: async message => {
        for(let i = 0; i < command.length; i++) message.client.commands.set(command[i].name, command[i]);
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