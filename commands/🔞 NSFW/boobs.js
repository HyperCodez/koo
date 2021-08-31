const superagent = require("node-fetch");
const Discord = require('discord.js')

const rp = require('request-promise-native');
const config = require("../../botconfig/config.json")
const {MessageEmbed} = require('discord.js')
module.exports = {
    name: "boobs",
    category: "🔞 NSFW",
  description: "Sends boobs",
  usage: "boobs",
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
  //command

  //Checks channel for nsfw
  
  if (!message.channel.nsfw) {
      message.react('💢');

      return message.reply(eval(client.la[ls]["cmds"]["nsfw"]["boobs"]["variable1"]))
      .then(msg => {
      msg.delete({ timeout: 3000 })
      })
      
  }

  return rp.get('http://api.oboobs.ru/boobs/0/1/random').then(JSON.parse).then(function(res)  {
    return rp.get({
        url:'http://media.oboobs.ru/' + res[0].preview,
        encoding: null
    });
}).then(function(res)   {
  let attachment = new MessageAttachment(res, "file.png");
const boobs = new Discord.MessageEmbed()
      .setTitle(eval(client.la[ls]["cmds"]["nsfw"]["boobs"]["variable2"]))
      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
      .setImage("attachment://file.png")


    message.reply({ embeds: [boobs], files:[attachment]});
});
  }
  };