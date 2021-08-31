const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const {MessageEmbed} = require('discord.js')
const config = require("../../botconfig/config.json")
var superagent = require('superagent');
module.exports = {
  name: "porn",
  category: "🔞 NSFW",
  usage: "porn",
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
      return message.reply(eval(client.la[ls]["cmds"]["nsfw"]["porn"]["variable1"]))
      .then(msg => { msg.delete({ timeout: 3000 }) })
  }

    var lo = new Discord.MessageEmbed()
      .setAuthor(`Loading...`, "https://images-ext-1.discordapp.net/external/ANU162U1fDdmQhim_BcbQ3lf4dLaIQl7p0HcqzD5wJA/https/cdn.discordapp.com/emojis/756773010123522058.gif")
      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)

    message.reply({embeds: [lo]}).then(m => {

        superagent.get('https://nekobot.xyz/api/image').query({ type: 'pgif'}).end((err, response) => {

            var embed_nsfw = new Discord.MessageEmbed()
                .setDescription(eval(client.la[ls]["cmds"]["nsfw"]["porn"]["variable2"]))
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                .setImage(response.body.message)
            
            m.edit({embeds: [embed_nsfw]});
        });
    });
}
                };