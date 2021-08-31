const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const {MessageEmbed} = require('discord.js')
const config = require("../../botconfig/config.json")
module.exports = {
  name: "hboobs",
  category: "🔞 NSFW",
  usage: "hboobs",
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

  //Checks channel for nsfw
  
  if (!message.channel.nsfw) {
      message.react('💢');

      return message.reply(eval(client.la[ls]["cmds"]["nsfw"]["hboobs"]["variable1"]))
      .then(msg => {
      msg.delete({ timeout: 3000 })
      })
      
  }
  var superagent = require('superagent');

  if (!message.channel.nsfw) return message.reply(eval(client.la[ls]["cmds"]["nsfw"]["hboobs"]["variable2"])) 

  var lo = new Discord.MessageEmbed()
              .setDescription(eval(client.la[ls]["cmds"]["nsfw"]["hboobs"]["variable3"]))
              .setTimestamp().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)

  message.reply({ embeds: [lo]}).then(m => {

      superagent.get('https://nekobot.xyz/api/image').query({ type: 'hboobs'}).end((err, response) => {

          var embed_nsfw = new Discord.MessageEmbed()
              .setDescription(eval(client.la[ls]["cmds"]["nsfw"]["hboobs"]["variable4"]))
              .setTimestamp().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
              .setImage(response.body.message)
          
          m.edit({embeds: [embed_nsfw]});
      });
  });
  
}
};