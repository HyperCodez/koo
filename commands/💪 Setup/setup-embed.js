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
  name: "setup-embed",
  category: "💪 Setup",
  aliases: ["setupembed", "embed-setup", "embedsetup"],
  cooldown: 5,
  usage: "setup-embed  -->  Follow Steps",
  description: "Change the Look of your Embeds (Color, Image, Thumbnail, ...)",
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
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable1"]))
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable2"])).setFooter(es.footertext, es.footericon)
        )
        try {
          tempmsg.react("1️⃣")
          tempmsg.react("2️⃣")
          tempmsg.react("3️⃣")
          tempmsg.react("4️⃣")
        } catch (e) {
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable3"]))
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
            if (reaction.emoji.name === "1️⃣") temptype = "color"
            else if (reaction.emoji.name === "2️⃣") temptype = "image"
            else if (reaction.emoji.name === "3️⃣") temptype = "footertext"
            else if (reaction.emoji.name === "4️⃣") temptype = "thumb"
            else throw "You reacted with a wrong emoji"
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable4"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
  
  
        if (temptype == "color") {
  
          tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable5"]))
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable6"]))
            .setFooter(es.footertext, es.footericon)
          })
          await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
              max: 1,
              time: 90000,
              errors: ["time"]
            })
            .then(collected => {
              var color = collected.first().content;
              if (!color) return message.reply(new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable7"]))
                .setColor(es.wrongcolor)
                .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable8"]))
                .setFooter(es.footertext, es.footericon)
              );
              if (color.length != 7 && !color.includes("#")) return message.reply(new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable9"]))
                .setColor(es.wrongcolor)
                .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable10"]))
                .setFooter(es.footertext, es.footericon)
              );
              try {
                client.settings.set(message.guild.id, color ,"embed.color")
                es = client.settings.get(message.guild.id, "embed")
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable11"]))
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable12"]))
                  .setColor(es.wrongcolor)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable13"]))
                  .setFooter(es.footertext, es.footericon)
                );
              }
            })
            .catch(e => {
              timeouterror = e;
            })
          if (timeouterror)
            return message.reply(new Discord.MessageEmbed()
              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable14"]))
              .setColor(es.wrongcolor)
              .setDescription(`Cancelled the Operation!`.substr(0, 2000))
              .setFooter(es.footertext, es.footericon)
            );
  
        } else if (temptype == "image") {
          tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable15"]))
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable16"]))
            .setFooter(es.footertext, es.footericon)
          })
          await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
              max: 1,
              time: 90000,
              errors: ["time"]
            })
            .then(collected => {
              var url = collected.first().content;
              function attachIsImage(msgAttach) {
                url = msgAttach.url;
                //True if this url is a png image.
                return url.indexOf("png", url.length - "png".length /*or 3*/ ) !== -1 ||
                  url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/ ) !== -1 ||
                  url.indexOf("jpg", url.length - "jpg".length /*or 3*/ ) !== -1;
                }

              if (collected.first().attachments.size > 0) {
                if (collected.first().attachments.every(attachIsImage)) {
                  try {
                    client.settings.set(message.guild.id, url ,"embed.footericon")
                    es = client.settings.get(message.guild.id, "embed")
                    return message.reply(new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable17"]))
                      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                      .setFooter(es.footertext, es.footericon)
                    );
                  } catch (e) {
                    return message.reply(new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable18"]))
                      .setColor(es.wrongcolor)
                      .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable19"]))
                      .setFooter(es.footertext, es.footericon)
                    );
                  }
                } else {
                  return message.reply(new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable20"]))
                    .setColor(es.wrongcolor)
                    .setFooter(es.footertext, es.footericon)
                  );
                }
                } else if (!url.includes("http") && !(url.toLowerCase().includes("png")||url.toLowerCase().includes("gif")||url.toLowerCase().includes("jpg"))){
                  return message.reply(new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable21"]))
                    .setColor(es.wrongcolor)
                    .setFooter(es.footertext, es.footericon)
                  );
                } else {
                  try {
                    client.settings.set(message.guild.id, url ,"embed.footericon")
                    es = client.settings.get(message.guild.id, "embed")
                    return message.reply(new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable22"]))
                      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                      .setFooter(es.footertext, es.footericon)
                    );
                  } catch (e) {
                    return message.reply(new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable23"]))
                      .setColor(es.wrongcolor)
                      .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable24"]))
                      .setFooter(es.footertext, es.footericon)
                    );
                  }
                }
            })
            .catch(e => {
              timeouterror = e;
            })
          if (timeouterror)
            return message.reply(new Discord.MessageEmbed()
              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable25"]))
              .setColor(es.wrongcolor)
              .setDescription(`Cancelled the Operation!`.substr(0, 2000))
              .setFooter(es.footertext, es.footericon)
            );
        } else if (temptype == "footertext") {
          tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable26"]))
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable27"]))
            .setFooter(es.footertext, es.footericon)
          })
          await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
              max: 1,
              time: 90000,
              errors: ["time"]
            })
            .then(collected => {
              var text = collected.first().content;
              try {
                client.settings.set(message.guild.id, text, "embed.footertext")
                es = client.settings.get(message.guild.id, "embed")
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(`<a:yes:833101995723194437> The new Embed Footer Text is:`.substr(0, 256))
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setDescription(es.footertext)
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable28"]))
                  .setColor(es.wrongcolor)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable29"]))
                  .setFooter(es.footertext, es.footericon)
                );
              }
            })
            .catch(e => {
              timeouterror = e;
            })
          if (timeouterror)
            return message.reply(new Discord.MessageEmbed()
              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable30"]))
              .setColor(es.wrongcolor)
              .setDescription(`Cancelled the Operation!`.substr(0, 2000))
              .setFooter(es.footertext, es.footericon)
            );
          } else if (temptype == "thumb") {
            try {
              client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "embed.thumb") ,"embed.thumb")
              es = client.settings.get(message.guild.id, "embed")
              return message.reply(new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable31"]))
                .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable32"]))
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setFooter(es.footertext, es.footericon)
              );
            } catch (e) {
              return message.reply(new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable33"]))
                .setColor(es.wrongcolor)
                .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable34"]))
                .setFooter(es.footertext, es.footericon)
              );
            }
          } else {
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable35"]))
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
          );
        }
    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-embed"]["variable36"]))
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
