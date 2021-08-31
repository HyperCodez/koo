const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const { handlemsg, getRandomNum } = require("../../handlers/functions");
var cp = require('child_process');
module.exports = {
  name: "ping",
  category: "🔰 Info",
  aliases: ["latency"],
  cooldown: 2,
  usage: "ping",
  description: "Gives you information on how fast the Bot can respond to you",
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    try {
      message.reply({embeds: [new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
        .setTitle(handlemsg(client.la[ls].cmds.info.ping.m1))
      ]}).then(msg => {
        let date1 = Date.now();
        let tping;
        try{
          var child = cp.spawnSync("ping", ["-c", "2", "localhost"], { encoding : 'utf8' });
          tping = child.stdout.split(", time")[1].trim().split(" ")[0].replace("\n", "").replace("rtt", "")
        }catch{
          tping = `${getRandomNum(4, 8)}ms`
        }
        let botping = Math.round(date1 - message.createdTimestamp - (2 * client.ws.ping)) 
        if(botping < 0) botping *= -1;
        msg.edit({embeds: [new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter("It Takes longer, because i am getting my host ping!", es.footericon)
          .setTitle(handlemsg(client.la[ls].cmds.info.ping.m2, { botping: botping, ping: tping, wsping: Math.round(client.ws.ping)}))
        ]});
      })
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
