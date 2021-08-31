const {
	MessageEmbed, MessageButton, MessageActionRow
} = require("discord.js")
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const { handlemsg } = require("../../handlers/functions")
module.exports = {
  name: "invite",
  category: "🔰 Info",
  aliases: ["add"],
  usage: "invite",
  description: "Gives you an Invite link for this Bot",
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    try {
      let button_public_invite = new MessageButton().setStyle('LINK').setLabel(handlemsg(client.la[ls].cmds.info.invite.buttons.public)).setURL("https://clan.milrato.eu")
      let button_support_dc = new MessageButton().setStyle('LINK').setLabel(handlemsg(client.la[ls].cmds.info.invite.buttons.server)).setURL("https://discord.com/invite/sngXqWK2eP")
      let button_invite = new MessageButton().setStyle('LINK').setLabel(handlemsg(client.la[ls].cmds.info.invite.buttons.bot)).setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
      //array of all buttons
      const allbuttons = [new MessageActionRow().addComponents([button_public_invite, button_support_dc, button_invite])]
      message.reply({
        embeds: [new MessageEmbed()
          .setColor(ee.color)
          .setTitle(handlemsg(client.la[ls].cmds.info.invite.title))
          .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
          .setFooter(`${client.user.username} | powered by milrato.eu`, "https://imgur.com/jPItIw0.gif")],
        components: allbuttons
      });
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
