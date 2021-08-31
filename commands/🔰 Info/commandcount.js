const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const {
  duration, nFormatter, handlemsg
} = require("../../handlers/functions")
const moment = require("moment")
const fs = require('fs')
module.exports = {
  name: "commandcount",
  category: "🔰 Info",
  aliases: ["cmdcount"],
  usage: "commandcount",
  description: "Shows the Amount of Commands",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    
    try {
      
      let tempmsg = await message.reply({embeds: [new MessageEmbed()
        .setColor(es.color)
        .setAuthor(handlemsg(client.la[ls].cmds.info.commandcount.tempmsg), "https://cdn.discordapp.com/emojis/756773010123522058.gif", "https://discord.gg/sngXqWK2eP")
      ]})
      let lines = 0
      let letters = 0
      var walk = function(dir) {
        var results = [];
        var list = fs.readdirSync(dir);
        list.forEach(function(file) {
            file = dir + '/' + file;
              var stat = fs.statSync(file);
              if (stat && stat.isDirectory()) { 
                  results = results.concat(walk(file));
              } else { 
                  results.push(file);
              }
        });
        return results;
      }
      for(const source of walk(process.cwd())){
        try{
          let data = await fs.readFileSync(source, 'utf8')
          letters += await data.length;
          lines += await data.split('\n').length;
        }catch{}
      }

      await tempmsg.edit({embeds: [new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
        .setTitle(handlemsg(client.la[ls].cmds.info.commandcount.title, {cmdcount: client.commands.size}))
        .setDescription(handlemsg(client.la[ls].cmds.info.commandcount.description, {catcount: client.categories.length, lines: lines, letters: nFormatter(letters, 4)}))
      ]});
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
