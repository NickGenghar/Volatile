//Pull dependencies
const Discord = require('discord.js');
const fs = require('fs');

//Pull files
const core = require('./configurations/core.json');
const {token} = require('./configurations/token.json');

//Core components
const sideload = new Discord.Collection();
let sideloads = fs.readdirSync('./sideload/').filter(f => {if(f.indexOf('.js') > -1) return f;});
if(sideloads.length <= 0) {
    console.error('\x1b[31m%s\x1b[0m','Required directory is empty!');
    return process.exit(-1);
}
sideloads.forEach(i => {
    let pull = require(`./sideload/${i}`);
    sideload.set(pull.task, pull);
})

//Create bot
const bot = new Discord.Client();

bot.login(token);

bot.once('ready', () => {
    console.log('\x1b[32m%s\x1b[0m','Volatile Ready.');
});

bot.on('message', async message => {
    if(message.content.startsWith(core.prefix)) {
        let cmd = sideload.get('message');
        try {
            cmd.run(message);
        } catch(e) {
            if(e) throw e;
        }
    }
})