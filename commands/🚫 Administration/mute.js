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
  name: `mute`,
  category: `🚫 Administration`,
  aliases: [``],
  cooldown: 4,
  usage: `mute @User <Time+Format(e.g: 10m) / perma> [REASON]`,
  description: `Mutes a User for a specific Time!`,
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    try {
      if (!message.guild.me.permissions.has([Permissions.FLAGS.MANAGE_ROLES]))
        return message.reply({embeds :[new Discord.MessageEmbed()
          .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
          .setTitle(eval(client.la[ls]["cmds"]["administration"]["mute"]["variable1"]))
        ]})
      let adminroles = client.settings.get(message.guild.id, "adminroles")
      let cmdroles = client.settings.get(message.guild.id, "cmdadminroles.mute")
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
            client.settings.remove(message.guild.id, r, `cmdadminroles.mute`)
          }
        }
      }
      if ((Array.from(message.member.roles.cache.values()) && !message.member.roles.cache.some(r => cmdroles.includes(r.id))) && !cmdroles.includes(message.author.id) && (Array.from(message.member.roles.cache.values()) && !message.member.roles.cache.some(r => adminroles.includes(r ? r.id : r))) && !Array(message.guild.ownerID, config.ownerid).includes(message.author.id) && !message.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR]))
        return message.reply({embeds :[new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(eval(client.la[ls]["cmds"]["administration"]["mute"]["variable2"]))
          .setDescription(eval(client.la[ls]["cmds"]["administration"]["mute"]["variable3"]))
        ]});
      let member = message.mentions.members.filter(member => member.guild.id == message.guild.id).first() || message.guild.members.cache.get(args[0] ? args[0] : ``);
      if (!member)
        return message.reply({embeds : [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(eval(client.la[ls]["cmds"]["administration"]["mute"]["variable4"]))
          .setDescription(eval(client.la[ls]["cmds"]["administration"]["mute"]["variable5"]))
        ]});
      args.shift();
      if (member.roles.highest.position >= message.member.roles.highest.position)
        return message.reply({embeds : [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(eval(client.la[ls]["cmds"]["administration"]["mute"]["variable6"]))
        ]});

      let time = args[0];
      if (!time)
        return message.reply({embeds : [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(eval(client.la[ls]["cmds"]["administration"]["mute"]["variable7"]))
          .setDescription(eval(client.la[ls]["cmds"]["administration"]["mute"]["variable8"]))
        ]});

      args.shift();
      let reason = args.join(` `);
      let allguildroles = message.guild.roles.cache.array();
      let mutedrole = false;
      for (let i = 0; i < allguildroles.length; i++) {
        if (allguildroles[i].name.toLowerCase().includes(`muted`)) {
          mutedrole = allguildroles[i];
          break;
        }
      }
      if (!mutedrole) {
        let highestrolepos = message.guild.me.roles.highest.position;
        mutedrole = await message.guild.roles.create({
          data: {
            name: `muted`,
            color: `#222222`,
            hoist: true,
            position: Number(highestrolepos) - 1
          },
          reason: `This role got created, to mute Members!`
        }).catch((e) => {
          console.log(e.stack ? String(e.stack).grey : String(e).grey);
          message.reply({embeds : [new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(eval(client.la[ls]["cmds"]["administration"]["mute"]["variable9"]))
          ]});
        });
      }
      if (mutedrole.position > message.guild.me.roles.highest.position)
        return message.reply({embeds :[new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(eval(client.la[ls]["cmds"]["administration"]["mute"]["variable10"]))
        ]});

      let mutetime;
      try {
        mutetime = ms(time);
      } catch (e) {
        return message.reply({
          embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(eval(client.la[ls]["cmds"]["administration"]["mute"]["variable11"]))
          .setDescription(eval(client.la[ls]["cmds"]["administration"]["mute"]["variable12"]))
        ]});
      }
      
      await message.guild.channels.cache.filter(c => 
        !c.permissionOverwrites.has(mutedrole.id) || 
       (c.permissionOverwrites.has(mutedrole.id) && !c.permissionOverwrites.get(mutedrole.id).deny.toArray().includes("SEND_MESSAGE")) ||
       (c.permissionOverwrites.has(mutedrole.id) && !c.permissionOverwrites.get(mutedrole.id).deny.toArray().includes("ADD_REACTIONS")) ).forEach((ch) => {
        try {
          ch.permissionOverwrites.edit(mutedrole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            CONNECT: false,
            SPEAK: false
          });
        } catch (e) {
          console.log(e.stack ? String(e.stack).grey : String(e).grey);
        }
      });
      try {
        await member.roles.add(mutedrole);
      } catch (e) {
        message.reply({
          embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(client.la[ls].common.erroroccur)
          .setDescription(eval(client.la[ls]["cmds"]["administration"]["mute"]["variable13"]))
       ] });
      }

      if (time.toLowerCase().includes("pe")) {
        //send Information in the Chat
        message.reply({
          embeds: [new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(es.footertext, es.footericon)
          .setTitle(eval(client.la[ls]["cmds"]["administration"]["mute"]["variable14"]))
          .setDescription(eval(client.la[ls]["cmds"]["administration"]["mute"]["variable15"]))
        ]});
        //increase the Mod Stats
        client.stats.push(message.guild.id + message.author.id, new Date().getTime(), "mute");
        //Send information to the MUTE - MEMBER
        member.send({
          embeds:[ new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(es.footertext, es.footericon)
          .setTitle(eval(client.la[ls]["cmds"]["administration"]["mute"]["variable16"]))
          .setDescription(eval(client.la[ls]["cmds"]["administration"]["mute"]["variable17"]))
        ]}).catch((_) => {})
      } else {
        if (!mutetime || mutetime === undefined) {
          return message.reply({
            embeds: [new MessageEmbed()
              .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
              .setTitle(eval(client.la[ls]["cmds"]["administration"]["mute"]["variable18"]))
              .setDescription(eval(client.la[ls]["cmds"]["administration"]["mute"]["variable19"]))
          ]});
        }
        //Send information in the Chat
        message.reply({
          embeds: [new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(es.footertext, es.footericon)
          .setTitle(eval(client.la[ls]["cmds"]["administration"]["mute"]["variable20"]))
          .setDescription(eval(client.la[ls]["cmds"]["administration"]["mute"]["variable21"]))
        ]});
        //Ensure the MUTE DB
        client.mutes.ensure("MUTES", {
          MUTES: []
        })
        //Add the Member to the Mute DB
        client.mutes.push("MUTES", {
          timestamp: Date.now(),
          mutetime: mutetime,
          role: mutedrole.id,
          user: member.user.id,
          guild: message.guild.id,
          channel: message.channel.id,
          reason: reason,
        }, "MUTES")
        //increase the Mod Stats
        client.stats.push(message.guild.id + message.author.id, new Date().getTime(), "mute");
        //Send information to the MUTE - MEMBER
        member.send({
          embeds: (new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(es.footertext, es.footericon)
          .setTitle(eval(client.la[ls]["cmds"]["administration"]["mute"]["variable22"]))
          .setDescription(eval(client.la[ls]["cmds"]["administration"]["mute"]["variable23"]))
        )}).catch((_) => {})
      }


      if (client.settings.get(message.guild.id, `adminlog`) != "no") {
        try {
          var channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, `adminlog`))
          if (!channel) return client.settings.set(message.guild.id, "no", `adminlog`);
          channel.send({embeds: [new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
            .setAuthor(`${require("path").parse(__filename).name} | ${message.author.tag}`, message.author.displayAvatarURL({
              dynamic: true
          }))
            .setDescription(eval(client.la[ls]["cmds"]["administration"]["mute"]["variable24"]))
            .addField(eval(client.la[ls]["cmds"]["administration"]["ban"]["variablex_15"]), eval(client.la[ls]["cmds"]["administration"]["ban"]["variable15"]))
           .addField(eval(client.la[ls]["cmds"]["administration"]["ban"]["variablex_16"]), eval(client.la[ls]["cmds"]["administration"]["ban"]["variable16"]))
            .setTimestamp().setFooter("ID: " + message.author.id)
        ]})
        } catch (e) {
          console.log(e.stack ? String(e.stack).grey : String(e).grey)
        }
      }
    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply({embeds : [new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(eval(client.la[ls]["cmds"]["administration"]["mute"]["variable27"]))
        .setDescription(eval(client.la[ls]["cmds"]["administration"]["mute"]["variable28"]))
      ]});
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
