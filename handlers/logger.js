const Discord = require("discord.js");
const fs = require("fs")
const moment = require('moment');
module.exports = (c) => {
    try {
      c.on("channelCreate", async function (channel) {
        try {
          const eventsTimestamp = Date.now().toString()
          if(!channel.guild) return;
          let AuditData = await channel.guild.fetchAuditLogs({
            limit: 1,
            type: "CHANNEL_CREATE",
          }).then((audit => {
            return audit.entries.first()
          })).catch((e) => {
            send_log(c,
              channel.guild,
              "GREEN",
              "Channel CREATED",
              `**ChannelNAME:** \`${channel.name}\`\n**ChannelID:** \`${channel.id}\`\n**ChannelTYPE:** \`${channel.type}\``,
              "https://cdn.discordapp.com/attachments/849047781276647425/869531337411952670/845717716559593512.png"
            )
          })
          if(!AuditData || !AuditData.executor){
            return send_log(c,
              channel.guild,
              "GREEN",
              "Channel CREATED",
              `**ChannelNAME:** \`${channel.name}\`\n**ChannelID:** \`${channel.id}\`\n**ChannelTYPE:** \`${channel.type}\``,
              "https://cdn.discordapp.com/attachments/849047781276647425/869531337411952670/845717716559593512.png"
            )
          }
          let AddedUserID = AuditData.executor.id;
          let LogTimeString = AuditData.createdTimestamp.toString();

          const EventExecution = eventsTimestamp;
          const logtime = LogTimeString.slice(0, -3);
          const eventtime = EventExecution.slice(0, -3);
          if (logtime !== eventtime) return send_log(c,
            channel.guild,
            "GREEN",
            "Channel CREATED",
            `**ChannelNAME:** \`${channel.name}\`\n**ChannelID:** \`${channel.id}\`\n**ChannelTYPE:** \`${channel.type}\``,
            "https://cdn.discordapp.com/attachments/849047781276647425/869531337411952670/845717716559593512.png"
          );
          send_log(c,
            channel.guild,
            "GREEN",
            "Channel CREATED",
            `**Created by:** <@${AddedUserID}> (\`${AddedUserID}\`)\n\n**NAME:** \`${channel.name}\`\n**ChannelID:** \`${channel.id}\`\n**ChannelTYPE:** \`${channel.type}\``,
            "https://cdn.discordapp.com/attachments/849047781276647425/869531337411952670/845717716559593512.png"
          )
        } catch (e) {
          console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
        }
      })
      c.on("channelDelete", async function (channel) {
        try {
          const eventsTimestamp = Date.now().toString()
          if(!channel.guild) return;
          let AuditData = await channel.guild.fetchAuditLogs({
            limit: 1,
            type: "CHANNEL_DELETE",
          }).then((audit => {
            return audit.entries.first()
          })).catch((e) => {
            send_log(c,
              channel.guild,
              "RED",
              "Channel DELETED",
              `**ChannelNAME:** \`${channel.name}\`\n**ChannelID:** \`${channel.id}\`\n**ChannelTYPE:** \`${channel.type}\``,
              "https://cdn.discordapp.com/attachments/849047781276647425/869530655871082516/850923749132992550.png"
            )
          })
          if(!AuditData || !AuditData.executor){
            return send_log(c,
                channel.guild,
                "RED",
                "Channel DELETED",
                `**ChannelNAME:** \`${channel.name}\`\n**ChannelID:** \`${channel.id}\`\n**ChannelTYPE:** \`${channel.type}\``,
                "https://cdn.discordapp.com/attachments/849047781276647425/869530655871082516/850923749132992550.png"
              )
          }
          let AddedUserID = AuditData.executor.id;
          let LogTimeString = AuditData.createdTimestamp.toString();

          const EventExecution = eventsTimestamp;
          const logtime = LogTimeString.slice(0, -3);
          const eventtime = EventExecution.slice(0, -3);
          if (logtime !== eventtime) return send_log(c,
            channel.guild,
            "RED",
            "Channel DELETED",
            `**ChannelNAME:** \`${channel.name}\`\n**ChannelID:** \`${channel.id}\`\n**ChannelTYPE:** \`${channel.type}\``,
            "https://cdn.discordapp.com/attachments/849047781276647425/869530655871082516/850923749132992550.png"
          );
          send_log(c,
            channel.guild,
            "RED",
            "Channel DELETED",
            `**Deleted by:** <@${AddedUserID}> (\`${AddedUserID}\`)\n\n**ChannelNAME**: \`${channel.name}\`\n**ChannelID**: \`${channel.id}\`\n**ChannelTYPE**: \`${channel.type}\``,
            "https://cdn.discordapp.com/attachments/849047781276647425/869530655871082516/850923749132992550.png"
          )
        } catch (e) {
          console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
        }
      })
      c.on("channelPinsUpdate", async function (channel, time) {
        try {
          const eventsTimestamp = Date.now().toString()
          if(!channel.guild) return;
          let AuditData = await channel.guild.fetchAuditLogs({
            limit: 1,
            type: "MESSAGE_PIN",
          }).then((audit => {
            return audit.entries.first()
          })).catch((e) => {
            send_log(c,
              channel.guild,
              "YELLOW",
              "Channel PINS UPDATE",
              `ChannelNAME: \`${channel.name}\`\nChannelID: \`${channel.id}\`\nPinned at \`${time}\``, "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/samsung/265/pushpin_1f4cc.png"
            )
          })
          if(!AuditData || !AuditData.executor){
            return send_log(c,
              channel.guild,
              "YELLOW",
              "Channel PINS UPDATE",
              `ChannelNAME: \`${channel.name}\`\nChannelID: \`${channel.id}\`\nPinned at \`${time}\``, "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/samsung/265/pushpin_1f4cc.png"
            )
          }
          let AddedUserID = AuditData.executor.id;
          let LogTimeString = AuditData.createdTimestamp.toString();

          const EventExecution = eventsTimestamp;
          const logtime = LogTimeString.slice(0, -3);
          const eventtime = EventExecution.slice(0, -3);
          if (logtime !== eventtime) return
          send_log(c,
            channel.guild,
            "YELLOW",
            "Channel PINS UPDATE BY: ",
            `**Pinned by:** <@${AddedUserID}> (\`${AddedUserID}\`)\n\nChannelNAME: \`${channel.name}\`\nChannelID: \`${channel.id}\`\nPinned at \`${time}\``, "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/samsung/265/pushpin_1f4cc.png"
          )
        } catch (e) {
          console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)

        }
      })
      c.on("channelPinsUpdate", async function (channel, time) {
        try {
          const eventsTimestamp = Date.now().toString()
          if(!channel.guild) return;
          let AuditData = await channel.guild.fetchAuditLogs({
            limit: 1,
            type: "MESSAGE_UNPIN",
          }).then((audit => {
            return audit.entries.first()
          })).catch((e) => {
            send_log(c,
              channel.guild,
              "YELLOW",
              "Channel PINS UPDATE",
              `ChannelNAME: \`${channel.name}\`\nChannelID: \`${channel.id}\`\nPinned at \`${time}\``, "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/samsung/265/pushpin_1f4cc.png"
            )
          })
          if(!AuditData || !AuditData.executor){
            return send_log(c,
              channel.guild,
              "YELLOW",
              "Channel PINS UPDATE",
              `ChannelNAME: \`${channel.name}\`\nChannelID: \`${channel.id}\`\nPinned at \`${time}\``, "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/samsung/265/pushpin_1f4cc.png"
            )
          }
          let AddedUserID = AuditData.executor.id;
          let LogTimeString = AuditData.createdTimestamp.toString();

          const EventExecution = eventsTimestamp;
          const logtime = LogTimeString.slice(0, -3);
          const eventtime = EventExecution.slice(0, -3);
          if (logtime !== eventtime) return
          send_log(c,
            channel.guild,
            "YELLOW",
            "Channel PINS UPDATE BY: ",
            `**Un-Pinned by:** <@${AddedUserID}> (\`${AddedUserID}\`)\n\nChannelNAME: \`${channel.name}\`\nChannelID: \`${channel.id}\`\nPinned at \`${time}\``, "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/samsung/265/pushpin_1f4cc.png"
          )
        } catch (e) {
          console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)

        }
      })
      c.on("channelUpdate", async function (oldChannel, newChannel) {
        try {

          let guildChannel = newChannel.guild;
          if (!guildChannel || !guildChannel.available) return;


          const eventsTimestamp = Date.now().toString()
          let AuditData = await newChannel.guild.fetchAuditLogs({
            limit: 1,
            type: "CHANNEL_UPDATE",
          }).then((audit => {
            return audit.entries.first()
          })).catch((e) => {
            if (oldChannel.name != newChannel.name) {
              send_log(c,
                oldChannel.guild,
                "YELLOW",
                "Channel UPDATED - NAME",
                `**ChannelNAME:** \`${oldChannel.name}\`\n**ChannelID**: \`${oldChannel.id}\`\n\n` +
                `**ChannelNAME:** \`${newChannel.name}\`\n**ChannelID**: \`${newChannel.id}\``,
                "https://cdn.discordapp.com/attachments/849047781276647425/869529692867289128/861357037064421386.png"
              )
            } else if (oldChannel.type != newChannel.type) {
              send_log(c,
                oldChannel.guild,
                "YELLOW",
                "Channel UPDATED - TYPE",
                `**ChannelNAME:** \`${oldChannel.name}\`\n**ChannelID**: \`${oldChannel.id}\`\n\n` +
                `**ChannelNAME:** \`${newChannel.name}\`\n**ChannelID**: \`${newChannel.id}\``,
                "https://cdn.discordapp.com/attachments/849047781276647425/869529692867289128/861357037064421386.png"
              )
            } else if (oldChannel.topic != newChannel.topic) {
              send_log(c,
                oldChannel.guild,
                "YELLOW",
                "Channel UPDATED - TOPIC",
                `**ChannelNAME:** \`${oldChannel.name}\`\n**ChannelID**: \`${oldChannel.id}\`\n\n` +
                `**ChannelNAME:** \`${newChannel.name}\`\n**ChannelID**: \`${newChannel.id}\`\n\n**ChannelTOPIC:** \`${newChannel.topic}\``,
                "https://cdn.discordapp.com/attachments/849047781276647425/869529692867289128/861357037064421386.png"
              )
            }
          })
          if(!AuditData || !AuditData.executor){
            
            if (oldChannel.name != newChannel.name) {
              send_log(c,
                oldChannel.guild,
                "YELLOW",
                "Channel UPDATED - NAME",
                `**ChannelNAME:** \`${oldChannel.name}\`\n**ChannelID**: \`${oldChannel.id}\`\n\n` +
                `**ChannelNAME:** \`${newChannel.name}\`\n**ChannelID**: \`${newChannel.id}\``,
                "https://cdn.discordapp.com/attachments/849047781276647425/869529692867289128/861357037064421386.png"
              )
            } else if (oldChannel.type != newChannel.type) {
              send_log(c,
                oldChannel.guild,
                "YELLOW",
                "Channel UPDATED - TYPE",
                `**ChannelNAME:** \`${oldChannel.name}\`\n**ChannelID**: \`${oldChannel.id}\`\n\n` +
                `**ChannelNAME:** \`${newChannel.name}\`\n**ChannelID**: \`${newChannel.id}\``,
                "https://cdn.discordapp.com/attachments/849047781276647425/869529692867289128/861357037064421386.png"
              )
            } else if (oldChannel.topic != newChannel.topic) {
              send_log(c,
                oldChannel.guild,
                "YELLOW",
                "Channel UPDATED - TOPIC",
                `**ChannelNAME:** \`${oldChannel.name}\`\n**ChannelID**: \`${oldChannel.id}\`\n\n` +
                `**ChannelNAME:** \`${newChannel.name}\`\n**ChannelID**: \`${newChannel.id}\`\n\n**ChannelTOPIC:** \`${newChannel.topic}\``,
                "https://cdn.discordapp.com/attachments/849047781276647425/869529692867289128/861357037064421386.png"
              )
            }
            return
          }
          let AddedUserID = AuditData.executor.id;
          let LogTimeString = AuditData.createdTimestamp.toString();

          const EventExecution = eventsTimestamp;
          const logtime = LogTimeString.slice(0, -3);
          const eventtime = EventExecution.slice(0, -3);
          if (logtime !== eventtime) {
            
            if (oldChannel.name != newChannel.name) {
              send_log(c,
                oldChannel.guild,
                "YELLOW",
                "Channel UPDATED - NAME",
                `**ChannelNAME:** \`${oldChannel.name}\`\n**ChannelID**: \`${oldChannel.id}\`\n\n` +
                `**ChannelNAME:** \`${newChannel.name}\`\n**ChannelID**: \`${newChannel.id}\``,
                "https://cdn.discordapp.com/attachments/849047781276647425/869529692867289128/861357037064421386.png"
              )
            } else if (oldChannel.type != newChannel.type) {
              send_log(c,
                oldChannel.guild,
                "YELLOW",
                "Channel UPDATED - TYPE",
                `**ChannelNAME:** \`${oldChannel.name}\`\n**ChannelID**: \`${oldChannel.id}\`\n\n` +
                `**ChannelNAME:** \`${newChannel.name}\`\n**ChannelID**: \`${newChannel.id}\``,
                "https://cdn.discordapp.com/attachments/849047781276647425/869529692867289128/861357037064421386.png"
              )
            } else if (oldChannel.topic != newChannel.topic) {
              send_log(c,
                oldChannel.guild,
                "YELLOW",
                "Channel UPDATED - TOPIC",
                `**ChannelNAME:** \`${oldChannel.name}\`\n**ChannelID**: \`${oldChannel.id}\`\n\n` +
                `**ChannelNAME:** \`${newChannel.name}\`\n**ChannelID**: \`${newChannel.id}\`\n\n**ChannelTOPIC:** \`${newChannel.topic}\``,
                "https://cdn.discordapp.com/attachments/849047781276647425/869529692867289128/861357037064421386.png"
              )
            }
            return;
          }

          let types = {
            text: "Text Channel",
            voice: "Voice Channel",
            null: "No Type",
            news: "News Channel",
            store: "Store Channel",
            category: "Category",
          }

          if (oldChannel.name != newChannel.name) {
            send_log(c,
              oldChannel.guild,
              "YELLOW",
              "Channel UPDATED - NAME",
              `**Updated by:** <@${AddedUserID}> (\`${AddedUserID}\`)\n\n**ChannelNAME:** \`${oldChannel.name}\`\n**ChannelID**: \`${oldChannel.id}\`\n\n` +
              `**ChannelNAME:** \`${newChannel.name}\`\n**ChannelID**: \`${newChannel.id}\``,
              "https://cdn.discordapp.com/attachments/849047781276647425/869529692867289128/861357037064421386.png"
            )
          } else if (oldChannel.type != newChannel.type) {
            send_log(c,
              oldChannel.guild,
              "YELLOW",
              "Channel UPDATED - TYPE",
              `**Updated by:** <@${AddedUserID}> (\`${AddedUserID}\`)\n\n**ChannelNAME:** \`${oldChannel.name}\`\n**ChannelID**: \`${oldChannel.id}\`\n\n` +
              `**ChannelNAME:** \`${newChannel.name}\`\n**ChannelID**: \`${newChannel.id}\``,
              "https://cdn.discordapp.com/attachments/849047781276647425/869529692867289128/861357037064421386.png"
            )
          } else if (oldChannel.topic != newChannel.topic) {
            send_log(c,
              oldChannel.guild,
              "YELLOW",
              "Channel UPDATED - TOPIC",
              `**Updated by:** <@${AddedUserID}> (\`${AddedUserID}\`)\n\n**ChannelNAME:** \`${oldChannel.name}\`\n**ChannelID**: \`${oldChannel.id}\`\n\n` +
              `**ChannelNAME:** \`${newChannel.name}\`\n**ChannelID**: \`${newChannel.id}\`\n\n**ChannelTOPIC:** \`${newChannel.topic}\``,
              "https://cdn.discordapp.com/attachments/849047781276647425/869529692867289128/861357037064421386.png"
            )
          }
        } catch (e) {
          console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)

        }


      })

      c.on("emojiCreate", async function (emoji) {
        try {
          const eventsTimestamp = Date.now().toString()
          let AuditData = await emoji.guild.fetchAuditLogs({
            limit: 1,
            type: "EMOJI_CREATE",
          }).then((audit => {
            return audit.entries.first()
          })).catch((e) => {
            send_log(c,
              emoji.guild,
              "GREEN",
              "EMOJI CREATED",
              `EMOJI: ${emoji}\nEMOJINAME: ${emoji.name}\nEMOJIID: ${emoji.id}\nEMOJIURL: ${emoji.url}`,
              "https://cdn.discordapp.com/attachments/849047781276647425/869531337411952670/845717716559593512.png"
            )
          })
          if(!AuditData || !AuditData.executor){
            return send_log(c,
              emoji.guild,
              "GREEN",
              "EMOJI CREATED",
              `EMOJI: ${emoji}\nEMOJINAME: ${emoji.name}\nEMOJIID: ${emoji.id}\nEMOJIURL: ${emoji.url}`,
              "https://cdn.discordapp.com/attachments/849047781276647425/869531337411952670/845717716559593512.png"
            )
          }
          let AddedUserID = AuditData.executor.id;
          let LogTimeString = AuditData.createdTimestamp.toString();

          const EventExecution = eventsTimestamp;
          const logtime = LogTimeString.slice(0, -3);
          const eventtime = EventExecution.slice(0, -3);
          if (logtime !== eventtime) return send_log(c,
            emoji.guild,
            "GREEN",
            "EMOJI CREATED",
            `EMOJI: ${emoji}\nEMOJINAME: ${emoji.name}\nEMOJIID: ${emoji.id}\nEMOJIURL: ${emoji.url}`,
            "https://cdn.discordapp.com/attachments/849047781276647425/869531337411952670/845717716559593512.png"
          )
          send_log(c,
            emoji.guild,
            "GREEN",
            "EMOJI CREATED",
            `**Created by:** <@${AddedUserID}> (\`${AddedUserID}\`)\n\nEMOJI: ${emoji}\nEMOJINAME: ${emoji.name}\nEMOJIID: ${emoji.id}\nEMOJIURL: ${emoji.url}`,
            "https://cdn.discordapp.com/attachments/849047781276647425/869531337411952670/845717716559593512.png"
          )
        } catch (e) {
          console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)

        }
      });
      c.on("emojiDelete", async function (emoji) {
        try {
          const eventsTimestamp = Date.now().toString()
          let AuditData = await emoji.guild.fetchAuditLogs({
            limit: 1,
            type: "EMOJI_DELETE",
          }).then((audit => {
            return audit.entries.first()
          })).catch((e) => {
            send_log(c,
              emoji.guild,
              "RED",
              "EMOJI DELETED",
              `EMOJI: ${emoji}\nEMOJINAME: ${emoji.name}\nEMOJIID: ${emoji.id}\nEMOJIURL: ${emoji.url}`,
              "https://cdn.discordapp.com/attachments/849047781276647425/869530655871082516/850923749132992550.png"
            )
          })
          if(!AuditData || !AuditData.executor){
            return send_log(c,
              emoji.guild,
              "RED",
              "EMOJI DELETED",
              `EMOJI: ${emoji}\nEMOJINAME: ${emoji.name}\nEMOJIID: ${emoji.id}\nEMOJIURL: ${emoji.url}`,
              "https://cdn.discordapp.com/attachments/849047781276647425/869530655871082516/850923749132992550.png"
            )
          }
          let AddedUserID = AuditData.executor.id;
          let LogTimeString = AuditData.createdTimestamp.toString();

          const EventExecution = eventsTimestamp;
          const logtime = LogTimeString.slice(0, -3);
          const eventtime = EventExecution.slice(0, -3);
          if (logtime !== eventtime) return send_log(c,
            emoji.guild,
            "RED",
            "EMOJI DELETED",
            `EMOJI: ${emoji}\nEMOJINAME: ${emoji.name}\nEMOJIID: ${emoji.id}\nEMOJIURL: ${emoji.url}`,
            "https://cdn.discordapp.com/attachments/849047781276647425/869530655871082516/850923749132992550.png"
          )
          send_log(c,
            emoji.guild,
            "RED",
            "EMOJI DELETED",
            `**Deleted by:** <@${AddedUserID}> (\`${AddedUserID}\`)\n\nEMOJI: ${emoji}\nEMOJINAME: ${emoji.name}\nEMOJIID: ${emoji.id}\nEMOJIURL: ${emoji.url}`,
            "https://cdn.discordapp.com/attachments/849047781276647425/869530655871082516/850923749132992550.png"
          )
        } catch (e) {
          console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)

        }
      });
      c.on("emojiUpdate", async function (oldEmoji, newEmoji) {
        try {
          const eventsTimestamp = Date.now().toString()
          let AuditData = await newEmoji.guild.fetchAuditLogs({
            limit: 1,
            type: "EMOJI_UPDATE",
          }).then((audit => {
            return audit.entries.first()
          })).catch((e) => {
            send_log(c,
              newEmoji.guild,
              "ORANGE",
              "EMOJI NAME CHANGED",
              `__Emoji: ${newEmoji}__ \n\n**Before:** \`${oldEmoji.name}\`\n**After:** \`${newEmoji.name}\`\n**Emoji ID:** \`${newEmoji.id}\``,
              "https://cdn.discordapp.com/attachments/849047781276647425/869529692867289128/861357037064421386.png"
            )
          })
          if(!AuditData || !AuditData.executor){
            return send_log(c,
              newEmoji.guild,
              "ORANGE",
              "EMOJI NAME CHANGED",
              `__Emoji: ${newEmoji}__ \n\n**Before:** \`${oldEmoji.name}\`\n**After:** \`${newEmoji.name}\`\n**Emoji ID:** \`${newEmoji.id}\``,
              "https://cdn.discordapp.com/attachments/849047781276647425/869529692867289128/861357037064421386.png"
            )
          }
          let AddedUserID = AuditData.executor.id;
          let LogTimeString = AuditData.createdTimestamp.toString();

          const EventExecution = eventsTimestamp;
          const logtime = LogTimeString.slice(0, -3);
          const eventtime = EventExecution.slice(0, -3);
          if (logtime !== eventtime) return send_log(c,
            newEmoji.guild,
            "ORANGE",
            "EMOJI NAME CHANGED",
            `__Emoji: ${newEmoji}__ \n\n**Before:** \`${oldEmoji.name}\`\n**After:** \`${newEmoji.name}\`\n**Emoji ID:** \`${newEmoji.id}\``,
            "https://cdn.discordapp.com/attachments/849047781276647425/869529692867289128/861357037064421386.png"
          )
          send_log(c,
            oldEmoji.guild,
            "ORANGE",
            "EMOJI NAME CHANGED",
            `**Updated by:** <@${AddedUserID}> (\`${AddedUserID}\`)\n\n__Emoji: ${newEmoji}__ \n\n**Before:** \`${oldEmoji.name}\`\n**After:** \`${newEmoji.name}\`\n**Emoji ID:** \`${newEmoji.id}\``,
            "https://cdn.discordapp.com/attachments/849047781276647425/869529692867289128/861357037064421386.png"
          )
        } catch (e) {
          console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)

        }
      });

      c.on("guildBanAdd", async function (guild, user) {
        try {
          const eventsTimestamp = Date.now().toString()
          let AuditData = await guild.fetchAuditLogs({
            limit: 1,
            type: "MEMBER_BAN_ADD",
          }).then((audit => {
            return audit.entries.first()
          })).catch((e) => {
            send_log(c,
              guild,
              "RED",
              "USER BANNED",
              `User: ${user} (\`${user.id}\`)\n\`${user.tag}\``,
              user.displayAvatarURL({dynamic: true})
            )
          })
          if(!AuditData || !AuditData.executor){
            return send_log(c,
              guild,
              "RED",
              "USER BANNED",
              `User: ${user} (\`${user.id}\`)\n\`${user.tag}\``,
              user.displayAvatarURL({dynamic: true})
            )
          }
          let AddedUserID = AuditData.executor.id;
          let LogTimeString = AuditData.createdTimestamp.toString();

          const EventExecution = eventsTimestamp;
          const logtime = LogTimeString.slice(0, -3);
          const eventtime = EventExecution.slice(0, -3);
          if (logtime !== eventtime) return send_log(c,
            guild,
            "RED",
            "USER BANNED",
            `User: ${user} (\`${user.id}\`)\n\`${user.tag}\``,
            user.displayAvatarURL({dynamic: true})
          )
          send_log(c,
            guild,
            "RED",
            "USER BANNED",
            `**Banned by:** <@${AddedUserID}> (\`${AddedUserID}\`)\n\nUser: ${user} (\`${user.id}\`)\n\`${user.tag}\``,
            user.displayAvatarURL({dynamic: true})
          )
        } catch (e) {
          console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)

        }
      });
      c.on("guildBanRemove", async function (guild, user) {
        try {
          const eventsTimestamp = Date.now().toString()
          let AuditData = await guild.fetchAuditLogs({
            limit: 1,
            type: "MEMBER_BAN_REMOVE",
          }).then((audit => {
            return audit.entries.first()
          })).catch((e) => {
            send_log(c,
              guild,
              "YELLOW",
              "USER UNBANNED",
              `User: ${user} (\`${user.id}\`)\n\`${user.tag}\``,
              user.displayAvatarURL({dynamic: true})
            )
          })
          if(!AuditData || !AuditData.executor){
            return send_log(c,
              guild,
              "RED",
              "USER UNBANNED",
              `User: ${user} (\`${user.id}\`)\n\`${user.tag}\``,
              user.displayAvatarURL({dynamic: true})
            )
          }
          let AddedUserID = AuditData.executor.id;
          let LogTimeString = AuditData.createdTimestamp.toString();

          const EventExecution = eventsTimestamp;
          const logtime = LogTimeString.slice(0, -3);
          const eventtime = EventExecution.slice(0, -3);
          if (logtime !== eventtime) return send_log(c,
            guild,
            "YELLOW",
            "USER UNBANNED",
            `User: ${user} (\`${user.id}\`)\n\`${user.tag}\``,
            user.displayAvatarURL({dynamic: true})
          )
          send_log(c,
            guild,
            "YELLOW",
            "USER UNBANNED",
            `**Unbanned by:** <@${AddedUserID}> (\`${AddedUserID}\`)\n\nUser: ${user} (\`${user.id}\`)\n\`${user.tag}\``,
            user.displayAvatarURL({dynamic: true})
          )
        } catch (e) {
          console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)

        }
      });

      c.on("guildMemberAdd", async function (member) {
            try {
              if (!member.user.bot) {
                send_log(member.guild,
                  c,
                  "GREEN",
                  "MEMBER JOINED",
                  `Member: ${member.user} (\`${member.user.id}\`)\n\`${member.user.tag}\`\n\n**Account created:** \`${moment(member.user.createdTimestamp).format("DD/MM/YYYY") + "\` | " + "`"+ moment(member.user.createdTimestamp).format("hh:mm:ss")}`,
            member.user.displayAvatarURL({dynamic: true})
          )
        }else {
          const eventsTimestamp = Date.now().toString()
          let AuditData = await member.guild.fetchAuditLogs({limit: 1,
            type: "BOT_ADD",}).then((audit => {
            return audit.entries.first()
          })).catch((e)=>{
            send_log(c,
              member.guild,
              "ORANGE",
              "BOT ADDED",
              `**Bot:** ${member.user} (\`${member.user.id}\`)\n\`${member.user.tag}\`\n\n**Bot created:** \`${moment(member.user.createdTimestamp).format("DD/MM/YYYY") + "\` | " + "`"+ moment(member.user.createdTimestamp).format("hh:mm:ss")}`,
            )
          })
          if(!AuditData || !AuditData.executor){
            return send_log(c,
              member.guild,
              "ORANGE",
              "BOT ADDED",
              `**Bot:** ${member.user} (\`${member.user.id}\`)\n\`${member.user.tag}\`\n\n**Bot created:** \`${moment(member.user.createdTimestamp).format("DD/MM/YYYY") + "\` | " + "`"+ moment(member.user.createdTimestamp).format("hh:mm:ss")}`,
            )
          }
          let AddedUserID = AuditData.executor.id;
          let LogTimeString = AuditData.createdTimestamp.toString();
          
          const EventExecution = eventsTimestamp;
          const logtime = LogTimeString.slice(0, -3);
          const eventtime = EventExecution.slice(0, -3);
          if (logtime !== eventtime) return send_log(c,
            member.guild,
            "ORANGE",
            "BOT ADDED",
            `**Bot:** ${member.user} (\`${member.user.id}\`)\n\`${member.user.tag}\`\n\n**Bot created:** \`${moment(member.user.createdTimestamp).format("DD/MM/YYYY") + "\` | " + "`"+ moment(member.user.createdTimestamp).format("hh:mm:ss")}`,
          )
          send_log(c,
            member.guild,
            "ORANGE",
            "BOT ADDED",
            `**Added by:** <@${AddedUserID}> (\`${AddedUserID}\`)\n\nBot: ${member.user} (\`${member.user.id}\`)\n\`${member.user.tag}\`\n\n**Bot created:** \`${moment(member.user.createdTimestamp).format("DD/MM/YYYY") + "\` | " + "`"+ moment(member.user.createdTimestamp).format("hh:mm:ss")}`,
          )
        }
      } catch (e) { console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)

      }
    });
    //KICKS
    c.on("guildMemberRemove", async function (member) {
      try {
        const eventsTimestamp = Date.now().toString()
        let AuditData = await member.guild.fetchAuditLogs({limit: 1,
          type: "MEMBER_KICK",}).then((audit => {
          return audit.entries.first()
        })).catch((e)=>{
          return;
        })
        if(!AuditData || !AuditData.executor){
          return
        }
        let AddedUserID = AuditData.executor.id;
        let LogTimeString = AuditData.createdTimestamp.toString();
        
        const EventExecution = eventsTimestamp;
        const logtime = LogTimeString.slice(0, -3);
        const eventtime = EventExecution.slice(0, -3);
        if (logtime !== eventtime) return 
        send_log(c,
          member.guild,
          "RED",
          "MEMBER KICKED",
          `**Kicked by:** <@${AddedUserID}> (\`${AddedUserID}\`)\n\nMember: ${member.user} (\`${member.user.id}\`)\n\`${member.user.tag}\``,
          member.user.displayAvatarURL({dynamic: true})
        )
      } catch (e) {
        console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)

      }
    });
    //BANS
    c.on("guildMemberRemove", async function (member) {
      try {
        const eventsTimestamp = Date.now().toString()
        let AuditData = await member.guild.fetchAuditLogs({
          limit: 1,
          type: "MEMBER_BAN_ADD",
        }).then((audit => {
          return audit.entries.first()
        })).catch((e) => {
          return;
        })
        if(!AuditData || !AuditData.executor){
          return
        }
        let AddedUserID = AuditData.executor.id;
        let LogTimeString = AuditData.createdTimestamp.toString();

        const EventExecution = eventsTimestamp;
        const logtime = LogTimeString.slice(0, -3);
        const eventtime = EventExecution.slice(0, -3);
        if (logtime !== eventtime) return
        send_log(c,
          member.guild,
          "RED",
          "MEMBER BANNED",
          `**Banned by:** <@${AddedUserID}> (\`${AddedUserID}\`)\n\nMember: ${member.user} (\`${member.user.id}\`)\n\`${member.user.tag}\``,
          member.user.displayAvatarURL({
            dynamic: true
          })
        )
      } catch (e) {
        console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)

      }
    });
    //LEAVES
    c.on("guildMemberRemove", async function (member) {
      try {
        send_log(c,
          member.guild,
          "RED",
          "MEMBER LEFT",
          `Member: ${member.user} (\`${member.user.id}\`)\n\`${member.user.tag}\``,
          member.user.displayAvatarURL({
            dynamic: true
          })
        )
      } catch (e) {
        console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)

      }
    });

    c.on("guildMembersChunk", async function (members, guild) {
      try {
        send_log(guild,
          c,
          "RED",
          "MEMBER CHUNK / RAID - " + members.length + " Members",
          members.map((user, index) => `${index}) - ${user} - ${user.tag} - \`${user.id}\``),
        )
      } catch (e) {
        console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)

      }
    });

    c.on("guildMemberUpdate", async function (oldMember, newMember) {
      try {
        let options = {}

        if (options[newMember.guild.id]) {
          options = options[newMember.guild.id]
        }

        // Add default empty list
        if (typeof options.excludedroles === "undefined") options.excludedroles = new Array([])
        if (typeof options.trackroles === "undefined") options.trackroles = true
        const oldMemberRoles = Array.from(oldMember.roles.cache.keys())
        const newMemberRoles = Array.from(newMember.roles.cache.keys())
        const oldRoles = oldMemberRoles.filter(x => !options.excludedroles.includes(x)).filter(x => !newMemberRoles.includes(x))
        const newRoles = newMemberRoles.filter(x => !options.excludedroles.includes(x)).filter(x => !oldMemberRoles.includes(x))
        const rolechanged = (newRoles.length || oldRoles.length)

        if (rolechanged) {
          let roleadded = ""
          if (newRoles.length > 0) {
            for (let i = 0; i < newRoles.length; i++) {
              if (i > 0) roleadded += ", "
              roleadded += `<@&${newRoles[i]}>`
            }
          }
          let roleremoved = ""
          if (oldRoles.length > 0) {
            for (let i = 0; i < oldRoles.length; i++) {
              if (i > 0) roleremoved += ", "
              roleremoved += `<@&${oldRoles[i]}>`
            }
          }
          let text = `${roleremoved ? `❌ ROLE REMOVED: \n${roleremoved}` : ""}${roleadded ? `✅ ROLE ADDED:\n${roleadded}` : ""}`
          send_log(c,
            oldMember.guild,
            `${roleadded ? "GREEN" : "RED"}`,
            "Member ROLES Changed",
            `Member: ${newMember.user}\nUser: \`${oldMember.user.tag}\`\n\n${text}`,
            "https://cdn.discordapp.com/attachments/849047781276647425/869529692867289128/861357037064421386.png"
          )
        }
      } catch (e) {
        console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)

      }
    });

    c.on("messageDelete", async function (message) {
      try {
        if (!message) return;
        //if (message.author && message.author.bot) return;

        const eventsTimestamp = Date.now().toString()
        let AuditData = await message.guild.fetchAuditLogs({
          limit: 1,
          type: "MESSAGE_DELETE",
        }).then((audit => {
          return audit.entries.first()
        })).catch((e) => {
            send_log(c,
              message.guild,
              "ORANGE",
              "Message Deleted", 
              `**Author : ** <@${message.author.id}> - *${message.author.tag}*\n**Date : ** ${message.createdAt}\n**Channel : ** <#${message.channel.id}> - *${message.channel.name}*\n\n**Deleted Message : **\n\`\`\`\n${message.content.replace(/`/g, "'").substr(0, 1800)}\n\`\`\`\n\n**Attachment URL : **\n${message.attachments.map(x => x.proxyURL)}`,
              "https://cdn.discordapp.com/attachments/849047781276647425/869530655871082516/850923749132992550.png"
            )
          })
          if(!AuditData || !AuditData.executor){
            return send_log(c,
              message.guild,
              "ORANGE",
              "Message Deleted", 
              `**Author : ** <@${message.author.id}> - *${message.author.tag}*\n**Date : ** ${message.createdAt}\n**Channel : ** <#${message.channel.id}> - *${message.channel.name}*\n\n**Deleted Message : **\n\`\`\`\n${message.content.replace(/`/g, "'").substr(0, 1800)}\n\`\`\`\n\n**Attachment URL : **\n${message.attachments.map(x => x.proxyURL)}`,
              "https://cdn.discordapp.com/attachments/849047781276647425/869530655871082516/850923749132992550.png"
            )
          }
        let AddedUserID = AuditData.executor.id;
        let LogTimeString = AuditData.createdTimestamp.toString();
        
        const EventExecution = eventsTimestamp;
        const logtime = LogTimeString.slice(0, -4);
        const eventtime = EventExecution.slice(0, -4);
        if (logtime !== eventtime) return send_log(c,
          message.guild,
          "ORANGE",
          "Message Deleted", 
          `**Author : ** <@${message.author.id}> - *${message.author.tag}*\n**Date : ** ${message.createdAt}\n**Channel : ** <#${message.channel.id}> - *${message.channel.name}*\n\n**Deleted Message : **\n\`\`\`\n${message.content.replace(/`/g, "'").substr(0, 1800)}\n\`\`\`\n\n**Attachment URL : **\n${message.attachments.map(x => x.proxyURL)}`,
          "https://cdn.discordapp.com/attachments/849047781276647425/869530655871082516/850923749132992550.png"
        )

        send_log(c,
          message.guild,
          "ORANGE",
          "Message Deleted", 
              `**Deleted by:** <@${AddedUserID}> (\`${AddedUserID}\`)\n\n**Author : ** <@${message.author.id}> - *${message.author.tag}*\n**Date : ** ${message.createdAt}\n**Channel : ** <#${message.channel.id}> - *${message.channel.name}*\n\n**Deleted Message : **\n\`\`\`\n${message.content.replace(/`/g, "'").substr(0, 1800)}\n\`\`\`\n\n**Attachment URL : **\n${message.attachments.map(x => x.proxyURL)}`,
              "https://cdn.discordapp.com/attachments/849047781276647425/869530655871082516/850923749132992550.png"
            )
      }catch{
                
      }
    });

    c.on("messageDeleteBulk", async function (messages) {
      try{
        send_log(c,
          messages.guild,
          "RED",
          messages.length + "Message Deleted BULK",
          `${messages.length} Messages delete in: ${messages.channel}`,
          "https://cdn.discordapp.com/attachments/849047781276647425/869530655871082516/850923749132992550.png")
        } catch {

        }
    });

    c.on("messageUpdate", async function (oldMessage, newMessage) {
      try {
        if (oldMessage.author && oldMessage.author.bot) return;
        if (newMessage.author && newMessage.author.bot) return;
        if (oldMessage.channel.type !== "GUILD_TEXT") return
        if (newMessage.channel.type !== "GUILD_TEXT") return
        if (oldMessage.content === newMessage.content) return
        send_log(c, oldMessage.guild,
          "YELLOW",
          "Message UPDATED", 
          ` **Author:** <@${newMessage.member.user.id}> - *${newMessage.member.user.tag}*\n**Date:** ${newMessage.createdAt}\n**Channel:** <#${newMessage.channel.id}> - *${newMessage.channel.name}*\n**Orignal Message:**\n\`\`\`\n${oldMessage.content ? oldMessage.content.replace(/`/g, "'") : "UNKNOWN CONTENT"}\n\`\`\`\n**Updated Message :**\n\`\`\`\n${newMessage.content ? newMessage.content.replace(/`/g, "'") : "UNKNOWN CONTENT"}\n\`\`\``,
          "https://cdn.discordapp.com/attachments/849047781276647425/869530575411773440/857128740198023190.png"
          )
      }catch{
              
      }
    });

    c.on("roleCreate", async function (role) {
        try{
          const eventsTimestamp = Date.now().toString()
          let AuditData = await role.guild.fetchAuditLogs({limit: 1,
            type: "ROLE_CREATE",}).then((audit => {
            return audit.entries.first()
          })).catch((e)=>{
            send_log(c,
              role.guild,
              "GREEN",
              "ROLE CREATED",
              `ROLE: ${role}\nROLENAME: ${role.name}\nROLEID: ${role.id}\nHEXCOLOR: ${role.hexColor}\nPOSITION: ${role.position}`,
              "https://cdn.discordapp.com/attachments/849047781276647425/869531337411952670/845717716559593512.png"
            )
          })
          if(!AuditData || !AuditData.executor){
            return send_log(c,
              role.guild,
              "GREEN",
              "ROLE CREATED",
              `ROLE: ${role}\nROLENAME: ${role.name}\nROLEID: ${role.id}\nHEXCOLOR: ${role.hexColor}\nPOSITION: ${role.position}`,
              "https://cdn.discordapp.com/attachments/849047781276647425/869531337411952670/845717716559593512.png"
            )
          }
          let AddedUserID = AuditData.executor.id;
          let LogTimeString = AuditData.createdTimestamp.toString();

          const EventExecution = eventsTimestamp;
          const logtime = LogTimeString.slice(0, -3);
          const eventtime = EventExecution.slice(0, -3);
          if (logtime !== eventtime) return send_log(c,
            role.guild,
            "GREEN",
            "ROLE CREATED",
            `ROLE: ${role}\nROLENAME: ${role.name}\nROLEID: ${role.id}\nHEXCOLOR: ${role.hexColor}\nPOSITION: ${role.position}`,
            "https://cdn.discordapp.com/attachments/849047781276647425/869531337411952670/845717716559593512.png"
          )
          send_log(c,
            role.guild,
            "GREEN",
            "ROLE CREATED",
            `**Created by:** <@${AddedUserID}> (\`${AddedUserID}\`)\n\nROLE: ${role}\nROLENAME: ${role.name}\nROLEID: ${role.id}\nHEXCOLOR: ${role.hexColor}\nPOSITION: ${role.position}`,
            "https://cdn.discordapp.com/attachments/849047781276647425/869531337411952670/845717716559593512.png"
          )
        } catch (e) {
          console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
        }
      });

      c.on("roleDelete", async function (role) {
        try {
          const eventsTimestamp = Date.now().toString()
          let AuditData = await role.guild.fetchAuditLogs({
            limit: 1,
            type: "ROLE_DELETE",
          }).then((audit => {
            return audit.entries.first()
          })).catch((e) => {
            send_log(c,
              role.guild,
              "RED",
              "ROLE DELETED",
              `ROLE: ${role}\nROLENAME: ${role.name}\nROLEID: ${role.id}\nHEXCOLOR: ${role.hexColor}\nPOSITION: ${role.position}`,
              "https://cdn.discordapp.com/attachments/849047781276647425/869530655871082516/850923749132992550.png"
            )
          })
          if(!AuditData || !AuditData.executor){
            return send_log(c,
              role.guild,
              "RED",
              "ROLE DELETED",
              `ROLE: ${role}\nROLENAME: ${role.name}\nROLEID: ${role.id}\nHEXCOLOR: ${role.hexColor}\nPOSITION: ${role.position}`,
              "https://cdn.discordapp.com/attachments/849047781276647425/869530655871082516/850923749132992550.png"
            )
          }
          let AddedUserID = AuditData.executor.id;
          let LogTimeString = AuditData.createdTimestamp.toString();

          const EventExecution = eventsTimestamp;
          const logtime = LogTimeString.slice(0, -3);
          const eventtime = EventExecution.slice(0, -3);
          if (logtime !== eventtime) return send_log(c,
            role.guild,
            "RED",
            "ROLE DELETED",
            `ROLE: ${role}\nROLENAME: ${role.name}\nROLEID: ${role.id}\nHEXCOLOR: ${role.hexColor}\nPOSITION: ${role.position}`,
            "https://cdn.discordapp.com/attachments/849047781276647425/869530655871082516/850923749132992550.png"
          )
          send_log(c,
            role.guild,
            "RED",
            "ROLE DELETED",
            `**Deleted by:** <@${AddedUserID}> (\`${AddedUserID}\`)\n\nROLE: ${role}\nROLENAME: ${role.name}\nROLEID: ${role.id}\nHEXCOLOR: ${role.hexColor}\nPOSITION: ${role.position}`,
            "https://cdn.discordapp.com/attachments/849047781276647425/869530655871082516/850923749132992550.png"
          )
        } catch (e) {
          console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)

        }
      });

      c.on("roleUpdate", async function (oldRole, newRole) {
        try {
          const eventsTimestamp = Date.now().toString()
          let AuditData = await newRole.guild.fetchAuditLogs({
            limit: 1,
            type: "ROLE_DELETE",
          }).then((audit => {
            return audit.entries.first()
          })).catch((e) => {

            if (oldRole.name !== newRole.name) {
              send_log(c,
                oldRole.guild,
                "ORANGE",
                "ROLE NAME CHANGED",
                `__ROLE: ${newRole}__ \n\n**Before:** \`${oldRole.color.toString(16)}\`\n**After:** \`${newRole.color.toString(16)}\`\n**ROLE ID:** \`${newRole.id}\``)

            } else if (oldRole.color !== newRole.color) {
              send_log(c,
                oldRole.guild,
                "ORANGE",
                "ROLE COLOR CHANGED",
                `__ROLE: ${newRole}__ \n\n**Before:** \`${oldRole.color.toString(16)}\`\n**After:** \`${newRole.color.toString(16)}\`\n**ROLE ID:** \`${newRole.id}\``)

            }
          })
          if(!AuditData || !AuditData.executor){
            if (oldRole.name !== newRole.name) {
              send_log(c,
                oldRole.guild,
                "ORANGE",
                "**ROLE** NAME CHANGED",
                `__ROLE: ${newRole}__ \n\n**Before:** \`${oldRole.color.toString(16)}\`\n**After:** \`${newRole.color.toString(16)}\`\n**ROLE ID:** \`${newRole.id}\``,
                "https://cdn.discordapp.com/attachments/849047781276647425/869529692867289128/861357037064421386.png")

            } else if (oldRole.color !== newRole.color) {
              send_log(c,
                oldRole.guild,
                "ORANGE",
                "ROLE COLOR CHANGED",
                `__ROLE: ${newRole}__ \n\n**Before:** \`${oldRole.color.toString(16)}\`\n**After:** \`${newRole.color.toString(16)}\`\n**ROLE ID:** \`${newRole.id}\``,
                "https://cdn.discordapp.com/attachments/849047781276647425/869529692867289128/861357037064421386.png")

            }
            return;
          }
          let AddedUserID = AuditData.executor.id;
          let LogTimeString = AuditData.createdTimestamp.toString();

          const EventExecution = eventsTimestamp;
          const logtime = LogTimeString.slice(0, -3);
          const eventtime = EventExecution.slice(0, -3);
          if (logtime !== eventtime) {
            if (oldRole.name !== newRole.name) {
              send_log(c,
                oldRole.guild,
                "ORANGE",
                "ROLE NAME CHANGED",
                `__ROLE: ${newRole}__ \n\n**Before:** \`${oldRole.color.toString(16)}\`\n**After:** \`${newRole.color.toString(16)}\`\n**ROLE ID:** \`${newRole.id}\``,
                "https://cdn.discordapp.com/attachments/849047781276647425/869529692867289128/861357037064421386.png")

            } else if (oldRole.color !== newRole.color) {
              send_log(c,
                oldRole.guild,
                "ORANGE",
                "ROLE COLOR CHANGED",
                `__ROLE: ${newRole}__ \n\n**Before:** \`${oldRole.color.toString(16)}\`\n**After:** \`${newRole.color.toString(16)}\`\n**ROLE ID:** \`${newRole.id}\``,
                "https://cdn.discordapp.com/attachments/849047781276647425/869529692867289128/861357037064421386.png")

            }
            return;
          }
          if (oldRole.name !== newRole.name) {
            send_log(c,
              oldRole.guild,
              "ORANGE",
              "ROLE NAME CHANGED",
              `**Updated by:** <@${AddedUserID}> (\`${AddedUserID}\`)\n\n__ROLE: ${oldRole}__ \n\n**Before:** \`${oldRole.name}\`\n**After:** \`${newRole.name}\`\n**Role ID:** \`${newRole.id}\``,
              "https://cdn.discordapp.com/attachments/849047781276647425/869529692867289128/861357037064421386.png")
          } else if (oldRole.color !== newRole.color) {
            send_log(c,
              oldRole.guild,
              "ORANGE",
              "ROLE COLOR CHANGED",
              `**Updated by:** <@${AddedUserID}> (\`${AddedUserID}\`)\n\n__ROLE: ${newRole}__ \n\n**Before:** \`${oldRole.color.toString(16)}\`\n**After:** \`${newRole.color.toString(16)}\`\n**ROLE ID:** \`${newRole.id}\``,
              "https://cdn.discordapp.com/attachments/849047781276647425/869529692867289128/861357037064421386.png")

          }
        } catch (e) {
          console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)

        }
      });
      } catch (e) {}

      c.on("voiceStateUpdate", (oldState, newState) => {
        let usertag = newState.member.user.tag;
        if (
            (!oldState.streaming && newState.streaming)   ||
            (oldState.streaming && !newState.streaming)   ||
            (!oldState.serverDeaf && newState.serverDeaf) ||
            (oldState.serverDeaf && !newState.serverDeaf) ||
            (!oldState.serverMute && newState.serverMute) ||
            (oldState.serverMute && !newState.serverMute) || 
            (!oldState.selfDeaf && newState.selfDeaf)     ||
            (oldState.selfDeaf && !newState.selfDeaf)     ||
            (!oldState.selfMute && newState.selfMute)     ||
            (oldState.selfMute && !newState.selfMute)     ||
            (!oldState.selfVideo && newState.selfVideo)   ||
            (oldState.selfVideo && !newState.selfVideo) 
         )
        if (!oldState.channelId && newState.channelId) {
          return send_log(c,
            newState.guild,
            "GREEN",
            "CHANNEL JOINED",
            `**User:** <@${newState.member.user.id}> (\`${newState.member.user.id}\`) (**${newState.member.user.tag}**)\n\nCHANNEL: <#${newState.channelId}> (\`${newState.channelId}\`)  ${newState.channel ? `(**${newState.channel.name}**)` : ""}`,
            "https://cdn.discordapp.com/attachments/849047781276647425/869529604296159282/863876115584385074.gif"
            )
        }
        if (oldState.channelId && !newState.channelId) {
          return send_log(c,
            newState.guild,
            "RED",
            "CHANNEL LEFT",
            `**User:** <@${newState.member.user.id}> (\`${newState.member.user.id}\`) (**${newState.member.user.tag}**)\n\nCHANNEL: <#${oldState.channelId}> (\`${oldState.channelId}\` ${oldState.channel ? `(**${oldState.channel.name}**)` : ""}`,
            "https://cdn.discordapp.com/attachments/849047781276647425/869529603562172456/850830662897762324.png"
            )
        }
        if (oldState.channelId && newState.channelId) {
          return  send_log(c,
            newState.guild,
            "GREEN",
            "CHANNEL SWITCHED",
            `**User:** <@${newState.member.user.id}> (\`${newState.member.user.id}\`) (**${newState.member.user.tag}**)\n\nTO CHANNEL: <#${newState.channelId}> (\`${newState.channelId}\`) ${newState.channel ? `(**${newState.channel.name}**)` : ""}\n\nFROM CHANNEL: <#${oldState.channelId}> (\`${oldState.channelId}\`) ${oldState.channel ? `(**${oldState.channel.name}**)` : ""}`,
            "https://cdn.discordapp.com/attachments/849047781276647425/869529684805840896/841989410978398218.gif"
            )
        }
      });
    }

async function send_log(c, guild, color, title, description, thumb) {
  try {
    //CREATE THE EMBED
    const LogEmbed = new Discord.MessageEmbed()
      .setColor(color ? color : "BLACK")
      .setDescription(description ? description.substr(0, 2048) : "\u200b")
      .setTitle(title ? title.substr(0, 256) : "\u200b")
      .setTimestamp()
      .setThumbnail(thumb ? thumb : guild.iconURL({
        format: "png"
      }))
      .setFooter(guild.name + " | powered by: milrato.eu", guild.iconURL({
        format: "png"
      }))
    //GET THE CHANNEL
    let loggersettings = c.settings.get(guild.id, "logger")
    if (loggersettings.channel === "no") return;
    const logger = await c.channels.fetch(loggersettings.channel);
    if (!logger) throw new SyntaxError("CHANNEL NOT FOUND")
    return logger.send({embeds: [LogEmbed]});


  } catch (e) {}
}
