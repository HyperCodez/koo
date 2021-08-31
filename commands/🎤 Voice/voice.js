const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
module.exports = {
    name: "GUILD_VOICE",
    category: "🎤 Voice",
    aliases: [""],
    cooldown: 5,
    extracustomdesc: "`voice lock`, `voice invite`, `voice add`, `voice kick`, `voice unlock`, `voice ban`, `voice unban`, `voice trust`, `voice untrust`, `voice limit`, `voice bitrate`, `voice promote`",
    usage: "`voice <CMD_TYPE> [Options]`\n\nValid CMD_TYPES: `lock`, `invite`, `add`, `kick`, `unlock`, `ban`, `unban`, `trust`, `untrust`, `limit`, `bitrate`, `promote`",
    description: "The Voice Commands are there for the JOIN TO CREATE COMMANDS, use them to adjust your hosted channel!",
    run: async (client, message, args, cmduser, text, prefix) => {
    
      let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
        if(!client.settings.get(message.guild.id, "VOICE")){
          return message.reply({embeds : [new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(client.la[ls].common.disabled.title)
            .setDescription(require(`../../handlers/functions`).handlemsg(client.la[ls].common.disabled.description, {prefix: prefix}))
          ]});
        }
    try{
      
      let newargs = message.content.slice(prefix.length).split(/ +/).slice(1);
      let args = newargs;
      let cmd = args.shift()
      if(cmd && cmd.length > 0) cmd = cmd.toLowerCase();
      if (cmd === "lock") {
        let {
          channel
        } = message.member.voice;
        if (!channel) return message.reply({embeds :[new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable1"]))
          .setFooter(es.footertext, es.footericon)
        ]})
        client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false)
        client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);
    
        if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
          var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`));
          let perms = vc.permissionOverwrites.map(c => c)
          let owner = false;
          for (let i = 0; i < perms.length; i++) {
            if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true;
          }
          if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
          if (!owner)
            return message.reply({embeds : [new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable2"]))
              .setFooter(es.footertext, es.footericon)
            ]})
          vc.overwritePermissions([{
              id: message.guild.id,
              allow: ['VIEW_CHANNEL'],
              deny: ['CONNECT'],
            }])
            .then(lol => {
              vc.permissionOverwrites.edit(message.author.id, {
                MANAGE_CHANNELS: true,
                VIEW_CHANNEL: true,
                MANAGE_ROLES: true,
                CONNECT: true
              })
              return message.reply({embeds : [new Discord.MessageEmbed()
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable3"]))
                .setDescription(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable4"]))
                .setFooter(es.footertext, es.footericon)
              ]})
            })
    
        } else {
          return message.reply({embeds :[new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable5"]))
            .setFooter(es.footertext, es.footericon)
          ]})
        }
      } else if (cmd === "unlock") {
        let {
          channel
        } = message.member.voice;
        if (!channel) return message.reply({embeds : [new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable6"]))
          .setFooter(es.footertext, es.footericon)
        ]})
        client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false)
        client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);
        if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
          var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`));
          let perms = vc.permissionOverwrites.map(c => c)
          let owner = false;
          for (let i = 0; i < perms.length; i++) {
            if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true;
          }
          if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
          if (!owner)
            return message.reply({embeds :[new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable7"]))
              .setFooter(es.footertext, es.footericon)
            ]})
          vc.permissionOverwrites.edit(message.guild.id, {
            VIEW_CHANNEL: true,
            CONNECT: true
          }).then(lol => {
            vc.permissionOverwrites.edit(message.author.id, {
              MANAGE_CHANNELS: true,
              VIEW_CHANNEL: true,
              MANAGE_ROLES: true,
              CONNECT: true
            })
            return message.reply({embeds : [new Discord.MessageEmbed()
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable8"]))
              .setDescription(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable9"]))
              .setFooter(es.footertext, es.footericon)
            ]})
          })
        } else {
          return message.reply({embeds : [new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable10"]))
            .setFooter(es.footertext, es.footericon)
          ]})
        }
      } else if (cmd === "kick") {
        let {
          channel
        } = message.member.voice;
        if (!channel) return message.reply({embeds : [new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable11"]))
          .setFooter(es.footertext, es.footericon)
        ]})
        client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false)
        client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);
        if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
          var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`));
          let perms = vc.permissionOverwrites.map(c => c)
          let owner = false;
          for (let i = 0; i < perms.length; i++) {
            if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true;
          }
          if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
          if (!owner)
            return message.reply({embeds : [new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable12"]))
              .setFooter(es.footertext, es.footericon)
            ]})
          if (!args[0]) return message.reply({embeds : [new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable13"]))
            .setDescription(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable14"]))
            .setFooter(es.footertext, es.footericon)
          ]})
          let member = message.mentions.members.filter(member=>member.guild.id==message.guild.id).first() || message.guild.members.cache.get(args[0]);
          if (!member || member == null || member == undefined) return message.reply({embeds :[new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable15"]))
            .setDescription(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable16"]))
            .setFooter(es.footertext, es.footericon)
          ]})
          if (!member.voice.channel)
            return message.reply({embeds : [new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable17"]))
              .setFooter(es.footertext, es.footericon)
            ]})
          if (member.voice.channel.id != channel.id)
            return message.reply({embeds : [new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable18"]))
              .setFooter(es.footertext, es.footericon)
            ]})
          try {
            member.voice.disconnect();
            return message.reply({embeds : [new Discord.MessageEmbed()
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable19"]))
              .setFooter(es.footertext, es.footericon)
            ]})
          } catch (e) {
            return message.reply({embeds : [new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable20"]))
              .setDescription(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable21"]))
              .setFooter(es.footertext, es.footericon)
            ]})
          }
        } else {
          return message.reply({embeds : [new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable22"]))
            .setFooter(es.footertext, es.footericon)
          ]})
        }
      } else if (["invite", "add"].includes(cmd)) {
        let {
          channel
        } = message.member.voice;
        if (!channel) return message.reply({embeds : [new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable23"]))
          .setFooter(es.footertext, es.footericon)
        ]})
        client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false)
        client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);
        if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
          var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`));
          let perms = vc.permissionOverwrites.map(c => c)
          let owner = false;
          for (let i = 0; i < perms.length; i++) {
            if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true;
          }
          if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
          if (!owner)
            return message.reply({embeds : [new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable24"]))
              .setFooter(es.footertext, es.footericon)
            ]})
          if (!args[0]) return message.reply({embeds :[new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable25"]))
            .setDescription(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable26"]))
            .setFooter(es.footertext, es.footericon)
          ]})
          let member = message.mentions.members.filter(member=>member.guild.id==message.guild.id).first() || message.guild.members.cache.get(args[0]);
          if (!member || member == null || member == undefined) return message.reply({embeds : [new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable27"]))
            .setDescription(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable28"]))
            .setFooter(es.footertext, es.footericon)
          ]})
          let txt = args.slice(1).join(" ");
          try {
            channel.createInvite().then(invite => {
              vc.permissionOverwrites.edit(member.user.id, {
                VIEW_CHANNEL: true,
                CONNECT: true
              }).then(lol => {
                vc.permissionOverwrites.edit(message.author.id, {
                  MANAGE_CHANNELS: true,
                  VIEW_CHANNEL: true,
                  MANAGE_ROLES: true,
                  CONNECT: true
                })
                member.user.send({embeds : [new Discord.MessageEmbed()
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable29"]))
                  .setDescription(`[Click here](${invite.url}) to join **${channel.name}**\n\n${txt ? txt : ""}`.substr(0, 2000))
                  .setFooter(es.footertext, es.footericon)
                ]}).catch(e => {
                  return message.reply({embeds : [new Discord.MessageEmbed()
                    .setColor(es.wrongcolor)
                    .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable30"]))
                    .setDescription(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable31"]))
                    .setFooter(es.footertext, es.footericon)
                  ]})
                })
              })
              return message.reply({embeds : [new Discord.MessageEmbed()
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable32"]))
                .setFooter(es.footertext, es.footericon)
              ]})
            })
    
          } catch (e) {
            return message.reply({embeds : [new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable33"]))
              .setDescription(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable34"]))
              .setFooter(es.footertext, es.footericon)
            ]})
          }
        } else {
          return message.reply({embeds : [new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable35"]))
            .setFooter(es.footertext, es.footericon)
          ]})
        }
      } else if (cmd === "ban") {
        let {
          channel
        } = message.member.voice;
        if (!channel) return message.reply({embeds : [new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable36"]))
          .setFooter(es.footertext, es.footericon)
        ]})
        client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false)
        client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);
        if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
          var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`));
          let perms = vc.permissionOverwrites.map(c => c)
          let owner = false;
          for (let i = 0; i < perms.length; i++) {
            if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true;
          }
          if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
          if (!owner)
            return message.reply({embeds : [new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable37"]))
              .setFooter(es.footertext, es.footericon)
            ]})
          if (!args[0]) return message.reply({embeds :[new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable38"]))
            .setDescription(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable39"]))
            .setFooter(es.footertext, es.footericon)
          ]})
          let member = message.mentions.members.filter(member=>member.guild.id==message.guild.id).first() || message.guild.members.cache.get(args[0]);
          if (!member || member == null || member == undefined) return message.reply({embeds : [new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable40"]))
            .setDescription(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable41"]))
            .setFooter(es.footertext, es.footericon)
          ]})
          if (member.voice.channel && member.voice.channel.id == channel.id)
            try {
              member.voice.disconnect();
              message.reply({embeds : [new Discord.MessageEmbed()
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable42"]))
                .setFooter(es.footertext, es.footericon)
              ]})
            } catch (e) {
              message.reply({embeds : [new Discord.MessageEmbed()
                .setColor(es.wrongcolor)
                .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable43"]))
                .setDescription(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable44"]))
                .setFooter(es.footertext, es.footericon)
              ]})
            }
          vc.permissionOverwrites.edit(member.user.id, {
            VIEW_CHANNEL: true,
            CONNECT: false
          }).then(lol => {
            vc.permissionOverwrites.edit(message.author.id, {
              MANAGE_CHANNELS: true,
              VIEW_CHANNEL: true,
              MANAGE_ROLES: true,
              CONNECT: true
            })
            message.reply({embeds : [new Discord.MessageEmbed()
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable45"]))
              .setFooter(es.footertext, es.footericon)
            ]})
          })
    
    
        } else {
          return message.reply({embeds : [new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable46"]))
            .setFooter(es.footertext, es.footericon)
          ]})
        }
      } else if (cmd === "unban") {
        let {
          channel
        } = message.member.voice;
        if (!channel) return message.reply({embeds :[new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable47"]))
          .setFooter(es.footertext, es.footericon)
        ]})
        client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false)
        client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);
        if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
          var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`));
          let perms = vc.permissionOverwrites.map(c => c)
          let owner = false;
          for (let i = 0; i < perms.length; i++) {
            if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true;
          }
          if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
          if (!owner)
            return message.reply({embeds : [new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable48"]))
              .setFooter(es.footertext, es.footericon)
            ]})
          if (!args[0]) return message.reply({embeds :[new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable49"]))
            .setDescription(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable50"]))
            .setFooter(es.footertext, es.footericon)
          ]})
          let member = message.mentions.members.filter(member=>member.guild.id==message.guild.id).first() || message.guild.members.cache.get(args[0]);
          if (!member || member == null || member == undefined) return message.reply({embeds : [new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable51"]))
            .setDescription(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable52"]))
            .setFooter(es.footertext, es.footericon)
          ]})
          vc.permissionOverwrites.edit(member.user.id, {
            VIEW_CHANNEL: true,
            CONNECT: true
          }).then(lol => {
            vc.permissionOverwrites.edit(message.author.id, {
              MANAGE_CHANNELS: true,
              VIEW_CHANNEL: true,
              MANAGE_ROLES: true,
              CONNECT: true
            })
            message.reply({embeds : [new Discord.MessageEmbed()
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable53"]))
              .setDescription(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable54"]))
              .setFooter(es.footertext, es.footericon)
            ]})
          })
        } else {
          return message.reply({embeds : [new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable55"]))
            .setFooter(es.footertext, es.footericon)
          ]})
        }
      } else if (cmd === "trust") {
        let {
          channel
        } = message.member.voice;
        if (!channel) return message.reply({embeds : [new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable56"]))
          .setFooter(es.footertext, es.footericon)
        ]})
        client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false)
        client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);
        if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
          var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`));
          let perms = vc.permissionOverwrites.map(c => c)
          let owner = false;
          for (let i = 0; i < perms.length; i++) {
            if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true;
          }
          if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
          if (!owner)
            return message.reply({embeds : [new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable57"]))
              .setFooter(es.footertext, es.footericon)
            ]})
          if (!args[0]) return message.reply({embeds : [new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable58"]))
            .setDescription(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable59"]))
            .setFooter(es.footertext, es.footericon)
          ]})
          let member = message.mentions.members.filter(member=>member.guild.id==message.guild.id).first() || message.guild.members.cache.get(args[0]);
          if (!member || member == null || member == undefined) return message.reply({embeds :[new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable60"]))
            .setDescription(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable61"]))
            .setFooter(es.footertext, es.footericon)
          ]})
          vc.permissionOverwrites.edit(member.user.id, {
            VIEW_CHANNEL: true,
            CONNECT: true
          }).then(lol => {
            vc.permissionOverwrites.edit(message.author.id, {
              MANAGE_CHANNELS: true,
              VIEW_CHANNEL: true,
              MANAGE_ROLES: true,
              CONNECT: true
            })
            message.reply({embeds : [new Discord.MessageEmbed()
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable62"]))
              .setDescription(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable63"]))
              .setFooter(es.footertext, es.footericon)
            ]})
          })
        } else {
          return message.reply({embeds :[new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable64"]))
            .setFooter(es.footertext, es.footericon)
          ]})
        }
      } else if (cmd === "untrust") {
        let {
          channel
        } = message.member.voice;
        if (!channel) return message.reply({embeds: [new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable65"]))
          .setFooter(es.footertext, es.footericon)
        ]})
        client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false)
        client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);
        if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
          var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`));
          let perms = vc.permissionOverwrites.map(c => c)
          let owner = false;
          for (let i = 0; i < perms.length; i++) {
            if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true;
          }
          if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
          if (!owner)
            return message.reply({embeds : [new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable66"]))
              .setFooter(es.footertext, es.footericon)
            ]})
          if (!args[0]) return message.reply({embeds : [new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable67"]))
            .setDescription(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable68"]))
            .setFooter(es.footertext, es.footericon)
          ]})
          let member = message.mentions.members.filter(member=>member.guild.id==message.guild.id).first() || message.guild.members.cache.get(args[0]);
          if (!member || member == null || member == undefined) return message.reply({embeds :[new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable69"]))
            .setDescription(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable70"]))
            .setFooter(es.footertext, es.footericon)
          ]})
          vc.permissionOverwrites.edit(member.user.id, {
            VIEW_CHANNEL: true,
            CONNECT: false
          }).then(lol => {
            vc.permissionOverwrites.edit(message.author.id, {
              MANAGE_CHANNELS: true,
              VIEW_CHANNEL: true,
              MANAGE_ROLES: true,
              CONNECT: true
            })
            message.reply({embeds : [new Discord.MessageEmbed()
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable71"]))
              .setDescription(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable72"]))
              .setFooter(es.footertext, es.footericon)
            ]})
          })
        } else {
          return message.reply({embeds : [new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable73"]))
            .setFooter(es.footertext, es.footericon)
          ]})
        }
      } else if (cmd === "limit") {
        let {
          channel
        } = message.member.voice;
        if (!channel) return message.reply({embeds :[new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable74"]))
          .setFooter(es.footertext, es.footericon)
        ]})
        client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false)
        client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);
        if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
          var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`));
          let perms = vc.permissionOverwrites.map(c => c)
          let owner = false;
          for (let i = 0; i < perms.length; i++) {
            if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true;
          }
          if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
          if (!owner)
            return message.reply({embeds : [new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable75"]))
              .setFooter(es.footertext, es.footericon)
            ]})
          if (!args[0]) return message.reply(
            {embeds : [new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable76"]))
            ]});
          if (isNaN(args[0])) return message.reply(
            {embeds :[new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable77"]))
            ]});
          let userlimit = Number(args[0]);
          if (userlimit > 99 || userlimit < 0) return message.reply(
            {embeds : [new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable78"]))
            ]});
          channel.setUserLimit(userlimit).then(vc => {
            return message.reply({embeds :[new Discord.MessageEmbed()
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable79"]))
              .setFooter(es.footertext, es.footericon)
            ]})
          })
        } else {
          return message.reply({embeds : [new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable80"]))
            .setFooter(es.footertext, es.footericon)
          ]})
        }
      } else if (cmd === "bitrate") {
        let {
          channel
        } = message.member.voice;
        if (!channel) return message.reply({embeds : [new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable81"]))
          .setFooter(es.footertext, es.footericon)
        ]})
        client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false)
        client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);
        if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
          var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`));
          let perms = vc.permissionOverwrites.map(c => c)
          let owner = false;
          for (let i = 0; i < perms.length; i++) {
            if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true;
          }
          if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
          if (!owner)
            return message.reply({embeds : [new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable82"]))
              .setFooter(es.footertext, es.footericon)
            ]})
          if (!args[0]) return message.reply(
            {embeds :[new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable83"]))
            ]});
          if (isNaN(args[0])) return message.reply(
            {embeds : [new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable84"]))
            ]});
          let maxbitrate = 96000;
          let boosts = message.guild.premiumSubscriptionCount;
          if (boosts >= 2) maxbitrate = 128000;
          if (boosts >= 15) maxbitrate = 256000;
          if (boosts >= 30) maxbitrate = 384000;
          let userlimit = Number(args[0]);
          if (userlimit > maxbitrate || userlimit < 8000) return message.reply(
            {embeds : [new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable85"]))
            ]});
          channel.setBitrate(userlimit).then(vc => {
            return message.reply({embeds : [new Discord.MessageEmbed()
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable86"]))
              .setFooter(es.footertext, es.footericon)
            ]})
          })
        } else {
          return message.reply({embeds :[new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable87"]))
            .setFooter(es.footertext, es.footericon)
          ]})
        }
      } else if (cmd === "promote") {
        let {
          channel
        } = message.member.voice;
        if (!channel) return message.reply({embeds : [new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable88"]))
          .setFooter(es.footertext, es.footericon)
        ]})
        client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false)
        client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);
        if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
          var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`));
          let perms = vc.permissionOverwrites.map(c => c)
          let owner = false;
          for (let i = 0; i < perms.length; i++) {
            if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true;
          }
          if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
          if (!owner)
            return message.reply({embeds : [new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable89"]))
              .setFooter(es.footertext, es.footericon)
            ]})
          if (!args[0]) return message.reply({embeds : [new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable90"]))
            .setDescription(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable91"]))
            .setFooter(es.footertext, es.footericon)
          ]})
          let member = message.mentions.members.filter(member=>member.guild.id==message.guild.id).first() || message.guild.members.cache.get(args[0]);
          if (!member || member == null || member == undefined) return message.reply({embeds :[new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable92"]))
            .setDescription(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable93"]))
            .setFooter(es.footertext, es.footericon)
          ]})
          if (!member.voice.channel)
            return message.reply({embeds : [new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable94"]))
              .setFooter(es.footertext, es.footericon)
            ]})
          if (member.voice.channel.id != channel.id)
            return message.reply({embeds : [new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable95"]))
              .setFooter(es.footertext, es.footericon)
            ]})
          try {
            vc.permissionOverwrites.edit(member.user.id, {
              MANAGE_CHANNELS: true,
              VIEW_CHANNEL: true,
              MANAGE_ROLES: true,
              CONNECT: true
            }).then(l => {
              vc.permissionOverwrites.edit(message.author.id, {
                  MANAGE_CHANNELS: false,
                  VIEW_CHANNEL: true,
                  MANAGE_ROLES: false,
                  CONNECT: true
                })
                .then(lol => {
                  client.jointocreatemap.set(`owner_${vc.guild.id}_${vc.id}`, member.user.id);
                  return message.reply({embeds : [new Discord.MessageEmbed()
                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable96"]))
                    .setFooter(es.footertext, es.footericon)
                  ]})
                })
            })
          } catch (e) {
            return message.reply({embeds : [new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable97"]))
              .setDescription(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable98"]))
              .setFooter(es.footertext, es.footericon)
            ]})
          }
        } else {
          return message.reply({embeds : [new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable99"]))
            .setFooter(es.footertext, es.footericon)
          ]})
        }
      } else{
        return message.reply({embeds : [new Discord.MessageEmbed()
        .setTitle(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable100"]))
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setDescription(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable101"]))
        .setFooter(es.footertext, es.footericon)
        ]});
      }
    } catch (e) {
        console.log(String(e.stack).grey.bgRed)
        return message.reply({embeds : [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(client.la[ls].common.erroroccur)
          .setDescription(eval(client.la[ls]["cmds"]["GUILD_VOICE"]["GUILD_VOICE"]["variable102"]))
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
