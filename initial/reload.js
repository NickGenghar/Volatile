const Discord = require('discord.js');
const fs = require('fs');

/**
 * @param {any} bot The Discord Client object.
 */
module.exports = (bot) => {
    bot.commands = new Discord.Collection();
    let commandFolder = fs.readdirSync('./commands').filter(folder => {if(folder.indexOf('.') < 0) return folder});
    if(commandFolder.length <= 0) {
        console.error('\x1b[31m%s\x1b[0m','Command modules are empty! Cannot proceed if no commands are present. Exiting...');
        return process.exit(1);
    } else {
        commandFolder.forEach(subFolder => {
            let commandFiles = fs.readdirSync(`./commands/${subFolder}`).filter(files => {if(files.indexOf('.js') > -1) return files});
            if(commandFiles.length <= 0) {
                console.error('\x1b[33m%s\x1b[0m',`Folder [${subFolder}] is empty. Ignoring...`);
            } else {
                let command = [];
                let index = 0;
                commandFiles.forEach(files => {
                    try {
                        delete require.cache[require.resolve(`../commands/${subFolder}/${files}`)];
                        let pull = require(`../commands/${subFolder}/${files}`);
                        command[index] = {
                            name: pull.name,
                            alias: pull.alias,
                            desc: pull.desc,
                            run: pull.run,
                            type: subFolder,
                            location: `./commands/${subFolder}/${files}`
                        }
                        bot.commands.set(command[index].name, command[index++]);
                        console.log('\x1b[36m%s\x1b[0m',`Loaded command [${pull.name}] from [./commands/${subFolder}/${files}]`);
                    } catch(e) {
                        console.error('\x1b[31m%s\x1b[0m',e);
                    }
                });
                if(!command || command.length <= 0) {
                    console.error('\x1b[31m%s\x1b[0m', 'All command subfolders are empty! Cannot proceed without any command modules installed. Exiting...');
                    return process.exit(1);
                }
            }
        });
    }
}