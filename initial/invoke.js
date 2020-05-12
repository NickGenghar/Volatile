/**
 * @param {any} bot The Discord Client object.
 * @param {String} code Handler code for the received object.
 * @param {any} first First receiving object.
 * @param {any} [second] Second receiving object.
 */
module.exports = (bot, code, first, second) => {
    try {bot.sideload.get(code).run(first, second);}
    catch(e) {if(e) throw e;}
}