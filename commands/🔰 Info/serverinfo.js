const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const config = require("../../botconfig/config.json")
var ee = require("../../botconfig/embed.json")
const emoji = require(`../../botconfig/emojis.json`);
const moment = require("moment")
const { swap_pages, handlemsg } = require("../../handlers/functions")
module.exports = {
  name: "serverinfo",
  aliases: ["sinfo"],
  category: "🔰 Info",
  description: "Shows info about a server",
  usage: "serverinfo",
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    try {
      function trimArray(arr, maxLen = 25) {
        if (arr.array().length > maxLen) {
          const len = arr.array().length - maxLen;
          arr = arr.array().sort((a, b) => b.rawPosition - a.rawPosition).slice(0, maxLen);
          arr.map(role => `<@&${role.id}>`)
          arr.push(`${len} more...`);
        }
        return arr.join(", ");
      }
      await message.guild.members.fetch();
      function emojitrimarray(arr, maxLen = 20) {
        if (arr.length > maxLen) {
          const len = arr.length - maxLen;
          arr = arr.slice(0, maxLen);
          arr.push(`${len} more...`);
        }
        return arr.join(", ");
      }
      let boosts = message.guild.premiumSubscriptionCount;
      var boostlevel = 0;
      if (boosts >= 2) boostlevel = "1";
      if (boosts >= 15) boostlevel = "2";
      if (boosts >= 30) boostlevel = "3 / ∞";
      let maxbitrate = 96000;
      if (boosts >= 2) maxbitrate = 128000;
      if (boosts >= 15) maxbitrate = 256000;
      if (boosts >= 30) maxbitrate = 384000;
        message.reply({embeds: [new Discord.MessageEmbed()
        .setAuthor(client.la[ls].cmds.info.serverinfo.author + " " +  message.guild.name, message.guild.iconURL({
          dynamic: true
        }), "https://clan.milrato.eu")
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .addField(client.la[ls].cmds.info.serverinfo.field1, `${message.guild.owner.user}\n\`${message.guild.owner.user.tag}\``, true)
        .addField(client.la[ls].cmds.info.serverinfo.field2, "\`" + moment(message.guild.createdTimestamp).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(message.guild.createdTimestamp).format("hh:mm:ss") +"`", true)
        .addField(client.la[ls].cmds.info.serverinfo.field3, "\`" + moment(message.member.joinedTimestamp).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(message.member.joinedTimestamp).format("hh:mm:ss") +"`", true)
      
        .addField(client.la[ls].cmds.info.serverinfo.field4, "👁‍🗨 \`" + message.guild.channels.cache.size + "\`", true)
        .addField(client.la[ls].cmds.info.serverinfo.field5, "💬 \`" + message.guild.channels.cache.filter(channel => channel.type == "GUILD_TEXT").size + "\`", true)
        .addField(client.la[ls].cmds.info.serverinfo.field6, "🔈 \`" + message.guild.channels.cache.filter(channel => channel.type == "GUILD_VOICE").size + "\`", true)
       
        .addField(client.la[ls].cmds.info.serverinfo.field7, "😀 \`" + message.guild.memberCount + "\`", true)
        .addField(client.la[ls].cmds.info.serverinfo.field8, "👤 \`" + message.guild.members.cache.filter(member => !member.user.bot).size + "\`", true)
        .addField(client.la[ls].cmds.info.serverinfo.field9, "🤖 \`" + message.guild.members.cache.filter(member => member.user.bot).size + "\`", true)
        
        .addField(client.la[ls].cmds.info.serverinfo.field10, "🟢 \`" + message.guild.members.cache.filter(member => member.presence.status != "offline").size + "\`", true)
        .addField(client.la[ls].cmds.info.serverinfo.field11, ":black_circle:\`" + message.guild.members.cache.filter(member => member.presence.status == "offline").size + "\`", true)

        .addField(client.la[ls].cmds.info.serverinfo.field12, "<a:nitro_logo:833402717950836806> \`" + message.guild.premiumSubscriptionCount + "\`", true)
        .addField(client.la[ls].cmds.info.serverinfo.field13, "<a:nitro:833402717506502707> \`" + boostlevel + "\`", true)
        .addField(client.la[ls].cmds.info.serverinfo.field14, "👾 \`" + maxbitrate + " kbps\`", true)
        
        .addField(eval(client.la[ls]["cmds"]["info"]["serverinfo"]["variablex_1"]), eval(client.la[ls]["cmds"]["info"]["serverinfo"]["variable1"]))
        .addField(eval(client.la[ls]["cmds"]["info"]["serverinfo"]["variablex_2"]), eval(client.la[ls]["cmds"]["info"]["serverinfo"]["variable1"]))
        .setThumbnail(message.guild.iconURL({
          dynamic: true
        }))
        .setFooter("ID: " + message.guild.id, message.guild.iconURL({
          dynamic: true
        }))]});
     
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
