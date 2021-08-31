const client = require('nekos.life');
const Discord = require('discord.js')
const {MessageEmbed} = require('discord.js')
const neko = new client();
const config = require("../../botconfig/config.json")
module.exports = {
  name: "gasm",
  category: "🔞 NSFW",
  usage: "gasm",
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

      return message.reply(eval(client.la[ls]["cmds"]["nsfw"]["gasm"]["variable1"]))
      .then(msg => {
      msg.delete({ timeout: 3000 })
      })
      
  }

        async function work() {
        let owo = (await neko.nsfw.gasm());

        const gasm = new Discord.MessageEmbed()
        .setTitle(eval(client.la[ls]["cmds"]["nsfw"]["gasm"]["variable2"]))
        .setImage(owo.url)
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
        .setURL(owo.url);
        message.reply({embeds: [gasm]});

}

      work();
}
                };