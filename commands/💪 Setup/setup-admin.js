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
  name: "setup-admin",
  category: "💪 Setup",
  aliases: ["setupadmin", "setup-mod", "setupmod", "admin-setup", "adminsetup"],
  cooldown: 5,
  usage: "setup-admin  -->  Follow the Steps",
  description: "Allowe specific Roles to execute specific Commands / all Commands!",
  memberpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    try {
      var adminroles = client.settings.get(message.guild.id, "adminroles");

      var timeouterror = false;
      var filter = (reaction, user) => {
        return user.id === message.author.id;
      };
      var temptype = ""
      var tempmsg;

      tempmsg = await message.reply(new Discord.MessageEmbed()
        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable1"]))
        .setColor(es.color)
        .setDescription(`1️⃣ **== Add** Roles to the GENERAL ADMINISTRATOR ROLES

2️⃣ **== Remove** Roles from the GENERAL ADMINISTRATOR ROLES

3️⃣ **== Show** all Administrator Roles

4️⃣ **==** Define Administrator Role/Users per **Admin Command**

📑 **== Show Settings**



*React with the Right Emoji according to the Right action*`)
      .setFooter(es.footertext, es.footericon)
      
)

      try {
        tempmsg.react("1️⃣")
        tempmsg.react("2️⃣")
        tempmsg.react("3️⃣")
        tempmsg.react("4️⃣")
        tempmsg.react("📑")
      } catch (e) {
        return message.reply({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable2"]))
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
          if (reaction.emoji.name === "1️⃣") temptype = "add"
          else if (reaction.emoji.name === "2️⃣") temptype = "remove"
          else if (reaction.emoji.name === "3️⃣") temptype = "show"
          else if (reaction.emoji.name === "4️⃣") temptype = "cmdrole"
          else if (reaction.emoji.name === "📑") temptype = "thesettings"
          else throw "You reacted with a wrong emoji"

        })
        .catch(e => {
          timeouterror = e;
        })
      if (timeouterror)
        return message.reply({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable3"]))
          .setColor(es.wrongcolor)
          .setDescription(`Cancelled the Operation!`.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        });

      if(temptype == "cmdrole"){
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable4"]))
        .setColor(es.color)
        .setDescription(`
        ${client.commands.filter((cmd) => cmd.category.includes("Admin")).map((cmd) => `\`${cmd.name}\``).join(" | ")}

        
        *Enter one of those Commands!*`).setFooter(es.footertext, es.footericon)
      })
      var thecmd;
      await tempmsg.channel.awaitMessages(m=>m.author.id == message.author.id, {
          max: 1,
          time: 90000,
          errors: ["time"]
        })
        .then(async collected => {
          var com = collected.first().content.split(" ")[0]
          const cmd = client.commands.get(com.toLowerCase()) || client.commands.get(client.aliases.get(com.toLowerCase()));
          if(!cmd) 
            return message.reply({embed: new Discord.MessageEmbed()
              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable5"]))
              .setColor(es.wrongcolor)
              .setFooter(es.footertext, es.footericon)
            });
          if(!cmd.category.toLowerCase().includes("admin")) 
            return message.reply({embed: new Discord.MessageEmbed()
              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable6"]))
              .setColor(es.wrongcolor)
              .setFooter(es.footertext, es.footericon)
            });
          thecmd = cmd.name;
          if(["detailwarn", "warnings", "report"].includes(thecmd.toLowerCase())) return timeouterror = {
            message: "YOU CANNOT USE THAT COMMAND, CAUSE IT DOES NOT NEED PERMISSIONS"
          }
          if(["dm"].includes(thecmd.toLowerCase())) return timeouterror = {
            message: "YOU CANNOT USE THAT COMMAND, CAUSE IT IS ADMIN ONLY"
          }
            tempmsg = await message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable7"]))
            .setColor(es.color)
            .setDescription(`1️⃣ **== Add** Roles/Users to the ${thecmd.toUpperCase()} ADMINISTRATOR ROLES\n\n2️⃣ **== Remove** Roles/Users from the ${thecmd.toUpperCase()} ADMINISTRATOR ROLES
            
3️⃣ **== Show** the ${thecmd.toUpperCase()} Administrator Roles
                        
📑 **== Show Settings**

            
*React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
          )
  
        try {
          tempmsg.react("1️⃣")
          tempmsg.react("2️⃣")
          tempmsg.react("3️⃣")
          tempmsg.react("📑")
        } catch (e) {
          return message.reply({embed: new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable8"]))
            .setColor(es.wrongcolor)
            .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable15"]).substr(0, 2000))
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
          return message.reply({embed: new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable9"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          });
        })
        .catch(e => {
          timeouterror = e;
        })
      if (timeouterror)
        return message.reply({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable10"]))
          .setColor(es.wrongcolor)
          .setDescription(`Cancelled the Operation!`.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        });

        if (temptype == "add") {
          tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
            .setTitle("Which Role/User do you wanna add to " + thecmd)
            .setColor(es.color)
            .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable11"]))
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
              var user = message.mentions.users.first();
              if (role) {
                var adminroles = client.settings.get(message.guild.id, `cmdadminroles.${thecmd}`)
                if (adminroles.includes(role.id)) return message.reply({embed: new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable12"]))
                  .setColor(es.wrongcolor)
                  .setFooter(es.footertext, es.footericon)
                });
                try {
                  client.settings.push(message.guild.id, role.id, `cmdadminroles.${thecmd}`)
                  let cmd = client.settings.get(message.guild.id, `cmdadminroles.${thecmd}`)
                  var cmdrole = []
                    if(cmd.length > 0){
                      for(const r of cmd){
                        if(message.guild.roles.cache.get(r)){
                          cmdrole.push(`<@&${r}>`)
                        }
                        else if(message.guild.members.cache.get(r)){
                          cmdrole.push(`<@${r}>`)
                        }
                        else {
                          console.log("F")
                          console.log(r)
                          client.settings.remove(message.guild.id, r, `cmdadminroles.${cmd}`)
                        }
                      }
                    }
                  return message.reply({embed: new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable13"]))
                    .setColor(es.color)
                    .setDescription(`Everyone with one of those Roles/Users:\n${cmdrole.join("\n")}\nis now able to use the ${thecmd} Admin Commands`.substr(0, 2048))
                    .setFooter(es.footertext, es.footericon)
                  });
                } catch (e) {
                  return message.reply({embed: new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable14"]))
                    .setColor(es.wrongcolor)
                    .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable19"]))
                    .setFooter(es.footertext, es.footericon)
                  });
                }
              } else if (user) {
                var adminroles = client.settings.get(message.guild.id, `cmdadminroles.${thecmd}`)
                if (adminroles.includes(user.id)) return message.reply({embed: new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable16"]))
                  .setColor(es.wrongcolor)
                  .setFooter(es.footertext, es.footericon)
                });
                try {
                  client.settings.push(message.guild.id, user.id, `cmdadminroles.${thecmd}`)
                  let cmd = client.settings.get(message.guild.id, `cmdadminroles.${thecmd}`)
                  var cmdrole = []
                    if(cmd.length > 0){
                      for(const r of cmd){
                        if(message.guild.roles.cache.get(r)){
                          cmdrole.push(`<@&${r}>`)
                        }
                        else if(message.guild.members.cache.get(r)){
                          cmdrole.push(`<@${r}>`)
                        }
                        else {
                          console.log("F")
                          console.log(r)
                          client.settings.remove(message.guild.id, r, `cmdadminroles.${cmd}`)
                        }
                      }
                    }
                  return message.reply({embed: new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable17"]))
                    .setColor(es.color)
                    .setDescription(`Everyone with one of those Roles/Users:\n${cmdrole.join("\n")}\nis now able to use the ${thecmd} Admin Commands`.substr(0, 2048))
                    .setFooter(es.footertext, es.footericon)
                  });
                } catch (e) {
                  return message.reply({embed: new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable18"]))
                    .setColor(es.wrongcolor)
                    .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable25"]))
                    .setFooter(es.footertext, es.footericon)
                  });
                }
              } else {
                throw "you didn't ping a valid Role"
              }
            })
            .catch(e => {
              timeouterror = e;
            })
          if (timeouterror)
            return message.reply({embed: new Discord.MessageEmbed()
              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable20"]))
              .setColor(es.wrongcolor)
              .setDescription(`Cancelled the Operation!`.substr(0, 2000))
              .setFooter(es.footertext, es.footericon)
            });
        }  else if (temptype == "remove") {
          tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
            .setTitle("Which Role/User do you wanna remove from " + thecmd)
            .setColor(es.color)
            .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable21"]))
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
              var user = message.mentions.users.first();
              if (role) {
                var adminroles = client.settings.get(message.guild.id, `cmdadminroles.${thecmd}`)
                if (!adminroles.includes(role.id)) return message.reply({embed: new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable22"]))
                  .setColor(es.wrongcolor)
                  .setFooter(es.footertext, es.footericon)
                });
                try {
                  client.settings.remove(message.guild.id, role.id, `cmdadminroles.${thecmd}`)
                  let cmd = client.settings.get(message.guild.id, `cmdadminroles.${thecmd}`)
                  var cmdrole = []
                    if(cmd.length > 0){
                      for(const r of cmd){
                        if(message.guild.roles.cache.get(r)){
                          cmdrole.push(`<@&${r}>`)
                        }
                        else if(message.guild.members.cache.get(r)){
                          cmdrole.push(`<@${r}>`)
                        }
                        else {
                          console.log("F")
                          console.log(r)
                          client.settings.remove(message.guild.id, r, `cmdadminroles.${cmd}`)
                        }
                      }
                    }
                  return message.reply({embed: new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable23"]))
                    .setColor(es.color)
                    .setDescription(`Everyone with one of those Roles/Users:\n${cmdrole.join("\n")}\nis now able to use the ${thecmd} Admin Commands`.substr(0, 2048))
                    .setFooter(es.footertext, es.footericon)
                  });
                } catch (e) {
                  return message.reply({embed: new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable24"]))
                    .setColor(es.wrongcolor)
                    .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable29"]))
                    .setFooter(es.footertext, es.footericon)
                  });
                }
              } else if (user) {
                var adminroles = client.settings.get(message.guild.id, `cmdadminroles.${thecmd}`)
                if (!adminroles.includes(user.id)) return message.reply({embed: new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable26"]))
                  .setColor(es.wrongcolor)
                  .setFooter(es.footertext, es.footericon)
                });
                try {
                  client.settings.remove(message.guild.id, user.id, `cmdadminroles.${thecmd}`)
                  let cmd = client.settings.get(message.guild.id, `cmdadminroles.${thecmd}`)
                  var cmdrole = []
                    if(cmd.length > 0){
                      for(const r of cmd){
                        if(message.guild.roles.cache.get(r)){
                          cmdrole.push(`<@&${r}>`)
                        }
                        else if(message.guild.members.cache.get(r)){
                          cmdrole.push(`<@${r}>`)
                        }
                        else {
                          console.log("F")
                          console.log(r)
                          client.settings.remove(message.guild.id, r, `cmdadminroles.${cmd}`)
                        }
                      }
                    }
                  return message.reply({embed: new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable27"]))
                    .setColor(es.color)
                    .setDescription(`Everyone with one of those Roles/Users:\n${cmdrole.join("\n")}\nis now able to use the ${thecmd} Admin Commands`.substr(0, 2048))
                    .setFooter(es.footertext, es.footericon)
                  });
                } catch (e) {
                  return message.reply({embed: new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable28"]))
                    .setColor(es.wrongcolor)
                    .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable40"]))
                    .setFooter(es.footertext, es.footericon)
                  });
                }
              } else {
                throw "you didn't ping a valid Role"
              }
            })
            .catch(e => {
              timeouterror = e;
            })
          if (timeouterror)
            return message.reply({embed: new Discord.MessageEmbed()
              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable30"]))
              .setColor(es.wrongcolor)
              .setDescription(`Cancelled the Operation!`.substr(0, 2000))
              .setFooter(es.footertext, es.footericon)
            });
        } else if (temptype == "show") {
          let cmd = client.settings.get(message.guild.id, `cmdadminroles.${thecmd}`)
          var cmdrole = []
            if(cmd.length > 0){
              for(const r of cmd){
                if(message.guild.roles.cache.get(r)){
                  cmdrole.push(`<@&${r}>`)
                }
                else if(message.guild.members.cache.get(r)){
                  cmdrole.push(`<@${r}>`)
                }
                else {
                  console.log("F")
                  console.log(r)
                  client.settings.remove(message.guild.id, r, `cmdadminroles.${cmd}`)
                }
              }
            }
          
          return message.reply({embed: new MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable31"]))
            .setColor(es.color)
            .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable32"]))
            .setFooter(es.footertext, es.footericon)
          });
        } else if (temptype == "thesettings") {
          let db = client.settings.get(message.guild.id, "cmdadminroles")
          var cmdrole = []
          for(const [cmd, values] of Object.entries(db)){
            var percmd = [];
            if(values.length > 0){
              for(const r of values){
                if(message.guild.roles.cache.get(r)){
                  percmd.push(`<@&${r}>`)
                }
                else if(message.guild.members.cache.get(r)){
                  percmd.push(`<@${r}>`)
                }
                else {
                  client.settings.remove(message.guild.id, r, `cmdadminroles.${cmd}`)
                }
              }
              var key = `For the \`${cmd}\` Command`
              cmdrole.push({ "info" : percmd, "name": key })
            }
          }
          var embed = new MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable33"]))
          .setColor(es.color)
          .setDescription(`**General Admin Roles:**\n${client.settings.get(message.guild.id, "adminroles").length > 0 ? `<@&${client.settings.get(message.guild.id, "adminroles").join(">, <@&")}>`: "No General Admin Roles Setup yet"}`.substr(0, 2048))
          .setFooter(es.footertext, es.footericon)
  
          for(const cmd of cmdrole){
            embed.addField(cmd.name, cmd.info.join(", "))
          }
          return message.reply({embed: embed});
        } else {
          return message.reply({embed: new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable34"]))
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
          });
        }






      }
      else if (temptype == "add") {

        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable35"]))
          .setColor(es.color)
          .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable36"]))
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
              var adminroles = client.settings.get(message.guild.id, "adminroles")
              if (adminroles.includes(role.id)) return message.reply({embed: new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable37"]))
                .setColor(es.wrongcolor)
                .setFooter(es.footertext, es.footericon)
              });
              try {
                client.settings.push(message.guild.id, role.id, "adminroles");
                return message.reply({embed: new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable38"]))
                  .setColor(es.color)
                  .setDescription(`Everyone with one of those Roles:\n<@&${client.settings.get(message.guild.id, "adminroles").join(">\n<@&")}>\nis now able to use the Admin Commands`.substr(0, 2048))
                  .setFooter(es.footertext, es.footericon)
                });
              } catch (e) {
                return message.reply({embed: new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable39"]))
                  .setColor(es.wrongcolor)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable47"]))
                  .setFooter(es.footertext, es.footericon)
                });
              }
            } else {
              throw "you didn't ping a valid Role"
            }
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply({embed: new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable41"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          });

      } else if (temptype == "remove") {
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable42"]))
          .setColor(es.color)
          .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable43"]))
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
              var adminroles = client.settings.get(message.guild.id, "adminroles")
              if (!adminroles.includes(role.id)) return message.reply({embed: new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable44"]))
                .setColor(es.wrongcolor)
                .setFooter(es.footertext, es.footericon)
              });
              try {
                client.settings.remove(message.guild.id, role.id, "adminroles");
                return message.reply({embed: new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable45"]))
                  .setColor(es.color)
                  .setDescription(`Everyone with one of those Roles:\n<@&${client.settings.get(message.guild.id, "adminroles").join(">\n<@&")}>\nis now able to use the Admin Commands`.substr(0, 2048))
                  .setFooter(es.footertext, es.footericon)
                });
              } catch (e) {
                return message.reply({embed: new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable46"]))
                  .setColor(es.wrongcolor)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable52"]))
                  .setFooter(es.footertext, es.footericon)
                });
              }
            } else {
              throw "you didn't ping a valid Role"
            }
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply({embed: new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable48"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          });
      } else if (temptype == "show") {
        let db = client.settings.get(message.guild.id, "cmdadminroles")
        var cmdrole = []
        for(const [cmd, values] of Object.entries(db)){
          var percmd = [];
          if(values.length > 0){
            for(const r of values){
              if(message.guild.roles.cache.get(r)){
                percmd.push(`<@&${r}>`)
              }
              else if(message.guild.members.cache.get(r)){
                percmd.push(`<@${r}>`)
              }
              else {
                client.settings.remove(message.guild.id, r, `cmdadminroles.${cmd}`)
              }
            }
            var key = `For the \`${cmd}\` Command`
            cmdrole.push({ "info" : percmd, "name": key })
          }
        }
        var embed = new MessageEmbed()
        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable49"]))
        .setColor(es.color)
        .setDescription(`${client.settings.get(message.guild.id, "adminroles").length > 0 ? `<@&${client.settings.get(message.guild.id, "adminroles").join(">, <@&")}>`: "No General Admin Roles Setup yet"}`.substr(0, 2048))
        .setFooter(es.footertext, es.footericon)

        for(const cmd of cmdrole){
          embed.addField(cmd.name, cmd.info.join(", "))
        }
        return message.reply({embed: embed});
      } else if (temptype == "thesettings") {
        let db = client.settings.get(message.guild.id, "cmdadminroles")
        var cmdrole = []
        for(const [cmd, values] of Object.entries(db)){
          var percmd = [];
          if(values.length > 0){
            for(const r of values){
              if(message.guild.roles.cache.get(r)){
                percmd.push(`<@&${r}>`)
              }
              else if(message.guild.members.cache.get(r)){
                percmd.push(`<@${r}>`)
              }
              else {
                client.settings.remove(message.guild.id, r, `cmdadminroles.${cmd}`)
              }
            }
            var key = `For the \`${cmd}\` Command`
            cmdrole.push({ "info" : percmd, "name": key })
          }
        }
        var embed = new MessageEmbed()
        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable50"]))
        .setColor(es.color)
        .setDescription(`**General Admin Roles:**\n${client.settings.get(message.guild.id, "adminroles").length > 0 ? `<@&${client.settings.get(message.guild.id, "adminroles").join(">, <@&")}>`: "No General Admin Roles Setup yet"}`.substr(0, 2048))
        .setFooter(es.footertext, es.footericon)

        for(const cmd of cmdrole){
          embed.addField(cmd.name, cmd.info.join(", "))
        }
        return message.reply({embed: embed});
      }  else {
        return message.reply({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-admin"]["variable51"]))
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
        });
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