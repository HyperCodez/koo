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
  name: "setup-counter",
  category: "💪 Setup",
  aliases: ["setupcounter",  "counter-setup", "countersetup"],
  cooldown: 5,
  usage: "setup-counter  -->  Follow the Steps",
  description: "This Setup allows you to send logs into a specific Channel, when someone enters a the Command: report",
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
        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-counter"]["variable1"]))
        .setColor(es.color)
        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-counter"]["variable2"])).setFooter(es.footertext, es.footericon)
      )

      try {
        tempmsg.react("1️⃣")
        tempmsg.react("2️⃣")
        tempmsg.react("3️⃣")
        tempmsg.react("📑")
      } catch (e) {
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-counter"]["variable3"]))
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
          else if (reaction.emoji.name === "2️⃣") temptype = "disable"
          else if (reaction.emoji.name === "3️⃣") temptype = "resetNumber"
          else if (reaction.emoji.name === "📑") temptype = "thesettings"
          else throw "You reacted with a wrong emoji"

        })
        .catch(e => {
          timeouterror = e;
        })
      if (timeouterror)
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-counter"]["variable4"]))
          .setColor(es.wrongcolor)
          .setDescription(`Cancelled the Operation!`.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        );

      if(temptype == "set"){
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-counter"]["variable5"]))
        .setColor(es.color)
        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-counter"]["variable6"])).setFooter(es.footertext, es.footericon)
      })
      var thecmd;
      await tempmsg.channel.awaitMessages(m=>m.author.id == message.author.id, {
          max: 1,
          time: 90000,
          errors: ["time"]
        })
        .then(async collected => {
          var message = collected.first();
          if(!message) throw "NO MESSAGE SENT";
          let channel = message.mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first() || message.guild.channels.cache.get(message.content.trim().split(" ")[0]);
          if(channel){
            client.settings.set(message.guild.id, channel.id, `counter`)
            return message.reply(new Discord.MessageEmbed()
              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-counter"]["variable7"]))
              .setColor(es.color)
              .setDescription(`Posting now, every Minute`.substr(0, 2048))
              .setFooter(es.footertext, es.footericon)
            );
          }
          else{
            throw "NO CHANNEL PINGED";
          }
        })
        .catch(e => {
          timeouterror = e;
        })
      if (timeouterror)
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-counter"]["variable8"]))
          .setColor(es.wrongcolor)
          .setDescription(`Cancelled the Operation!`.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        );
      } else if (temptype == "disable") {
          client.settings.set(message.guild.id, "no", `counter`)
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-counter"]["variable9"]))
            .setColor(es.color)
            .setDescription(`I will not send automatic NSFW Images to a Channel anymore`.substr(0, 2048))
            .setFooter(es.footertext, es.footericon)
          );
      } else if (temptype == "resetNumber") {
          client.settings.set(message.guild.id, 0, `counternum`)
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-counter"]["variable10"]))
            .setColor(es.color)
            .setDescription(`People now need to count from 1 again!`.substr(0, 2048))
            .setFooter(es.footertext, es.footericon)
          );
      } else if (temptype == "thesettings") {
        let thesettings = client.settings.get(message.guild.id, `counter`)
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-counter"]["variable11"]))
          .setColor(es.color)
          .setDescription(`**Channel:** ${thesettings == "no" ? "Not Setupped" : `<#${thesettings}> | \`${thesettings}\``}\n\n**Current Number:** \`${client.settings.get(message.guild.id, "counternum")}\`\n**Nest Number:** \`${Number(client.settings.get(message.guild.id, "counternum")) + 1}\``.substr(0, 2048))
          .setFooter(es.footertext, es.footericon)
        );
    } else {
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-counter"]["variable12"]))
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
        );
      }

    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-counter"]["variable13"]))
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