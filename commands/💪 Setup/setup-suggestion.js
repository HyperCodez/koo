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
  name: "setup-suggestion",
  category: "💪 Setup",
  aliases: ["setupsuggestion", "suggestionsetup", "suggestsetup", "suggestion-setup", "suggest-setup", "setup-suggest", "setupsuggest"],
  cooldown: 5,
  usage: "setup-suggestion  -->  Follow the Steps",
  description: "Manage the Suggestions System, messages, emojis and Enable/Disable",
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
        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable1"]))
        .setColor(es.color)
        .setDescription(`1️⃣ **== \`✔️ Enable\` / Set** a Channel

2️⃣ **== Define Approve** Text

3️⃣ **== Define Deny** Text

4️⃣ **== Define Maybe** Text

5️⃣  **== Define Status** Text

6️⃣ **== Define Footer** Text

7️⃣ **== Define Approve** Emoji

8️⃣ **== Define Decline** Emoji



*React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
      )
      try {
        tempmsg.react("1️⃣")
        tempmsg.react("2️⃣")
        tempmsg.react("3️⃣")
        tempmsg.react("4️⃣")
        tempmsg.react("5️⃣")
        tempmsg.react("6️⃣")
        tempmsg.react("7️⃣")
        tempmsg.react("8️⃣")
      } catch (e) {
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable2"]))
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
          else if (reaction.emoji.name === "2️⃣") temptype = "approvemsg"
          else if (reaction.emoji.name === "3️⃣") temptype = "denymsg"
          else if (reaction.emoji.name === "4️⃣") temptype = "maybemsg"
          else if (reaction.emoji.name === "5️⃣") temptype = "status"
          else if (reaction.emoji.name === "6️⃣") temptype = "footer"
          else if (reaction.emoji.name === "7️⃣") temptype = "approve"
          else if (reaction.emoji.name === "8️⃣") temptype = "decline"
          else throw "You reacted with a wrong emoji"

        })
        .catch(e => {
          timeouterror = e;
        })
      if (timeouterror)
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable3"]))
          .setColor(es.wrongcolor)
          .setDescription(`Cancelled the Operation!`.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        );

      /**
            suggest: {
              channel: "",
              approvemsg: `<a:yes:833101995723194437> Accepted Idea! Expect this soon.`,
              denymsg: `<:no:833101993668771842> Thank you for the feedback, but we are not interested in this idea at this time.`,
              maybemsg: `💡 We are thinking about this idea!`,
              statustext: `<a:Loading:833101350623117342> Waiting for Community Feedback, please vote!`,
              footertext: `Want to suggest / Feedback something? Simply type in this channel!`,
              approveemoji: `833101995723194437`,
              denyemoji: `833101993668771842`,
            }
       */
      if (temptype == "channel") {

        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable4"]))
          .setColor(es.color)
          .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable5"]))
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
                client.settings.set(message.guild.id, channel.id, `suggest.channel`);
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable6"]))
                  .setColor(es.color)
                  .setDescription(`Start writing in there, to write a Suggestion, to accept/deny them use the: \`${prefix}suggest <approve/deny/maybe> <MESSAGEID> [REASON]\` command`.substr(0, 2048))
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                console.log(e.stack ? String(e.stack).grey : String(e).grey)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable7"]))
                  .setColor(es.wrongcolor)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable8"]))
                  .setFooter(es.footertext, es.footericon)
                );
              }
            } else {
              throw "you didn't ping a valid Role"
            }
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable9"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );

      } else if (temptype == "approvemsg") {
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable10"]))
          .setColor(es.color)
          .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable11"]))
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var message = collected.first();
            if (message) {
              try {
                client.settings.set(message.guild.id, message.content, "suggest.approvemsg");
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable12"]))
                  .setColor(es.color)
                  .setDescription(`${message.content}`.substr(0, 2048))
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                console.log(e.stack ? String(e.stack).grey : String(e).grey)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable13"]))
                  .setColor(es.wrongcolor)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable14"]))
                  .setFooter(es.footertext, es.footericon)
                );
              }
            } else {
              throw "you didn't ping a valid Role"
            }
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable15"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
      } else if (temptype == "denymsg") {
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable16"]))
          .setColor(es.color)
          .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable17"]))
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var message = collected.first();
            if (message) {
              try {
                client.settings.set(message.guild.id, message.content, "suggest.denymsg");
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable18"]))
                  .setColor(es.color)
                  .setDescription(`${message.content}`.substr(0, 2048))
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable19"]))
                  .setColor(es.wrongcolor)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable20"]))
                  .setFooter(es.footertext, es.footericon)
                );
              }
            } else {
              throw "you didn't ping a valid Role"
            }
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable21"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
      } else if (temptype == "maybemsg") {
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable22"]))
          .setColor(es.color)
          .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable23"]))
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var message = collected.first();
            if (message) {
              try {
                client.settings.set(message.guild.id, message.content, "suggest.maybemsg");
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable24"]))
                  .setColor(es.color)
                  .setDescription(`${message.content}`.substr(0, 2048))
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                console.log(e.stack ? String(e.stack).grey : String(e).grey)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable25"]))
                  .setColor(es.wrongcolor)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable26"]))
                  .setFooter(es.footertext, es.footericon)
                );
              }
            } else {
              throw "you didn't ping a valid Role"
            }
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable27"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
      } else if (temptype == "status") {
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable28"]))
          .setColor(es.color)
          .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable29"]))
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var message = collected.first();
            if (message) {
              try {
                client.settings.set(message.guild.id, message.content, "suggest.statustext");
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable30"]))
                  .setColor(es.color)
                  .setDescription(`${message.content}`.substr(0, 2048))
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable31"]))
                  .setColor(es.wrongcolor)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable32"]))
                  .setFooter(es.footertext, es.footericon)
                );
              }
            } else {
              throw "you didn't ping a valid Role"
            }
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable33"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
      } else if (temptype == "footer") {
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable34"]))
          .setColor(es.color)
          .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable35"]))
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var message = collected.first();
            if (message) {
              try {
                client.settings.set(message.guild.id, message.content, "suggest.footertext");
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable36"]))
                  .setColor(es.color)
                  .setDescription(`${message.content}`.substr(0, 2048))
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                console.log(e.stack ? String(e.stack).grey : String(e).grey)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable37"]))
                  .setColor(es.wrongcolor)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable38"]))
                  .setFooter(es.footertext, es.footericon)
                );
              }
            } else {
              throw "you didn't ping a valid Role"
            }
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable39"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
      } else if (temptype == "approve") {
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable40"]))
          .setColor(es.color)
          .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable41"]))
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.awaitReactions((reaction, user) => user.id == message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var reaction = collected.first()
            if (reaction) {
              try {
                if (collected.first().emoji.customId && collected.first().emoji.customId.length > 2) {
                  client.settings.set(message.guild.id, collected.first().emoji.customId, "suggest.approveemoji");
                  return message.reply(new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable42"]))
                    .setColor(es.color)
                    .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable43"]))
                    .setFooter(es.footertext, es.footericon)
                  );
                } else if (collected.first().emoji.name) {
                  client.settings.set(message.guild.id, collected.first().emoji.name, "suggest.approveemoji");
                  return message.reply(new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable44"]))
                    .setColor(es.color)
                    .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable45"]))
                    .setFooter(es.footertext, es.footericon)
                  );
                } else {
                  return message.reply(new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable46"]))
                    .setColor(es.wrongcolor)
                    .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable47"]))
                    .setFooter(es.footertext, es.footericon)
                  );
                }
              } catch (e) {
                console.log(e.stack ? String(e.stack).grey : String(e).grey)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable48"]))
                  .setColor(es.wrongcolor)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable49"]))
                  .setFooter(es.footertext, es.footericon)
                );
              }
            } else {
              throw "you didn't reacted with a valid Emoji"
            }
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable50"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
      } else if (temptype == "decline") {
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable51"]))
          .setColor(es.color)
          .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable52"]))
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.awaitReactions((reaction, user) => user.id == message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var reaction = collected.first()
            if (reaction) {
              try {
                if (collected.first().emoji.customId && collected.first().emoji.customId.length > 2) {
                  client.settings.set(message.guild.id, collected.first().emoji.customId, "suggest.denyemoji");
                  return message.reply(new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable53"]))
                    .setColor(es.color)
                    .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable54"]))
                    .setFooter(es.footertext, es.footericon)
                  );
                } else if (collected.first().emoji.name) {
                  client.settings.set(message.guild.id, collected.first().emoji.name, "suggest.denyemoji");
                  return message.reply(new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable55"]))
                    .setColor(es.color)
                    .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable56"]))
                    .setFooter(es.footertext, es.footericon)
                  );
                } else {
                  return message.reply(new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable57"]))
                    .setColor(es.wrongcolor)
                    .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable58"]))
                    .setFooter(es.footertext, es.footericon)
                  );
                }
              } catch (e) {
                console.log(e.stack ? String(e.stack).grey : String(e).grey)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable59"]))
                  .setColor(es.wrongcolor)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable60"]))
                  .setFooter(es.footertext, es.footericon)
                );
              }
            } else {
              throw "you didn't reacted with a valid Emoji"
            }
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable61"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
      } else {
        console.log("e")
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable62"]))
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
        );
      }

    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-suggestion"]["variable63"]))
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
