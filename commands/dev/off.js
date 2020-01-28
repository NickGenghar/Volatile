const dev = require('../../configurations/dev.json');

module.exports = {
    name: 'off',
    alias: ['off', 'oof', 'offline', 'shutdown'],
    desc: 'End the bot',
    run: async (msg, args) => {
        if(!dev.includes(msg.author.id)) return;
        await msg.delete().catch(e => console.error(e));
        process.exit(0);
    }
}