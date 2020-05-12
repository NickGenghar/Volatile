//Pull dependencies
const Discord = require('discord.js');

//Pull inits
const reload = require('./initial/reload.js');
const sideload = require('./initial/sideloading.js');
const invoke = require('./initial/invoke.js');

//Pull files
const core = require('./configurations/core.json');
const {token} = require('./configurations/token.json');

//Create bot
const bot = new Discord.Client();
sideload(bot);
reload(bot);

process.on('unhandledRejection', e => {
    console.log('\x1b[31m%s\x1b[0m', e);
})

bot.login(token);

bot.once('ready', () => {
    console.log('\x1b[32m%s\x1b[0m',`${bot.user.username} Ready.`);
});

bot.on('message', async message => {
    if(message.content.startsWith(core.prefix)) {
        invoke(bot, 'message', message);
    }
});