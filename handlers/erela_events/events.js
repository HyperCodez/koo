var {
      MessageEmbed
    } = require("discord.js"),
    ms = require("ms"),

    config = require("../../botconfig/config.json"),
    emoji = require("../../botconfig/emojis.json"),
    ee = require("../../botconfig/embed.json"),
  
    {
      createBar,
      format,
      databasing,
      autoplay
    } = require("../../handlers/functions"),
    playermanager = require("../../handlers/playermanager"),
  
    playercreated = new Map();
    var mi;
    const { MessageButton, MessageActionRow } = require('discord.js')
  module.exports = (client) => {
      client.manager
        .on("playerCreate", async (player) => {
          playercreated.set(player.guild)
        })
        .on("playerMove", async (player, oldChannel, newChannel) => {
          if (!newChannel) {
            try {
              client.channels.cache.get(player.textChannel).messages.fetch(player.get("currentmsg")).then(msg => {
                const row = new MessageActionRow()
                .addComponents([
                  new MessageButton().setCustomId('1').setEmoji("⏭").setLabel("Skip").setStyle('SECONDARY').setDisabled(true),
                  new MessageButton().setCustomId('2').setEmoji("🏠").setLabel("Stop").setStyle('SECONDARY').setDisabled(true), 
                  new MessageButton().setCustomId('3').setEmoji('⏸').setLabel("Pause").setStyle('SECONDARY').setDisabled(true),
                  new MessageButton().setCustomId('4').setEmoji('🔁').setLabel("Autoplay").setStyle('SECONDARY').setDisabled(true)
                ]);
                msg.edit({
                  content: `Song has ended!`, 
                  embeds: [msg.embeds[0]],
                  components: [row]
              }).catch((e)=>{console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)})
              }).catch((e)=>{console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)})
            } catch (e) {
              console.log(String(e.stack).grey.italic.dim.yellow);
            }
            player.destroy();
          } else {
            player.voiceChannel = newChannel;
            if (player.paused) return;
            setTimeout(() => {
              player.pause(true);
              setTimeout(() => player.pause(false), client.ws.ping * 2);
            }, client.ws.ping * 2);
          }
        })
        .on("trackStart", async (player, track) => {
          try {
            let edited = false;
            if(playercreated.has(player.guild)){
              player.set("eq", "💣 None");
              player.set("filter", "🧨 None");
              client.settings.ensure(player.guild, {
                defaultvolume: 10,
                defaulteq: false,
                defaultap: true,
                playmsg: true,
              });
              await player.setVolume(client.settings.get(player.guild, "defaultvolume"))
              await player.set("autoplay", client.settings.get(player.guild, "defaultap"));
              await player.set(`afk`, false)
              if(client.settings.get(player.guild, "defaulteq")){
                await player.setEQ(client.eqs.music);
              }
              databasing(client, player.guild, player.get("playerauthor"));
              playercreated.delete(player.guild); // delete the playercreated state from the thing
            }
            //votes for skip --> 0
            player.set("votes", "0");
            //set the vote of every user to FALSE so if they voteskip it will vote skip and not remove voteskip if they have voted before bruh
            for (var userid of client.guilds.cache.get(player.guild).members.cache.map(member => member.user.id))
              player.set(`vote-${userid}`, false);
            //set the previous track just have idk where its used ^-^
            player.set("previoustrack", track);
            //if that's disabled return
            if(!client.settings.get(player.guild, "playmsg")){
              return;
            }
            // playANewTrack(client,player,track);
            var embed = new MessageEmbed().setColor(ee.color)
              embed.setAuthor(`${track.title}`, "https://images-ext-1.discordapp.net/external/DkPCBVBHBDJC8xHHCF2G7-rJXnTwj_qs78udThL8Cy0/%3Fv%3D1/https/cdn.discordapp.com/emojis/859459305152708630.gif", track.uri)
              embed.setThumbnail(`https://img.youtube.com/vi/${track.identifier}/mqdefault.jpg`)
              embed.setFooter(`Requested by: ${track.requester.tag}`, track.requester.displayAvatarURL({dynamic: true}));
            let skip = new MessageButton().setStyle('PRIMARY').setCustomId('1').setEmoji("⏭").setLabel("Skip")
            let stop = new MessageButton().setStyle('DANGER').setCustomId('2').setEmoji("🏠").setLabel("Stop")
            let pause = new MessageButton().setStyle('SECONDARY').setCustomId('3').setEmoji('⏸').setLabel("Pause")
            let autoplay = new MessageButton().setStyle('PRIMARY').setCustomId('4').setEmoji('🔁').setLabel("Autoplay")
            if(!player.playing){
              pause = new MessageButton().setStyle('PRIMARY').setCustomId('3').setEmoji('▶️').setLabel("Resume")
            }
            if(player.get("autoplay")){
              autoplay = new MessageButton().setStyle('SECONDARY').setCustomId('4').setEmoji('🔁').setLabel("Autoplay")
            }
            const row = new MessageActionRow().addComponents([skip, stop, pause, autoplay]);
            //Send message with buttons
            let swapmsg = await client.channels.cache.get(player.textChannel).send({
                embeds: [embed], 
                components: [row]
            }).then(msg => {
              player.set("currentmsg", msg.id);
              return msg;
            })
            //create a collector for the thinggy
            const collector = swapmsg.createMessageComponentCollector({filter: (i) => i.isButton() && i.user && i.message.author.id == client.user.id, time: track.duration > 0 ? track.duration : 600000 }); //collector for 5 seconds
            //array of all embeds, here simplified just 10 embeds with numbers 0 - 9
            collector.on('collect', async i => {
                //skip
                if(i.customId == "1") {
                  let member = await i.guild.members.fetch(i.user.id)
                  //get the channel instance from the Member
                  const channel = member?.voice?.channel;
                  //if the member is not in a channel, return
                  if (!channel)
                    return i.reply({content: "<:no:833101993668771842> You must be in my VC", ephemeral: true})
                  //get the player instance
                  const player = client.manager.players.get(i.guild.id);
                  //if no player available return aka not playing anything
                  if (!player){
                    if(i.guild.me.voice.channel) {
                      i.reply({content: "Stopped", ephemeral: true})
                      i.guild.me.voice.channel.leave().catch(e => console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim))
                      return 
                    }
                    else {
                      return i.reply({content: "<:no:833101993668771842> Nothing Playing yet", ephemeral: true})
                    }
                    return
                  }
                  //if not in the same channel as the player, return Error
                  if (channel.id !== player.voiceChannel)
                    return i.reply({content: "<:no:833101993668771842> You must be in my VC", ephemeral: true})
                  //if ther is nothing more to skip then stop music and leave the Channel
                  if (player.queue.size == 0) {
                    //if its on autoplay mode, then do autoplay before leaving...
                    if(player.get("autoplay")) return autoplay(client, player, "skip");
                    if(i.guild.me.voice.channel) {
                      i.guild.me.voice.channel.leave().catch(e => console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim))
                      i.reply({content: "Stopped", ephemeral: true}) 
                      edited = true;

                      //edit the current song message
                      try{
                        client.channels.cache.get(player.textChannel).messages.fetch(player.get("currentmsg")).then(msg => {
                          const row = new MessageActionRow()
                          .addComponents([
                            new MessageButton().setCustomId('1').setEmoji("⏭").setLabel("Skip").setStyle('SECONDARY').setDisabled(true),
                            new MessageButton().setCustomId('2').setEmoji("🏠").setLabel("Stop").setStyle('SECONDARY').setDisabled(true), 
                            new MessageButton().setCustomId('3').setEmoji('⏸').setLabel("Pause").setStyle('SECONDARY').setDisabled(true),
                            new MessageButton().setCustomId('4').setEmoji('🔁').setLabel("Autoplay").setStyle('SECONDARY').setDisabled(true)
                          ]);
                          msg.edit({
                            content: `Song has ended!`, 
                            embeds: [msg.embeds[0]],
                            components: [row]
                        }).catch((e)=>{console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)})
                        }).catch((e)=>{console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)})
                      }catch{  }
                      player.destroy()
                    }
                    else {
                      i.reply({content: "Stopped", ephemeral: true})
                      edited = true;
                      //edit the current song message
                      try{
                        client.channels.cache.get(player.textChannel).messages.fetch(player.get("currentmsg")).then(msg => {
                          const row = new MessageActionRow()
                          .addComponents([
                            new MessageButton().setCustomId('1').setEmoji("⏭").setLabel("Skip").setStyle('SECONDARY').setDisabled(true),
                            new MessageButton().setCustomId('2').setEmoji("🏠").setLabel("Stop").setStyle('SECONDARY').setDisabled(true), 
                            new MessageButton().setCustomId('3').setEmoji('⏸').setLabel("Pause").setStyle('SECONDARY').setDisabled(true),
                            new MessageButton().setCustomId('4').setEmoji('🔁').setLabel("Autoplay").setStyle('SECONDARY').setDisabled(true)
                          ]);
                          msg.edit({
                            content: `Song has ended!`, 
                            embeds: [msg.embeds[0]],
                            components: [row]
                        }).catch((e)=>{console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)})
                        }).catch((e)=>{console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)})
                      }catch{  }
                      player.destroy()
                    }
                    return
                  }
                  //skip the track
                  player.stop();
                  return i.reply({content: "⏭ Skipped to the next Song", ephemeral: true}) 
                }
                //stop
                if(i.customId == "2") {
                  let member = await i.guild.members.fetch(i.user.id)
                  //get the channel instance from the Member
                  const channel = member?.voice?.channel;
                  //if the member is not in a channel, return
                  if (!channel)
                    return i.reply({content: "<:no:833101993668771842> You must be in my VC", ephemeral: true})
                  //get the player instance
                  const player = client.manager.players.get(i.guild.id);
                  //if no player available return aka not playing anything
                  if (!player){
                    return i.reply({content: "<:no:833101993668771842> Nothing Playing yet", ephemeral: true})
                  }
                  //if not in the same channel as the player, return Error
                  if (channel.id !== player.voiceChannel)
                    return i.reply({content: "<:no:833101993668771842> You must be in my VC", ephemeral: true})
                  //if ther is nothing more to skip then stop music and leave the Channel
                  if (player.queue.size == 0) {
                    i.reply({content: "Stopped", ephemeral: true})
                    edited = true;
                    //edit the current song message
                    try{
                      client.channels.cache.get(player.textChannel).messages.fetch(player.get("currentmsg")).then(msg => {
                        const row = new MessageActionRow()
                        .addComponents([
                          new MessageButton().setCustomId('1').setEmoji("⏭").setLabel("Skip").setStyle('SECONDARY').setDisabled(true),
                          new MessageButton().setCustomId('2').setEmoji("🏠").setLabel("Stop").setStyle('SECONDARY').setDisabled(true), 
                          new MessageButton().setCustomId('3').setEmoji('⏸').setLabel("Pause").setStyle('SECONDARY').setDisabled(true),
                          new MessageButton().setCustomId('4').setEmoji('🔁').setLabel("Autoplay").setStyle('SECONDARY').setDisabled(true)
                        ]);
                        msg.edit({
                          content: `Song has ended!`, 
                          embeds: [msg.embeds[0]],
                          components: [row]
                      }).catch((e)=>{console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)})
                      }).catch((e)=>{console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)})
                    }catch{  }
                    player.destroy()
                  } else {
                    //skip the track
                    i.reply({content: "Stopped", ephemeral: true}) 
                    edited = true;
                    //edit the current song message
                    try{
                      client.channels.cache.get(player.textChannel).messages.fetch(player.get("currentmsg")).then(msg => {
                        const row = new MessageActionRow()
                        .addComponents([
                          new MessageButton().setCustomId('1').setEmoji("⏭").setLabel("Skip").setStyle('SECONDARY').setDisabled(true),
                          new MessageButton().setCustomId('2').setEmoji("🏠").setLabel("Stop").setStyle('SECONDARY').setDisabled(true), 
                          new MessageButton().setCustomId('3').setEmoji('⏸').setLabel("Pause").setStyle('SECONDARY').setDisabled(true),
                          new MessageButton().setCustomId('4').setEmoji('🔁').setLabel("Autoplay").setStyle('SECONDARY').setDisabled(true)
                        ]);
                        msg.edit({
                          content: `Song has ended!`, 
                          embeds: [msg.embeds[0]],
                          components: [row]
                      }).catch((e)=>{console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)})
                      }).catch((e)=>{console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)})
                    }catch{  }
                    player.destroy()
                  }
                }
                //pause/resume
                if(i.customId == "3") {
                  let member = await i.guild.members.fetch(i.user.id)
                  //get the channel instance from the Member
                  const channel = member?.voice?.channel;
                  //if the member is not in a channel, return
                  if (!channel)
                    return i.reply({content: "<:no:833101993668771842> You must be in my VC", ephemeral: true})
                  //get the player instance
                  const player = client.manager.players.get(i.guild.id);
                  //if no player available return aka not playing anything
                  if (!player){
                    return i.reply({content: "<:no:833101993668771842> Nothing Playing yet", ephemeral: true})
                  }
                  //if not in the same channel as the player, return Error
                  if (channel.id !== player.voiceChannel)
                    return i.reply({content: "<:no:833101993668771842> You must be in my VC", ephemeral: true})
                  if (!player.playing){
                    player.pause(false);
                    swapmsg.edit({
                      embeds: [embed], 
                      components: [new MessageActionRow().addComponents([skip, stop, pause.setStyle('SECONDARY').setEmoji('⏸').setLabel("Pause"), autoplay])] 
                    })
                    i.reply({content: "Resumed!", ephemeral: true})
                  }else{
                    //pause the player
                    player.pause(true);
                    swapmsg.edit({
                      embeds: [embed], 
                      components: [new MessageActionRow().addComponents([skip, stop, pause.setStyle('PRIMARY').setEmoji('▶️').setLabel("Resume"), autoplay])]
                    })
                    i.reply({content: "Paused!", ephemeral: true})
                  }
                }
                //autoplay
                if(i.customId == "4") {
                  let member = await i.guild.members.fetch(i.user.id)
                  //get the channel instance from the Member
                  const channel = member?.voice?.channel;
                  //if the member is not in a channel, return
                  if (!channel)
                    return i.reply({content: "<:no:833101993668771842> You must be in my VC", ephemeral: true})
                  //get the player instance
                  const player = client.manager.players.get(i.guild.id);
                  //if no player available return aka not playing anything
                  if (!player){
                    return i.reply({content: "<:no:833101993668771842> Nothing Playing yet", ephemeral: true})
                  }
                  //if not in the same channel as the player, return Error
                  if (channel.id !== player.voiceChannel)
                    return i.reply({content: "<:no:833101993668771842> You must be in my VC", ephemeral: true})
                  //pause the player
                  player.set(`autoplay`, !player.get(`autoplay`))
                  if(player.get(`autoplay`)){
                    swapmsg.edit({
                      embeds: [embed], 
                      components: [new MessageActionRow().addComponents([skip, stop, pause, autoplay.setStyle('SECONDARY')])]
                    })
                  }
                  else {
                    swapmsg.edit({
                      embeds: [embed], 
                      components: [new MessageActionRow().addComponents([skip, stop, pause, autoplay.setStyle('PRIMARY')])]
                    })
                  }
                  let ls = client.settings.get(player.guild, "language")
                  //Send Success Message
                  i.reply({content: eval(client.la[ls]["handlers"]["erelaevents"]["events"]["variable1"]), ephemeral: true})
                }
            });
            collector.on('end', collected => {
              if(!edited){
                edited = true;
              const row = new MessageActionRow()
              .addComponents([
                new MessageButton().setCustomId('1').setEmoji("⏭").setLabel("Skip").setStyle('SECONDARY').setDisabled(true),
                new MessageButton().setCustomId('2').setEmoji("🏠").setLabel("Stop").setStyle('SECONDARY').setDisabled(true), 
                new MessageButton().setCustomId('3').setEmoji('⏸').setLabel("Pause").setStyle('SECONDARY').setDisabled(true),
                new MessageButton().setCustomId('4').setEmoji('🔁').setLabel("Autoplay").setStyle('SECONDARY').setDisabled(true)
              ]);
              swapmsg.edit({
                content: `Song has ended!`, 
                embeds: [msg.embeds[0]],
                components: [row]
            }).catch((e)=>{console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)})
              }
            });
            setTimeout(()=>{
              if(!edited){
                edited = true;
              const row = new MessageActionRow()
              .addComponents([
                new MessageButton().setCustomId('1').setEmoji("⏭").setLabel("Skip").setStyle('SECONDARY').setDisabled(true),
                new MessageButton().setCustomId('2').setEmoji("🏠").setLabel("Stop").setStyle('SECONDARY').setDisabled(true), 
                new MessageButton().setCustomId('3').setEmoji('⏸').setLabel("Pause").setStyle('SECONDARY').setDisabled(true),
                new MessageButton().setCustomId('4').setEmoji('🔁').setLabel("Autoplay").setStyle('SECONDARY').setDisabled(true)
              ]);
              swapmsg.edit({
                content: `Song has ended!`, 
                embeds: [msg.embeds[0]],
                components: [row]
            }).catch((e)=>{console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)})
              }
            }, track.duration > 0 ? track.duration : 600000 + 150)
          
          } catch (e) {
            console.log(String(e.stack).grey.italic.dim.yellow) /* */
          }
        })
        .on("trackStuck", (player, track, payload) => {
          player.stop();
        })
        .on("trackError", (player, track, payload) => {
          player.stop();  
        })
        .on("queueEnd", async (player) => {
          // "uncomment" to enable trackEnd also for one song long Queus
          // client.manager.emit("trackEnd", player, track)
          databasing(client, player.guild, player.get("playerauthor"));
          if (player.get("autoplay")) return autoplay(client, player);
          //DEvar TIME OUT
          try {
            player = client.manager.players.get(player.guild);
            if (!player.queue || !player.queue.current) {
              //if afk is enbaled return and not destroy the PLAYER
              if (player.get(`afk`)){
                try{
                  client.channels.cache.get(player.textChannel).messages.fetch(player.get("currentmsg")).then(msg => {
                    const row = new MessageActionRow()
                    .addComponents([
                      new MessageButton().setCustomId('1').setEmoji("⏭").setLabel("Skip").setStyle('SECONDARY').setDisabled(true),
                      new MessageButton().setCustomId('2').setEmoji("🏠").setLabel("Stop").setStyle('SECONDARY').setDisabled(true), 
                      new MessageButton().setCustomId('3').setEmoji('⏸').setLabel("Pause").setStyle('SECONDARY').setDisabled(true),
                      new MessageButton().setCustomId('4').setEmoji('🔁').setLabel("Autoplay").setStyle('SECONDARY').setDisabled(true)
                    ]);
                    swapmsg.edit({
                      content: `Song has ended!`, 
                      embeds: [msg.embeds[0]],
                      components: [row]
                  }).catch((e)=>{console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)})
                  }).catch((e)=>{console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)})
                }catch{

                }
                return 
              }
              try{
                client.channels.cache.get(player.textChannel).messages.fetch(player.get("currentmsg")).then(msg => {
                  const row = new MessageActionRow()
                  .addComponents([
                    new MessageButton().setCustomId('1').setEmoji("⏭").setLabel("Skip").setStyle('SECONDARY').setDisabled(true),
                    new MessageButton().setCustomId('2').setEmoji("🏠").setLabel("Stop").setStyle('SECONDARY').setDisabled(true), 
                    new MessageButton().setCustomId('3').setEmoji('⏸').setLabel("Pause").setStyle('SECONDARY').setDisabled(true),
                    new MessageButton().setCustomId('4').setEmoji('🔁').setLabel("Autoplay").setStyle('SECONDARY').setDisabled(true)
                  ]);
                  swapmsg.edit({
                    content: `Song has ended!`, 
                    embeds: [msg.embeds[0]],
                    components: [row]
                }).catch((e)=>{console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)})
                }).catch((e)=>{console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)})
              }catch{

              }
              player.destroy();
            }
          } catch (e) {
            console.log(String(e.stack).grey.italic.dim.yellow);
          }
        });
  };
  /**
   * @INFO
   * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
   * @INFO
   * Work for Milrato Development | https://milrato.eu
   * @INFO
   * Please mention Him / Milrato Development, when using this Code!
   * @INFO
   */
  