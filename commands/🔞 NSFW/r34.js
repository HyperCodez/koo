const randomPuppy = require('random-puppy');
const request = require('node-fetch');
const fs = require("fs")
const {MessageEmbed} = require('discord.js')
const config = require("../../botconfig/config.json")
const Discord = require('discord.js');
const booru = require('booru');

module.exports = {
    name: "r34",
    category: "🔞 NSFW",
    usage: "r34",
    aliases: ["rule34"],
  description: "Searches rule34",
  run: async (bot, message, args) => {
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

      return message.reply(eval(client.la[ls]["cmds"]["nsfw"]["r34"]["variable1"]))
      .then(msg => {
      msg.delete({ timeout: 3000 })
      })
      
  }

  if (message.content.toUpperCase().includes('LOLI') || message.content.toUpperCase().includes('GORE')) return message.reply(eval(client.la[ls]["cmds"]["nsfw"]["r34"]["variable2"]));

  var query = message.content.split(/\s+/g).slice(1).join(" ");
  booru.search('rule34', [query], {nsfw: true, limit: 1, random: true })
      .then(booru.commonfy)
      .then(images => {
          for (let image of images) {
              const embed = new Discord.MessageEmbed()
              .setTitle(eval(client.la[ls]["cmds"]["nsfw"]["r34"]["variable3"]))
              .setImage(image.common.file_url)
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
              .setFooter(eval(client.la[ls]["cmds"]["nsfw"]["r34"]["variable4"]))
              .setURL(image.common.file_url);
          return message.reply({ embeds: [embed] });
          }

      }).catch(err => {
          if (err.name === 'booruError') {
              return message.reply(eval(client.la[ls]["cmds"]["nsfw"]["r34"]["variable5"]));
          } else {
              return message.reply(eval(client.la[ls]["cmds"]["nsfw"]["r34"]["variable6"]));
          }
})
  }
  };