/**
 * @param {any} bot The Discord Client object.
 * @param {String} code Handler code for the received object.
 * @param {any} first First receiving object.
 * @param {any} [second] Second receiving object.
 */
module.exports = (bot, code, first, second) => {
    let execute = bot.sideload.get(code);
    if(typeof execute === 'undefined') return;
    try {execute.run(first, second);}
    catch(e) {if(e) throw e;}
}