var { MessageEmbed } = require("discord.js");
var Discord = require("discord.js");
var config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
var {
  databasing
} = require(`../../handlers/functions`);
const { MessageButton, MessageActionRow, MessageMenuOption, MessageMenu } = require('discord.js')
module.exports = {
    name: "setup-jtc",
    category: "💪 Setup",
    aliases: ["setup-jointocreate", "setupjtc", "setupjointocreate", "jtc-setup", "jtcsetup"],
    cooldown: 5,
    usage: "setup-jtc  -->  Follow Steps",
    description: "Manage 3 different Join to Create Systems",
    run: async (client, message, args, cmduser, text, prefix) => {
    
      let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    try{
      var adminroles = client.settings.get(message.guild.id, "adminroles")

        var timeouterror = false;
        var filter = (reaction, user) => {
          return user.id === message.author.id;
        };
        var temptype = ""
        var tempmsg;
  
        tempmsg = await message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable1"]))
          .setColor(es.color)
          .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable2"]))
          .setFooter(es.footertext, es.footericon)
        )
        try {
          tempmsg.react("1️⃣")
          tempmsg.react("2️⃣")
          tempmsg.react("3️⃣")
        } catch (e) {
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable3"]))
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
            if (reaction.emoji.name === "1️⃣") temptype = "1"
            else if (reaction.emoji.name === "2️⃣") temptype = "2"
            else if (reaction.emoji.name === "3️⃣") temptype = "3"
            else throw "You reacted with a wrong emoji"
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable4"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
        //Channel Setup 1
        if (temptype == "1") {



        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////


        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable5"]))
          .setColor(es.color)
          .setDescription(`
        1️⃣ **==** **Create** a Channel Setup 

        2️⃣ **==** **Use** the Channel you are currently **connected** to as a \`JOIN TO CREATE\` Channel

        3️⃣ **==** Manage the **Name** of the Created Channels

        *React with the Right Emoji according to the Right action*`)
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.awaitReactions(filter, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(async collected => {
            var reaction = collected.first()
            reaction.users.remove(message.author.id)
            //Create CHANNEL
            if (reaction.emoji.name === "1️⃣") {
                var maxbitrate = 96000;
                var boosts = message.guild.premiumSubscriptionCount;
                if (boosts >= 2) maxbitrate = 128000;
                if (boosts >= 15) maxbitrate = 256000;
                if (boosts >= 30) maxbitrate = 384000;
                message.guild.channels.create("Join to Create", {
                  type: 'voice',
                  bitrate: maxbitrate,
                  userLimit: 4,
                  permissionOverwrites: [ //update the permissions
                    { //the role "EVERYONE" is just able to VIEW_CHANNEL and CONNECT
                      id: message.guild.id,
                      allow: ['VIEW_CHANNEL', "CONNECT"],
                      deny: ["SPEAK"]
                    },
                  ],
                }).then(vc => {
                  if (message.channel.parent) vc.setParent(message.channel.parent.id)
                  message.reply(new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable6"]))
                    .setColor(es.color)
                    .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable7"]))
                  .setFooter(es.footertext, es.footericon)
                  );
                  client.jtcsettings.set(message.guild.id, vc.id, `channel`);
                })
              
            }
            //Use the Current CHANNEL
            else if (reaction.emoji.name === "2️⃣") {
              var {
                channel
              } = message.member.voice;
              if (!channel) return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable8"]))
                  .setColor(es.wrongcolor)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable9"]))
                  .setFooter(es.footertext, es.footericon)
                );
                message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable10"]))
                  .setColor(es.color)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable11"]))
                  .setFooter(es.footertext, es.footericon)
                );
                client.jtcsettings.set(message.guild.id, channel.id, `channel`);
            }
            //Change the NAME
            else if (reaction.emoji.name === "3️⃣") {

              tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable12"]))
                .setColor(es.color)
                .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable13"]))
                .setFooter(es.footertext, es.footericon)
              })
              await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                  max: 1,
                  time: 90000,
                  errors: ["time"]
                })
                .then(collected => {
                  client.jtcsettings.set(message.guild.id, collected.first().content, "channelname");
                  message.reply(new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable14"]))
                    .setColor(es.color)
                    .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable15"]))
                    .setFooter(es.footertext, es.footericon)
                  );
                })
                .catch(e => {
                  timeouterror = e;
                })
              if (timeouterror)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable16"]))
                  .setColor(es.wrongcolor)
                  .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                  .setFooter(es.footertext, es.footericon)
                );
            } else throw "You reacted with a wrong emoji"
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable17"]))
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

        }
        //channel Setup 2
        else if (temptype == "2") {



          ///////////////////////////////////
          ///////////////////////////////////
          ///////////////////////////////////
          ///////////////////////////////////
          ///////////////////////////////////
          ///////////////////////////////////
          ///////////////////////////////////
  
  
          tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable18"]))
            .setColor(es.color)
            .setDescription(`
          1️⃣ **==** **Create** a Channel Setup 
  
          2️⃣ **==** **Use** the Channel you are currently **connected** to as a \`JOIN TO CREATE\` Channel
  
          3️⃣ **==** Manage the **Name** of the Created Channels
  
          *React with the Right Emoji according to the Right action*`)
            .setFooter(es.footertext, es.footericon)
          })
          await tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            })
            .then(async collected => {
              var reaction = collected.first()
              reaction.users.remove(message.author.id)
              //Create CHANNEL
              if (reaction.emoji.name === "1️⃣") {
                  var maxbitrate = 96000;
                  var boosts = message.guild.premiumSubscriptionCount;
                  if (boosts >= 2) maxbitrate = 128000;
                  if (boosts >= 15) maxbitrate = 256000;
                  if (boosts >= 30) maxbitrate = 384000;
                  message.guild.channels.create("Join to Create", {
                    type: 'voice',
                    bitrate: maxbitrate,
                    userLimit: 4,
                    permissionOverwrites: [ //update the permissions
                      { //the role "EVERYONE" is just able to VIEW_CHANNEL and CONNECT
                        id: message.guild.id,
                        allow: ['VIEW_CHANNEL', "CONNECT"],
                        deny: ["SPEAK"]
                      },
                    ],
                  }).then(vc => {
                    if (message.channel.parent) vc.setParent(message.channel.parent.id)
                    message.reply(new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable19"]))
                      .setColor(es.color)
                      .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable20"]))
                    .setFooter(es.footertext, es.footericon)
                    );
                    client.jtcsettings2.set(message.guild.id, vc.id, `channel`);
                  })
                
              }
              //Use the Current CHANNEL
              else if (reaction.emoji.name === "2️⃣") {
                var {
                  channel
                } = message.member.voice;
                if (!channel) return message.reply(new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable21"]))
                    .setColor(es.wrongcolor)
                    .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable22"]))
                    .setFooter(es.footertext, es.footericon)
                  );
                  message.reply(new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable23"]))
                    .setColor(es.color)
                    .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable24"]))
                    .setFooter(es.footertext, es.footericon)
                  );
                  client.jtcsettings2.set(message.guild.id, channel.id, `channel`);
              }
              //Change the NAME
              else if (reaction.emoji.name === "3️⃣") {
  
                tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable25"]))
                  .setColor(es.color)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable26"]))
                  .setFooter(es.footertext, es.footericon)
                })
                await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                    max: 1,
                    time: 90000,
                    errors: ["time"]
                  })
                  .then(collected => {
                    client.jtcsettings2.set(message.guild.id, collected.first().content, "channelname");
                    message.reply(new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable27"]))
                      .setColor(es.color)
                      .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable28"]))
                      .setFooter(es.footertext, es.footericon)
                    );
                  })
                  .catch(e => {
                    timeouterror = e;
                  })
                if (timeouterror)
                  return message.reply(new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable29"]))
                    .setColor(es.wrongcolor)
                    .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                    .setFooter(es.footertext, es.footericon)
                  );
              } else throw "You reacted with a wrong emoji"
            })
            .catch(e => {
              timeouterror = e;
            })
          if (timeouterror)
            return message.reply(new Discord.MessageEmbed()
              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable30"]))
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
  
        }
        //Channel Setup 3, Tomato's Dick is huge
        else if (temptype == "3") {



          ///////////////////////////////////
          ///////////////////////////////////
          ///////////////////////////////////
          ///////////////////////////////////
          ///////////////////////////////////
          ///////////////////////////////////
          ///////////////////////////////////
  
  
          tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable31"]))
            .setColor(es.color)
            .setDescription(`
          1️⃣ **==** **Create** a Channel Setup 
  
          2️⃣ **==** **Use** the Channel you are currently **connected** to as a \`JOIN TO CREATE\` Channel
  
          3️⃣ **==** Manage the **Name** of the Created Channels
  
          *React with the Right Emoji according to the Right action*`)
            .setFooter(es.footertext, es.footericon)
          })
          await tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            })
            .then(async collected => {
              var reaction = collected.first()
              reaction.users.remove(message.author.id)
              //Create CHANNEL
              if (reaction.emoji.name === "1️⃣") {
                  var maxbitrate = 96000;
                  var boosts = message.guild.premiumSubscriptionCount;
                  if (boosts >= 2) maxbitrate = 128000;
                  if (boosts >= 15) maxbitrate = 256000;
                  if (boosts >= 30) maxbitrate = 384000;
                  message.guild.channels.create("Join to Create", {
                    type: 'voice',
                    bitrate: maxbitrate,
                    userLimit: 4,
                    permissionOverwrites: [ //update the permissions
                      { //the role "EVERYONE" is just able to VIEW_CHANNEL and CONNECT
                        id: message.guild.id,
                        allow: ['VIEW_CHANNEL', "CONNECT"],
                        deny: ["SPEAK"]
                      },
                    ],
                  }).then(vc => {
                    if (message.channel.parent) vc.setParent(message.channel.parent.id)
                    message.reply(new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable32"]))
                      .setColor(es.color)
                      .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable33"]))
                    .setFooter(es.footertext, es.footericon)
                    );
                    client.jtcsettings3.set(message.guild.id, vc.id, `channel`);
                  })
                
              }
              //Use the Current CHANNEL
              else if (reaction.emoji.name === "2️⃣") {
                var {
                  channel
                } = message.member.voice;
                if (!channel) return message.reply(new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable34"]))
                    .setColor(es.wrongcolor)
                    .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable35"]))
                    .setFooter(es.footertext, es.footericon)
                  );
                  message.reply(new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable36"]))
                    .setColor(es.color)
                    .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable37"]))
                    .setFooter(es.footertext, es.footericon)
                  );
                  client.jtcsettings3.set(message.guild.id, channel.id, `channel`);
              }
              //Change the NAME
              else if (reaction.emoji.name === "3️⃣") {
  
                tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable38"]))
                  .setColor(es.color)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable39"]))
                  .setFooter(es.footertext, es.footericon)
                })
                await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                    max: 1,
                    time: 90000,
                    errors: ["time"]
                  })
                  .then(collected => {
                    client.jtcsettings3.set(message.guild.id, collected.first().content, "channelname");
                    message.reply(new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable40"]))
                      .setColor(es.color)
                      .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable41"]))
                      .setFooter(es.footertext, es.footericon)
                    );
                  })
                  .catch(e => {
                    timeouterror = e;
                  })
                if (timeouterror)
                  return message.reply(new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable42"]))
                    .setColor(es.wrongcolor)
                    .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                    .setFooter(es.footertext, es.footericon)
                  );
              } else throw "You reacted with a wrong emoji"
            })
            .catch(e => {
              timeouterror = e;
            })
          if (timeouterror)
            return message.reply(new Discord.MessageEmbed()
              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable43"]))
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
  
        } 
        //Else do THAT
        else {
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable44"]))
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
          );
        }
    } catch (e) {
        console.log(String(e.stack).grey.bgRed)
        return message.reply(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(client.la[ls].common.erroroccur)
          .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-jtc"]["variable45"]))
        );
    }
  }
}
/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention him / Milrato Development, when using this Code!
  * @INFO
*/
