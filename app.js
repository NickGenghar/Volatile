const {ShardingManager} = require('discord.js');
const {token} = require('./configurations/token.json');

const manager = new ShardingManager('./bot.js', {token: token});

manager.spawn();
manager.on('launch', shard => {console.log(`Launched shard ${shard.id}`)});