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
  name: "editembed",
  category: "🚫 Administration",
  aliases: ["edite"],
  cooldown: 2,
  usage: "editembed <OLDEMBED_ID> ++ <TITLE> ++ <DESCRIPTION>\n\n To have forexample no title do that:  editembed 822435791775072266 ++ ++ This is what an Embed without Title Looks like",
  description: "DONT FORGET TO ADD THE \"++\"! They are needed, and used to declare where the TITLE and where the DESCRIPTION is!\nEdits an already existing Embed",
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    try {
      let adminroles = client.settings.get(message.guild.id, "adminroles")
      let cmdroles = client.settings.get(message.guild.id, "cmdadminroles.editembed")
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
              client.settings.remove(message.guild.id, r, `cmdadminroles.editembed`)
            }
          }
        }
      if ((Array.from(message.member.roles.cache.values()) && !message.member.roles.cache.some(r => cmdroles.includes(r.id))) && !cmdroles.includes(message.author.id) && (Array.from(message.member.roles.cache.values()) && !message.member.roles.cache.some(r => adminroles.includes(r ? r.id : r))) && !Array(message.guild.ownerID, config.ownerid).includes(message.author.id) && !message.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR]))
        return message.reply({embeds : [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(eval(client.la[ls]["cmds"]["administration"]["editembed"]["variable1"]))
          .setDescription(eval(client.la[ls]["cmds"]["administration"]["editembed"]["variable2"]))
        ]});
      if (!args[0])
        return message.reply({embeds : [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(eval(client.la[ls]["cmds"]["administration"]["editembed"]["variable3"]))
          .setDescription(eval(client.la[ls]["cmds"]["administration"]["editembed"]["variable4"]))
        ]});
      let userargs = args.join(" ").split("++");
      let oldembedid = userargs[0];
      let title = userargs[1];
      let image = userargs[2];
      let desc = userargs.slice(2).join(" ")
      message.delete().catch(e => console.log("Couldn't delete msg, this is a catch to prevent crash"))
      message.channel.messages.fetch(oldembedid).then(msg=>{
        msg.edit({embeds: [new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(es.footertext, es.footericon)
          .setTitle(title ? title.substr(0, 256) : "")
          .setDescription(desc ? desc.substr(0, 2048) : "")
        ]}).then(d=>{
          var ee = "Here is your Command, if you wanna use it again!";
          if(message.content.length > 2000){
            ee = "Here is your Command"
          }
          if(message.content.length > 2020){
            ee = ""
          }
          if(client.settings.get(message.author.id, "dm"))
            message.author.send({content : `${ee}\`\`\`${message.content}`.substr(0, 2040) + "\`\`\`"}).catch(e => console.log("Couldn't Dm Him this log prevents a crash"))
        })
      }).catch(e=>{
        return message.reply({content : `${e.message ? String(e.message).substr(0, 1900) : String(e).grey.substr(0, 1900)}`, code: "js"});
      })
      

      client.stats.push(message.guild.id+message.author.id, new Date().getTime(), "says"); 

      if(client.settings.get(message.guild.id, `adminlog`) != "no"){
        try{
          var channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, `adminlog`))
          if(!channel) return client.settings.set(message.guild.id, "no", `adminlog`);
          channel.send({embeds : [new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
            .setAuthor(`${require("path").parse(__filename).name} | ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
            .setDescription(eval(client.la[ls]["cmds"]["administration"]["editembed"]["variable5"]))
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
      return message.reply({embeds :[new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(eval(client.la[ls]["cmds"]["administration"]["editembed"]["variable8"]))
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
