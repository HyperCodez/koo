var {
  MessageEmbed
} = require(`discord.js`);
var Discord = require(`discord.js`);
var config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
var emoji = require(`../../botconfig/emojis.json`);
var {
  databasing, edit_msg, send_roster, send_roster2, send_roster3, edit_msg2, edit_msg3
} = require(`../../handlers/functions`);
const { MessageButton, MessageActionRow, MessageMenuOption, MessageMenu } = require('discord.js')
module.exports = {
  name: "setup-roster",
  category: "💪 Setup",
  aliases: ["setuproster", "roster-setup", "rostersetup"],
  cooldown: 5,
  usage: "setup-roster --> Follow Steps",
  description: "Manage 3 different Roster Systems",
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
        var thedb = client.roster;
        var rostercount = 1;

        tempmsg = await message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable1"]))
          .setColor(es.color)
          .setDescription(`1️⃣ **==** Manage the **first** Roster System

2️⃣ **==** Manage the **second** Roster System

3️⃣ **==** Manage the **third** Roster System



*React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
        )
      try {
        tempmsg.react("1️⃣")
        tempmsg.react("2️⃣")
        tempmsg.react("3️⃣")
      } catch (e) {
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable2"]))
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
          if (reaction.emoji.name === "1️⃣") thedb = client.roster;
          else if (reaction.emoji.name === "2️⃣") thedb = client.roster2;
          else if (reaction.emoji.name === "3️⃣") thedb = client.roster3;
          else throw "You reacted with a wrong emoji"

        })
        .catch(e => {
          timeouterror = e;
        })
      if (timeouterror)
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable3"]))
          .setColor(es.wrongcolor)
          .setDescription(`Cancelled the Operation!`.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        );


        if(thedb == client.roster2) rostercount = 2;
        if(thedb == client.roster3) rostercount = 3;




        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable4"]))
          .setColor(es.color)
          .setDescription(`1️⃣ **==** Define the **Channel** of where the **new** Roster should be

2️⃣ **==** **Add** a Role which should be listed

3️⃣ **==** **Remove** a Role from the listed ones

4️⃣ **==** **Show** all Roles, which are beeing listed

5️⃣ **==** Change the **TYPE** of the Design of the ROSTER

6️⃣ **==** Edit the **EMOJI / TEXT** Infront of **each** Listed-Roster-Member

7️⃣ **==** Set the **Roster Title** of the Roster

8️⃣ **==** ${thedb.get(message.guild.id, "inline") ? "Disable Multiple Roster Rows (Inline Fields)": "Enable Mulitple Roster Rows (Inline Fields)"}

9️⃣ **==** ${thedb.get(message.guild.id, "showallroles") ? "Disable that i show all Role Members and cut them off!" : "Enable that i show all Role Members, instead of cutting of"}

☠️ **== Reset** all \`ROSTER ${rostercount}\` SETTINGS



*React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
        })
        try {
          //client.roster3.get(guild.id, "rosteremoji")
          tempmsg.react("4️⃣")
          tempmsg.react("5️⃣")
          tempmsg.react("6️⃣")
          tempmsg.react("7️⃣")
          tempmsg.react("8️⃣")
          tempmsg.react("9️⃣")
          tempmsg.react("☠️")
        } catch (e) {
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable5"]))
            .setColor(es.wrongcolor)
            .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable11"]).substr(0, 2000))
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
            else if (reaction.emoji.name === "2️⃣") temptype = "addrole"
            else if (reaction.emoji.name === "3️⃣") temptype = "removerole"
            else if (reaction.emoji.name === "4️⃣") temptype = "viewroles"
            else if (reaction.emoji.name === "5️⃣") temptype = "type"
            else if (reaction.emoji.name === "6️⃣") temptype = "emoji"
            else if (reaction.emoji.name === "7️⃣") temptype = "title"
            else if (reaction.emoji.name === "8️⃣") temptype = "toggleinline"
            else if (reaction.emoji.name === "8️⃣") temptype = "toggleinline"
            else if (reaction.emoji.name === "9️⃣") temptype = "showallroles"
            else if (reaction.emoji.name === "☠️") temptype = "reset"
            else throw "You reacted with a wrong emoji"
  
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable6"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
  
      for(const roleid of thedb.get(message.guild.id, "rosterroles")){
        try{
          var role = message.guild.roles.cache.get(roleid);
          if(!role || role == null) throw "NOT A RIGHT ROLE"
        }catch{
          thedb.remove(message.guild.id, roleid, "rosterroles")
        }
      }

      if (temptype === "channel") {


        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable7"]))
          .setColor(es.color)
          .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable8"]))
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
                thedb.set(message.guild.id, channel.id, "rosterchannel")
                if(thedb == client.roster) send_roster(client, message.guild)
                if(thedb == client.roster2) send_roster2(client, message.guild)
                if(thedb == client.roster3) send_roster3(client, message.guild)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable9"]))
                  .setColor(es.color)
                  .setDescription(`To add Roles to the Roster type: \`${prefix}setup-roster\``.substr(0, 2048))
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable10"]))
                  .setColor(es.wrongcolor)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable20"]))
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
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable12"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
      } else if (temptype === "addrole") {
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable13"]))
          .setColor(es.color)
          .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable14"]))
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
              var rosteroles = thedb.get(message.guild.id, "rosterroles")
              if (rosteroles.includes(role.id)) return message.reply(new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable15"]))
                .setColor(es.wrongcolor)
                .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable16"]))
                .setFooter(es.footertext, es.footericon)
              );
              try {
                thedb.push(message.guild.id, role.id, "rosterroles")
                if(thedb == client.roster) edit_msg(client, message.guild)
                if(thedb == client.roster2) edit_msg2(client, message.guild)
                if(thedb == client.roster3) edit_msg3(client, message.guild)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable17"]))
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable18"]))
                  .setColor(es.color)
                .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable19"]))
                  .setColor(es.wrongcolor)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable29"]))
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
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable21"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );


      } else if (temptype === "removerole") {

        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable22"]))
          .setColor(es.color)
          .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable23"]))
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
              var rosteroles = thedb.get(message.guild.id, "rosterroles")
              if (!rosteroles.includes(role.id)) return message.reply(new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable24"]))
                .setColor(es.wrongcolor)
                .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable25"]))
                .setFooter(es.footertext, es.footericon)
              );
              try {
                thedb.remove(message.guild.id, role.id, "rosterroles")
                if(thedb == client.roster) edit_msg(client, message.guild)
                if(thedb == client.roster2) edit_msg2(client, message.guild)
                if(thedb == client.roster3) edit_msg3(client, message.guild)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable26"]))
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable27"]))
                  .setColor(es.color)
                .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable28"]))
                  .setColor(es.wrongcolor)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable49"]))
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
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable30"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
        
      } else if (temptype === "viewroles") {
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable31"]))
          .setColor(es.color)
          .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable32"]))
          .setFooter(es.footertext, es.footericon)
        })
       
      } else if (temptype === "type") {
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable33"]))
          .setColor(es.color)
          .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable34"])).setFooter(es.footertext, es.footericon)
        })
        await tempmsg.awaitReactions(filter, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var reaction = collected.first()
            reaction.users.remove(message.author.id)
            if (reaction.emoji.name === "1️⃣") {
              thedb.set(message.guild.id, "1", "rosterstyle")
              return message.reply(new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable35"]))
                .setColor(es.color)
                .setDescription(`The Roster will edit soon!\n\nIt will update in less then **5 Minutes**, *If it did not update yet*`.substr(0, 2000))
                .setFooter(es.footertext, es.footericon)
              );
            }
            else if (reaction.emoji.name === "2️⃣") {
              thedb.set(message.guild.id, "2", "rosterstyle")
              if(thedb == client.roster) edit_msg(client, message.guild)
              if(thedb == client.roster2) edit_msg2(client, message.guild)
              if(thedb == client.roster3) edit_msg3(client, message.guild)
              return message.reply(new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable36"]))
                .setColor(es.color)
                .setDescription(`The Roster will edit soon!\n\nIt will update in less then **5 Minutes**, *If it did not update yet*`.substr(0, 2000))
                .setFooter(es.footertext, es.footericon)
              );
            }
            else if (reaction.emoji.name === "3️⃣") {
              thedb.set(message.guild.id, "3", "rosterstyle")
              return message.reply(new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable37"]))
                .setColor(es.color)
                .setDescription(`The Roster will edit soon!\n\nIt will update in less then **5 Minutes**, *If it did not update yet*`.substr(0, 2000))
                .setFooter(es.footertext, es.footericon)
              );
            }
            else if (reaction.emoji.name === "4️⃣") {
              thedb.set(message.guild.id, "4", "rosterstyle")
              return message.reply(new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable38"]))
                .setColor(es.color)
                .setDescription(`The Roster will edit soon!\n\nIt will update in less then **5 Minutes**, *If it did not update yet*`.substr(0, 2000))
                .setFooter(es.footertext, es.footericon)
              );
            }
            else if (reaction.emoji.name === "5️⃣") {
              thedb.set(message.guild.id, "5", "rosterstyle")
              return message.reply(new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable39"]))
                .setColor(es.color)
                .setDescription(`The Roster will edit soon!\n\nIt will update in less then **5 Minutes**, *If it did not update yet*`.substr(0, 2000))
                .setFooter(es.footertext, es.footericon)
              );
            }
            else if (reaction.emoji.name === "6️⃣") {
              thedb.set(message.guild.id, "6", "rosterstyle")
              return message.reply(new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable40"]))
                .setColor(es.color)
                .setDescription(`The Roster will edit soon!\n\nIt will update in less then **5 Minutes**, *If it did not update yet*`.substr(0, 2000))
                .setFooter(es.footertext, es.footericon)
              );
            }
            else if (reaction.emoji.name === "7️⃣") {
              thedb.set(message.guild.id, "7", "rosterstyle")
              return message.reply(new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable41"]))
                .setColor(es.color)
                .setDescription(`The Roster will edit soon!\n\nIt will update in less then **5 Minutes**, *If it did not update yet*`.substr(0, 2000))
                .setFooter(es.footertext, es.footericon)
              );
            }
            else throw "You reacted with a wrong emoji"
  
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable42"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
       
      } else if (temptype === "emoji") {


        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable43"]))
          .setColor(es.color)
          .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable44"]))
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var msg = collected.first().content;

            if (msg) {
              if(msg.toLowerCase() == "noemoji"){
                thedb.set(message.guild.id, "", "rosteremoji")
                if(thedb == client.roster) edit_msg(client, message.guild)
                if(thedb == client.roster2) edit_msg2(client, message.guild)
                if(thedb == client.roster3) edit_msg3(client, message.guild)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable45"]))
                  .setColor(es.color)
                  .setDescription(`To add Roles to the Roster type: \`${prefix}setup-roster\`\n\nExample: \n<@${message.author.id}> | \`${message.author.tag}\`\n\nIt will update in less then **5 Minutes**, *If it did not update yet*`.substr(0, 2048))
                  .setFooter(es.footertext, es.footericon)
                );
                return;
              }
              try {
                if(msg.includes(":")){
                  thedb.set(message.guild.id, msg, "rosteremoji")
                  if(thedb == client.roster) edit_msg(client, message.guild)
                  if(thedb == client.roster2) edit_msg2(client, message.guild)
                  if(thedb == client.roster3) edit_msg3(client, message.guild)
                  return message.reply(new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable46"]))
                    .setColor(es.color)
                    .setDescription(`To add Roles to the Roster type: \`${prefix}setup-roster\`\n\nExample: \n${msg} <@${message.author.id}> | \`${message.author.tag}\`\n\nIt will update in less then **5 Minutes**, *If it did not update yet*`.substr(0, 2048))
                    .setFooter(es.footertext, es.footericon)
                  );
                }
                else{
                  thedb.set(message.guild.id, msg.substr(0, 5), "rosteremoji")
                  if(thedb == client.roster) edit_msg(client, message.guild)
                  if(thedb == client.roster2) edit_msg2(client, message.guild)
                  if(thedb == client.roster3) edit_msg3(client, message.guild)
                  return message.reply(new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable47"]))
                    .setColor(es.color)
                    .setDescription(`To add Roles to the Roster type: \`${prefix}setup-roster\`\n\nExample: \n${msg.substr(0, 5)} <@${message.author.id}> | \`${message.author.tag}\`\n\nIt will update in less then **5 Minutes**, *If it did not update yet*`.substr(0, 2048))
                    .setFooter(es.footertext, es.footericon)
                  );
                }
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable48"]))
                  .setColor(es.wrongcolor)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable55"]))
                  .setFooter(es.footertext, es.footericon)
                );
              }
            } else {
              throw "you didn't add a valid message"
            }
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable50"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
      } else if (temptype === "title") {


        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable51"]))
          .setColor(es.color)
          .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable52"]))
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var msg = collected.first().content;

            if (msg) {
              try {
                thedb.set(message.guild.id, msg.substr(0, 256), "rostertitle")
                if(thedb == client.roster) edit_msg(client, message.guild)
                if(thedb == client.roster2) edit_msg2(client, message.guild)
                if(thedb == client.roster3) edit_msg3(client, message.guild)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable53"]))
                  .setColor(es.color)
                    .setDescription(`To add Roles to the Roster type: \`${prefix}setup-roster\`\n\nIt will update in less then **5 Minutes**, *If it did not update yet*`.substr(0, 2048))
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable54"]))
                  .setColor(es.wrongcolor)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable61"]))
                  .setFooter(es.footertext, es.footericon)
                );
              }
            } else {
              throw "you didn't add a valid message"
            }
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable56"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
      } else if (temptype === "toggleinline") {
        thedb.set(message.guild.id, !thedb.get(message.guild.id, "inline"), "inline")
        if(thedb == client.roster) edit_msg(client, message.guild)
        if(thedb == client.roster2) edit_msg2(client, message.guild)
        if(thedb == client.roster3) edit_msg3(client, message.guild)
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable57"]))
          .setColor(es.color)
            .setDescription(`To add Roles to the Roster type: \`${prefix}setup-roster\`\n\nIt will update in less then **5 Minutes**, *If it did not update yet*`.substr(0, 2048))
          .setFooter(es.footertext, es.footericon)
        );
        
      } else if (temptype === "showallroles") {
        thedb.set(message.guild.id, !thedb.get(message.guild.id, "showallroles"), "showallroles")
        if(thedb == client.roster) edit_msg(client, message.guild)
        if(thedb == client.roster2) edit_msg2(client, message.guild)
        if(thedb == client.roster3) edit_msg3(client, message.guild)


        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable58"]))
          .setColor(es.color)
          .setDescription(`To add Roles to the Roster type: \`${prefix}setup-roster\`\n\nIt will update in less then **5 Minutes**, *If it did not update yet*`.substr(0, 2048))
          .setFooter(es.footertext, es.footericon)
        );
        
      } else if (temptype === "reset"){
        await thedb.delete(message.guild.id)
        thedb.ensure(message.guild.id, {
          rosterchannel: "notvalid",
          rosteremoji: "➤",
          showallroles: false,
          rostermessage: "",
          rostertitle: "Roster",
          rosterstyle: "1",
          rosterroles: [],
          inline: false,
        })
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable59"]))
          .setColor(es.color)
          .setDescription(`Re-set-it-up with: \`${prefix}setup-roster\``.substr(0, 2048))
          .setFooter(es.footertext, es.footericon)
        );
      }      
      else {
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-roster"]["variable60"]))
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
