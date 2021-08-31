var {
  MessageEmbed
} = require(`discord.js`);
var Discord = require(`discord.js`);
var config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
var emoji = require(`../../botconfig/emojis.json`);
var {
  databasing,
  isValidURL
} = require(`../../handlers/functions`);
const { MessageButton, MessageActionRow, MessageMenuOption, MessageMenu } = require('discord.js')
module.exports = {
  name: "setup-leave",
  category: "💪 Setup",
  aliases: ["setupleave"],
  cooldown: 5,
  usage: "setup-leave --> and follow the steps",
  description: "Manage the Leave Message System",
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
        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable1"]))
        .setColor(es.color)
        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable2"]))
        .setFooter(es.footertext, es.footericon)
      )
      try {
        tempmsg.react("1️⃣")
        tempmsg.react("2️⃣")
      } catch (e) {
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable3"]))
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
          else if (reaction.emoji.name === "2️⃣") temptype = "dm"
          else throw "You reacted with a wrong emoji"

        })
        .catch(e => {
          timeouterror = e;
        })
      if (timeouterror)
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable4"]))
          .setColor(es.wrongcolor)
          .setDescription(`Cancelled the Operation!`.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        );
      if (temptype == "channel") {


        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////


        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable5"]))
          .setColor(es.color)
          .setDescription(`
        1️⃣ **==** **Enable** / Set Channel *for this Server*

        2️⃣ **==** **Disable** leave *for this Server*

        3️⃣ **==** Manage **Image** *for the leave Message*

        4️⃣ **==** Set **Message** *for the leave Message*
        
        5️⃣ **==** ${client.settings.get(message.guild.id, "leave.invite") ? "**Disable Invite** Information": "**Enable Invite** Information"}

        *React with the Right Emoji according to the Right action*`)
          .setFooter(es.footertext, es.footericon)
        })
        try {
          tempmsg.react("3️⃣")
          tempmsg.react("4️⃣")
          tempmsg.react("5️⃣")
        } catch (e) {
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable6"]))
            .setColor(es.wrongcolor)
            .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable11"]).substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
        }
        await tempmsg.awaitReactions(filter, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(async collected => {
            var reaction = collected.first()
            reaction.users.remove(message.author.id)
            //Enable / Set Channel - CHANNEL
            if (reaction.emoji.name === "1️⃣") {
              tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable7"]))
                .setColor(es.color)
                .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable8"]))
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
                      client.settings.set(message.guild.id, channel.id, "leave.channel")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable9"]))
                        .setColor(es.color)
                        .setDescription(`If Someone joins this Server, a message will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "Not defined yet"}!\nEdit the message with: \`${prefix}setup-leave  --> Pick 1️⃣ --> Pick 4️⃣\``.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable10"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable15"]))
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  } else {
                    throw "you didn't ping a valid channel"
                  }
                })
                .catch(e => {
                  timeouterror = e;
                })
              if (timeouterror)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable12"]))
                  .setColor(es.wrongcolor)
                  .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                  .setFooter(es.footertext, es.footericon)
                );
            }
            //Disable - CHANNEL
            else if (reaction.emoji.name === "2️⃣") {

              try {
                client.settings.set(reaction.message.guild.id, "nochannel", "leave.channel")
                return reaction.message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable13"]))
                  .setColor(es.color)
                  .setDescription(`If Someone joins this Server, no message will be sent into a Channel!\nSet a Channel with: \`${prefix}setup-leave\` --> Pick 1️⃣ --> Pick 1️⃣`.substr(0, 2048))
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable14"]))
                  .setColor(es.wrongcolor)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable20"]))
                  .setFooter(es.footertext, es.footericon)
                );
              }
            }
            //manage image - CHANNEL
            else if (reaction.emoji.name === "3️⃣") {
              tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable16"]))
                .setColor(es.color)
                .setDescription(`
                1️⃣ **==** **Disable** Image

                2️⃣ **==** **Enable Auto** Image

                3️⃣ **==** **Set** Auto-Image **Background**

                4️⃣ **==** **Delete** Auto-Image **Background**

                5️⃣ **==** Enable & **Set CUSTOM Image** (no Userinfo)
        
                6️⃣ **==** ${client.settings.get(message.guild.id, "leave.frame") ? "**Disable**" : "**Enable**"} Auto-Image **Frame**

                7️⃣ **==** ${client.settings.get(message.guild.id, "leave.discriminator") ? "**Disable**" : "**Enable**"} **User Discriminator** (The 4 Numbers with the "#")

                8️⃣ **==** ${client.settings.get(message.guild.id, "leave.membercount") ? "**Disable**" : "**Enable**"} **Member Counter Text**

                9️⃣ **==** ${client.settings.get(message.guild.id, "leave.servername") ? "**Disable**" : "**Enable**"} **Servername Text **
 
                🔟 **==** ${client.settings.get(message.guild.id, "leave.pb") ? "**Disable**" : "**Enable**"} **Profile Picture**
                
                ⬜ **==** **Manage Frame/Text Color**


                *React with the Right Emoji according to the Right action*`)

                .setFooter(es.footertext, es.footericon)
              })
              try {
                tempmsg.react("3️⃣")
                tempmsg.react("6️⃣")
                tempmsg.react("7️⃣")
                tempmsg.react("8️⃣")
                tempmsg.react("9️⃣")
                tempmsg.react("🔟")
                tempmsg.react("⬜")
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable17"]))
                  .setColor(es.wrongcolor)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable23"]).substr(0, 2000))
                  .setFooter(es.footertext, es.footericon)
                );
              }
              await tempmsg.awaitReactions(filter, {
                  max: 1,
                  time: 90000,
                  errors: ["time"]
                })
                .then(async collected => {
                  var reaction = collected.first()
                  reaction.users.remove(message.author.id)
                  var url = "";
                  if (reaction.emoji.name === "1️⃣") {

                    try {
                      client.settings.set(message.guild.id, false, "leave.image")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable18"]))
                        .setColor(es.color)
                        .setDescription(`If Someone joins this Server, a message **with__out__ an image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable19"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable34"]))
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "2️⃣") {

                    try {
                      client.settings.set(message.guild.id, true, "leave.image")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable21"]))
                        .setColor(es.color)
                        .setDescription(`I will be using ${client.settings.get(message.guild.id, "leave.custom") === "no" ? "an Auto generated Image with User Data": "Your defined, custom Image" }\n\nIf Someone joins this Server, a message **with an image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable22"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable44"]))
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "3️⃣") {

                    tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable24"]))
                      .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable25"]))
                      .setColor(es.color)
                      .setFooter(es.footertext, es.footericon)
                    });
                    await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                        max: 1,
                        time: 60000,
                        errors: ["time"]
                      })
                      .then(collected => {

                        //push the answer of the user into the answers lmfao
                        if (collected.first().attachments.size > 0) {
                          if (collected.first().attachments.every(attachIsImage)) {
                            client.settings.set(message.guild.id, "no", "leave.custom")
                            client.settings.set(message.guild.id, url, "leave.background")
                            return reaction.message.reply(new Discord.MessageEmbed()
                              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable26"]))
                              .setColor(es.color)
                              .setDescription(`I will be using ${client.settings.get(message.guild.id, "leave.custom") === "no" ? "an Auto generated Image with User Data": "Your defined, custom Image" }\n\nIf Someone joins this Server, a message **with an image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                              .setFooter(es.footertext, es.footericon)
                            );
                          } else {
                            return reaction.message.reply(new Discord.MessageEmbed()
                              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable27"]))
                              .setColor(es.color)
                              .setFooter(es.footertext, es.footericon)
                            );
                          }
                        } else {
                          if (isValidURL(collected.first().content)) {
                            url = collected.first().content;
                            client.settings.set(message.guild.id, "no", "leave.custom")
                            client.settings.set(message.guild.id, url, "leave.background")
                            return reaction.message.reply(new Discord.MessageEmbed()
                              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable28"]))
                              .setColor(es.color)
                              .setDescription(`I will be using ${client.settings.get(message.guild.id, "leave.custom") === "no" ? "an Auto generated Image with User Data": "Your defined, custom Image" }\n\nIf Someone joins this Server, a message **with an image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                              .setFooter(es.footertext, es.footericon)
                            );
                          } else {
                            return reaction.message.reply(new Discord.MessageEmbed()
                              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable29"]))
                              .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable30"]))
                              .setColor(es.color)
                              .setFooter(es.footertext, es.footericon)
                            );
                          }
                        }
                        //this function is for turning each attachment into a url
                        function attachIsImage(msgAttach) {
                          url = msgAttach.url;
                          //True if this url is a png image.
                          return url.indexOf("png", url.length - "png".length /*or 3*/ ) !== -1 ||
                            url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/ ) !== -1 ||
                            url.indexOf("jpg", url.length - "jpg".length /*or 3*/ ) !== -1;
                        }
                      })
                      .catch(e => {
                        timeouterror = e;
                      })
                    if (timeouterror)
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable31"]))
                        .setColor(es.wrongcolor)
                        .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                        .setFooter(es.footertext, es.footericon)
                      );
                  }

                  if (reaction.emoji.name === "4️⃣") {

                    try {
                      client.settings.set(message.guild.id, true, "leave.image")
                      client.settings.get(message.guild.id, "transparent", "leave.background")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable32"]))
                        .setColor(es.color)
                        .setDescription(`If Someone joins this Server, a message **with an image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable33"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable47"]))
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "5️⃣") {
                    tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable35"]))
                      .setColor(es.color)
                      .setFooter(es.footertext, es.footericon)
                    });
                    await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                        max: 1,
                        time: 60000,
                        errors: ["time"]
                      })
                      .then(collected => {

                        //push the answer of the user into the answers lmfao
                        if (collected.first().attachments.size > 0) {
                          if (collected.first().attachments.every(attachIsImage)) {
                            client.settings.set(message.guild.id, url, "leave.custom")
                            return reaction.message.reply(new Discord.MessageEmbed()
                              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable36"]))
                              .setColor(es.color)
                              .setDescription(`I will be using ${client.settings.get(message.guild.id, "leave.custom") === "no" ? "an Auto generated Image with User Data": "Your defined, custom Image" }\n\nIf Someone joins this Server, a message **with an image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                              .setFooter(es.footertext, es.footericon)
                            );
                          } else {
                            return reaction.message.reply(new Discord.MessageEmbed()
                              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable37"]))
                              .setColor(es.color)
                              .setFooter(es.footertext, es.footericon)
                            );
                          }
                        } else {
                          if (isValidURL(collected.first().content)) {
                            url = collected.first().content;
                            client.settings.set(message.guild.id, url, "leave.custom")
                            return reaction.message.reply(new Discord.MessageEmbed()
                              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable38"]))
                              .setColor(es.color)
                              .setDescription(`I will be using ${client.settings.get(message.guild.id, "leave.custom") === "no" ? "an Auto generated Image with User Data": "Your defined, custom Image" }\n\nIf Someone joins this Server, a message **with an image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                              .setFooter(es.footertext, es.footericon)
                            );
                          } else {
                            return reaction.message.reply(new Discord.MessageEmbed()
                              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable39"]))
                              .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable40"]))
                              .setColor(es.color)
                              .setFooter(es.footertext, es.footericon)
                            );
                          }
                        }
                        //this function is for turning each attachment into a url
                        function attachIsImage(msgAttach) {
                          url = msgAttach.url;
                          //True if this url is a png image.
                          return url.indexOf("png", url.length - "png".length /*or 3*/ ) !== -1 ||
                            url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/ ) !== -1 ||
                            url.indexOf("jpg", url.length - "jpg".length /*or 3*/ ) !== -1;
                        }
                      })
                      .catch(e => {
                        timeouterror = e;
                      })
                    if (timeouterror)
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable41"]))
                        .setColor(es.wrongcolor)
                        .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                        .setFooter(es.footertext, es.footericon)
                      );
                  }

                  if (reaction.emoji.name === "6️⃣") {

                    try {
                      client.settings.set(message.guild.id, "no", "leave.custom")
                      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.frame"), "leave.frame")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable42"]))
                        .setColor(es.color)
                        .setDescription(`If Someone joins this Server, a message **with an automated image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable43"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable50"]))
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "7️⃣") {

                    try {
                      client.settings.set(message.guild.id, "no", "leave.custom")
                      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.discriminator"), "leave.discriminator")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable45"]))
                        .setColor(es.color)
                        .setDescription(`If Someone joins this Server, a message **with an automated image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable46"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable53"]))
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "8️⃣") {

                    try {
                      client.settings.set(message.guild.id, "no", "leave.custom")
                      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.membercount"), "leave.membercount")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable48"]))
                        .setColor(es.color)
                        .setDescription(`If Someone joins this Server, a message **with an automated image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable49"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable56"]))
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "9️⃣") {

                    try {
                      client.settings.set(message.guild.id, "no", "leave.custom")
                      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.servername"), "leave.servername")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable51"]))
                        .setColor(es.color)
                        .setDescription(`If Someone joins this Server, a message **with an automated image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable52"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable61"]))
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "🔟") {

                    try {
                      client.settings.set(message.guild.id, "no", "leave.custom")
                      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.pb"), "leave.pb")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable54"]))
                        .setColor(es.color)
                        .setDescription(`If Someone joins this Server, a message **with an automated image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable55"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable68"]))
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }
                  if (reaction.emoji.name === "⬜") {

                    tempmsg = await reaction.message.reply(new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable57"]))
                      .setColor(es.color)
                      .setDescription(`
                *React to the Color you want the Frame/Text to be like ;)*`)

                      .setFooter(es.footertext, es.footericon)
                    )
                    try {
                      tempmsg.react("⬜")
                      tempmsg.react("🟨")
                      tempmsg.react("🟧")
                      tempmsg.react("🟥")
                      tempmsg.react("🟩")
                      tempmsg.react("🟦")
                      tempmsg.react("🟪")
                      tempmsg.react("⬛")
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable58"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable72"]).substr(0, 2000))
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                    await tempmsg.awaitReactions(filter, {
                        max: 1,
                        time: 90000,
                        errors: ["time"]
                      })
                      .then(async collected => {
                        var reaction = collected.first()
                        reaction.users.remove(message.author.id)
                        var color = "#fffff9";
                        if (reaction.emoji.name === "⬜") color = "#FFFFF9";
                        if (reaction.emoji.name === "🟨") color = "#FAFA25";
                        if (reaction.emoji.name === "🟧") color = "#FA9E25";
                        if (reaction.emoji.name === "🟥") color = "#FA2525";
                        if (reaction.emoji.name === "🟩") color = "#25FA6C";
                        if (reaction.emoji.name === "🟦") color = "#3A98F0";
                        if (reaction.emoji.name === "🟪") color = "#8525FA";
                        if (reaction.emoji.name === "⬛") color = "#030303";
                        try {
                          client.settings.set(message.guild.id, color, "leave.framecolor")
                          return message.reply(new Discord.MessageEmbed()
                            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable59"]))
                            .setColor(color)
                            .setDescription(`If Someone joins this Server, a message **with an automated image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                            .setFooter(es.footertext, es.footericon)
                          );
                        } catch (e) {
                          return message.reply(new Discord.MessageEmbed()
                            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable60"]))
                            .setColor(es.wrongcolor)
                            .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable78"]))
                            .setFooter(es.footertext, es.footericon)
                          );
                        }

                      })
                      .catch(e => {
                        timeouterror = e;
                      })
                    if (timeouterror)
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable62"]))
                        .setColor(es.wrongcolor)
                        .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                        .setFooter(es.footertext, es.footericon)
                      );
                  }
                })
                .catch(e => {
                  timeouterror = e;
                })
              if (timeouterror)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable63"]))
                  .setColor(es.wrongcolor)
                  .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                  .setFooter(es.footertext, es.footericon)
                );
            }
            //manage message - CHANNEL
            else if (reaction.emoji.name === "4️⃣") {
              tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable64"]))
                .setColor(es.color)
                .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable65"]))
                .setFooter(es.footertext, es.footericon)
              })
              await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                  max: 1,
                  time: 90000,
                  errors: ["time"]
                })
                .then(collected => {
                  var message = collected.first();

                  try {
                    client.settings.set(message.guild.id, message.content, "leave.msg")
                    return message.reply(new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable66"]))
                      .setColor(es.color)
                      .setDescription(`If Someone joins this Server, this message will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL YET"}!\n\n${message.content.replace("{user}", message.author)}`.substr(0, 2048))
                      .setFooter(es.footertext, es.footericon)
                    );
                  } catch (e) {
                    return message.reply(new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable67"]))
                      .setColor(es.wrongcolor)
                      .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable81"]))
                      .setFooter(es.footertext, es.footericon)
                    );
                  }
                })
                .catch(e => {
                  timeouterror = e;
                })
              if (timeouterror)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable69"]))
                  .setColor(es.wrongcolor)
                  .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                  .setFooter(es.footertext, es.footericon)
                );
            }
            //Enable/Disable Invite Information - CHANNEL
            else if (reaction.emoji.name === "5️⃣") {

              try {
                cclient.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.invite"), "leave.invite")
                return reaction.message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable70"]))
                  .setColor(es.color)
                  .setDescription(`If Someone joins this Server, a message with Invite Information will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "Not defined yet"}!\nEdit the message with: \`${prefix}setup-leave  --> Pick 1️⃣ --> Pick 4️⃣\``.substr(0, 2048))
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable71"]))
                  .setColor(es.wrongcolor)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable86"]))
                  .setFooter(es.footertext, es.footericon)
                );
              }
            } else throw "You reacted with a wrong emoji"
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable73"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );


        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////


      } else if (temptype == "dm") {


        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////


        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable74"]))
          .setColor(es.color)
          .setDescription(`
        1️⃣ **==** Enable *for this Server (in DM)*

        2️⃣ **==** Disable leave *for this Server (in DM)*

        3️⃣ **==** Manage Image *for the leave Message (in DM)*

        4️⃣ **==** Set Message *for the leave Message (in DM)*
        
        5️⃣ **==** ${client.settings.get(message.guild.id, "leave.invite") ? "**Disable Invite** Information": "**Enable Invite** Information"}

        *React with the Right Emoji according to the Right action*`)
          .setFooter(es.footertext, es.footericon)
        })
        try {
          tempmsg.react("3️⃣")
          tempmsg.react("4️⃣")
          tempmsg.react("5️⃣")
        } catch (e) {
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable75"]))
            .setColor(es.wrongcolor)
            .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable89"]).substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
        }
        await tempmsg.awaitReactions(filter, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(async collected => {
            var reaction = collected.first()
            reaction.users.remove(message.author.id)
            //Enable / Set Channel - CHANNEL
            if (reaction.emoji.name === "1️⃣") {
              try {
                client.settings.set(message.guild.id, true, "leave.dm")
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable76"]))
                  .setColor(es.color)
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable77"]))
                  .setColor(es.wrongcolor)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable100"]))
                  .setFooter(es.footertext, es.footericon)
                );
              }
            }
            //Disable - CHANNEL
            else if (reaction.emoji.name === "2️⃣") {
              try {
                client.settings.set(message.guild.id, false, "leave.dm")
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable79"]))
                  .setColor(es.color)
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable80"]))
                  .setColor(es.wrongcolor)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable110"]))
                  .setFooter(es.footertext, es.footericon)
                );
              }
            }
            //manage image - CHANNEL
            else if (reaction.emoji.name === "3️⃣") {
              tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable82"]))
                .setColor(es.color)
                .setDescription(`
                1️⃣ **==** **Disable** Image

                2️⃣ **==** **Enable Auto** Image

                3️⃣ **==** **Set** Auto-Image **Background**

                4️⃣ **==** **Delete** Auto-Image **Background**

                5️⃣ **==** Enable & **Set CUSTOM Image** (no Userinfo)
        
                6️⃣ **==** ${client.settings.get(message.guild.id, "leave.framedm") ? "**Disable**" : "**Enable**"} Auto-Image **Frame**

                7️⃣ **==** ${client.settings.get(message.guild.id, "leave.discriminatordm") ? "**Disable**" : "**Enable**"} **User Discriminator** (The 4 Numbers with the "#")

                8️⃣ **==** ${client.settings.get(message.guild.id, "leave.membercountdm") ? "**Disable**" : "**Enable**"} **Member Counter Text**

                9️⃣ **==** ${client.settings.get(message.guild.id, "leave.servernamedm") ? "**Disable**" : "**Enable**"} **Servername Text **
                
                🔟 **==** ${client.settings.get(message.guild.id, "leave.pbdm") ? "**Disable**" : "**Enable**"} **Profile Picture**
                
                ⬜ **==** **Manage Frame/Text Color**

                *React with the Right Emoji according to the Right action*`)

                .setFooter(es.footertext, es.footericon)
              })
              try {
                tempmsg.react("6️⃣")
                tempmsg.react("7️⃣")
                tempmsg.react("8️⃣")
                tempmsg.react("9️⃣")
                tempmsg.react("🔟")
                tempmsg.react("⬜")
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable83"]))
                  .setColor(es.wrongcolor)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable113"]).substr(0, 2000))
                  .setFooter(es.footertext, es.footericon)
                );
              }
              await tempmsg.awaitReactions(filter, {
                  max: 1,
                  time: 90000,
                  errors: ["time"]
                })
                .then(async collected => {
                  var reaction = collected.first()
                  reaction.users.remove(message.author.id)
                  var url = "";
                  if (reaction.emoji.name === "1️⃣") {

                    try {
                      client.settings.set(message.guild.id, false, "leave.imagedm")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable84"]))
                        .setColor(es.color)
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable85"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable116"]))
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "2️⃣") {

                    try {
                      client.settings.set(message.guild.id, true, "leave.imagedm")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable87"]))
                        .setColor(es.color)
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable88"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable119"]))
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "3️⃣") {

                    tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable90"]))
                      .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable91"]))
                      .setColor(es.color)
                      .setFooter(es.footertext, es.footericon)
                    });
                    await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                        max: 1,
                        time: 60000,
                        errors: ["time"]
                      })
                      .then(collected => {

                        //push the answer of the user into the answers lmfao
                        if (collected.first().attachments.size > 0) {
                          if (collected.first().attachments.every(attachIsImage)) {
                            client.settings.set(message.guild.id, "no", "leave.customdm")
                            client.settings.set(message.guild.id, url, "leave.backgrounddm")
                            return reaction.message.reply(new Discord.MessageEmbed()
                              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable92"]))
                              .setColor(es.color)
                              .setDescription(`I will be using ${client.settings.get(message.guild.id, "leave.customdm") === "no" ? "an Auto generated Image with User Data": "Your defined, custom Image" }`.substr(0, 2048))
                              .setFooter(es.footertext, es.footericon)
                            );
                          } else {
                            return reaction.message.reply(new Discord.MessageEmbed()
                              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable93"]))
                              .setColor(es.color)
                              .setFooter(es.footertext, es.footericon)
                            );
                          }
                        } else {
                          if (isValidURL(collected.first().content)) {
                            url = collected.first().content;
                            client.settings.set(message.guild.id, "no", "leave.customdm")
                            client.settings.set(message.guild.id, url, "leave.backgrounddm")
                            return reaction.message.reply(new Discord.MessageEmbed()
                              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable94"]))
                              .setColor(es.color)
                              .setDescription(`I will be using ${client.settings.get(message.guild.id, "leave.customdm") === "no" ? "an Auto generated Image with User Data": "Your defined, custom Image" }`.substr(0, 2048))
                              .setFooter(es.footertext, es.footericon)
                            );
                          } else {
                            return reaction.message.reply(new Discord.MessageEmbed()
                              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable95"]))
                              .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable96"]))
                              .setColor(es.color)
                              .setFooter(es.footertext, es.footericon)
                            );
                          }
                        }
                        //this function is for turning each attachment into a url
                        function attachIsImage(msgAttach) {
                          url = msgAttach.url;
                          //True if this url is a png image.
                          return url.indexOf("png", url.length - "png".length /*or 3*/ ) !== -1 ||
                            url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/ ) !== -1 ||
                            url.indexOf("jpg", url.length - "jpg".length /*or 3*/ ) !== -1;
                        }
                      })
                      .catch(e => {
                        timeouterror = e;
                      })
                    if (timeouterror)
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable97"]))
                        .setColor(es.wrongcolor)
                        .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                        .setFooter(es.footertext, es.footericon)
                      );
                  }

                  if (reaction.emoji.name === "4️⃣") {

                    try {
                      client.settings.set(message.guild.id, true, "leave.imagedm")
                      client.settings.get(message.guild.id, "transparent", "leave.backgrounddm")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable98"]))
                        .setColor(es.color)
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable99"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable122"]))
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "5️⃣") {
                    tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable101"]))
                      .setColor(es.color)
                      .setFooter(es.footertext, es.footericon)
                    });
                    await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                        max: 1,
                        time: 60000,
                        errors: ["time"]
                      })
                      .then(collected => {

                        //push the answer of the user into the answers lmfao
                        if (collected.first().attachments.size > 0) {
                          if (collected.first().attachments.every(attachIsImage)) {
                            client.settings.set(message.guild.id, url, "leave.customdm")
                            return reaction.message.reply(new Discord.MessageEmbed()
                              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable102"]))
                              .setColor(es.color)
                              .setDescription(`I will be using ${client.settings.get(message.guild.id, "leave.customdm") === "no" ? "an Auto generated Image with User Data": "Your defined, custom Image" }`.substr(0, 2048))
                              .setFooter(es.footertext, es.footericon)
                            );
                          } else {
                            return reaction.message.reply(new Discord.MessageEmbed()
                              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable103"]))
                              .setColor(es.color)
                              .setFooter(es.footertext, es.footericon)
                            );
                          }
                        } else {
                          if (isValidURL(collected.first().content)) {
                            url = collected.first().content;
                            client.settings.set(message.guild.id, url, "leave.customdm")
                            return reaction.message.reply(new Discord.MessageEmbed()
                              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable104"]))
                              .setColor(es.color)
                              .setDescription(`I will be using ${client.settings.get(message.guild.id, "leave.customdm") === "no" ? "an Auto generated Image with User Data": "Your defined, custom Image" }`.substr(0, 2048))
                              .setFooter(es.footertext, es.footericon)
                            );
                          } else {
                            return reaction.message.reply(new Discord.MessageEmbed()
                              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable105"]))
                              .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable106"]))
                              .setColor(es.color)
                              .setFooter(es.footertext, es.footericon)
                            );
                          }
                        }
                        //this function is for turning each attachment into a url
                        function attachIsImage(msgAttach) {
                          url = msgAttach.url;
                          //True if this url is a png image.
                          return url.indexOf("png", url.length - "png".length /*or 3*/ ) !== -1 ||
                            url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/ ) !== -1 ||
                            url.indexOf("jpg", url.length - "jpg".length /*or 3*/ ) !== -1;
                        }
                      })
                      .catch(e => {
                        timeouterror = e;
                      })
                    if (timeouterror)
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable107"]))
                        .setColor(es.wrongcolor)
                        .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                        .setFooter(es.footertext, es.footericon)
                      );
                  }

                  if (reaction.emoji.name === "6️⃣") {

                    try {
                      client.settings.set(message.guild.id, "no", "leave.customdm")
                      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.framedm"), "leave.framedm")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable108"]))
                        .setColor(es.color)
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable109"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable127"]))
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "7️⃣") {

                    try {
                      client.settings.set(message.guild.id, "no", "leave.customdm")
                      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.discriminatordm"), "leave.discriminatordm")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable111"]))
                        .setColor(es.color)
                        .setDescription(`If Someone joins this Server, a message **with an automated image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable112"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable134"]))
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "8️⃣") {

                    try {
                      client.settings.set(message.guild.id, "no", "leave.customdm")
                      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.membercountdm"), "leave.membercountdm")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable114"]))
                        .setColor(es.color)
                        .setDescription(`If Someone joins this Server, a message **with an automated image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable115"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable138"]))
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "9️⃣") {

                    try {
                      client.settings.set(message.guild.id, "no", "leave.customdm")
                      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.servernamedm"), "leave.servernamedm")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable117"]))
                        .setColor(es.color)
                        .setDescription(`If Someone joins this Server, a message **with an automated image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable118"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable155"]))
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "🔟") {

                    try {
                      client.settings.set(message.guild.id, "no", "leave.custom")
                      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.pbdm"), "leave.pbdm")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable120"]))
                        .setColor(es.color)
                        .setDescription(`If Someone joins this Server, a message **with an automated image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable121"]))
                        .setColor(es.wrongcolor)
                        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "⬜") {

                    tempmsg = await reaction.message.reply(new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable123"]))
                      .setColor(es.color)
                      .setDescription(`
                *React to the Color you want the Frame/Text to be like ;)*`)

                      .setFooter(es.footertext, es.footericon)
                    )
                    try {
                      tempmsg.react("⬜")
                      tempmsg.react("🟨")
                      tempmsg.react("🟧")
                      tempmsg.react("🟥")
                      tempmsg.react("🟩")
                      tempmsg.react("🟦")
                      tempmsg.react("🟪")
                      tempmsg.react("⬛")
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable124"]))
                        .setColor(es.wrongcolor)
                        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``.substr(0, 2000))
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                    await tempmsg.awaitReactions(filter, {
                        max: 1,
                        time: 90000,
                        errors: ["time"]
                      })
                      .then(async collected => {
                        var reaction = collected.first()
                        reaction.users.remove(message.author.id)
                        var color = "#fffff9";
                        if (reaction.emoji.name === "⬜") color = "#FFFFF9";
                        if (reaction.emoji.name === "🟨") color = "#FAFA25";
                        if (reaction.emoji.name === "🟧") color = "#FA9E25";
                        if (reaction.emoji.name === "🟥") color = "#FA2525";
                        if (reaction.emoji.name === "🟩") color = "#25FA6C";
                        if (reaction.emoji.name === "🟦") color = "#3A98F0";
                        if (reaction.emoji.name === "🟪") color = "#8525FA";
                        if (reaction.emoji.name === "⬛") color = "#030303";
                        try {
                          client.settings.set(message.guild.id, color, "leave.framecolordm")
                          return message.reply(new Discord.MessageEmbed()
                            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable125"]))
                            .setColor(color)
                            .setDescription(`If Someone joins this Server, a message **with an automated image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "leave.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                            .setFooter(es.footertext, es.footericon)
                          );
                        } catch (e) {
                          return message.reply(new Discord.MessageEmbed()
                            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable126"]))
                            .setColor(es.wrongcolor)
                            .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                            .setFooter(es.footertext, es.footericon)
                          );
                        }

                      })
                      .catch(e => {
                        timeouterror = e;
                      })
                    if (timeouterror)
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable128"]))
                        .setColor(es.wrongcolor)
                        .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                        .setFooter(es.footertext, es.footericon)
                      );
                  }
                })
                .catch(e => {
                  timeouterror = e;
                })
              if (timeouterror)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable129"]))
                  .setColor(es.wrongcolor)
                  .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                  .setFooter(es.footertext, es.footericon)
                );
            }
            //manage message - CHANNEL
            else if (reaction.emoji.name === "4️⃣") {
              tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable130"]))
                .setColor(es.color)
                .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable131"]))
                .setFooter(es.footertext, es.footericon)
              })
              await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                  max: 1,
                  time: 90000,
                  errors: ["time"]
                })
                .then(collected => {
                  var message = collected.first();

                  try {
                    client.settings.set(message.guild.id, message.content, "leave.dm_msg")
                    return message.reply(new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable132"]))
                      .setColor(es.color)
                      .setDescription(`${message.content.replace("{user}", message.author)}`.substr(0, 2048))
                      .setFooter(es.footertext, es.footericon)
                    );
                  } catch (e) {
                    return message.reply(new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable133"]))
                      .setColor(es.wrongcolor)
                      .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                      .setFooter(es.footertext, es.footericon)
                    );
                  }
                })
                .catch(e => {
                  timeouterror = e;
                })
              if (timeouterror)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable135"]))
                  .setColor(es.wrongcolor)
                  .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                  .setFooter(es.footertext, es.footericon)
                );
            }
            //Enable/Disable Invite Information - CHANNEL
            else if (reaction.emoji.name === "5️⃣") {

              try {
                cclient.settings.set(message.guild.id, !client.settings.get(message.guild.id, "leave.invitedm"), "leave.invite")
                return reaction.message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable136"]))
                  .setColor(es.color)
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable137"]))
                  .setColor(es.wrongcolor)
                  .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                  .setFooter(es.footertext, es.footericon)
                );
              }
            } else throw "You reacted with a wrong emoji"
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable139"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );


        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////


      } else if (temptype == "roles") {


        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////


        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable140"]))
          .setColor(es.color)
          .setDescription(`
        1️⃣ **==** **Add** Role

        2️⃣ **==** **Remove** Role

        3️⃣ **==** **Show** Roles


        *React with the Right Emoji according to the Right action*`)
          .setFooter(es.footertext, es.footericon)
        })
        try {
          tempmsg.react("1️⃣")
          tempmsg.react("2️⃣")
          tempmsg.react("3️⃣")
        } catch (e) {
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable141"]))
            .setColor(es.wrongcolor)
            .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
        }
        await tempmsg.awaitReactions(filter, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(async collected => {
            var reaction = collected.first()
            reaction.users.remove(message.author.id)
            //Add Role
            if (reaction.emoji.name === "1️⃣") {
              tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable142"]))
                .setColor(es.color)
                .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable143"]))
                .setFooter(es.footertext, es.footericon)
              })
              await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                  max: 1,
                  time: 90000,
                  errors: ["time"]
                })
                .then(collected => {
                  var message = collected.first();
                  var role = message.mentions.roles.filter(role=>role.guild.id==message.guild.id).first();
                  if (role) {
                    var leaveroles = client.settings.get(message.guild.id, "leave.roles")
                    if (leaveroles.includes(role.id)) return message.reply(new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable144"]))
                      .setColor(es.wrongcolor)
                      .setFooter(es.footertext, es.footericon)
                    );
                    client.settings.push(message.guild.id, role.id, "leave.roles");
                    return message.reply(new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable145"]))
                      .setColor(es.color)
                      .setDescription(`Everyone who joins will get those Roles now:\n<@&${client.settings.get(message.guild.id, "leave.roles").join(">\n<@&")}>`.substr(0, 2048))
                      .setFooter(es.footertext, es.footericon)
                    );
                  } else {
                    throw "you didn't ping a valid Role"
                  }
                })
                .catch(e => {
                  timeouterror = e;
                })
              if (timeouterror)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable146"]))
                  .setColor(es.wrongcolor)
                  .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                  .setFooter(es.footertext, es.footericon)
                );
            }
            //Remove Role
            else if (reaction.emoji.name === "2️⃣") {
              tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable147"]))
                .setColor(es.color)
                .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable148"]))
                .setFooter(es.footertext, es.footericon)
              })
              await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                  max: 1,
                  time: 90000,
                  errors: ["time"]
                })
                .then(collected => {
                  var message = collected.first();
                  var role = message.mentions.roles.filter(role=>role.guild.id==message.guild.id).first();
                  if (role) {
                    var leaveroles = client.settings.get(message.guild.id, "leave.roles")
                    if (!leaveroles.includes(role.id)) return message.reply(new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable149"]))
                      .setColor(es.wrongcolor)
                      .setFooter(es.footertext, es.footericon)
                    );
                    client.settings.remove(message.guild.id, role.id, "leave.roles");
                    return message.reply(new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable150"]))
                      .setColor(es.color)
                      .setDescription(`Everyone who joins will get those Roles now:\n<@&${client.settings.get(message.guild.id, "leave.roles").join(">\n<@&")}>`.substr(0, 2048))
                      .setFooter(es.footertext, es.footericon)
                    );
                  } else {
                    throw "you didn't ping a valid Role"
                  }
                })
                .catch(e => {
                  timeouterror = e;
                })
              if (timeouterror)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable151"]))
                  .setColor(es.wrongcolor)
                  .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                  .setFooter(es.footertext, es.footericon)
                );
            }
            //Show Roles
            else if (reaction.emoji.name === "3️⃣") {
              return message.reply(new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable152"]))
                .setColor(es.color)
                .setDescription(`<@&${client.settings.get(message.guild.id, "leave.roles").join(">\n<@&")}>`.substr(0, 2048))
                .setFooter(es.footertext, es.footericon)
              );
            } else throw "You reacted with a wrong emoji"
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable153"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );


        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////


      } else {
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-leave"]["variable154"]))
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
        );
      }
    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
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
