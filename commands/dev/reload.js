const dev = require('../../configurations/dev.json');
const reload = require('../../initial/reload.js');

module.exports = {
    name: 'reload',
    alias: ['reload','r','init'],
    desc: 'Reloads the command module',
    run: async (msg, args) => {
        if(!dev.includes(msg.author.id)) return;
        msg.delete()
        .then(() => {
            console.clear();
            reload(msg.client);
        })
        .catch(e => {
            if(e) throw e;
        });
    }
}