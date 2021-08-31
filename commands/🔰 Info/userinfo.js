const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const moment = require('moment');
const { GetUser, GetGlobalUser, handlemsg } = require("../../handlers/functions")
const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer'
};
function trimArray(arr, maxLen = 25) {
  if (arr.array().length > maxLen) {
    const len = arr.array().length - maxLen;
    arr = arr.array().sort((a, b) => b.rawPosition - a.rawPosition).slice(0, maxLen);
    arr.map(role => `<@&${role.id}>`)
    arr.push(`${len} more...`);
  }
  return arr.join(", ");
}
const statuses = {
  "online" : "🟢",
  "idle" : "🟠",
  "dnd" : "🔴",
  "offline" : "⚫️",
}
module.exports = {
  name: "userinfo",
  aliases: ["uinfo"],
  category: "🔰 Info",
  description: "Get information about a user",
  usage: "userinfo [@USER] [global/guild]",
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    try {   
      var user;
      if(args[0]){
        try{
          if(args[1] && args[1].toLowerCase() == "global"){
            args.pop()
            user = await GetGlobalUser(message, args)
          }else {
            user = await GetUser(message, args)
          }
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
        const roles = member.roles;
        const userFlags = member.user.flags.toArray();
        const activity = member.user.presence.activities[0];
        //create the EMBED
        const embeduserinfo = new MessageEmbed()
        embeduserinfo.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
        embeduserinfo.setAuthor(handlemsg(client.la[ls].cmds.info.userinfo.author, { usertag: member.user.tag}), member.user.displayAvatarURL({ dynamic: true }), "https://discord.gg/sngXqWK2eP")
        embeduserinfo.addField(client.la[ls].cmds.info.userinfo.field1,`<@${member.user.id}>\n\`${member.user.tag}\``,true)
        embeduserinfo.addField(client.la[ls].cmds.info.userinfo.field2,`\`${member.id}\``,true)
        embeduserinfo.addField(client.la[ls].cmds.info.userinfo.field3,`[\`Link to avatar\`](${member.user.displayAvatarURL({ format: "png" })})`,true)
        embeduserinfo.addField(client.la[ls].cmds.info.userinfo.field4, "\`"+moment(member.user.createdTimestamp).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(member.user.createdTimestamp).format("hh:mm:ss") + "\`",true)
        embeduserinfo.addField(client.la[ls].cmds.info.userinfo.field5, "\`"+moment(member.joinedTimestamp).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(member.joinedTimestamp).format("hh:mm:ss")+ "\`",true)
        embeduserinfo.addField(client.la[ls].cmds.info.userinfo.field6,`\`${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}\``,true)
        embeduserinfo.addField(client.la[ls].cmds.info.userinfo.field7,`\`${statuses[member.user.presence.status]} ${member.user.presence.status}\``,true)
        embeduserinfo.addField(client.la[ls].cmds.info.userinfo.field8,`${member.roles.size == 0 ? client.la[ls].cmds.info.userinfo.noroles : member.roles.highest.id === message.guild.id ? client.la[ls].cmds.info.userinfo.noroles : member.roles.highest}`,true)
        embeduserinfo.addField(client.la[ls].cmds.info.userinfo.field9,`\`${member.user.bot ? "✔️" : "❌"}\``,true)
        var userstatus = client.la[ls].cmds.info.userinfo.nostatus;
        if(activity){
          if(activity.type === "CUSTOM_STATUS"){
            let emoji = `${activity.emoji ? activity.emoji.customId ? `<${activity.emoji.animated ? "a": ""}:${activity.emoji.name}:${activity.emoji.customId}>`: activity.emoji.name : ""}`
            userstatus = `${emoji} \`${activity.state || client.la[ls].cmds.info.userinfo.nostatus}\``
          }
          else{
            userstatus = `\`${activity.type.toLowerCase().charAt(0).toUpperCase() + activity.type.toLowerCase().slice(1)} ${activity.name}\``
          }
        }
        embeduserinfo.addField(client.la[ls].cmds.info.userinfo.field10,`${userstatus}`)
        embeduserinfo.addField(client.la[ls].cmds.info.userinfo.field11,`${member.permissions && member.permissions.toArray().length > 0 ? member.permissions.toArray().map(p=>`\`${p}\``).join(", ") : client.la[ls].cmds.info.userinfo.nopermissions}`)
        embeduserinfo.addField(handlemsg(client.la[ls].cmds.info.userinfo.field12, { rolesize: roles.cache.size}), roles.cache.size < 25 ? roles.cache.array().sort((a, b) => b.rawPosition - a.rawPosition).map(role => `<@&${role.id}>`).join(', ') : roles.cache.size > 25 ? trimArray(roles.cache) : client.la[ls].cmds.info.userinfo.noroles)
        embeduserinfo.setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        embeduserinfo.setFooter(es.footertext, es.footericon)
        //send the EMBED
        message.reply({embeds: [embeduserinfo]})
      }catch{
        const member = message.guild.members.cache.get(user.id);
        const userFlags = user.flags?.toArray();
        const activity = user.presence.activities[0];
        //create the EMBED
        const embeduserinfo = new MessageEmbed()
        embeduserinfo.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
        embeduserinfo.setAuthor(handlemsg(client.la[ls].cmds.info.userinfo.author, { usertag: member.user.tag}), member.user.displayAvatarURL({ dynamic: true }), "https://discord.gg/sngXqWK2eP")
        embeduserinfo.addField(client.la[ls].cmds.info.userinfo.field1,`<@${member.user.id}>\n\`${member.user.tag}\``,true)
        embeduserinfo.addField(client.la[ls].cmds.info.userinfo.field2,`\`${member.id}\``,true)
        embeduserinfo.addField(client.la[ls].cmds.info.userinfo.field3,`[\`Link to avatar\`](${member.user.displayAvatarURL({ format: "png" })})`,true)
        embeduserinfo.addField(client.la[ls].cmds.info.userinfo.field4, "\`"+moment(member.user.createdTimestamp).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(member.user.createdTimestamp).format("hh:mm:ss") + "\`",true)
        embeduserinfo.addField(client.la[ls].cmds.info.userinfo.field5, "\`"+moment(member.joinedTimestamp).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(member.joinedTimestamp).format("hh:mm:ss")+ "\`",true)
        embeduserinfo.addField(client.la[ls].cmds.info.userinfo.field6,`\`${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}\``,true)
        embeduserinfo.addField(client.la[ls].cmds.info.userinfo.field8,`${member.roles.size == 0 ? client.la[ls].cmds.info.userinfo.noroles : member.roles.highest.id === message.guild.id ? client.la[ls].cmds.info.userinfo.noroles : member.roles.highest}`,true)
        embeduserinfo.addField(client.la[ls].cmds.info.userinfo.field9,`\`${member.user.bot ? "✔️" : "❌"}\``,true)
        embeduserinfo.addField(client.la[ls].cmds.info.userinfo.field11,`${member.permissions && member.permissions.toArray().length > 0 ? member.permissions.toArray().map(p=>`\`${p}\``).join(", ") : client.la[ls].cmds.info.userinfo.nopermissions}`)
        embeduserinfo.addField(handlemsg(client.la[ls].cmds.info.userinfo.field12, { rolesize: roles.cache.size}), roles.cache.size < 25 ? roles.cache.array().sort((a, b) => b.rawPosition - a.rawPosition).map(role => `<@&${role.id}>`).join(', ') : roles.cache.size > 25 ? trimArray(roles.cache) : client.la[ls].cmds.info.userinfo.noroles)
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
