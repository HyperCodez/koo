const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../botconfig/config.json")
const {MessageEmbed} = require('discord.js')
module.exports = {
  name: "blowjob",
  category: "🔞 NSFW",
  usage: "blowjob",
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
		return message.reply({ embeds: [
                new MessageEmbed() .setColor(16734039) .setDescription("You can use this command in an NSFW Channel!")
    ]})
      }
      var superagent = require('superagent');


    superagent.get('https://nekos.life/api/v2/img/blowjob')
        .end((err, response) => {
      const embed = new Discord.MessageEmbed()
      .setTitle(eval(client.la[ls]["cmds"]["nsfw"]["blowjob"]["variable1"]))
      .setImage(response.body.url)
      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
      .setFooter(eval(client.la[ls]["cmds"]["nsfw"]["blowjob"]["variable2"]))
      .setURL(response.body.url);
  message.reply({embeds: [embed]});
    });
}
                };