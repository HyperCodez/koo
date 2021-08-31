const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const translate = require("translatte");
const { handlemsg } = require("../../handlers/functions");
module.exports = {
  name: "translate",
  category: "🔰 Info",
  aliases: ["trans", "tran", "tr"],
  cooldown: 5,
  usage: "translate <from> <to> <TEXT>",
  description: "Gives you an Invite link for this Bot",
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    try {
      if(!args[0]) return message.reply(handlemsg(client.la[ls].cmds.info.translate.error, {prefix: prefix}))
      if(!args[1]) return message.reply(handlemsg(client.la[ls].cmds.info.translate.error, {prefix: prefix}))
      if(!args[2]) return message.reply(handlemsg(client.la[ls].cmds.info.translate.error, {prefix: prefix}))

      translate(args.slice(2).join(" "), {from: args[0], to: args[1]}).then(res=>{
        let embed = new MessageEmbed()
        .setColor(es.color)
        .setAuthor(handlemsg(client.la[ls].cmds.info.translate.to, { to: args[1] }), "https://imgur.com/0DQuCgg.png", "https://discord.gg/sngXqWK2eP")
        .setFooter(handlemsg(client.la[ls].cmds.info.translate.from, { from: args[0] }), message.author.displayAvatarURL({dynamic:true}))
        .setDescription(eval(client.la[ls]["cmds"]["info"]["translate"]["variable1"]))
        message.reply({embeds: [embed]})
        }).catch(err => {
          let embed = new MessageEmbed()
          .setColor(RED)
          .setTitle(client.la[ls].common.erroroccur)
          .setDescription(String("```"+err.stack+"```").substr(0, 2000))
          message.reply({embeds: [embed]})
            console.log(err);
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
