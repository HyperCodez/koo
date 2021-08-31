var {
  MessageEmbed
} = require(`discord.js`);
var Discord = require(`discord.js`);
var config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
var emoji = require(`../../botconfig/emojis.json`);
var {
  databasing,
  edit_msg,
  send_roster
} = require(`../../handlers/functions`);
const { MessageButton, MessageActionRow, MessageMenuOption, MessageMenu } = require('discord.js')
module.exports = {
  name: "setup-rank",
  category: "💪 Setup",
  aliases: ["setuprank", "rank-setup"],
  cooldown: 5,
  usage: "setup-rank --> Follow Steps",
  description: "Manage the Ranking System with stuff like channel, background, etc",
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
        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable1"]))
        .setColor(es.color)
        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable2"])).setFooter(es.footertext, es.footericon)
      )
      try {
        tempmsg.react("1️⃣")
        tempmsg.react("2️⃣")
        tempmsg.react("3️⃣")
      } catch (e) {
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable3"]))
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
          if (reaction.emoji.name === "1️⃣") temptype = "channel"
          else if (reaction.emoji.name === "2️⃣") temptype = "reply"
          else if (reaction.emoji.name === "3️⃣") temptype = "disable"
          else throw "You reacted with a wrong emoji"

        })
        .catch(e => {
          timeouterror = e;
        })
      if (timeouterror)
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable4"]))
          .setColor(es.wrongcolor)
          .setDescription(`Cancelled the Operation!`.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        );

      if (temptype == "channel") {

        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable5"]))
          .setColor(es.color)
          .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable6"]))
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var message = collected.first();
            var channel = message.mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first() || message.guild.channels.cache.get(message.content.trim().split(" ")[0]);
            if (channel) {
              try {
                client.points.set(message.guild.id, channel.id, "channel")
                client.points.set(message.guild.id, false, "disabled")
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable7"]))
                  .setColor(es.color)
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable8"]))
                  .setColor(es.wrongcolor)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable9"]))
                  .setFooter(es.footertext, es.footericon)
                );
              }
            } else {
              throw "you didn't ping a valid Channel"
            }
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable10"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );

      } else if (temptype == "reply") {
        try {
          client.points.set(message.guild.id, false, "channel")
          client.points.set(message.guild.id, false, "disabled")
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable11"]))
            .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable12"]))
            .setColor(es.color)
            .setFooter(es.footertext, es.footericon)
          );
        } catch (e) {
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable13"]))
            .setColor(es.wrongcolor)
            .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable14"]))
            .setFooter(es.footertext, es.footericon)
          );
        }
      } else if (temptype == "disable") {
        try {
          if (client.points.get(message.guild.id, "disabled")) return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable15"]))
            .setColor(es.wrongcolor)
            .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable16"]))
            .setFooter(es.footertext, es.footericon)
          );
          client.points.set(message.guild.id, true, "disabled")
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable17"]))
            .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable18"]))
            .setColor(es.color)
            .setFooter(es.footertext, es.footericon)
          );
        } catch (e) {
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable19"]))
            .setColor(es.wrongcolor)
            .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable20"]))
            .setFooter(es.footertext, es.footericon)
          );
        }
      } else if (temptype == "setbg") {
        try {
          var url;
          tempmsg = await tempmsg.edit({embed: new MessageEmbed()
            .setColor(ee.color)
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable21"]))
            .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable22"]))
            .setFooter("Pick the INDEX NUMBER / send the IMAGE URl", ee.footericon)
            .setThumbnail(ee.footericon)}).then(msg => {
            msg.channel.awaitMessages(m => m.author.id === message.author.id, {
              max: 1,
              time: 30000,
              errors: ['time']
            }).then(collected => {
              if (collected.first().attachments.size > 0) {
                if (collected.first().attachments.every(attachIsImage)) {
                  client.setups.set(message.guild.id, url, "ranking.backgroundimage")
                  return message.reply(new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable23"]))
                    .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable24"]))
                    .setColor(es.color)
                    .setFooter(es.footertext, es.footericon)
                  );
                } else {
                  return message.reply(new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable25"]))
                    .setColor(es.wrongcolor)
                    .setFooter(es.footertext, es.footericon)
                  );
                }
              } else if (collected.first().content.includes("https") || collected.first().content.includes("http")) {
                client.setups.set(message.guild.id, collected.first().content, "ranking.backgroundimage")
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable26"]))
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable27"]))
                  .setColor(es.color)
                  .setFooter(es.footertext, es.footericon)
                );
              } else {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable28"]))
                  .setColor(es.wrongcolor)
                  .setFooter(es.footertext, es.footericon)
                );
              }

              function attachIsImage(msgAttach) {
                url = msgAttach.url;

                //True if this url is a png image.
                return url.indexOf("png", url.length - "png".length /*or 3*/ ) !== -1 ||
                  url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/ ) !== -1 ||
                  url.indexOf("jpg", url.length - "jpg".length /*or 3*/ ) !== -1;
              }
            });
          })
        } catch (e) {
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable29"]))
            .setColor(es.wrongcolor)
            .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable30"]))
            .setFooter(es.footertext, es.footericon)
          );
        }
      } else if (temptype == "resetbg") {
        try {
          client.setups.set(message.guild.id, "null", "ranking.backgroundimage")
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable31"]))
            .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable32"]))
            .setColor(es.color)
            .setFooter(es.footertext, es.footericon)
          );
        } catch (e) {
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable33"]))
            .setColor(es.wrongcolor)
            .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable34"]))
            .setFooter(es.footertext, es.footericon)
          );
        }
      } else {
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable35"]))
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
        );
      }

    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-rank"]["variable36"]))
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
