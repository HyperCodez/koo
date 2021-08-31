var {
  MessageEmbed
} = require(`discord.js`);
var Discord = require(`discord.js`);
var config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
var emoji = require(`../../botconfig/emojis.json`);
const fs = require('fs');
var {
  databasing,
  isValidURL
} = require(`../../handlers/functions`);
module.exports = {
  name: "changestatus",
  category: "👑 Owner",
  aliases: ["botstatus", "status"],
  cooldown: 5,
  usage: "changestatus  -->  Follow the Steps",
  description: "Changes the Status of the BOT",
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    if (!config.ownerIDS.some(r => r.includes(message.author.id)))
      return message.channel.send({embeds: [new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(eval(client.la[ls]["cmds"]["owner"]["changestatus"]["variable1"]))
        .setDescription(eval(client.la[ls]["cmds"]["owner"]["changestatus"]["variable2"]))
      ]});
    try {
      var adminroles = client.settings.get(message.guild.id, "adminroles")

      var timeouterror = false;
      var filter = (reaction, user) => {
        return user.id === message.author.id;
      };
      var temptype = ""
      var tempmsg;

      tempmsg = await message.channel.send({embeds: [new MessageEmbed()
        .setTitle(eval(client.la[ls]["cmds"]["owner"]["changestatus"]["variable3"]))
        .setColor(es.color)
        .setDescription(eval(client.la[ls]["cmds"]["owner"]["changestatus"]["variable4"])).setFooter(es.footertext, es.footericon)
      ]})

      try {
        tempmsg.react("1️⃣")
        tempmsg.react("2️⃣")
        tempmsg.react("3️⃣")
        tempmsg.react("🟢")
      } catch (e) {
        return message.reply({embeds: [new MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["owner"]["changestatus"]["variable5"]))
          .setColor(es.wrongcolor)
          .setDescription(`\`\`\` ${e.message ? e.message : e.stack ? String(e.stack).dim.substr(0, 2000) : String(e).dim.substr(0, 2000)}\`\`\``.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        ]});
      }
      await tempmsg.awaitReactions(filter, {
          max: 1,
          time: 90000,
          errors: ["time"]
        })
        .then(collected => {
          var reaction = collected.first()
          reaction.users.remove(message.author.id)
          if (reaction.emoji.name === "1️⃣") temptype = "text"
          else if (reaction.emoji.name === "2️⃣") temptype = "type"
          else if (reaction.emoji.name === "3️⃣") temptype = "url"
          else if (reaction.emoji.name === "🟢") temptype = "state"
          else throw "You reacted with a wrong emoji"

        })
        .catch(e => {
          timeouterror = e;
        })
      if (timeouterror)
        return message.reply({embeds: [new MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["owner"]["changestatus"]["variable6"]))
          .setColor(es.wrongcolor)
          .setDescription(`\`\`\`${String(JSON.stringify(timeouterror)).substr(0, 2000)}\`\`\``.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        ]});

      if (temptype == "text") {
        tempmsg = await tempmsg.edit({embeds: [new MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["owner"]["changestatus"]["variable7"]))
          .setColor(es.color)
          .setDescription(`Example: \`${prefix}help | ${client.user.username.split(" ")[0]} | by: milrato.eu\`

        *Enter the text now!*`).setFooter(es.footertext, es.footericon)
        ]})
        await tempmsg.channel.awaitMessages(m => m.author.id == message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(async collected => {
            var msg = collected.first().content;
            let status = config
            status.status.text = msg;
            client.user.setActivity(msg.substr(0, 50), {
              type: config.status.type,
              url: config.status.url
            })
            fs.writeFile(`./botconfig/config.json`, JSON.stringify(status, null, 3), (e) => {
              if (e) {
                console.log(e.stack ? String(e.stack).dim : String(e).dim);
                return message.channel.send({embeds: [new MessageEmbed()
                  .setFooter(es.footertext, es.footericon)
                  .setColor(es.wrongcolor)
                  .setTitle(eval(client.la[ls]["cmds"]["owner"]["changestatus"]["variable8"]))
                  .setDescription(eval(client.la[ls]["cmds"]["owner"]["changestatus"]["variable9"]))
                ]})
              }
              return message.channel.send({embeds: [new MessageEmbed()
                .setFooter(es.footertext, es.footericon)
                .setColor(es.color)
                .setTitle(eval(client.la[ls]["cmds"]["owner"]["changestatus"]["variable10"]))
              ]})
            });
          }).catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply({embeds: [new MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["owner"]["changestatus"]["variable11"]))
            .setColor(es.wrongcolor)
            .setDescription(`\`\`\`${String(JSON.stringify(timeouterror)).substr(0, 2000)}\`\`\``.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          ]});

      } else if (temptype == "type") {
        tempmsg = await tempmsg.edit({ embeds: [new MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["owner"]["changestatus"]["variable12"]))
          .setColor(es.color)
          .setDescription(`
        1️⃣ **==** PLAYING
        
        2️⃣ **==** WATCHING
        
        3️⃣ **==** STREAMING

        4️⃣ **==** LISTENING
      
        5️⃣ **==** COMPETING
      
        *React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
        ]})
        try {
          tempmsg.react("4️⃣")
          tempmsg.react("5️⃣")
        } catch {

        }
        await tempmsg.awaitReactions(filter, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var reaction = collected.first()
            reaction.users.remove(message.author.id)
            if (reaction.emoji.name === "1️⃣") temptype = "PLAYING"
            else if (reaction.emoji.name === "2️⃣") temptype = "WATCHING"
            else if (reaction.emoji.name === "3️⃣") temptype = "STREAMING"
            else if (reaction.emoji.name === "4️⃣") temptype = "LISTENING"
            else if (reaction.emoji.name === "5️⃣") temptype = "COMPETING"
            else throw "You reacted with a wrong emoji"

          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply({embeds: [new MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["owner"]["changestatus"]["variable13"]))
            .setColor(es.wrongcolor)
            .setDescription(`\`\`\`${String(JSON.stringify(timeouterror)).substr(0, 2000)}\`\`\``.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          ]});


        let status = config
        status.status.type = temptype;
        client.user.setActivity(config.status.text, {
          type: temptype,
          url: config.status.url
        })
        fs.writeFile(`./botconfig/config.json`, JSON.stringify(status, null, 3), (e) => {
          if (e) {
            console.log(e.stack ? String(e.stack).dim : String(e).dim);
            return message.channel.send({embeds: [new MessageEmbed()
              .setFooter(es.footertext, es.footericon)
              .setColor(es.wrongcolor)
              .setTitle(eval(client.la[ls]["cmds"]["owner"]["changestatus"]["variable14"]))
              .setDescription(eval(client.la[ls]["cmds"]["owner"]["changestatus"]["variable15"]))
            ]})
          }
          return message.channel.send({embeds: [new MessageEmbed()
            .setFooter(es.footertext, es.footericon)
            .setColor(es.color)
            .setTitle(eval(client.la[ls]["cmds"]["owner"]["changestatus"]["variable16"]))
          ]})
        });

      } else if (temptype == "state") {
        tempmsg = await tempmsg.edit({embeds: [new MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["owner"]["changestatus"]["variable17"]))
          .setColor(es.color)
          .setDescription(`
        🟢 **==** ONLINE
        
        🟡 **==** IDLE
        
        🔴 **==** DO NOT DISTRUB (DND)
      
      
        *React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
        ]})
        try {
          tempmsg.react("🔴")
          tempmsg.react("🟡")
        } catch {

        }
        await tempmsg.awaitReactions(filter, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var reaction = collected.first()
            reaction.users.remove(message.author.id)
            if (reaction.emoji.name === "🟢") client.user.setStatus('online')  .then(t=>{
              return message.channel.send({embeds: [new MessageEmbed()
                .setFooter(es.footertext, es.footericon)
                .setColor(es.color)
                .setTitle(eval(client.la[ls]["cmds"]["owner"]["changestatus"]["variable18"]))
              ]})
            })
            .catch(e=>timeouterror=e);
            else if (reaction.emoji.name === "🟡") client.user.setStatus('idle')  .then(t=>{
              return message.channel.send({embeds: [new MessageEmbed()
                .setFooter(es.footertext, es.footericon)
                .setColor(es.color)
                .setTitle(eval(client.la[ls]["cmds"]["owner"]["changestatus"]["variable19"]))
              ]})
            })
            .catch(e=>timeouterror=e);
            else if (reaction.emoji.name === "🔴") client.user.setStatus('dnd')  .then(t=>{
              return message.channel.send({embeds: [new MessageEmbed()
                .setFooter(es.footertext, es.footericon)
                .setColor(es.color)
                .setTitle(eval(client.la[ls]["cmds"]["owner"]["changestatus"]["variable20"]))
              ]})
            })
            .catch(e=>timeouterror=e);
            else throw "You reacted with a wrong emoji"
            
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply({embeds: [new MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["owner"]["changestatus"]["variable21"]))
            .setColor(es.wrongcolor)
            .setDescription(`\`\`\`${String(JSON.stringify(timeouterror)).substr(0, 2000)}\`\`\``.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          ]});

      } else if (temptype == "url") {
        tempmsg = await tempmsg.edit({embeds: [new MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["owner"]["changestatus"]["variable22"]))
          .setColor(es.color)
          .setDescription(`
        Example: \`https://twitch.tv/#\` --> must be a twitch link

        *Enter the text now!*`).setFooter(es.footertext, es.footericon)
        ]})
        await tempmsg.channel.awaitMessages(m => m.author.id == message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(async collected => {
            var msg = collected.first().content;
            if (!isValidURL(msg))
              return message.channel.send({embeds: [new MessageEmbed()
                .setFooter(es.footertext, es.footericon)
                .setColor(es.wrongcolor)
                .setTitle(eval(client.la[ls]["cmds"]["owner"]["changestatus"]["variable23"]))
              ]})
            if (!msg.includes("twitch"))
              return message.channel.send({embeds: [new MessageEmbed()
                .setFooter(es.footertext, es.footericon)
                .setColor(es.wrongcolor)
                .setTitle(eval(client.la[ls]["cmds"]["owner"]["changestatus"]["variable24"]))
              ]})
            let status = config
            status.status.url = msg;
            client.user.setActivity(msg.substr(0, 50), {
              type: config.status.type,
              url: msg
            })
            fs.writeFile(`./botconfig/config.json`, JSON.stringify(status, null, 3), (e) => {
              if (e) {
                console.log(e.stack ? String(e.stack).dim : String(e).dim);
                return message.channel.send({embeds: [new MessageEmbed()
                  .setFooter(es.footertext, es.footericon)
                  .setColor(es.wrongcolor)
                  .setTitle(eval(client.la[ls]["cmds"]["owner"]["changestatus"]["variable25"]))
                  .setDescription(eval(client.la[ls]["cmds"]["owner"]["changestatus"]["variable26"]))
                ]})
              }
              return message.channel.send({embeds: [new MessageEmbed()
                .setFooter(es.footertext, es.footericon)
                .setColor(es.color)
                .setTitle(eval(client.la[ls]["cmds"]["owner"]["changestatus"]["variable27"]))
              ]})
            });
          }).catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply({embeds: [new MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["owner"]["changestatus"]["variable28"]))
            .setColor(es.wrongcolor)
            .setDescription(`\`\`\`${String(JSON.stringify(timeouterror)).substr(0, 2000)}\`\`\``.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          ]});

      } else {
        return message.reply({embeds: [new MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["owner"]["changestatus"]["variable29"]))
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
        ]});
      }

    } catch (e) {
      console.log(String(e.stack).dim.bgRed)
      return message.channel.send({embeds: [new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(eval(client.la[ls]["cmds"]["owner"]["changestatus"]["variable30"]))
      ]});
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