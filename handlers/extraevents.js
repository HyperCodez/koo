const { DiscordAPIError, MessageEmbed } = require("discord.js");
const config = require("../botconfig/config.json")
module.exports = client => {
    
  process.on('unhandledRejection', (reason, p) => {
    console.log('\n\n\n\n\n=== unhandled Rejection ==='.toUpperCase().yellow.dim);
    console.log('Reason: ', reason.stack ? String(reason.stack).gray : String(reason).gray);
    console.log('=== unhandled Rejection ===\n\n\n\n\n'.toUpperCase().yellow.dim);
  });
  process.on("uncaughtException", (err, origin) => {
    console.log('\n\n\n\n\n\n=== uncaught Exception ==='.toUpperCase().yellow.dim);
    console.log('Exception: ', err.stack ? err.stack : err)
    console.log('=== uncaught Exception ===\n\n\n\n\n'.toUpperCase().yellow.dim);
  })
  process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log('=== uncaught Exception Monitor ==='.toUpperCase().yellow.dim);
  });
  process.on('beforeExit', (code) => {
    console.log('\n\n\n\n\n=== before Exit ==='.toUpperCase().yellow.dim);
    console.log('Code: ', code);
    console.log('=== before Exit ===\n\n\n\n\n'.toUpperCase().yellow.dim);
  });
  process.on('exit', (code) => {
    console.log('\n\n\n\n\n=== exit ==='.toUpperCase().yellow.dim);
    console.log('Code: ', code);
    console.log('=== exit ===\n\n\n\n\n'.toUpperCase().yellow.dim);
  });
  process.on('multipleResolves', (type, promise, reason) => {
    console.log('\n\n\n\n\n=== multiple Resolves ==='.toUpperCase().yellow.dim);
    console.log(type, promise, reason);
    console.log('=== multiple Resolves ===\n\n\n\n\n'.toUpperCase().yellow.dim);
  });
  
  client.on("messageCreate", (message) => {
    if(message.guild && message.author.id == client.user.id){
      if(message.channel.type == "GUILD_NEWS"){
        setTimeout(()=>{
          if(message.crosspostable){
            message.crosspost().then(msg => console.log("Message got Crossposted".green)).catch(e=>console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim))
          }
        }, client.ws.ping)
      }
    }
  })
  //ALWAYS SERVER DEAF THE BOT WHEN JOING
  client.on("voiceStateUpdate", (oldState, newState) => {
      try{
        //skip if not the bot
        if(client.user.id != newState.id) return;
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
        if (((!oldState.channelId && newState.channelId) || (oldState.channelId && newState.channelId))) {
            try{ newState.setDeaf(true);  }catch{ }
            return;
        }
      }catch{

      }
    
  });
  //ANTI UNMUTE THING
  client.on("voiceStateUpdate", async (oldState, newState) => {
    if(!client.settings.has(newState.guild.id, "language")) client.settings.ensure(newState.guild.id, { language: "en" });
    let ls = client.settings.get(newState.guild.id, "language")
    if(newState.id === client.user.id && oldState.serverDeaf === true && newState.serverDeaf === false)
        {
            try{
                var channel = newState.member.guild.channels.cache.find(
                    channel =>
                      channel.type === "GUILD_TEXT" &&
                      ( channel.name.toLowerCase().includes("cmd") ||channel.name.toLowerCase().includes("command") ||  channel.toLowerCase().name.includes("bot") ) &&
                      channel.permissionsFor(newState.member.guild.me).has("SEND_MESSAGES")
                  );
                  channel.send(eval(client.la[ls]["handlers"]["extraeventsjs"]["extraevents"]["variable1"]))
                  newState.setDeaf(true);
            }catch (error) {
                try{
                    console.log("could not send info msg in a botchat")
                    var channel = newState.member.guild.channels.cache.find(
                        channel =>
                          channel.type === "GUILD_TEXT" &&
                          channel.permissionsFor(newState.member.guild.me).has("SEND_MESSAGES")
                      );
                      channel.send(eval(client.la[ls]["handlers"]["extraeventsjs"]["extraevents"]["variable2"]))
                      newState.setDeaf(true);
                }catch (error) {
                  console.log("could not send info msg in a random chat")
                  newState.setDeaf(true);
                }
            }
    }
  });

  client.on("guildCreate", async guild => {
    if(!client.settings.has(guild.id, "language")) client.settings.ensure(guild.id, { language: "en" });
    let ls = client.settings.get(guild.id, "language")
    let embed = new MessageEmbed()
    .setColor("GREEN")
    .setTitle(eval(client.la[ls]["handlers"]["extraeventsjs"]["extraevents"]["variable3"]))
    .setDescription(eval(client.la[ls]["handlers"]["extraeventsjs"]["extraevents"]["variable4"]))
    .addField("Kick the Bot out of there:",`\`\`\`${config.prefix}leaveserver ${guild.id}\`\`\``)
    try {
      embed.setThumbnail(guild.iconURL({dynamic: true}));
    } catch { 
       
    }
    for(const owner of config.ownerIDS){
      client.users.fetch(owner).then(user => {
        user.send({ embeds: [embed] })
      }).catch(e => {
        console.log(String(e).grey.italic.dim)
      })
    }
  });

  client.on("guildDelete", async guild => {
    if(!client.settings.has(guild.id, "language")) client.settings.ensure(guild.id, { language: "en" });
    let ls = client.settings.get(guild.id, "language")
    let embed = new MessageEmbed()
    .setColor("RED")
    .setTitle(eval(client.la[ls]["handlers"]["extraeventsjs"]["extraevents"]["variable5"]))
    .setDescription(eval(client.la[ls]["handlers"]["extraeventsjs"]["extraevents"]["variable6"]))
    try {
      embed.setThumbnail(guild.iconURL({dynamic: true}));
    } catch { 
       
    }
    for(const owner of config.ownerIDS){
      client.users.fetch(owner).then(user => {
        user.send({ embeds: [embed] })
      }).catch(e => {
        console.log(String(e).grey.italic.dim)
      })
    }
  });

 
}