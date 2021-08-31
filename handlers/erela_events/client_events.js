var {
    Manager
  } = require("erela.js"), {
      MessageEmbed, MessageButton, MessageActionRow
    } = require("discord.js"),
    ms = require("ms"),

    config = require("../../botconfig/config.json"),
    emoji = require("../../botconfig/emojis.json"),
    ee = require("../../botconfig/embed.json"),

    {
      databasing,
    } = require("../../handlers/functions");
  module.exports = (client) => {

      client.once("ready", () => {
        client.manager.init(client.user.id);
      });
      
      client.on("raw", (d) => client.manager.updateVoiceState(d));
      
      //Log if a Channel gets deleted, and the Bot was in, then delete the player if the player exists!
      client.on("channelDelete", async channel => {
        try {
          if (channel.type === "GUILD_VOICE") {
            if (channel.members.has(client.user.id)) {
              var player = client.manager.players.get(channel.guild.id);
              if (!player) return;
              if (channel.id === player.voiceChannel) {
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
                      embed: [msg.embeds[0]],
                      components: [
                        {
                          type: 1, components: [row]
                        }
                      ]
                  }).catch((e)=>{console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)})
                  }).catch((e)=>{console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)})
                }catch{  }
                //destroy
                player.destroy();
              }
            }
          }
        } catch {}
      })
      //If the Bot gets Remove from the Guild and there is still a player, remove it ;)
      client.on("guildRemove", async guild => {
        try {
          var player = client.manager.players.get(guild.id);
          if (!player) return;
          if (guild.id == player.guild) {
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
                  embed: [msg.embeds[0]],
                  components: [
                    {
                      type: 1, components: [row]
                    }
                  ]
              }).catch((e)=>{console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)})
              }).catch((e)=>{console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)})
            }catch{  }
            //destroy
            player.destroy();
          }
        } catch {
          /* */ }
      })
      client.on("voiceStateUpdate", async (oldState, newState) => {
        if(newState.id === client.user.id && oldState.serverDeaf === true && newState.serverDeaf === false)
            {
              let ls = client.settings.get(oldState.guild.id, "language")
              try{
                  var channel = newState.member.guild.channels.cache.find(
                      channel =>
                        channel.type === "GUILD_TEXT" &&
                        ( channel.name.toLowerCase().includes("cmd") ||channel.name.toLowerCase().includes("command") ||  channel.toLowerCase().name.includes("bot") ) &&
                        channel.permissionsFor(newState.member.guild.me).has("SEND_MESSAGES")
                    );
                    channel.send(eval(client.la[ls]["handlers"]["erelaevents"]["client_events"]["variable1"]))
                    newState.setDeaf(true);
              }catch (error) {
                try{
                    console.log("could not send info msg in a botchat")
                    var channel = newState.member.guild.channels.cache.find(
                        channel =>
                          channel.type === "GUILD_TEXT" &&
                          channel.permissionsFor(newState.member.guild.me).has("SEND_MESSAGES")
                      );
                      channel.send(eval(client.la[ls]["handlers"]["erelaevents"]["client_events"]["variable2"]))
                      newState.setDeaf(true);
                }catch (error) {
                  console.log("could not send info msg in a random chat")
                  newState.setDeaf(true);
                }
              }
        }
        // LEFT V12
        if (oldState.channelId && !newState.channelId) {
          //if bot left
          try {
            if (oldState.member.user.id === client.user.id) {
              var player = client.manager.players.get(oldState.guild.id);
              if (!player) return;
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
                    embed: [msg.embeds[0]],
                    components: [
                      {
                        type: 1, components: [row]
                      }
                    ]
                }).catch((e)=>{console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)})
                }).catch((e)=>{console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)})
              }catch{  }
              //destroy
              player.destroy();
            }
          } catch {}
        }
        var player = client.manager.players.get(newState.guild.id);
        if (!player) return;
        databasing(client, player.guild, player.get("playerauthor"));
        if (oldState && oldState.channel) {
          player = client.manager.players.get(oldState.guild.id);
          //if not connect return player.destroy()
          if (!oldState.guild.me.voice.channel){
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
                  embed: [msg.embeds[0]],
                  components: [
                    {
                      type: 1, components: [row]
                    }
                  ]
              }).catch((e)=>{console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)})
              }).catch((e)=>{console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)})
            }catch{  }
            return player.destroy();
          }
          //wait some time...
          if (player && oldState.guild.channels.cache.get(player.voiceChannel).members.size === 1) {
          try {
            player = client.manager.players.get(oldState.guild.id);
            //if not connect return player.destroy()
            if (!oldState.guild.me.voice.channel && player) {
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
                    embed: [msg.embeds[0]],
                    components: [
                      {
                        type: 1, components: [row]
                      }
                    ]
                }).catch((e)=>{console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)})
                }).catch((e)=>{console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)})
              }catch{  }
              return player.destroy();
            }
            //wait some time...
            var vc = oldState.guild.channels.cache.get(player.voiceChannel)
            if (player && vc && vc.members.size === 1) {
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
                    msg.edit({
                      content: `Song has ended!`, 
                      embed: [msg.embeds[0]],
                      components: [
                        {
                          type: 1, components: [row]
                        }
                      ]
                  }).catch((e)=>{console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)})
                  }).catch((e)=>{console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)})
                }catch{

                }
                return 
              }
              
              //send the embed
              try{
                let ls = client.settings.get(player.guild, "language")
                var embed = new MessageEmbed()
                  .setTitle(eval(client.la[ls]["handlers"]["erelaevents"]["client_events"]["variable3"]))
                  .setDescription(eval(client.la[ls]["handlers"]["erelaevents"]["client_events"]["variable4"]))
                  .setColor(ee.wrongcolor);
                client.channels.cache.get(player.textChannel).send(embed).catch(e => console.log(String(e).grey.italic.dim))
              }catch{}
              
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
                    embed: [msg.embeds[0]],
                    components: [
                      {
                        type: 1, components: [row]
                      }
                    ]
                }).catch((e)=>{console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)})
                }).catch((e)=>{console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)})
              }catch{  }
              player.destroy();
            }
          } catch (e) {
            console.log(String(e.stack).grey.italic.dim.yellow);
          }
          }
        }
      });

      client.on("voiceStateUpdate", async (oldState, newState) => {
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
            if(newState.channel.type == "GUILD_STAGE_VOICE" && newState.guild.me.voice.suppress){
              try{
                await newState.guild.me.voice.setSuppressed(false);
              }catch (e){
                console.log(String(e).grey)
              }
            }
            return
        }
        if (oldState.channelId && !newState.channelId) {
            return
        }
        if (oldState.channelId && newState.channelId) {
            if(newState.channel.type == "GUILD_STAGE_VOICE" && newState.guild.me.voice.suppress){
              try{
                await newState.guild.me.voice.setSuppressed(false);
              }catch (e){
                console.log(String(e).grey)
              }
            }
            return;
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
  