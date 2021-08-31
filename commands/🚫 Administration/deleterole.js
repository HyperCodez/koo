const config = require(`../../botconfig/config.json`);
const ms = require(`ms`);
var ee = require(`../../botconfig/embed.json`)
const emoji = require(`../../botconfig/emojis.json`);
const {
  MessageEmbed,
  Permissions
} = require(`discord.js`)
const {
  databasing
} = require("../../handlers/functions");
module.exports = {
  name: `deleterole`,
  category: `🚫 Administration`,
  aliases: [`roledelete`, "delete-role", "role-delete"],
  cooldown: 4,
  usage: `deleterole  @Role`,
  description: `Delets a Role from this Server`,
  run: async (client, message, args, cmduser, text, prefix) => {
    
    if(!message.guild.me.permissions.has([Permissions.FLAGS.MANAGE_ROLES]))      
    return message.reply({embeds : [new Discord.MessageEmbed()
      .setColor(es.wrongcolor)
      .setFooter(es.footertext, es.footericon)
      .setTitle(eval(client.la[ls]["cmds"]["administration"]["deleterole"]["variable1"]))
    ]})
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    try {
      let adminroles = client.settings.get(message.guild.id, "adminroles")
      let cmdroles = client.settings.get(message.guild.id, "cmdadminroles.deleterole")
      var cmdrole = []
      if (cmdroles.length > 0) {
        for (const r of cmdroles) {
          if (message.guild.roles.cache.get(r)) {
            cmdrole.push(` | <@&${r}>`)
          } else if (message.guild.members.cache.get(r)) {
            cmdrole.push(` | <@${r}>`)
          } else {
            console.log("F")
            console.log(r)
            client.settings.remove(message.guild.id, r, `cmdadminroles.deleterole`)
          }
        }
      }
      if ((Array.from(message.member.roles.cache.values()) && !message.member.roles.cache.some(r => cmdroles.includes(r.id))) && !cmdroles.includes(message.author.id) && (Array.from(message.member.roles.cache.values()) && !message.member.roles.cache.some(r => adminroles.includes(r ? r.id : r))) && !Array(message.guild.ownerID, config.ownerid).includes(message.author.id) && !message.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR]))
        return message.reply({embeds : [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(eval(client.la[ls]["cmds"]["administration"]["deleterole"]["variable2"]))
          .setDescription(eval(client.la[ls]["cmds"]["administration"]["deleterole"]["variable3"]))
        ]});
      let role = message.mentions.roles.filter(role=>role.guild.id==message.guild.id).first() || message.guild.roles.cache.get(args[0]);
      if (!role || role == null || role == undefined || role.name == null || role.name == undefined)
        return message.reply({embeds : [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(eval(client.la[ls]["cmds"]["administration"]["deleterole"]["variable4"]))
          .setDescription(eval(client.la[ls]["cmds"]["administration"]["deleterole"]["variable5"]))
        ]});
      message.reply({embeds : [new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
        .setTitle(eval(client.la[ls]["cmds"]["administration"]["deleterole"]["variable6"]))
        .setDescription(eval(client.la[ls]["cmds"]["administration"]["deleterole"]["variable7"]))
      ]}).then(msg => {
        msg.channel.awaitMessages(m => m.author.id == message.author.id, {
          max: 1,
          time: 30000,
          errors: ["time"]
        }).then(collected => {
          if (collected.first().content.toLowerCase().includes("yes")) {
            let membersize = role.members.array().length;
            role.delete(`${message.author.tag} Requested a Role delete`)
              .then(r => {
                message.reply({embeds : [new MessageEmbed()
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setFooter(es.footertext, es.footericon)
                  .setTitle(eval(client.la[ls]["cmds"]["administration"]["deleterole"]["variable8"]))
                ]});
                if (client.settings.get(message.guild.id, `adminlog`) != "no") {
                  try {
                    var channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, `adminlog`))
                    if (!channel) return client.settings.set(message.guild.id, "no", `adminlog`);
                    channel.send({embeds : [new MessageEmbed()
                      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                      .setAuthor(`${require("path").parse(__filename).name} | ${message.author.tag}`, message.author.displayAvatarURL({
                        dynamic: true
                      }))
                      .setDescription(eval(client.la[ls]["cmds"]["administration"]["deleterole"]["variable9"]))
                      .addField(eval(client.la[ls]["cmds"]["administration"]["ban"]["variablex_15"]), eval(client.la[ls]["cmds"]["administration"]["ban"]["variable15"]))
                     .addField(eval(client.la[ls]["cmds"]["administration"]["ban"]["variablex_16"]), eval(client.la[ls]["cmds"]["administration"]["ban"]["variable16"]))
                      .setTimestamp().setFooter("ID: " + message.author.id)
                    ]})
                  } catch (e) {
                    console.log(e.stack ? String(e.stack).grey : String(e).grey)
                  }
                }
              })
              .catch(console.error);
          } else {
            return message.reply({embeds : [new MessageEmbed()
              .setColor(es.wrongcolor)
              .setFooter(es.footertext, es.footericon)
              .setTitle(eval(client.la[ls]["cmds"]["administration"]["deleterole"]["variable12"]))
              .setDescription(ge.message)
            ]});
          }
        }).catch(e => {
          return message.reply({embeds : [new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(eval(client.la[ls]["cmds"]["administration"]["deleterole"]["variable13"]))
            .setDescription(e.message)
          ]});
        })
      })

    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply({embeds :[new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(eval(client.la[ls]["cmds"]["administration"]["deleterole"]["variable14"]))
       ]} );
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
