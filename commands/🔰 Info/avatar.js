const Discord = require("discord.js");
const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const {
  GetUser,
  GetGlobalUser,
  handlemsg
} = require("../../handlers/functions")
module.exports = {
  name: "avatar",
  aliases: ["av"],
  category: "🔰 Info",
  description: "Get the Avatar of an user",
  usage: "avatar [@USER] [global/guild]",
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    try {
      //"HELLO"
      var user;
      try {
        if (args[1] && args[1].toLowerCase() == "global") {
          args.pop()
          user = await GetGlobalUser(message, args)
        } else {
          user = await GetUser(message, args)
        }
      } catch (e) {
        return message.reply(e)
      }
      message.reply({embeds: [new Discord.MessageEmbed()
        .setAuthor(handlemsg(client.la[ls].cmds.info.avatar.author, {
          usertag: user.tag
        }), user.displayAvatarURL({
          dynamic: true
        }), "https://discord.gg/sngXqWK2eP")
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .addField("<:arrow:832598861813776394> PNG", `[\`LINK\`](${user.displayAvatarURL({format: "png"})})`, true)
        .addField("<:arrow:832598861813776394> JPEG", `[\`LINK\`](${user.displayAvatarURL({format: "jpg"})})`, true)
        .addField("<:arrow:832598861813776394> WEBP", `[\`LINK\`](${user.displayAvatarURL({format: "webp"})})`, true)
        .setURL(user.displayAvatarURL({
          dynamic: true
        }))
        .setFooter(es.footertext, es.footericon)
        .setImage(user.displayAvatarURL({
          dynamic: true,
          size: 512,
        }))]}
      );
    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply({embeds: [new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(eval(client.la[ls]["cmds"]["info"]["avatar"]["variable1"]))
      ]});
    }
  }
}
/*
 * @INFO
 * Bot Coded by Tomato#6966 | https://discord.gg/sngXqWK2eP
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention him / Milrato Development, when using this Code!
 * @INFO
 */
