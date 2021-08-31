const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../botconfig/config.json")
const {MessageEmbed} = require('discord.js')
module.exports = {
  name: "anal",
  category: "🔞 NSFW",
  usage: "anal",
    run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    if(!client.settings.get(message.guild.id, "NSFW")){
      const x = new MessageEmbed()
      .setColor(es.wrongcolor)
      .setFooter(es.footertext, es.footericon)
      .setTitle(client.la[ls].common.disabled.title)
      .setDescription(require(`../../handlers/functions`).handlemsg(client.la[ls].common.disabled.description, {prefix: prefix}))
      return message.reply({embeds: [x]});
    }

  
  if (!message.channel.nsfw) {
      message.react('💢');

      return message.reply(eval(client.la[ls]["cmds"]["nsfw"]["anal"]["variable1"]))
      .then(msg => {
      msg.delete({ timeout: 3000 })
      })
      
  }
  var superagent = require('superagent');

  if (!message.channel.nsfw) return message.reply(eval(client.la[ls]["cmds"]["nsfw"]["anal"]["variable2"])) 

  var lo = new Discord.MessageEmbed()
              .setDescription(eval(client.la[ls]["cmds"]["nsfw"]["anal"]["variable3"]))
              .setTimestamp().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)

  message.reply({embeds:[lo]}).then(m => {

      superagent.get('https://nekobot.xyz/api/image').query({ type: 'anal'}).end((err, response) => {

          var embed_nsfw = new Discord.MessageEmbed()
              .setDescription(eval(client.la[ls]["cmds"]["nsfw"]["anal"]["variable4"]))
              .setTimestamp().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
              .setImage(response.body.message)
          
          m.edit({embeds: [embed_nsfw]});
      });
  });
  
}
};