//Import Modules
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const settings = require(`../../botconfig/settings.json`);
const { onCoolDown, databasing,
  escapeRegex,
  delay,
  simple_databasing,
  handlemsg } = require("../../handlers/functions");
const Discord = require("discord.js");const {

} = require("../../handlers/functions"); //Loading all needed functions
module.exports = async (client, interaction) => {
  if(!interaction.isCommand()) return;
  const { member, channelId, guildId, applicationId, 
    commandName, deferred, replied, ephemeral, 
    options, id, createdTimestamp 
  } = interaction; 
  const { guild } = member;
	const CategoryName = interaction.commandName;
  simple_databasing(client, guild.id, member.id)
  var not_allowed = false;
  const guild_settings = client.settings.get(guild.id);
  let es = guild_settings.embed;
  let ls = guild_settings.language;
  let { prefix, botchannel, unkowncmdmessage } = guild_settings;
  let command = false;
  if (client.slashCommands.has(CategoryName + interaction.options.getSubcommand())) {
    command = client.slashCommands.get(CategoryName + interaction.options.getSubcommand());
  }
  if (client.slashCommands.has("normal" + CategoryName)) {
    command = client.slashCommands.get("normal" + CategoryName);
  }
	if(command) {
    if (!client.cooldowns.has(command.name)) { //if its not in the cooldown, set it too there
      client.cooldowns.set(command.name, new Discord.Collection());
    }
    const now = Date.now(); //get the current time
    const timestamps = client.cooldowns.get(command.name); //get the timestamp of the last used commands
    const cooldownAmount = (command.cooldown || 1) * 1000; //get the cooldownamount of the command, if there is no cooldown there will be automatically 1 sec cooldown, so you cannot spam it^^
    if (timestamps.has(member.id)) { //if the user is on cooldown
      const expirationTime = timestamps.get(member.id) + cooldownAmount; //get the amount of time he needs to wait until he can run the cmd again
      if (now < expirationTime) { //if he is still on cooldonw
        const timeLeft = (expirationTime - now) / 1000; //get the lefttime
        not_allowed = true;
        return interaction.reply({ephemeral: true, embeds: [new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(handlemsg(client.la[ls].common.cooldown, {time: timeLeft.toFixed(1), commandname: command.name}))]}
        ); //send an information message
      }
    }
    timestamps.set(member.id, now); //if he is not on cooldown, set it to the cooldown
    setTimeout(() => timestamps.delete(member.id), cooldownAmount); //set a timeout function with the cooldown, so it gets deleted later on again
    client.stats.inc(guild.id, "commands"); //counting our Database stats for SERVER
    client.stats.ensure("global", {
      commands: 0,
      songs: 0,
      setups: 0
    });
    client.stats.inc("global", "commands"); //counting our Database Stats for GLOBAL

    //IF A FREEBOT RETURN
    let disablecmds = ["advertise", "setup-radio", "playlist", "autoplay", "youtubetogether", "addroletoeveryone", "giveaway", "blacklist", "tiktok", "setup-twitter", "anti", "aichat", "counter", "customcommand"]
    let disablecats = ["soundboard", "custom", "economy", "filter"]
    if (disablecmds.some(i => String(command.name).toLowerCase().includes(i.toLowerCase())) ||
      disablecats.some(i => String(command.category).toLowerCase().includes(i.toLowerCase()))
    ) {
      if (require('path') && require('path').resolve(__dirname) && require('path').resolve(__dirname).split("/")[3] && require('path').resolve(__dirname).split("/")[3].includes("FREEBOT_")) {
        not_allowed = true;
        return interaction.reply({ephemeral: true, embeds: [new MessageEmbed()
          .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
          .setTitle(client.la[ls].common.premium.title)
          .setDescription(client.la[ls].common.premium.description)]
        });
      }
    }
  
    //if Command has specific permission return error
    if (command.memberpermissions && command.memberpermissions.length > 0 && !interaction.member.permissions.has(command.memberpermissions)) {
          return interaction.reply({ ephemeral: true, embeds: [new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(client.la[ls].common.permissions.title)
            .setDescription(`${client.la[ls].common.permissions.description}\n> \`${command.memberpermissions.join("`, ``")}\``)   
          ]
          });
    }
      
    const player = client.manager.players.get(guild.id);
  
    if(player && player.node && !player.node.connected) player.node.connect();
    
    if(guild.me.voice.channel && player) {
      //destroy the player if there is no one
      if(!player.queue) await player.destroy();
      await delay(350);
    }
    
    ///////////////////////////////
    ///////////////////////////////
    ///////////////////////////////
    ///////////////////////////////
    if(command.parameters) {
      if(command.parameters.type == "music"){
        //get the channel instance
        const { channel } = member.voice;
        const mechannel = guild.me.voice.channel;
        //if not in a voice Channel return error
        if (!channel) {
          not_allowed = true;
          return interaction.reply({ephemeral: true, embeds: [new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(client.la[ls].common.join_vc)]});
        }
        //If there is no player, then kick the bot out of the channel, if connected to
        if(!player && mechannel) {
          await guild.me.voice.disconnect().catch(e=>{});
          await delay(350);
        }
        //if no player available return error | aka not playing anything
        if(command.parameters.activeplayer){
          if (!player){
            not_allowed = true;
            return interaction.reply({ephemeral: true, embeds: [new MessageEmbed()
              .setColor(es.wrongcolor)
              .setFooter(es.footertext, es.footericon)
              .setTitle(client.la[ls].common.nothing_playing)]});
          }
          if (!mechannel){
            if(player) try{ await player.destroy(); await delay(350); }catch{ }
            not_allowed = true;
            return interaction.reply({ephemeral: true, embeds: [new MessageEmbed()
              .setColor(es.wrongcolor)
              .setFooter(es.footertext, es.footericon)
              .setTitle(client.la[ls].common.not_connected)]});
          }
        }
        //if no previoussong
        if(command.parameters.previoussong){
          if (!player.queue.previous || player.queue.previous === null){
            not_allowed = true;
            return interaction.reply({ephemeral: true, embeds: [new MessageEmbed()
              .setColor(es.wrongcolor)
              .setFooter(es.footertext, es.footericon)
              .setTitle(client.la[ls].common.nothing_playing)]});
          }
        }
        //if not in the same channel --> return
        if (player && channel.id !== player.voiceChannel && !command.parameters.notsamechannel){
          return interaction.reply({ephemeral: true, embeds: [new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(client.la[ls].common.wrong_vc)
            .setDescription(`Channel: <#${player.voiceChannel}>`)]});
      }
      //if not in the same channel --> return
      if (mechannel && channel.id !== mechannel.id && !command.parameters.notsamechannel) {
        return interaction.reply({ephemeral: true, embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(client.la[ls].common.wrong_vc)
          .setDescription(`Channel: <#${player.voiceChannel}>`)]});
      }
      }
    }
    ///////////////////////////////
    ///////////////////////////////
    ///////////////////////////////
    ///////////////////////////////
    //run the command with the parameters:  client, message, args, user, text, prefix,
    if (not_allowed) return;
    //execute the cmd
    databasing(client, guild.id, member.id)
    //Execute the Command
		command.run(client, interaction, player, es, ls)
	}
}
