const { MessageEmbed } = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
    name: `removedj`,
    aliases: [`deletedj`],
    category: `⚙️ Settings`,
    description: `Let's you DELETE a DJ ROLE`,
    usage: `removedj @ROLE`,
    memberpermissions: [`ADMINISTRATOR`],
    run: async (client, message, args, cmduser, text, prefix) => {
    
      let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    try{
      
      //get the role of the mention
      let role = message.mentions.roles.filter(role=>role.guild.id==message.guild.id).first();
      //if no pinged role return error
      if (!role)
        return message.reply({embeds :[new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(eval(client.la[ls]["cmds"]["settings"]["removedj"]["variable1"]))
        ]});
      //try to find the role in the guild just incase he pings a role of a different server
      try {
          message.guild.roles.cache.get(role.id);
      } catch {
        return message.reply({embeds : [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(eval(client.la[ls]["cmds"]["settings"]["removedj"]["variable2"]))
        ]});
      }
      //if its not in the database return error
      if(!client.settings.get(message.guild.id,`djroles`).includes(role.id))
        return message.reply(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(eval(client.la[ls]["cmds"]["settings"]["removedj"]["variable3"]))
        );
      //remove it from the Database
      client.settings.remove(message.guild.id, role.id, `djroles`);
      //These lines create the String for all left Roles
      let leftb = ``;
      if(client.settings.get(message.guild.id, `djroles`).join(``) ===``) leftb = `no Dj Roles, aka All Users are Djs`
      else
      for(let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++){
        leftb += `<@&` +client.settings.get(message.guild.id, `djroles`)[i] + `> | `
      }
      //send the success message
      return message.reply(new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
        .setTitle(eval(client.la[ls]["cmds"]["settings"]["removedj"]["variable4"]))
        .setDescription(eval(client.la[ls]["cmds"]["settings"]["removedj"]["variable5"]))
      );
    } catch (e) {
        console.log(String(e.stack).grey.bgRed)
        return message.reply(new MessageEmbed()
            .setColor(es.wrongcolor)
						.setFooter(es.footertext, es.footericon)
            .setTitle(client.la[ls].common.erroroccur)
            .setDescription(eval(client.la[ls]["cmds"]["settings"]["removedj"]["variable6"]))
        );
    }
  }
};
/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://discord.gg/sngXqWK2eP
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention him / Milrato Development, when using this Code!
  * @INFO
*/
