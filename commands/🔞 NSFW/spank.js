const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const {MessageEmbed} = require('discord.js')
const config = require("../../botconfig/config.json")

module.exports = {
  name: "spank",
  category: "🔞 NSFW",
  description: "spanks a mentioned user",
  usage: "[command] + [user]",
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

      return message.reply(eval(client.la[ls]["cmds"]["nsfw"]["spank"]["variable1"]))
      .then(msg => {
      msg.delete({ timeout: 3000 })
      })
      
  }
        const user = message.mentions.users.first();
        if(!user)
        return message.reply(eval(client.la[ls]["cmds"]["nsfw"]["spank"]["variable2"]));

        async function work() {
        let owo = (await neko.nsfw.spank());

        const cuddleembed = new Discord.MessageEmbed()
        .setTitle(user.username + " You have been spanked! ")
        .setDescription((user.toString() + " has been spanked by " + message.author.toString() + "!"))
        .setImage(owo.url)
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
        .setURL(owo.url);
        message.reply({embeds: [cuddleembed]});

}

      work();
}
                };