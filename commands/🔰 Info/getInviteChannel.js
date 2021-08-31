const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const { MessageButton } = require('discord.js')
const { handlemsg } = require("../../handlers/functions")
module.exports = {
  name: "getinvitechannel",
  category: "🔰 Info",
  usage: "getinvitechannel",
  description: "Gives you an Invite link for an Channel",
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    try {
      let Channel = message.mentions.channels.first()
      if(!Channel) Channel = await client.channels.fetch(args[0])
      if(!Channel) 
      return message.reply(handlemsg(client.la[ls].cmds.info.getinvitechannel.error)) 
      let msg = await client.getInvite(Channel.id)
      message.reply(msg);
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
