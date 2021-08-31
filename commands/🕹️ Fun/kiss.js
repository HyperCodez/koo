const Discord = require("discord.js");
const {MessageEmbed, MessageAttachment} = require("discord.js");
const config = require("../../botconfig/config.json");
const canvacord = require("canvacord");
var ee = require("../../botconfig/embed.json");
const request = require("request");
const emoji = require(`../../botconfig/emojis.json`);
const path = require("path");
module.exports = {
  name: path.parse(__filename).name,
  category: "🕹️ Fun",
  usage: `${path.parse(__filename).name}[@User]`,
  description: "*Image cmd in the style:* " + path.parse(__filename).name,
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
        if(!client.settings.get(message.guild.id, "FUN")){
          return message.reply({embeds : [new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(client.la[ls].common.disabled.title)
            .setDescription(require(`../../handlers/functions`).handlemsg(client.la[ls].common.disabled.description, {prefix: prefix}))
          ]});
        }
    try {
      let tempmsg = await message.reply({embeds  : [new MessageEmbed()
        .setColor(es.color)
        .setFooter(es.footertext, es.footericon)
        .setAuthor( 'Getting Image Data..', 'https://images-ext-1.discordapp.net/external/ANU162U1fDdmQhim_BcbQ3lf4dLaIQl7p0HcqzD5wJA/https/cdn.discordapp.com/emojis/756773010123522058.gif')
      ]});
      //find the USER
      let user = message.mentions.users.first();
      if(!user && args[0] && args[0].length == 18) {
        let tmp = await client.users.fetch(args[0])
        if(tmp) user = tmp;
        if(!tmp) return message.reply({content : eval(client.la[ls]["cmds"]["fun"]["kiss"]["variable2"])})
      }
      else if(!user && args[0]){
        let alluser = message.guild.members.cache.map(member=> String(member.user.username).toLowerCase())
        user = alluser.find(user => user.includes(args[0].toLowerCase()))
        user = message.guild.members.cache.find(me => (me.user.username).toLowerCase() == user).user
        if(!user || user == null || !user.id) return message.reply({content : eval(client.la[ls]["cmds"]["fun"]["kiss"]["variable3"])})
      }
      else {
        user = message.mentions.users.first() || message.author;
      }
      //find the USER
      let user2 = message.mentions.users.last();
      if(!user2 && args[1] && args[1].length == 18) {
        let tmp = await client.users.fetch(args[1])
        if(tmp) user2 = tmp;
        if(!tmp) user2 = message.author;
      }
      else if(!user2 && args[1]){
        let alluser = message.guild.members.cache.map(member=> String(member.user.username).toLowerCase())
        user2 = alluser.find(user => user.includes(args[1].toLowerCase()))
        user2 = message.guild.members.cache.find(me => (me.user.username).toLowerCase() == user2).user
        if(!user2 || user2 == null || !user2.id) user2 = message.author;
      }
      else {
        user2 = message.mentions.users.last() || message.author;
      }
      if(user.id == user2.id){
        user2 == message.author;
      }
      let avatar = user.displayAvatarURL({
        dynamic: false,
        format: "png"
      });
      let avatar2 = user2.displayAvatarURL({
        dynamic: false,
        format: "png"
      });
      let image = await canvacord.Canvas.kiss(avatar, avatar2);
      let attachment = await new Discord.MessageAttachment(image, "kiss.png");
      let fastembed2 = new Discord.MessageEmbed().setColor(es.color).setFooter(es.footertext, es.footericon).setImage("attachment://kiss.png").attachFiles(attachment);
      await message.reply({embeds : [fastembed2]});
      await tempmsg.delete().catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray))
    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply({embeds : [new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(eval(client.la[ls]["cmds"]["fun"]["kiss"]["variable4"]))
      ]});
    }
  },
};
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://discord.gg/sngXqWK2eP
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention him / Milrato Development, when using this Code!
 * @INFO
 */
