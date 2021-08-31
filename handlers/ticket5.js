const ee = require("../botconfig/embed.json")
const {
  MessageEmbed,
  Message,
} = require(`discord.js`);
const moment = require("moment");
module.exports = (client) => {
  
  let systempath = "ticketsystem5";
  let ticketspath = "tickets5";
  let idpath = "ticketid5";
  let tickettypepath = "ticket-setup-5";

  client.on("messageReactionAdd", async (reaction, user) => {
    if (reaction.message && reaction.message.partial) await reaction.message.fetch().catch(e => console.log(String(e).grey.italic.dim));
    if (reaction.partial) await reaction.fetch().catch(e => console.log(String(e).grey.italic.dim));
    if (user.bot) return;
    if (!reaction.message.guild) return;
    if (!client.settings.has(reaction.message.guild.id, "language")) client.settings.ensure(reaction.message.guild.id, {
      language: "en"
    });
    let ls = client.settings.get(reaction.message.guild.id, "language");
    client.setups.ensure(reaction.message.guild.id, {
      enabled: false,
      guildid: reaction.message.guild.id,
      messageid: "",
      channelid: "",
      parentid: "",
      message: "Hey {user}, thanks for opening an ticket! Someone will help you soon!",
      adminroles: []
    }, systempath);
    client.setups.ensure("TICKETS", {
      tickets1: [],
      tickets2: [],
      tickets3: [],
      tickets4: [],
      tickets5: [],
      applytickets1: [],
      applytickets2: [],
      applytickets3: [],
      applytickets4: [],
      applytickets5: []
    })
    let ticket = client.setups.get(reaction.message.guild.id, systempath);
    if (!ticket || !ticket.guildid || !ticket.messageid) return;
    if (reaction.message.guild.id === ticket.guildid && reaction.message.id === ticket.messageid) {
      reaction.users.remove(user).catch(e => console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim))

      let disabled = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setTitle(eval(client.la[ls]["handlers"]["ticketjs"]["ticket"]["variable1"]))
        .setFooter(ee.footertext, ee.footericon).setColor(ee.wrongcolor)
        .setThumbnail(ee.footericon)
      if (!ticket.enabled) return user.send(disabled).catch(e => console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim));

      if (client.setups.get("TICKETS", ticketspath).includes(user.id)) {
        var es = client.settings.get(reaction.message.guild.id, "embed")
        try {
          var ticketchannel = reaction.message.guild.channels.cache.get(client.setups.get(user.id, idpath))
          if (!ticketchannel || ticketchannel == null || !ticketchannel.id || ticketchannel.id == null) throw {
            message: "NO TICKET CHANNEL FOUND AKA NO ANTISPAM"
          }
          let data = client.setups.get(ticketchannel.id, "ticketdata");
          if (data.state === "closed") throw "TICKET DOESNT COUNT"
          return user.send(new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setFooter(es.footertext, es.footericon)
            .setTitle(eval(client.la[ls]["handlers"]["ticketjs"]["ticket"]["variable2"]))
            .setDescription(eval(client.la[ls]["handlers"]["ticketjs"]["ticket"]["variable3"])));
        } catch {
          client.setups.remove("TICKETS", user.id, ticketspath)
        }

      }

      let channelname = `ticket-${user.username}`.replace(" ", "-").substr(0, 31);

      reaction.message.guild.channels.create(channelname.substr(0, 31), {
        topic: `ticket-${user.id}`
      }).then(async ch => {
        let es = client.settings.get(reaction.message.guild.id, "embed")
        client.setups.push("TICKETS", user.id, ticketspath);
        client.setups.push("TICKETS", ch.id, ticketspath);
        client.setups.set(user.id, ch.id, idpath);
        client.setups.set(ch.id, {
          user: user.id,
          channel: ch.id,
          guild: reaction.message.guild.id,
          type: tickettypepath,
          state: "open",
          date: Date.now(),
        }, "ticketdata");

        var ticketembed = new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(`To close/manage this ticket type: ${client.settings.get(reaction.message.guild.id, "prefix")}ticket`, es.footericon)

          .setAuthor(`Ticket for: ${user.tag}`, user.displayAvatarURL({
            dynamic: true
          }), "https://discord.gg/sngXqWK2eP")
          .setDescription(ticket.message.replace("{user}", `${user}`))

        const {
          MessageButton, MessageActionRow
        } = require('discord.js')
        let button_close = new MessageButton().setStyle('PRIMARY').setCustomId('ticket_close').setLabel('Close').setEmoji("🔒")
        let button_delete = new MessageButton().setStyle('SECONDARY').setCustomId('ticket_delete').setLabel("Delete").setEmoji("🗑️")
        let button_transcript = new MessageButton().setStyle('blurple').setCustomId('ticket_transcript').setLabel("Transcript").setEmoji("📑")
        let button_user = new MessageButton().setStyle('SUCCESS').setCustomId('ticket_user').setLabel("Users").setEmoji("👤")
        let button_role = new MessageButton().setStyle('SUCCESS').setCustomId('ticket_role').setLabel("Roles").setEmoji("📌")
        const allbuttons = [new MessageActionRow().addComponents([button_close, button_delete, button_transcript, button_user, button_role])]
        let ticketroles = ticket.adminroles.map(r => `<@&${r}>`);
        ch.send({
          content: `<@${user.id}> ${ticketroles.length > 0 ? "| " + ticketroles.join(" / ") : ""}`,
          embeds: [ticketembed],
          components: allbuttons
        }).catch((O) => {
          console.log(String(O).grey.italic.dim)
        }).then(msg => {
          msg.pin().catch((O) => {
            console.log(String(O).grey.italic.dim)
          })
        })

        try {
          var cat = reaction.message.guild.channels.cache.get(ticket.parentid)
          ch.setParent(cat.id).catch((O) => {
            console.log(String(O).grey.italic.dim)
          })
        } catch {
          if (reaction.message.channel.parent) ch.setParent(reaction.message.channel.parent.id).catch((O) => {
            console.log(String(O).grey.italic.dim)
          })
        }
        await ch.permissionOverwrites.edit(reaction.message.guild.roles.everyone, { //disabling all roles
          SEND_MESSAGES: false,
          VIEW_CHANNEL: false,
          EMEBD_LINKS: false,
          ADD_REACTIONS: false,
          ATTACH_FILES: false
        }).catch((O) => {
          console.log(String(O).grey.italic.dim)
        })
        await ch.permissionOverwrites.edit(reaction.message.guild.id, { //disabling all roles
          SEND_MESSAGES: false,
          VIEW_CHANNEL: false,
          EMEBD_LINKS: false,
          ADD_REACTIONS: false,
          ATTACH_FILES: false
        }).catch((O) => {
          console.log(String(O).grey.italic.dim)
        })
        await ch.permissionOverwrites.edit(user.id, {
          SEND_MESSAGES: true,
          VIEW_CHANNEL: true,
          EMEBD_LINKS: true,
          ADD_REACTIONS: true,
          ATTACH_FILES: true
        }).catch((O) => {
          console.log(String(O).grey.italic.dim)
        })
        if (reaction.message.guild.roles.cache.some(r => ticket.adminroles.includes(r ? r.id : r))) {
          for (let adminrole of ticket.adminroles) {
            try {
              if (reaction.message.guild.roles.cache.has(adminrole)) {
                await ch.permissionOverwrites.edit(adminrole, { //ticket support role id
                  SEND_MESSAGES: true,
                  VIEW_CHANNEL: true,
                  EMEBD_LINKS: true,
                  ADD_REACTIONS: true,
                  ATTACH_FILES: true
                });
              } else {
                console.log("Role is deleted")
              }
            } catch (error) {
              console.log(error.stack)
            }
          }
        }
      })
    }


  })
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return;
    var { guild, channel, user, message } = interaction;
    if(!guild || !channel || !message || !user) return;
    if (interaction.customId.includes("create_a_ticket")) return
    let ticket = client.setups.get(guild.id, systempath);
    //if invalid return
    if (guild.id !== ticket.guildid || interaction.message.id !== ticket.messageid) return;
    client.setups.ensure(guild.id, {
      enabled: false,
      guildid: guild.id,
      messageid: "",
      channelid: "",
      parentid: "",
      message: "Hey {user}, thanks for opening an ticket! Someone will help you soon!",
      adminroles: []
    }, systempath);
    client.setups.ensure("TICKETS", {
      tickets1: [],
      tickets2: [],
      tickets3: [],
      tickets4: [],
      tickets5: [],
      applytickets1: [],
      applytickets2: [],
      applytickets3: [],
      applytickets4: [],
      applytickets5: []
    })
    if (client.setups.get("TICKETS", ticketspath).includes(user.id)) {
      try {
        var ticketchannel = guild.channels.cache.get(client.setups.get(user.id, idpath))
        if (!ticketchannel || ticketchannel == null || !ticketchannel.id || ticketchannel.id == null) throw {
          message: "NO TICKET CHANNEL FOUND AKA NO ANTISPAM"
        }
        return interaction.reply({content: `<:no:833101993668771842> **You already have an Ticket!** <#${client.setups.get(user.id, idpath)}>`, ephemeral: true});
      } catch {
        client.setups.remove("TICKETS", user.id, ticketspath)
      }

    }

    let channelname = `ticket-${user.username}`.replace(" ", "-").substr(0, 31);

    guild.channels.create(channelname.substr(0, 31), {
      topic: `📨 Ticket for: ${user.tag} (${user.id}) | ✅ Created at: ${moment().format("LLLL")}`,
      type: "GUILD_TEXT",
      reason: `Ticket System 1 for: ${user.tag}`,
      permissionOverwrites: 
      guild.roles.cache.array().map(r => {
        let Obj = {}
        if(r.id){
          Obj.id = r.id;
          Obj.deny = ["SEND_MESSAGES", "VIEW_CHANNEL", "EMBED_LINKS", "ADD_REACTIONS", "ATTACH_FILES"]
          return Obj;
        } else {
          return false;
        }
      }).filter(Boolean)
    }).then(async ch => {
      await interaction.reply({content: `<a:Loading:833101350623117342> **Creating your Ticket...** (Usually takes 0-2 Seconds)`, ephemeral: true});
      let es = client.settings.get(guild.id, "embed")
      client.setups.push("TICKETS", user.id, ticketspath);
      client.setups.push("TICKETS", ch.id, ticketspath);
      client.setups.set(user.id, ch.id, idpath);
      client.setups.set(ch.id, {
        user: user.id,
        channel: ch.id,
        guild: guild.id,
        type: tickettypepath,
        state: "open",
        date: Date.now(),
      }, "ticketdata");

      var ticketembed = new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(`To close/manage this ticket type: ${client.settings.get(guild.id, "prefix")}ticket`, es.footericon)

        .setAuthor(`Ticket for: ${user.tag}`, user.displayAvatarURL({
          dynamic: true
        }), "https://discord.gg/sngXqWK2eP")
        .setDescription(ticket.message.replace("{user}", `${user}`))

      const {
        MessageButton
      } = require('discord.js')
      let button_close = new MessageButton().setStyle('PRIMARY').setCustomId('ticket_close').setLabel('Close').setEmoji("🔒")
      let button_delete = new MessageButton().setStyle('SECONDARY').setCustomId('ticket_delete').setLabel("Delete").setEmoji("🗑️")
      let button_transcript = new MessageButton().setStyle('blurple').setCustomId('ticket_transcript').setLabel("Transcript").setEmoji("📑")
      let button_user = new MessageButton().setStyle('SUCCESS').setCustomId('ticket_user').setLabel("Users").setEmoji("👤")
      let button_role = new MessageButton().setStyle('SUCCESS').setCustomId('ticket_role').setLabel("Roles").setEmoji("📌")
      const allbuttons = [new MessageActionRow().addComponents([button_close, button_delete, button_transcript, button_user, button_role])]
      let ticketroles = ticket.adminroles.map(r => `<@&${r}>`);
      ch.send({
        content: `<@${user.id}> ${ticketroles.length > 0 ? "| " + ticketroles.join(" / ") : ""}`,
        embeds: [ticketembed],
        components: allbuttons
      }).catch((O) => {
        console.log(String(O).grey.italic.dim)
      }).then(msg => {
        msg.pin().catch((O) => {
          console.log(String(O).grey.italic.dim)
        })
      })

      try {
        var cat = guild.channels.cache.get(ticket.parentid)
        ch.setParent(cat.id, {lockPermissions: false}).catch((O) => {
          console.log(String(O).grey.italic.dim)
        })
      } catch {
        if (channel.parent) ch.setParent(channel.parent.id, {lockPermissions: false}).catch((O) => {
          console.log(String(O).grey.italic.dim)
        })
      }
      await ch.createOverwrite(user.id, {
        SEND_MESSAGES: true,
        VIEW_CHANNEL: true,
        EMBED_LINKS: true,
        ADD_REACTIONS: true,
        ATTACH_FILES: true
      }).catch((O) => {
        console.log(String(O).grey.italic.dim)
      });
      if (guild.roles.cache.some(r => ticket.adminroles.includes(r ? r.id : r))) {
        for (let adminrole of ticket.adminroles) {
          try {
            if (guild.roles.cache.has(adminrole)) {
              await ch.permissionOverwrites.edit(adminrole, { //ticket support role id
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
                EMBED_LINKS: true,
                ADD_REACTIONS: true,
                ATTACH_FILES: true
              }).catch((O) => {
                console.log(String(O).grey.italic.dim)
              });
            } else {
              console.log("Role is deleted")
            }
          } catch (error) {
            console.log(error.stack)
          }
        }
      }
      await interaction.editReply({content: `<a:yes:833101995723194437> **Your Ticket is created!** <#${ch.id}>`, ephemeral: true});
      ch.send({
        content: `<@${user.id}>`,
      }).catch((O) => {
        console.log(String(O).grey.italic.dim)
      }).then(msg => {
        msg.delete().catch((O) => {
          console.log(String(O).grey.italic.dim)
        })
      })
    })

  });
}
