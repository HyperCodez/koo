const {
  MessageEmbed,
  Permissions
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const {
  databasing
} = require("../../handlers/functions");
module.exports = {
  name: "copymessage",
  category: "🚫 Administration",
  aliases: ["copy", "copymsg", "cmsg", "copyembed", "copye"],
  cooldown: 2,
  usage: "copymessage <#Channel> <Message_ID>",
  description: "Copy the Message of it, if its an embed / message you will get the Command to your DMS",
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    try {
      let adminroles = client.settings.get(message.guild.id, "adminroles")
      let cmdroles = client.settings.get(message.guild.id, "cmdadminroles.copymessage")
      var cmdrole = []
        if(cmdroles.length > 0){
          for(const r of cmdroles){
            if(message.guild.roles.cache.get(r)){
              cmdrole.push(` | <@&${r}>`)
            }
            else if(message.guild.members.cache.get(r)){
              cmdrole.push(` | <@${r}>`)
            }
            else {
              console.log("F")
              console.log(r)
              client.settings.remove(message.guild.id, r, `cmdadminroles.copymessage`)
            }
          }
        }
      if ((Array.from(message.member.roles.cache.values()) && !message.member.roles.cache.some(r => cmdroles.includes(r.id))) && !cmdroles.includes(message.author.id) && (Array.from(message.member.roles.cache.values()) && !message.member.roles.cache.some(r => adminroles.includes(r ? r.id : r))) && !Array(message.guild.ownerID, config.ownerid).includes(message.author.id) && !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
        return message.reply({embeds : [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(eval(client.la[ls]["cmds"]["administration"]["copymessage"]["variable1"]))
          .setDescription(eval(client.la[ls]["cmds"]["administration"]["copymessage"]["variable2"]))
        ]});
      var channel = message.mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first() || message.guild.channels.cache.get(args[0]) || message.channel;
      var id = args[1]
      if (!channel || channel == null || !channel.id || channel.id == 0)
        return message.reply ({embeds : [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(eval(client.la[ls]["cmds"]["administration"]["copymessage"]["variable3"]))
          .setDescription(eval(client.la[ls]["cmds"]["administration"]["copymessage"]["variable4"]))
        ]});
        if (!id || id.length != 18)
        return message.reply({embeds : [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(eval(client.la[ls]["cmds"]["administration"]["copymessage"]["variable5"]))
          .setDescription(eval(client.la[ls]["cmds"]["administration"]["copymessage"]["variable6"]))
        ]});

      message.delete().catch(e => console.log("Couldn't delete msg, this is a catch to prevent crash"))
     
   
      channel.messages.fetch(id).then(msg=>{
        if(msg.content){
          message.author.send({content : eval(client.la[ls]["cmds"]["administration"]["copymessage"]["variable7"])})
        }
        if(msg.embeds[0]){
          var embed = msg.embeds[0]
          message.author.send({content : eval(client.la[ls]["cmds"]["administration"]["copymessage"]["variable8"])})
        }
        return message.reply({embeds :[new MessageEmbed()
          .setColor(es.color)
          .setFooter(es.footertext, es.footericon)
          .setTitle(eval(client.la[ls]["cmds"]["administration"]["copymessage"]["variable9"]))
        ]});
      }).catch(e=>{
        console.log(String(e.stack).grey.bgRed)
        return message.reply({embeds :[new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(client.la[ls].common.erroroccur)
          .setDescription(eval(client.la[ls]["cmds"]["administration"]["copymessage"]["variable10"]))
        ]});
      })
      

      if(client.settings.get(message.guild.id, `adminlog`) != "no"){
        try{
          var channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, `adminlog`))
          if(!channel) return client.settings.set(message.guild.id, "no", `adminlog`);
          channel.send({embeds : [new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
            .setAuthor(`${require("path").parse(__filename).name} | ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
            .setDescription(eval(client.la[ls]["cmds"]["administration"]["copymessage"]["variable11"]))
            .addField(eval(client.la[ls]["cmds"]["administration"]["ban"]["variablex_15"]), eval(client.la[ls]["cmds"]["administration"]["ban"]["variable15"]))
           .addField(eval(client.la[ls]["cmds"]["administration"]["ban"]["variablex_16"]), eval(client.la[ls]["cmds"]["administration"]["ban"]["variable16"]))
            .setTimestamp().setFooter("ID: " + message.author.id)
          ]})
        }catch (e){
          console.log(e.stack ? String(e.stack).grey : String(e).grey)
        }
      } 

      
    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply({embeds : [new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(eval(client.la[ls]["cmds"]["administration"]["copymessage"]["variable14"]))
        .setDescription(eval(client.la[ls]["cmds"]["administration"]["copymessage"]["variable15"]))
      ]});
    }
  }
}
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention him / Milrato Development, when using this Code!
 * @INFO
 */
