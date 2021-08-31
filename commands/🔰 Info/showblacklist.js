const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const { swap_pages } = require("../../handlers/functions")
module.exports = {
  name: "showblacklist",
  category: "🔰 Info",
  aliases: ["blacklist", "blacklistedwords", "bwords"],
  cooldown: 2,
  usage: "showblacklist",
  description: "Shows all blacklisted Words!",
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    try {
      let words = client.blacklist.get(message.guild.id, "words");
      if(!words || words.length <= 0) words = ["No Blacklisted Words added yet!"]
      return swap_pages(client, message, `${words.map(word => `\`${word}\``.split("`").join("\`"))}`, `${message.guild.name} | ${client.la[ls].cmds.info.showblacklist.info}`)
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
