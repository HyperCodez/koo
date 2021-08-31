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
  name: "setup-welcome",
  category: "💪 Setup",
  aliases: ["setupwelcome"],
  cooldown: 5,
  usage: "setup-welcome --> Follow Steps",
  description: "Manage the Welcome System (Message, Invite Tracker, Image-Design, Captcha System, Roles, etc.)",
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
        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable1"]))
        .setColor(es.color)
        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable2"]))
        .setFooter(es.footertext, es.footericon)
      )
      try {
        tempmsg.react("1️⃣")
        tempmsg.react("2️⃣")
        tempmsg.react("3️⃣")
        tempmsg.react("4️⃣")
      } catch (e) {
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable3"]))
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
          else if (reaction.emoji.name === "3️⃣") temptype = "roles"
          else if (reaction.emoji.name === "4️⃣") temptype = "captcha"
          else throw "You reacted with a wrong emoji"

        })
        .catch(e => {
          timeouterror = e;
        })
      if (timeouterror)
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable4"]))
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
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable5"]))
          .setColor(es.color)
          .setDescription(`
        1️⃣ **==** **Enable** / Set Channel *for this Server*

        2️⃣ **==** **Disable** Welcome *for this Server*

        3️⃣ **==** Manage **Image** *for the Welcome Message*

        4️⃣ **==** Set **Message** *for the Welcome Message*
        
        5️⃣ **==** ${client.settings.get(message.guild.id, "welcome.invite") ? "**Disable Invite** Information": "**Enable Invite** Information"}

        *React with the Right Emoji according to the Right action*`)
          .setFooter(es.footertext, es.footericon)
        })
        try {
          tempmsg.react("4️⃣")
          tempmsg.react("5️⃣")
        } catch (e) {
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable6"]))
            .setColor(es.wrongcolor)
            .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable11"]).substr(0, 2000))
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
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable7"]))
                .setColor(es.color)
                .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable8"]))
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
                      client.settings.set(message.guild.id, channel.id, "welcome.channel")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable9"]))
                        .setColor(es.color)
                        .setDescription(`If Someone joins this Server, a message will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) : "Not defined yet"}!\nEdit the message with: \`${prefix}setup-welcome  --> Pick 1️⃣ --> Pick 4️⃣\``.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable10"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable15"]))
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
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable12"]))
                  .setColor(es.wrongcolor)
                  .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                  .setFooter(es.footertext, es.footericon)
                );
            }
            //Disable - CHANNEL
            else if (reaction.emoji.name === "2️⃣") {

              try {
                client.settings.set(reaction.message.guild.id, "nochannel", "welcome.channel")
                return reaction.message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable13"]))
                  .setColor(es.color)
                  .setDescription(`If Someone joins this Server, no message will be sent into a Channel!\nSet a Channel with: \`${prefix}setup-welcome\` --> Pick 1️⃣ --> Pick 1️⃣`.substr(0, 2048))
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable14"]))
                  .setColor(es.wrongcolor)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable20"]))
                  .setFooter(es.footertext, es.footericon)
                );
              }
            }
            //manage image - CHANNEL
            else if (reaction.emoji.name === "3️⃣") {
              tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable16"]))
                .setColor(es.color)
                .setDescription(`
                1️⃣ **==** **Disable** Image

                2️⃣ **==** **Enable Auto** Image

                3️⃣ **==** **Set** Auto-Image **Background**

                4️⃣ **==** **Delete** Auto-Image **Background**

                5️⃣ **==** Enable & **Set CUSTOM Image** (no Userinfo)
        
                6️⃣ **==** ${client.settings.get(message.guild.id, "welcome.frame") ? "**Disable**" : "**Enable**"} Auto-Image **Frame**

                7️⃣ **==** ${client.settings.get(message.guild.id, "welcome.discriminator") ? "**Disable**" : "**Enable**"} **User Discriminator** (The 4 Numbers with the "#")

                8️⃣ **==** ${client.settings.get(message.guild.id, "welcome.membercount") ? "**Disable**" : "**Enable**"} **Member Counter Text**

                9️⃣ **==** ${client.settings.get(message.guild.id, "welcome.servername") ? "**Disable**" : "**Enable**"} **Servername Text **
 
                🔟 **==** ${client.settings.get(message.guild.id, "welcome.pb") ? "**Disable**" : "**Enable**"} **Profile Picture**
                
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
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable17"]))
                  .setColor(es.wrongcolor)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable23"]).substr(0, 2000))
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
                      client.settings.set(message.guild.id, false, "welcome.image")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable18"]))
                        .setColor(es.color)
                        .setDescription(`If Someone joins this Server, a message **with__out__ an image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable19"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable34"]))
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "2️⃣") {

                    try {
                      client.settings.set(message.guild.id, true, "welcome.image")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable21"]))
                        .setColor(es.color)
                        .setDescription(`I will be using ${client.settings.get(message.guild.id, "welcome.custom") === "no" ? "an Auto generated Image with User Data": "Your defined, custom Image" }\n\nIf Someone joins this Server, a message **with an image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable22"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable44"]))
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "3️⃣") {

                    tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable24"]))
                      .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable25"]))
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
                            client.settings.set(message.guild.id, "no", "welcome.custom")
                            client.settings.set(message.guild.id, url, "welcome.background")
                            return reaction.message.reply(new Discord.MessageEmbed()
                              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable26"]))
                              .setColor(es.color)
                              .setDescription(`I will be using ${client.settings.get(message.guild.id, "welcome.custom") === "no" ? "an Auto generated Image with User Data": "Your defined, custom Image" }\n\nIf Someone joins this Server, a message **with an image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                              .setFooter(es.footertext, es.footericon)
                            );
                          } else {
                            return reaction.message.reply(new Discord.MessageEmbed()
                              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable27"]))
                              .setColor(es.color)
                              .setFooter(es.footertext, es.footericon)
                            );
                          }
                        } else {
                          if (isValidURL(collected.first().content)) {
                            url = collected.first().content;
                            client.settings.set(message.guild.id, "no", "welcome.custom")
                            client.settings.set(message.guild.id, url, "welcome.background")
                            return reaction.message.reply(new Discord.MessageEmbed()
                              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable28"]))
                              .setColor(es.color)
                              .setDescription(`I will be using ${client.settings.get(message.guild.id, "welcome.custom") === "no" ? "an Auto generated Image with User Data": "Your defined, custom Image" }\n\nIf Someone joins this Server, a message **with an image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                              .setFooter(es.footertext, es.footericon)
                            );
                          } else {
                            return reaction.message.reply(new Discord.MessageEmbed()
                              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable29"]))
                              .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable30"]))
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
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable31"]))
                        .setColor(es.wrongcolor)
                        .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                        .setFooter(es.footertext, es.footericon)
                      );
                  }

                  if (reaction.emoji.name === "4️⃣") {

                    try {
                      client.settings.set(message.guild.id, true, "welcome.image")
                      client.settings.set(message.guild.id, "transparent", "welcome.background")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable32"]))
                        .setColor(es.color)
                        .setDescription(`If Someone joins this Server, a message **with an image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable33"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable47"]))
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "5️⃣") {
                    tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable35"]))
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
                            client.settings.set(message.guild.id, url, "welcome.custom")
                            return reaction.message.reply(new Discord.MessageEmbed()
                              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable36"]))
                              .setColor(es.color)
                              .setDescription(`I will be using ${client.settings.get(message.guild.id, "welcome.custom") === "no" ? "an Auto generated Image with User Data": "Your defined, custom Image" }\n\nIf Someone joins this Server, a message **with an image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                              .setFooter(es.footertext, es.footericon)
                            );
                          } else {
                            return reaction.message.reply(new Discord.MessageEmbed()
                              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable37"]))
                              .setColor(es.color)
                              .setFooter(es.footertext, es.footericon)
                            );
                          }
                        } else {
                          if (isValidURL(collected.first().content)) {
                            url = collected.first().content;
                            client.settings.set(message.guild.id, url, "welcome.custom")
                            return reaction.message.reply(new Discord.MessageEmbed()
                              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable38"]))
                              .setColor(es.color)
                              .setDescription(`I will be using ${client.settings.get(message.guild.id, "welcome.custom") === "no" ? "an Auto generated Image with User Data": "Your defined, custom Image" }\n\nIf Someone joins this Server, a message **with an image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                              .setFooter(es.footertext, es.footericon)
                            );
                          } else {
                            return reaction.message.reply(new Discord.MessageEmbed()
                              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable39"]))
                              .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable40"]))
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
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable41"]))
                        .setColor(es.wrongcolor)
                        .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                        .setFooter(es.footertext, es.footericon)
                      );
                  }

                  if (reaction.emoji.name === "6️⃣") {

                    try {
                      client.settings.set(message.guild.id, "no", "welcome.custom")
                      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "welcome.frame"), "welcome.frame")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable42"]))
                        .setColor(es.color)
                        .setDescription(`If Someone joins this Server, a message **with an automated image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable43"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable50"]))
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "7️⃣") {

                    try {
                      client.settings.set(message.guild.id, "no", "welcome.custom")
                      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "welcome.discriminator"), "welcome.discriminator")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable45"]))
                        .setColor(es.color)
                        .setDescription(`If Someone joins this Server, a message **with an automated image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable46"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable53"]))
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "8️⃣") {

                    try {
                      client.settings.set(message.guild.id, "no", "welcome.custom")
                      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "welcome.membercount"), "welcome.membercount")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable48"]))
                        .setColor(es.color)
                        .setDescription(`If Someone joins this Server, a message **with an automated image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable49"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable56"]))
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "9️⃣") {

                    try {
                      client.settings.set(message.guild.id, "no", "welcome.custom")
                      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "welcome.servername"), "welcome.servername")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable51"]))
                        .setColor(es.color)
                        .setDescription(`If Someone joins this Server, a message **with an automated image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable52"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable61"]))
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "🔟") {

                    try {
                      client.settings.set(message.guild.id, "no", "welcome.custom")
                      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "welcome.pb"), "welcome.pb")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable54"]))
                        .setColor(es.color)
                        .setDescription(`If Someone joins this Server, a message **with an automated image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable55"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable68"]))
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }
                  if (reaction.emoji.name === "⬜") {

                    tempmsg = await reaction.message.reply(new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable57"]))
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
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable58"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable72"]).substr(0, 2000))
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
                          client.settings.set(message.guild.id, color, "welcome.framecolor")
                          return message.reply(new Discord.MessageEmbed()
                            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable59"]))
                            .setColor(color)
                            .setDescription(`If Someone joins this Server, a message **with an automated image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                            .setFooter(es.footertext, es.footericon)
                          );
                        } catch (e) {
                          return message.reply(new Discord.MessageEmbed()
                            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable60"]))
                            .setColor(es.wrongcolor)
                            .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable78"]))
                            .setFooter(es.footertext, es.footericon)
                          );
                        }

                      })
                      .catch(e => {
                        timeouterror = e;
                      })
                    if (timeouterror)
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable62"]))
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
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable63"]))
                  .setColor(es.wrongcolor)
                  .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                  .setFooter(es.footertext, es.footericon)
                );
            }
            //manage message - CHANNEL
            else if (reaction.emoji.name === "4️⃣") {
              tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable64"]))
                .setColor(es.color)
                .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable65"]))
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
                    client.settings.set(message.guild.id, message.content, "welcome.msg")
                    return message.reply(new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable66"]))
                      .setColor(es.color)
                      .setDescription(`If Someone joins this Server, this message will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) : "NO CHANNEL YET"}!\n\n${message.content.replace("{user}", message.author)}`.substr(0, 2048))
                      .setFooter(es.footertext, es.footericon)
                    );
                  } catch (e) {
                    return message.reply(new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable67"]))
                      .setColor(es.wrongcolor)
                      .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable81"]))
                      .setFooter(es.footertext, es.footericon)
                    );
                  }
                })
                .catch(e => {
                  timeouterror = e;
                })
              if (timeouterror)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable69"]))
                  .setColor(es.wrongcolor)
                  .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                  .setFooter(es.footertext, es.footericon)
                );
            }
            //Enable/Disable Invite Information - CHANNEL
            else if (reaction.emoji.name === "5️⃣") {

              try {
                client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "welcome.invite"), "welcome.invite")
                return reaction.message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable70"]))
                  .setColor(es.color)
                  .setDescription(`If Someone joins this Server, a message with Invite Information will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) : "Not defined yet"}!\nEdit the message with: \`${prefix}setup-welcome  --> Pick 1️⃣ --> Pick 4️⃣\``.substr(0, 2048))
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable71"]))
                  .setColor(es.wrongcolor)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable86"]))
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
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable73"]))
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
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable74"]))
          .setColor(es.color)
          .setDescription(`
        1️⃣ **==** Enable *for this Server (in DM)*

        2️⃣ **==** Disable Welcome *for this Server (in DM)*

        3️⃣ **==** Manage Image *for the Welcome Message (in DM)*

        4️⃣ **==** Set Message *for the Welcome Message (in DM)*
        
        5️⃣ **==** ${client.settings.get(message.guild.id, "welcome.invite") ? "**Disable Invite** Information": "**Enable Invite** Information"}

        *React with the Right Emoji according to the Right action*`)
          .setFooter(es.footertext, es.footericon)
        })
        try {
          tempmsg.react("4️⃣")
          tempmsg.react("5️⃣")
        } catch (e) {
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable75"]))
            .setColor(es.wrongcolor)
            .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable89"]).substr(0, 2000))
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
                client.settings.set(message.guild.id, true, "welcome.dm")
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable76"]))
                  .setColor(es.color)
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable77"]))
                  .setColor(es.wrongcolor)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable100"]))
                  .setFooter(es.footertext, es.footericon)
                );
              }
            }
            //Disable - CHANNEL
            else if (reaction.emoji.name === "2️⃣") {
              try {
                client.settings.set(message.guild.id, false, "welcome.dm")
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable79"]))
                  .setColor(es.color)
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable80"]))
                  .setColor(es.wrongcolor)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable110"]))
                  .setFooter(es.footertext, es.footericon)
                );
              }
            }
            //manage image - CHANNEL
            else if (reaction.emoji.name === "3️⃣") {
              tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable82"]))
                .setColor(es.color)
                .setDescription(`
                1️⃣ **==** **Disable** Image

                2️⃣ **==** **Enable Auto** Image

                3️⃣ **==** **Set** Auto-Image **Background**

                4️⃣ **==** **Delete** Auto-Image **Background**

                5️⃣ **==** Enable & **Set CUSTOM Image** (no Userinfo)
        
                6️⃣ **==** ${client.settings.get(message.guild.id, "welcome.framedm") ? "**Disable**" : "**Enable**"} Auto-Image **Frame**

                7️⃣ **==** ${client.settings.get(message.guild.id, "welcome.discriminatordm") ? "**Disable**" : "**Enable**"} **User Discriminator** (The 4 Numbers with the "#")

                8️⃣ **==** ${client.settings.get(message.guild.id, "welcome.membercountdm") ? "**Disable**" : "**Enable**"} **Member Counter Text**

                9️⃣ **==** ${client.settings.get(message.guild.id, "welcome.servernamedm") ? "**Disable**" : "**Enable**"} **Servername Text **
                
                🔟 **==** ${client.settings.get(message.guild.id, "welcome.pbdm") ? "**Disable**" : "**Enable**"} **Profile Picture**
                
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
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable83"]))
                  .setColor(es.wrongcolor)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable113"]).substr(0, 2000))
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
                      client.settings.set(message.guild.id, false, "welcome.imagedm")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable84"]))
                        .setColor(es.color)
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable85"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable116"]))
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "2️⃣") {

                    try {
                      client.settings.set(message.guild.id, true, "welcome.imagedm")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable87"]))
                        .setColor(es.color)
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable88"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable119"]))
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "3️⃣") {

                    tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable90"]))
                      .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable91"]))
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
                            client.settings.set(message.guild.id, "no", "welcome.customdm")
                            client.settings.set(message.guild.id, url, "welcome.backgrounddm")
                            return reaction.message.reply(new Discord.MessageEmbed()
                              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable92"]))
                              .setColor(es.color)
                              .setDescription(`I will be using ${client.settings.get(message.guild.id, "welcome.customdm") === "no" ? "an Auto generated Image with User Data": "Your defined, custom Image" }`.substr(0, 2048))
                              .setFooter(es.footertext, es.footericon)
                            );
                          } else {
                            return reaction.message.reply(new Discord.MessageEmbed()
                              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable93"]))
                              .setColor(es.color)
                              .setFooter(es.footertext, es.footericon)
                            );
                          }
                        } else {
                          if (isValidURL(collected.first().content)) {
                            url = collected.first().content;
                            client.settings.set(message.guild.id, "no", "welcome.customdm")
                            client.settings.set(message.guild.id, url, "welcome.backgrounddm")
                            return reaction.message.reply(new Discord.MessageEmbed()
                              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable94"]))
                              .setColor(es.color)
                              .setDescription(`I will be using ${client.settings.get(message.guild.id, "welcome.customdm") === "no" ? "an Auto generated Image with User Data": "Your defined, custom Image" }`.substr(0, 2048))
                              .setFooter(es.footertext, es.footericon)
                            );
                          } else {
                            return reaction.message.reply(new Discord.MessageEmbed()
                              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable95"]))
                              .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable96"]))
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
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable97"]))
                        .setColor(es.wrongcolor)
                        .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                        .setFooter(es.footertext, es.footericon)
                      );
                  }

                  if (reaction.emoji.name === "4️⃣") {

                    try {
                      client.settings.set(message.guild.id, true, "welcome.imagedm")
                      client.settings.get(message.guild.id, "transparent", "welcome.backgrounddm")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable98"]))
                        .setColor(es.color)
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable99"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable122"]))
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "5️⃣") {
                    tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable101"]))
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
                            client.settings.set(message.guild.id, url, "welcome.customdm")
                            return reaction.message.reply(new Discord.MessageEmbed()
                              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable102"]))
                              .setColor(es.color)
                              .setDescription(`I will be using ${client.settings.get(message.guild.id, "welcome.customdm") === "no" ? "an Auto generated Image with User Data": "Your defined, custom Image" }`.substr(0, 2048))
                              .setFooter(es.footertext, es.footericon)
                            );
                          } else {
                            return reaction.message.reply(new Discord.MessageEmbed()
                              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable103"]))
                              .setColor(es.color)
                              .setFooter(es.footertext, es.footericon)
                            );
                          }
                        } else {
                          if (isValidURL(collected.first().content)) {
                            url = collected.first().content;
                            client.settings.set(message.guild.id, url, "welcome.customdm")
                            return reaction.message.reply(new Discord.MessageEmbed()
                              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable104"]))
                              .setColor(es.color)
                              .setDescription(`I will be using ${client.settings.get(message.guild.id, "welcome.customdm") === "no" ? "an Auto generated Image with User Data": "Your defined, custom Image" }`.substr(0, 2048))
                              .setFooter(es.footertext, es.footericon)
                            );
                          } else {
                            return reaction.message.reply(new Discord.MessageEmbed()
                              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable105"]))
                              .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable106"]))
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
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable107"]))
                        .setColor(es.wrongcolor)
                        .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                        .setFooter(es.footertext, es.footericon)
                      );
                  }

                  if (reaction.emoji.name === "6️⃣") {

                    try {
                      client.settings.set(message.guild.id, "no", "welcome.customdm")
                      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "welcome.framedm"), "welcome.framedm")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable108"]))
                        .setColor(es.color)
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable109"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable127"]))
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "7️⃣") {

                    try {
                      client.settings.set(message.guild.id, "no", "welcome.customdm")
                      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "welcome.discriminatordm"), "welcome.discriminatordm")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable111"]))
                        .setColor(es.color)
                        .setDescription(`If Someone joins this Server, a message **with an automated image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable112"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable134"]))
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "8️⃣") {

                    try {
                      client.settings.set(message.guild.id, "no", "welcome.customdm")
                      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "welcome.membercountdm"), "welcome.membercountdm")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable114"]))
                        .setColor(es.color)
                        .setDescription(`If Someone joins this Server, a message **with an automated image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable115"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable138"]))
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "9️⃣") {

                    try {
                      client.settings.set(message.guild.id, "no", "welcome.customdm")
                      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "welcome.servernamedm"), "welcome.servernamedm")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable117"]))
                        .setColor(es.color)
                        .setDescription(`If Someone joins this Server, a message **with an automated image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable118"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable156"]))
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "🔟") {

                    try {
                      client.settings.set(message.guild.id, "no", "welcome.custom")
                      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "welcome.pbdm"), "welcome.pbdm")
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable120"]))
                        .setColor(es.color)
                        .setDescription(`If Someone joins this Server, a message **with an automated image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable121"]))
                        .setColor(es.wrongcolor)
                        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  if (reaction.emoji.name === "⬜") {

                    tempmsg = await reaction.message.reply(new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable123"]))
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
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable124"]))
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
                          client.settings.set(message.guild.id, color, "welcome.framecolordm")
                          return message.reply(new Discord.MessageEmbed()
                            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable125"]))
                            .setColor(color)
                            .setDescription(`If Someone joins this Server, a message **with an automated image** will be sent into ${message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) ? message.guild.channels.cache.get(client.settings.get(message.guild.id, "welcome.channel")) : "NO CHANNEL DEFINED YET"}`.substr(0, 2048))
                            .setFooter(es.footertext, es.footericon)
                          );
                        } catch (e) {
                          return message.reply(new Discord.MessageEmbed()
                            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable126"]))
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
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable128"]))
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
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable129"]))
                  .setColor(es.wrongcolor)
                  .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                  .setFooter(es.footertext, es.footericon)
                );
            }
            //manage message - CHANNEL
            else if (reaction.emoji.name === "4️⃣") {
              tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable130"]))
                .setColor(es.color)
                .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable131"]))
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
                    client.settings.set(message.guild.id, message.content, "welcome.dm_msg")
                    return message.reply(new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable132"]))
                      .setColor(es.color)
                      .setDescription(`${message.content.replace("{user}", message.author)}`.substr(0, 2048))
                      .setFooter(es.footertext, es.footericon)
                    );
                  } catch (e) {
                    return message.reply(new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable133"]))
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
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable135"]))
                  .setColor(es.wrongcolor)
                  .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                  .setFooter(es.footertext, es.footericon)
                );
            }
            //Enable/Disable Invite Information - CHANNEL
            else if (reaction.emoji.name === "5️⃣") {

              try {
                client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "welcome.invitedm"), "welcome.invite")
                return reaction.message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable136"]))
                  .setColor(es.color)
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable137"]))
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
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable139"]))
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
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable140"]))
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
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable141"]))
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
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable142"]))
                .setColor(es.color)
                .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable143"]))
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
                    var welcomeroles = client.settings.get(message.guild.id, "welcome.roles")
                    if (welcomeroles.includes(role.id)) return message.reply(new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable144"]))
                      .setColor(es.wrongcolor)
                      .setFooter(es.footertext, es.footericon)
                    );
                    client.settings.push(message.guild.id, role.id, "welcome.roles");
                    return message.reply(new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable145"]))
                      .setColor(es.color)
                      .setDescription(`Everyone who joins will get those Roles now:\n<@&${client.settings.get(message.guild.id, "welcome.roles").join(">\n<@&")}>`.substr(0, 2048))
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
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable146"]))
                  .setColor(es.wrongcolor)
                  .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                  .setFooter(es.footertext, es.footericon)
                );
            }
            //Remove Role
            else if (reaction.emoji.name === "2️⃣") {
              tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable147"]))
                .setColor(es.color)
                .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable148"]))
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
                    var welcomeroles = client.settings.get(message.guild.id, "welcome.roles")
                    if (!welcomeroles.includes(role.id)) return message.reply(new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable149"]))
                      .setColor(es.wrongcolor)
                      .setFooter(es.footertext, es.footericon)
                    );
                    client.settings.remove(message.guild.id, role.id, "welcome.roles");
                    return message.reply(new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable150"]))
                      .setColor(es.color)
                      .setDescription(`Everyone who joins will get those Roles now:\n<@&${client.settings.get(message.guild.id, "welcome.roles").join(">\n<@&")}>`.substr(0, 2048))
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
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable151"]))
                  .setColor(es.wrongcolor)
                  .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                  .setFooter(es.footertext, es.footericon)
                );
            }
            //Show Roles
            else if (reaction.emoji.name === "3️⃣") {
              return message.reply(new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable152"]))
                .setColor(es.color)
                .setDescription(`<@&${client.settings.get(message.guild.id, "welcome.roles").join(">\n<@&")}>`.substr(0, 2048))
                .setFooter(es.footertext, es.footericon)
              );
            } else throw "You reacted with a wrong emoji"
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable153"]))
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


      } else if (temptype == "captcha") {

        client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "welcome.captcha"), "welcome.captcha")
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable154"]))
          .setColor(es.color)
          .setDescription(`${client.settings.get(message.guild.id, "welcome.captcha") ? "I will ask new Members to verify themself, then send welcome messages / add them the roles if they succeed, + I will kick them if they failed!..." : "I will not ask new Members to verify themself!"}`.substr(0, 2048))
          .setFooter(es.footertext, es.footericon)
        );

      } else {
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-welcome"]["variable155"]))
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
