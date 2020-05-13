const Discord = require('discord.js');
const fs = require('fs');

/**
 * @param {any} bot The Discord Client object.
 */
module.exports = (bot) => {
    bot.sideload = new Discord.Collection();
    let sideloads = fs.readdirSync('./sideload/').filter(f => {if(f.indexOf('.js') > -1) return f;});
    if(sideloads.length <= 0) {
        console.error('\x1b[31m%s\x1b[0m','Required directory is empty! Cannot proceed without any command modules installed. Exiting...');
        return process.exit(-1);
    }
    sideloads.forEach(i => {
        delete require.cache[require.resolve(`../sideload/${i}`)];
        let pull = require(`../sideload/${i}`);
        bot.sideload.set(pull.task, pull);
    });
}