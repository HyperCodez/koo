const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../botconfig/config.json")
const {MessageEmbed} = require('discord.js')
module.exports = {
      name: "2dtits",
      category: "🔞 NSFW",
      usage: "2dtits",
      run: async (client, message, args, cmduser, text, prefix) => {
    
            let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
            if (!client.settings.get(message.guild.id, "NSFW")) {
                  const x = new MessageEmbed()
                  .setColor(es.wrongcolor)
                  .setFooter(es.footertext, es.footericon)
                  .setTitle(client.la[ls].common.disabled.title)
                  .setDescription(require(`../../handlers/functions`).handlemsg(client.la[ls].common.disabled.description, {prefix: prefix}))
                  return message.reply({embeds: [x]});
            }

            if (!message.channel.nsfw) return message.reply(eval(client.la[ls]["cmds"]["nsfw"]["2dtits"]["variable1"])).then(msg => {
                  message.react('💢');
                  msg.delete({
                        timeout: 3000
                  })
            })
            let owo = (await neko.nsfw.tits());
            const tits = new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["nsfw"]["2dtits"]["variable2"]))
                  .setImage(owo.url)
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                  .setURL(owo.url);
            message.reply({embeds: [tits]});


      }
};