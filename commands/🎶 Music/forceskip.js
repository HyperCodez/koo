const {
  MessageEmbed,
  MessageButton,
  MessageActionRow
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const {
  autoplay,
} = require("../../handlers/functions");
const { handlemsg } = require("../../handlers/functions");
module.exports = {
  name: "forceskip",
  category: "🎶 Music",
  aliases: ["fs",],
  description: "Force Skips the current song",
  usage: "forceskip",
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    if (!client.settings.get(message.guild.id, "MUSIC")) {
      return message.reply({embeds : [new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(client.la[ls].common.disabled.title)
        .setDescription(handlemsg(client.la[ls].common.disabled.description, {prefix: prefix}))
      ]});
    }
    try {
      //get the channel instance from the Member
      const {
        channel
      } = message.member.voice;
      //if the member is not in a channel, return
      if (!channel)
        return message.reply({embeds : [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(client.la[ls].common.join_vc)
         ]} );
      //get the player instance
      const player = client.manager.players.get(message.guild.id);
      //if no player available return aka not playing anything
      if (!player) {
        if (message.guild.me.voice.channel) {
          try {
            message.guild.me.voice.channel.leave();
          } catch {}
          message.reply({embeds : [new MessageEmbed()
            .setTitle(client.la[ls].cmds.music.skip.title)
            .setColor(es.color)
          ]});
          return message.react("⏹️").catch((e) => {})
        } else {
          return message.reply({embeds :[new MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle(client.la[ls].common.nothing_playing)
          ]});
        }
        return
      }
      //if not in the same channel as the player, return Error
      if (channel.id !== player.voiceChannel)
        return message.reply({embeds : [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(client.la[ls].common.wrong_vc)
          .setDescription(eval(client.la[ls]["cmds"]["music"]["skip"]["variable1"]))
        ]});
      //if ther is nothing more to skip then stop music and leave the Channel
      if (player.queue.size == 0) {
        //if its on autoplay mode, then do autoplay before leaving...
        if (player.get("autoplay")) return autoplay(client, player, "skip");
        if (message.guild.me.voice.channel) {
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
            }).catch((e) => {
              console.log(e.stack ? String(e.stack).dim : String(e).dim)
            })
          } catch {}
          try {
            message.guild.me.voice.channel.leave();
          } catch {}
          try {
            player.destroy();
          } catch {}
          message.reply({embeds : [new MessageEmbed()
            .setTitle(client.la[ls].cmds.music.skip.title)
            .setColor(es.color)
          ]});
          return message.react("⏹️").catch((e) => {})
        } else {
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
            }).catch((e) => {
              console.log(e.stack ? String(e.stack).dim : String(e).dim)
            })
          } catch {}
          //stop playing
          try {
            player.destroy();
          } catch {}
          message.reply({embeds : [new MessageEmbed()
            .setTitle(client.la[ls].cmds.music.skip.title)
            .setColor(es.color)
          ]});
          //React with the emoji
          return message.react("⏹️").catch((e) => {})
        }
        return
      }
      //skip the track
      player.stop();
      //send success message
      
      message.reply({embeds : [new MessageEmbed()
        .setTitle(client.la[ls].cmds.music.skip.title2)
        .setColor(es.color)
      ]});

      return message.react("⏭").catch((e) => {})
    } catch (e) {
      console.log(String(e.stack).dim.bgRed)
      return message.reply({embeds : [new MessageEmbed()
        .setColor(es.wrongcolor)
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(eval(client.la[ls]["cmds"]["music"]["skip"]["variable2"]))
      ]});
    }
  }
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
