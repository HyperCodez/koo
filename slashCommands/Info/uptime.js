const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const {
  duration
} = require("../../handlers/functions")
const moment = require("moment")
module.exports = {
  name: "uptime",
  description: "Returns the duration on how long the Bot is online",  run: async (client, interaction, cmduser, es, ls, prefix, player) => {
    //things u can directly access in an interaction!
    const { member, channelId, guildId, applicationId, commandName, deferred, replied, ephemeral, options, id, createdTimestamp } = interaction; 
    const { guild } = member;
    
    try {
      let date = new Date()
      let timestamp = date.getTime() - Math.floor(client.uptime);
      interaction.reply({ephemeral: true, embeds: [new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
        .setTitle(eval(client.la[ls]["cmds"]["info"]["uptime"]["variable1"]))
        .setDescription(eval(client.la[ls]["cmds"]["info"]["uptime"]["variable2"]))
        .addField(eval(client.la[ls]["cmds"]["info"]["uptime"]["variablex_3"]), eval(client.la[ls]["cmds"]["info"]["uptime"]["variable3"])
        )]}
      );
    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
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
