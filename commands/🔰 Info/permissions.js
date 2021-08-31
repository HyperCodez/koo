const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const moment = require('moment');
const { GetUser, GetGlobalUser } = require("../../handlers/functions")
const { handlemsg } = require("../../handlers/functions");
module.exports = {
  name: "permissions",
  aliases: ["perms"],
  category: "🔰 Info",
  description: "Get permissions information about a user",
  usage: "permissions [@USER]",
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
		try {   
      var user;
      if(args[0]){
        try{
          user = await GetUser(message, args)
        }catch (e){
          if(!e) return message.reply(client.la[ls].common.usernotfound)
          return message.reply(e)
        }
      }else{
        user = message.author;
      }
      if(!user || user == null || user.id == null || !user.id) return message.reply(client.la[ls].common.usernotfound)
      try{
        const member = message.guild.members.cache.get(user.id);
        //create the EMBED
        const embeduserinfo = new MessageEmbed()
        embeduserinfo.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
        embeduserinfo.setAuthor(handlemsg(client.la[ls].cmds.info.permissions.from, {usertag: member.user.tag}), member.user.displayAvatarURL({ dynamic: true }), "https://clan.milrato.eu")
        embeduserinfo.addField(handlemsg(client.la[ls].cmds.info.permissions.from2),`${member.permissions.toArray().map(p=>`\`${p}\``).join(", ")}`)
        embeduserinfo.setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        embeduserinfo.setFooter(es.footertext, es.footericon)
        //send the EMBED
        message.reply({embeds: [embeduserinfo]})
      }catch (e){
        console.log(e)
        //create the EMBED
        const embeduserinfo = new MessageEmbed()
        embeduserinfo.setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
        embeduserinfo.setAuthor(handlemsg(client.la[ls].cmds.info.permissions.from, {usertag: member.user.tag}), member.user.displayAvatarURL({ dynamic: true }), "https://clan.milrato.eu")
        embeduserinfo.addField(handlemsg(client.la[ls].cmds.info.permissions.from2),`${member.permissions.toArray().map(p=>`\`${p}\``).join(", ")}`)
        embeduserinfo.setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        embeduserinfo.setFooter(es.footertext, es.footericon)
        //send the EMBED
        message.reply({embeds: [embeduserinfo]})
      }
      
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
