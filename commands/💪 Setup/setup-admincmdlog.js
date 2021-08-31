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
  name: "setup-admincmdlog",
  category: "💪 Setup",
  aliases: ["setupadmincmdlog", "cmdlog", "admincmdlog-setup", "admincmdlogsetup"],
  cooldown: 5,
  usage: "setup-admincmdlog  -->  Follow the Steps",
  description: "Enable/Disable logging administration commands, execution",
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
        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admincmdlog"]["variable1"]))
        .setColor(es.color)
        .setDescription(`1️⃣ **== \`✔️ Enable\` / Set** Channel
        
2️⃣ **== \`❌ Disable\`** Log

📑 **== Show Settings**



*React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
      )

      try {
        tempmsg.react("1️⃣")
        tempmsg.react("2️⃣")
        tempmsg.react("📑")
      } catch (e) {
        return message.reply({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admincmdlog"]["variable2"]))
          .setColor(es.wrongcolor)
          .setDescription(`\`\`\` ${e.message ? e.message : e.stack ? String(e.stack).grey.substr(0, 2000) : String(e).grey.substr(0, 2000)}\`\`\``.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        });
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
          else if (reaction.emoji.name === "📑") temptype = "thesettings"
          else throw "You reacted with a wrong emoji"

        })
        .catch(e => {
          timeouterror = e;
        })
      if (timeouterror)
        return message.reply({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admincmdlog"]["variable3"]))
          .setColor(es.wrongcolor)
          .setDescription(`Cancelled the Operation!`.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        });

      if(temptype == "set"){
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admincmdlog"]["variable4"]))
        .setColor(es.color)
        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-admincmdlog"]["variable5"])).setFooter(es.footertext, es.footericon)
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
          if(message.mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first()){
            client.settings.set(message.guild.id, message.mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first().id, `adminlog`)
            return message.reply({embed: new Discord.MessageEmbed()
              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admincmdlog"]["variable6"]))
              .setColor(es.color)
              .setDescription(`If someone executes an Admin Command, an Information will be sent in that Channel`.substr(0, 2048))
              .setFooter(es.footertext, es.footericon)
            });
          }
          else{
            throw "NO CHANNEL PINGED";
          }
        })
        .catch(e => {
          timeouterror = e;
        })
      if (timeouterror)
        return message.reply({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admincmdlog"]["variable7"]))
          .setColor(es.wrongcolor)
          .setDescription(`Cancelled the Operation!`.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        });
      } else if (temptype == "disable") {
          client.settings.set(message.guild.id, "no", `adminlog`)
          return message.reply({embed: new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admincmdlog"]["variable8"]))
            .setColor(es.color)
            .setDescription(`If someone executes an Admin Command, **no** Information will be sent`.substr(0, 2048))
            .setFooter(es.footertext, es.footericon)
          });
      } else if (temptype == "thesettings") {
        let thesettings = client.settings.get(message.guild.id, `adminlog`)
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admincmdlog"]["variable9"]))
          .setColor(es.color)
          .setDescription(`**Channel:** ${thesettings == "no" ? "Not Setupped" : `<#${thesettings}> | \`${thesettings}\``}`.substr(0, 2048))
          .setFooter(es.footertext, es.footericon)
        );
      }else {
        return message.reply({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admincmdlog"]["variable10"]))
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
        });
      }

    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-admincmdlog"]["variable11"]))
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