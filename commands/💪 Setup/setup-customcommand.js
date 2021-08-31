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
  name: "setup-customcommand",
  category: "💪 Setup",
  aliases: ["setupcustomcommand","setupcustomcommands", "customcommand-setup", "setup-customcommands"],
  cooldown: 5,
  usage: "setup-customcommand  --> Follow the Steps",
  description: "Define Custom Commands, Create Custom Commands and Remove Custom Commands --> \"Custom Command Names, that sends Custom Messages\"",
  memberpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    try {
      var originalowner = message.author.id;
      var adminroles = client.settings.get(message.guild.id, "adminroles")


      var timeouterror = false;
      var filter = (reaction, user) => {
        return user.id === message.author.id;
      };
      var temptype = ""
      var tempmsg;
      tempmsg = await message.reply(new Discord.MessageEmbed()
        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable1"]))
        .setColor(es.color)
        
        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable2"]))
        .setFooter(es.footertext, es.footericon)
      )
      try {
        tempmsg.react("1️⃣");
        tempmsg.react("2️⃣");
        tempmsg.react("3️⃣");
        tempmsg.react("📑");
      } catch (e) {
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable3"]))
          .setColor(es.wrongcolor)
          .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable20"]).substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        );
      }
      await tempmsg.awaitReactions(filter, {
          max: 1,
          time: 120000,
          errors: ["time"]
        })
        .then(async collected => {
          var reaction = collected.first()
          reaction.users.remove(message.author.id)
          if (reaction.emoji.name === "1️⃣") temptype = "add"
          else if (reaction.emoji.name === "2️⃣") temptype = "remove"
          else if (reaction.emoji.name === "3️⃣") temptype = "show"
          else if (reaction.emoji.name === "📑") temptype = "thesettings"
          else throw "You reacted with a wrong emoji"
        })
        .catch(e => {
          timeouterror = e;
        })
      if (timeouterror)
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable4"]))
          .setColor(es.wrongcolor)
          .setDescription(`Cancelled the Operation!`.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        );


      if (temptype == "add") {
        if(client.customcommands.get(message.guild.id, "commands").length > 19)
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable5"]))
            .setColor(es.wrongcolor)
            .setDescription(`You cannot have more then **20** Custom Commands`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable6"]))
          .setColor(es.color)
          .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable7"]))
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 120000,
            errors: ["time"]
          })
          .then(async collected => {
            var msg = collected.first().content.split(" ")[0];
            if (msg) {
                var thecustomcommand = {
                  name: msg,
                  output: "ye",
                  embed: false,
                }
              tempmsg = await message.reply(new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable8"]))
                .setColor(es.color)
                .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable9"]))
                .setFooter(es.footertext, es.footericon)
              )
              await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                  max: 1,
                  time: 120000,
                  errors: ["time"]
                })
                .then(async collected => {
                  var msg = collected.first().content;
                  if (msg) {
                      thecustomcommand.output = msg;
                      var ttempmsg = await message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable10"]))
                        .setColor(es.color)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable11"]))
                        .setFooter(es.footertext, es.footericon)
                      )
                      try{
                        ttempmsg.react("✅")
                        ttempmsg.react("❌")
                      }catch{

                      }
                      await ttempmsg.awaitReactions((reaction, user) => user == originalowner, {
                          max: 1,
                          time: 90000,
                          errors: ["time"]
                        })
                        .then(collected => {
                          var reaction = collected.first();
                          if (reaction) {
                            console.log(reaction)
                            if(reaction.emoji.name == "✅") {
                              thecustomcommand.embed = true;
                            } else {
                              thecustomcommand.embed = false;
                            }
                            client.customcommands.push(message.guild.id, thecustomcommand, "commands")

                            message.reply(new Discord.MessageEmbed()
                              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable12"]))
                              .setColor(es.color)
                              .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable13"]))
                              .setFooter(es.footertext, es.footericon)
                            )

                            if(reaction.emoji.name == "✅") {
                              message.reply(new Discord.MessageEmbed()
                                .setColor(es.color)
                                .setDescription(thecustomcommand.output)
                                .setFooter(es.footertext, es.footericon)
                              )
                            } else {
                              message.reply(thecustomcommand.output)
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
                          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable14"]))
                          .setColor(es.wrongcolor)
                          .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                          .setFooter(es.footertext, es.footericon)
                        );

                  } else {
                    throw "you didn't ping a valid Channel"
                  }
                })
                .catch(e => {
                  timeouterror = e;
                })
              if (timeouterror)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable15"]))
                  .setColor(es.wrongcolor)
                  .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                  .setFooter(es.footertext, es.footericon)
                );


            } else {
              throw "you didn't ping a valid Channel"
            }
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable16"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );

      } else if (temptype == "remove") {
        let cuc = client.customcommands.get(message.guild.id, "commands");
        var embed = new Discord.MessageEmbed()
        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable17"]))
        .setColor(es.color)
        .setFooter("REACT with the EMOJI for the RIGHT Command, you wanna REMOVE", es.footericon)
        const emojis = {
          "0" : "1️⃣", "1" : "2️⃣", "2" : "3️⃣", "3" : "4️⃣", "4" : "5️⃣",
          "5" : "6️⃣", "6" : "7️⃣", "7" : "8️⃣", "8" : "9️⃣", "9" : "🔟",
        }
        const emojisinverted = {
          "1️⃣" : "0", "2️⃣" : "1", "3️⃣" : "2", "4️⃣" : "3", "5️⃣" : "4",
          "6️⃣" : "5", "7️⃣" : "6", "8️⃣" : "7", "9️⃣" : "8", "🔟" : "9",
        }
        const emojiarray = [
          "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣",
          "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟",
        ]
        for(let i = 0; i< cuc.length; i++){
          try{
            var string = `${cuc[i].output}`;
            if(string.length > 250) string = string.substr(0, 250) + " ..."
            embed.addField(`**${emojis[String(i)]}.** \`${cuc[i].name}\` | ${cuc[i].embed ? "✅ Embed" : "❌ Embed"}`, ">>> " + string)
          }catch (e){
            console.log(e.stack ? String(e.stack).grey : String(e).grey)
          }
        }

        tempmsg = await tempmsg.edit({embed: embed})
        
        for(let i = 0; i < cuc.length; i++){
          if(i < 3) continue;
          await tempmsg.react(emojiarray[i])
        }

        await tempmsg.awaitReactions((reaction, user)=> user.id == originalowner, {
            max: 1,
            time: 120000,
            errors: ["time"]
          })
          .then(collected => {
            var reaction = collected.first();
            if (reaction) {
              var thecmd = cuc[emojisinverted[reaction.emoji.name]]
              try {
                client.customcommands.remove(message.guild.id, thecmd, "commands")
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable18"]))
                  .setColor(es.color)
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable19"]))
                  .setColor(es.wrongcolor)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable26"]))
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
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable21"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
      } else if (temptype == "show") {
          let cuc = client.customcommands.get(message.guild.id, "commands");
          var embed = new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable22"]))
          .setColor(es.color)
          .setFooter(ee.footertext, es.footericon)

          for(let i = 0; i< cuc.length; i++){
            try{
              var string = `${cuc[i].output}`;
              if(string.length > 250) string = string.substr(0, 250) + " ..."
              embed.addField(`<:arrow:832598861813776394> \`${cuc[i].name}\` | ${cuc[i].embed ? "✅ Embed" : "❌ Embed"}`, ">>> "+ string)
            }catch (e){
              console.log(e.stack ? String(e.stack).grey : String(e).grey)
            }
          }
          tempmsg = await tempmsg.edit({embed: embed})
      } else if (temptype == "thesettings") {
        let cuc = client.customcommands.get(message.guild.id, "commands");
        var embed = new Discord.MessageEmbed()
        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable23"]))
        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable24"]))
        .setColor(es.color)
        .setFooter(ee.footertext, es.footericon)

        for(let i = 0; i< cuc.length; i++){
          try{
            var string = `${cuc[i].output}`;
            if(string.length > 50) string = string.substr(0, 50) + " ..."
            embed.addField(`<:arrow:832598861813776394> \`${cuc[i].name}\` | ${cuc[i].embed ? "✅ Embed" : "❌ Embed"}`, ">>> "+ string)
          }catch (e){
            console.log(e.stack ? String(e.stack).grey : String(e).grey)
          }
        }
        tempmsg = await tempmsg.edit({embed: embed})
      } else {
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable25"]))
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
        );
      }

    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(`\`\`\`${String(e.message ? e.message : e).substr(0, 2000)}\`\`\``)
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
