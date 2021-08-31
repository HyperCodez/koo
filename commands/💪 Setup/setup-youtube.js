var {
  MessageEmbed
} = require(`discord.js`);
var Discord = require(`discord.js`);
var config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
var emoji = require(`../../botconfig/emojis.json`);
var {
  databasing
} = require(`../../handlers/functions`);
const { MessageButton, MessageActionRow, MessageMenuOption, MessageMenu } = require('discord.js')
module.exports = {
  name: "setup-youtube",
  category: "💪 Setup",
  aliases: ["setupyoutube", "youtube-setup", "youtubesetup"],
  cooldown: 5,
  usage: "setup-youtube  -->  Follow Steps",
  description: "Manage the youtube logger, addstreamer, editstreamer, removestreamer, etc.",
  memberpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    try {
      var adminroles = client.settings.get(message.guild.id, "adminroles")


      var timeouterror = false;
      var filter = (reaction, user) => {
        return user.id === message.author.id;
      };
      var temptype = ""
      var tempmsg;
      tempmsg = await message.reply(new Discord.MessageEmbed()
        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-youtube"]["variable1"]))
        .setColor(es.color)
        .setDescription(`1️⃣ **== Set** Discord **Channel** for Posting new Vids
        
2️⃣ **== Add** Youtube Channel
        
3️⃣ **== Remove** Youtube Channel

4️⃣ **== Edit** Youtube Channel



*React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
      )
      try {
        tempmsg.react("1️⃣")
        tempmsg.react("2️⃣")
        tempmsg.react("3️⃣")
        tempmsg.react("4️⃣")
      } catch (e) {
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-youtube"]["variable2"]))
          .setColor(es.wrongcolor)
          .setDescription(`\`\`\` ${e.message ? e.message : e.stack ? String(e.stack).grey.substr(0, 2000) : String(e).grey.substr(0, 2000)}\`\`\``.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        );
      }
      await tempmsg.awaitReactions(filter, {
          max: 1,
          time: 90000,
          errors: ["time"]
        })
        .then(collected => {
          var reaction = collected.first()
          reaction.users.remove(message.author.id)
          if (reaction.emoji.name === "1️⃣") temptype = "set"
          else if (reaction.emoji.name === "2️⃣") temptype = "add"
          else if (reaction.emoji.name === "3️⃣") temptype = "remove"
          else if (reaction.emoji.name === "4️⃣") temptype = "edit"
          else throw "You reacted with a wrong emoji"
        })
        .catch(e => {
          timeouterror = e;
        })
      if (timeouterror)
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-youtube"]["variable3"]))
          .setColor(es.wrongcolor)
          .setDescription(`Cancelled the Operation!`.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        );
      if (temptype == "set") {

        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-youtube"]["variable4"]))
          .setColor(es.color)
          .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-youtube"]["variable5"]))
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(async collected => {
            var msg = collected.first();
            if(msg && msg.mentions.channels.filter(ch=>ch.guild.id==msg.guild.id).first()){
              client.social_log.set(message.guild.id, msg.mentions.channels.filter(ch=>ch.guild.id==msg.guild.id).first().id, "youtube.dc_channel")
              return message.reply(new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-youtube"]["variable6"]))
                .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-youtube"]["variable7"]))
                .setColor(es.color)
                .setFooter(es.footertext, es.footericon)
              );
            }
            else{
              throw {
                message: "YOU DID NOT PING A VALID CHANNEL"
              }
            }
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-youtube"]["variable8"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );

      } else if (temptype == "add") {
        if(client.social_log.get(message.guild.id, "youtube.channels").length >= 5) 
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-youtube"]["variable9"]))
            .setColor(es.wrongcolor)
            .setDescription(`Remove some others first...`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-youtube"]["variable10"]))
          .setColor(es.color)
          .setDescription(`Example:
          
https://www.youtube.com/channel/UC1AgotpFHNhzolUtAjPgZqQ`)
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(async collected => {
            var msg = collected.first();
            if(msg && msg.content ){
              if((msg.content.length > 0 && msg.content.length < 50) &&!msg.content.toLowerCase().includes("youtube") && (!msg.content.toLowerCase().includes("channel") || !msg.content.toLowerCase().includes("c")))
              throw {
                message: "YOU DID NOT SEND A VALID CHANNEL"
              }
              if(client.social_log.get(message.guild.id, "youtube.channels").includes(msg.content))
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-youtube"]["variable11"]))
                  .setColor(es.wrongcolor)
                  .setFooter(es.footertext, es.footericon)
                );
              client.social_log.push(message.guild.id, msg.content, "youtube.channels")

              return message.reply(new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-youtube"]["variable12"]))
                .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-youtube"]["variable13"]))
                .setColor(es.color)
                .setFooter(es.footertext, es.footericon)
              );
            }
            else{
              throw {
                message: "YOU DID NOT SEND A VALID CHANNEL"
              }
            }
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-youtube"]["variable14"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
      } else if (temptype == "remove") {
        if(client.social_log.get(message.guild.id, "youtube.channels").length <= 0) 
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-youtube"]["variable15"]))
            .setColor(es.wrongcolor)
            .setDescription(`Add some others first...`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
          var buffer = "";
          var emojis = ["0️⃣", "5️⃣"]
          for(let i = 0; i< client.social_log.get(message.guild.id, "youtube.channels").length; i++){
            buffer += `${emojis[i]} ${client.social_log.get(message.guild.id, "youtube.channels")[i]}`
          }
          tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-youtube"]["variable16"]))
            .setColor(es.color)
            .setDescription(buffer+ "\n\n\n*React with the emoji regarding to the Channel you wanna remove*")
            .setFooter(es.footertext, es.footericon)
          })
          for(const emoji of emojis){
            tempmsg.react(emoji).catch(e=>console.log(e.stack ? String(e.stack).grey : String(e).grey))
          }
        await tempmsg.awaitReactions((reaction, user) => user.id == message.author.id && emojis.includes(reaction.emoji.name), {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(async collected => {
            var channel = client.social_log.get(message.guild.id, "youtube.channels")[emojis.findIndex(emoji => emoji == collected.first().emoji.name)]
            
            client.social_log.remove(message.guild.id, channel, "youtube.channels")

            return message.reply(new Discord.MessageEmbed()
              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-youtube"]["variable17"]))
              .setColor(es.color)
              .setFooter(es.footertext, es.footericon)
            );
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-youtube"]["variable18"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
      } else if (temptype == "edit") {
        if(client.social_log.get(message.guild.id, "youtube.channels").length <= 0) 
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-youtube"]["variable19"]))
            .setColor(es.wrongcolor)
            .setDescription(`Add some others first...`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
          var buffer = "";
          var emojis = ["0️⃣", "5️⃣"]
          for(let i = 0; i< client.social_log.get(message.guild.id, "youtube.channels").length; i++){
            buffer += `${emojis[i]} ${client.social_log.get(message.guild.id, "youtube.channels")[i]}`
          }
          tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-youtube"]["variable20"]))
            .setColor(es.color)
            .setDescription(buffer+ "\n\n\n*React with the emoji regarding to the Channel you wanna edit*")
            .setFooter(es.footertext, es.footericon)
          })
          for(const emoji of emojis){
            tempmsg.react(emoji).catch(e=>console.log(e.stack ? String(e.stack).grey : String(e).grey))
          }
        await tempmsg.awaitReactions((reaction, user) => user.id == message.author.id && emojis.includes(reaction.emoji.name), {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(async collected => {
            var channel = client.social_log.get(message.guild.id, "youtube.channels")[emojis.findIndex(emoji => emoji == collected.first().emoji.name)]
                        
            client.youtube_log.ensure(channel, {
              oldvid: "",
              message: "**{videoAuthorName}** uploaded \`{videoTitle}\`!\n**Watch it:** {videoURL}"
            })
            tempmsg = await message.reply(new Discord.MessageEmbed()
              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-youtube"]["variable21"]))
              .setColor(es.color)
              .setDescription(`
**CURRENT MESSAGE:**
> ${client.youtube_log.get(channel, "message")}`.substr(0, 2048))
.addField("**VARIABLES**",`
> \`{url}\` ... will be replaced with the video **LINK**
> \`{author}\` ... will be replaced with the video's **Author**
> \`{title}\` ... will be replaced with the video's **title**
> \`{date}\` ... will be replaced with the video's **date**`)
              .setFooter(es.footertext, es.footericon)
            )
            await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
              max: 1,
              time: 90000,
              errors: ["time"]
            })
            .then(async collected => {
              var msg = collected.first();
              if(msg && msg.content ){
                client.youtube_log.set(channel, msg.content, "message")  
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-youtube"]["variable22"]))
                  .setDescription("New Message:\n" + msg.content)
                  .setColor(es.color)
                  .setFooter(es.footertext, es.footericon)
                );
              }
              else{
                throw {
                  message: "YOU DID NOT SEND A VALID CHANNEL"
                }
              }
            })
            .catch(e => {
              console.log(e.stack ? String(e.stack).grey : String(e).grey)
              timeouterror = e;
            })
          if (timeouterror)
            return message.reply(new Discord.MessageEmbed()
              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-youtube"]["variable23"]))
              .setColor(es.wrongcolor)
              .setDescription(`Cancelled the Operation!`.substr(0, 2000))
              .setFooter(es.footertext, es.footericon)
            );
          })
          .catch(e => {
            console.log(e.stack ? String(e.stack).grey : String(e).grey)
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-youtube"]["variable24"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
      }  else {
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-youtube"]["variable25"]))
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
        );
      }

    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-youtube"]["variable26"]))
      );
    }
  },
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
