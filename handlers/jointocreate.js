const {
  MessageEmbed,
  Collection
} = require("discord.js")
const config = require("../botconfig/config.json");
const kernelsettings = require("../botconfig/settings.json");
const ee = require("../botconfig/embed.json");
const {
  databasing,
  check_voice_channels,
  check_created_voice_channels,
  create_join_to_create_Channel
} = require("../handlers/functions");
var CronJob = require('cron').CronJob;


module.exports = function (client) {

  client.JobJointocreate = new CronJob('0 * * * * *', function() {
    check_voice_channels(client)
  }, null, true, 'America/Los_Angeles');
  client.JobJointocreate2 = new CronJob('0 * * * * *', function() {
    check_created_voice_channels(client)
  }, null, true, 'America/Los_Angeles');

  client.on("ready", () => {
    check_voice_channels(client);
    check_created_voice_channels(client)
    client.JobJointocreate.start();
    client.JobJointocreate2.start();
    console.log("JOBS STARTED etc.")
  })

  //voice state update event to check joining/leaving channels
  client.on("voiceStateUpdate", (oldState, newState) => {
      if (!oldState.streaming && newState.streaming) return //console.log(`${newState.member.user.tag} Is now ${newState.streaming ? "streaming" : "not streaming"}`.gray);
      if (oldState.streaming && !newState.streaming) return //console.log(`${newState.member.user.tag} Is now ${newState.streaming ? "streaming)" : "not streaming)"}`.gray);
      if (!oldState.serverDeaf && newState.serverDeaf) return //console.log(`${newState.member.user.tag} Is now ${newState.serverDeaf ? "deafed (Server)" : "undeafed (Server)"}`.gray);
      if (oldState.serverDeaf && !newState.serverDeaf) return //console.log(`${newState.member.user.tag} Is now ${newState.serverDeaf ? "deafed (Server)" : "undeafed (Server)"}`.gray);
      if (!oldState.serverMute && newState.serverMute) return //console.log(`${newState.member.user.tag} Is now ${newState.serverMute ? "muted (Server)" : "unmuted (Server)"}`.gray);
      if (oldState.serverMute && !newState.serverMute) return //console.log(`${newState.member.user.tag} Is now ${newState.serverMute ? "muted (Server)" : "unmuted (Server)"}`.gray);
      if (!oldState.selfDeaf && newState.selfDeaf) return //console.log(`${newState.member.user.tag} Is now ${newState.selfDeaf ? "deafed (self)" : "undeafed (self)"}`.gray);
      if (oldState.selfDeaf && !newState.selfDeaf) return //console.log(`${newState.member.user.tag} Is now ${newState.selfDeaf ? "deafed (self)" : "undeafed (self)"}`.gray);
      if (!oldState.selfMute && newState.selfMute) return //console.log(`${newState.member.user.tag} Is now ${newState.selfMute ? "muted (self)" : "unmuted (self)"}`.gray);
      if (oldState.selfMute && !newState.selfMute) return //console.log(`${newState.member.user.tag} Is now ${newState.selfMute ? "muted (self)" : "unmuted (self)"}`.gray);
      if (!oldState.selfVideo && newState.selfVideo) return //console.log(`${newState.member.user.tag} Is now ${newState.selfVideo ? "self Video Sharing" : "not self Video Sharing"}`.gray);
      if (oldState.selfVideo && !newState.selfVideo) return //console.log(`${newState.member.user.tag} Is now ${newState.selfVideo ? "self Video Sharing" : "not self Video Sharing"}`.gray);

    // JOINED A CHANNEL
    if (!oldState.channelId && newState.channelId) {
      client.jtcsettings.ensure(newState.guild.id, {
        channel: "",
        channelname: "{user}' Room",
        guild: newState.guild.id,
      });
      client.jtcsettings2.ensure(newState.guild.id, {
        channel: "",
        channelname: "{user}' Channel",
        guild: newState.guild.id,
      });
      client.jtcsettings3.ensure(newState.guild.id, {
        channel: "",
        channelname: "{user}' Lounge",
        guild: newState.guild.id,
      });
      let channels = [];
      channels.push(client.jtcsettings.get(newState.guild.id, `channel`))
      channels.push(client.jtcsettings2.get(newState.guild.id, `channel`))
      channels.push(client.jtcsettings3.get(newState.guild.id, `channel`))

      for (let i = 0; i < channels.length; i++) {
        if (channels[i].length > 0 && channels[i] == newState.channelId) {
          create_join_to_create_Channel(client, newState, i + 1);
          break;
        }
      }
      return;
    }
    // LEFT A CHANNEL
    if (oldState.channelId && !newState.channelId) {
      
      client.jtcsettings.ensure(oldState.guild.id, {
        channel: "",
        channelname: "{user}' Room",
        guild: oldState.guild.id,
      });
      client.jtcsettings2.ensure(oldState.guild.id, {
        channel: "",
        channelname: "{user}' Channel",
        guild: oldState.guild.id,
      });
      client.jtcsettings3.ensure(oldState.guild.id, {
        channel: "",
        channelname: "{user}' Lounge",
        guild: oldState.guild.id,
      });
      client.jointocreatemap.ensure(`tempvoicechannel_${oldState.guild.id}_${oldState.channelId}`, false)
      if (client.jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelId}`)) {
        //CHANNEL DELETE CHECK
        var vc = oldState.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelId}`));
        if (vc.members.size < 1) {
          client.jointocreatemap.delete(`tempvoicechannel_${oldState.guild.id}_${oldState.channelId}`);
          client.jointocreatemap.delete(`owner_${vc.guild.id}_${vc.id}`);
          return vc.delete().catch(e => console.log("Couldn't delete room"));
        } else {
          let perms = vc.permissionOverwrites.map(c => c)
          let owner = false;
          for (let i = 0; i < perms.length; i++) {
            if (perms[i].allow.toArray().includes("MANAGE_CHANNELS") && perms[i].id == oldState.member.user.id) owner = true;
          }
          //if owner left, then pick a random user
          if (owner) {
            let members = vc.members.map(member => member.id);
            let randommemberid = members[Math.floor(Math.random() * members.length)];
            
            vc.permissionOverwrites.edit(randommemberid, {
              CONNECT: true,
              VIEW_CHANNEL: true,
              MANAGE_CHANNELS: true,
              MANAGE_ROLES: true
            }).catch(e => console.log(String(e).grey.italic.dim))

            vc.permissionOverwrites.edit(oldState.member.user.id, {
              CONNECT: true,
              VIEW_CHANNEL: true,
              MANAGE_CHANNELS: false,
              MANAGE_ROLES: false
            }).catch(e => console.log(String(e).grey.italic.dim))
            try {
              let es = client.settings.get(vc.guild.id, "embed")
              if(!client.settings.has(vc.guild.id, "language")) client.settings.ensure(vc.guild.id, { language: "en" });
              let ls = client.settings.get(vc.guild.id, "language")
              client.users.fetch(randommemberid).then(user => {
                user.send({embeds: [new MessageEmbed()
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setFooter(es.footertext, es.footericon)
                  .setTitle(eval(client.la[ls]["handlers"]["jointocreatejs"]["jointocreate"]["variable1"]))
                  .setDescription(eval(client.la[ls]["handlers"]["jointocreatejs"]["jointocreate"]["variable2"]))]})
              })
            } catch {
              /* */
            }
          }
        }
      }
    }

    // Switch A CHANNEL
    if (oldState.channelId && newState.channelId) {
      client.jtcsettings.ensure(newState.guild.id, {
        channel: "",
        channelname: "{user}' Room",
        guild: newState.guild.id,
      });
      client.jtcsettings2.ensure(newState.guild.id, {
        channel: "",
        channelname: "{user}' Channel",
        guild: newState.guild.id,
      });
      client.jtcsettings3.ensure(newState.guild.id, {
        channel: "",
        channelname: "{user}' Lounge",
        guild: newState.guild.id,
      });
      if (oldState.channelId !== newState.channelId) {
        let channels = [];
        channels.push(client.jtcsettings.get(newState.guild.id, `channel`))
        channels.push(client.jtcsettings2.get(newState.guild.id, `channel`))
        channels.push(client.jtcsettings3.get(newState.guild.id, `channel`))
        for (let i = 0; i < channels.length; i++) {
          if (channels[i].length > 2 && channels[i] == newState.channelId) {
            create_join_to_create_Channel(client, newState, i + 1);
            break;
          }
        }
        //ENSURE THE DB
        client.jointocreatemap.ensure(`tempvoicechannel_${oldState.guild.id}_${oldState.channelId}`, false)
        //IF STATEMENT
        if (client.jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelId}`)) {
          var vc = oldState.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelId}`));
          if (vc.members.size < 1) {
            client.jointocreatemap.delete(`tempvoicechannel_${oldState.guild.id}_${oldState.channelId}`);
            client.jointocreatemap.delete(`owner_${vc.guild.id}_${vc.id}`);
            return vc.delete().catch(e => console.log("Couldn't delete room"));
          } else {
            /* */
          }
        }
      }
    }
  })




}

/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://discord.gg/sngXqWK2eP
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention him / Milrato Development, when using this Code!
 * @INFO
 */
