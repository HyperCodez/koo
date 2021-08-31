var {
  MessageEmbed
} = require("discord.js")
var ee = require("../../botconfig/embed.json")
var config = require("../../botconfig/config.json")
var {
  format,
  delay,
  arrayMove
} = require("../functions")

//function for playling song
async function request(client, message, args, type) {
  let ls = client.settings.get(message.guild.id, "language")
  var search = args.join(" ");
  var res;
  var player = client.manager.players.get(message.guild.id);
  //if no node, connect it 
  if (player && player.node && !player.node.connected) await player.node.connect()
  //if no player create it
  if (!player) {
    player = await client.manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
      selfDeafen: true,
    });
    if (player && player.node && !player.node.connected) await player.node.connect()
  }
  let state = player.state;
  if (state !== "CONNECTED") {
    //set the variables
    player.set("message", message);
    player.set("playerauthor", message.author.id);
    player.connect();
    message.react("863876115584385074").catch(e => console.log(String(e).grey.italic.dim));
    player.stop();
  }
  res = await client.manager.search({
    query: search,
    source: type.split(":")[1]
  }, message.author);
  // Check the load type as this command is not that advanced for basics
  if (res.loadType === "LOAD_FAILED") {
    throw res.exception;
  } else if (res.loadType === "PLAYLIST_LOADED") {
    playlist_()
  } else {
    song_()
  }
  //function for calling the song
  async function song_() {

    //if no tracks found return info msg

    if (!res.tracks[0])
      return message.reply({embeds: [new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setTitle(String("❌ Error | Found nothing for: **`" + search).substr(0, 256 - 3) + "`**")
        .setDescription(eval(client.la[ls]["handlers"]["playermanagers"]["request"]["variable1"]))
      ]}).catch(e => console.log(String(e).grey.italic.dim));
    //create a player if not created

    //if the player is not connected, then connect and create things
    if (player.state !== "CONNECTED") {
      //set the variables
      player.set("message", message);
      player.set("playerauthor", message.author.id);
      player.connect();
      message.react("863876115584385074").catch(e => console.log(String(e).grey.italic.dim));
      //add track
      player.queue.add(res.tracks[0]);
      //play track
      player.play();
      player.pause(false);
    } else if (!player.queue || !player.queue.current) {
      //add track
      player.queue.add(res.tracks[0]);
      //play track
      player.play();
      player.pause(false);
    }
    //otherwise
    else {
      //add track
      player.queue.add(res.tracks[0]);
    }
  }
  //function for playist
  async function playlist_() {

    if (!res.tracks[0])
      return message.reply({embeds: [new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setTitle(String("❌ Error | Found nothing for: **`" + search).substr(0, 256 - 3) + "`**")
        .setDescription(eval(client.la[ls]["handlers"]["playermanagers"]["request"]["variable2"]))
      ]}).catch(e => console.log(String(e).grey.italic.dim));
    //if the player is not connected, then connect and create things
    if (player.state !== "CONNECTED") {
      //set the variables
      player.set("message", message);
      player.set("playerauthor", message.author.id);
      player.connect();
      message.react("863876115584385074").catch(e => console.log(String(e).grey.italic.dim));
      //add track
      player.queue.add(res.tracks);
      //play track
      player.play();
      player.pause(false);
    } else if (!player.queue || !player.queue.current) {
      //add track
      player.queue.add(res.tracks);
      //play track
      player.play();
      player.pause(false);
    } else {
      player.queue.add(res.tracks);
    }
  }
}

module.exports = request;
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
