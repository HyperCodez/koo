const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const {MessageEmbed} = require('discord.js')
module.exports = {
      name: "cumslut",
      category: "🔞 NSFW",
      usage: "cumslut",
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

            if (!message.channel.nsfw) return message.reply(eval(client.la[ls]["cmds"]["nsfw"]["cumslut"]["variable1"])).then(msg => { message.react('💢'); msg.delete({ timeout: 3000 }) })
            
            let owo = (await neko.nsfw.cumsluts());

            const cumslut = new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["nsfw"]["cumslut"]["variable2"]))
                  .setImage(owo.url)
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                  .setURL(owo.url);
            message.reply({embeds: [cumslut]});
      }
};