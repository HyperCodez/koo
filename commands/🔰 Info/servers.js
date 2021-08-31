const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const { swap_pages, handlemsg } = require("../../handlers/functions")
module.exports = {
  name: "servers",
  aliases: ["serversin", "guilds", "guildsin"],
  category: "🔰 Info",
  description: "Shows in Which servers the Bot is in",
  usage: "servers",
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    try {
      var guilds_in = client.guilds.cache.sort((a,b)=> b.memberCount - a.memberCount).map(guild => `${handlemsg(client.la[ls].cmds.info.servers.map, { guildname: guild.name, guildid: guild.id, guildmemberCount: guild.memberCount})}\n`);
      swap_pages(client, message, guilds_in, `${handlemsg(client.la[ls].cmds.info.servers.title, { guildsin: guilds_in.length, bottag: client.user.tag})}`);
    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply({embeds: [new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(eval(client.la[ls]["cmds"]["info"]["color"]["variable2"]))
      ]});
    }
  }
}
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://discord.gg/sngXqWK2eP
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention him / Milrato Development, when using this Code!
 * @INFO
 */
