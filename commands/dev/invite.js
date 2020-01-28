module.exports = {
    name: 'invite',
    alias: ['invite', 'i'],
    desc: 'Invite the bot to your server.',
    run: async (msg, args) => {
        return msg.channel.send('https://discordapp.com/api/oauth2/authorize?client_id=671568159119245378&permissions=8&scope=bot');
    }
}