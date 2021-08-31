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
  name: "setup-membercount",
  category: "💪 Setup",
  aliases: ["setupmembercount", "membercount-setup", "membercountsetup", "setup-membercounter", "setupmembercounter"],
  cooldown: 5,
  usage: "setup-membercount  -->  Follow the Steps",
  description: "This Setup allows you to specify a Channel which Name should be renamed every 10 Minutes to a Member Counter of Bots, Users, or Members",
  memberpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    //ensure the database
    client.setups.ensure(message.guild.id,  {
      enabled: false,
      channel1: "no",
      message1: "🗣 Members: {member}",
      channel2: "no",
      message2: "🗣 Bots: {bot}",
      channel3: "no",
      message3: "🗣 All Users: {user}"
    },"membercount");
    try {
      var adminroles = client.settings.get(message.guild.id, "adminroles")

      var timeouterror = false;
      var filter = (reaction, user) => {
        return user.id === message.author.id;
      };
      var temptype = ""
      var tempmsg;

      tempmsg = await message.reply(new Discord.MessageEmbed()
        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-membercount"]["variable1"]))
        .setColor(es.color)
        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-membercount"]["variable2"])).setFooter(es.footertext, es.footericon)
      )
      const d2p = (bool) => bool ? "`✔️ Enabled`" : "`❌ Disabled`"; 
      try {
        tempmsg.react("1️⃣")
        tempmsg.react("2️⃣")
        tempmsg.react("3️⃣")
        tempmsg.react("4️⃣")
        tempmsg.react("📑")
      } catch (e) {
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-membercount"]["variable3"]))
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
          if (reaction.emoji.name === "1️⃣") temptype = "toggle"
          else if (reaction.emoji.name === "2️⃣") temptype = "1"
          else if (reaction.emoji.name === "3️⃣") temptype = "2"
          else if (reaction.emoji.name === "4️⃣") temptype = "3"
          else if (reaction.emoji.name === "📑") temptype = "thesettings"
          else throw "You reacted with a wrong emoji"
        })
        .catch(e => {
          timeouterror = e;
        })
      if (timeouterror)
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-membercount"]["variable4"]))
          .setColor(es.wrongcolor)
          .setDescription(`Cancelled the Operation!`.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        );

      if(temptype == "toggle"){
        client.setups.set(message.guild.id, !client.setups.get(message.guild.id, `membercount.enabled`), `membercount.enabled`)
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-membercount"]["variable5"]))
          .setColor(es.color)
          .setDescription(`If you setupped the Member Counter 1, 2, or/and 3 it will change the Name every 10 Minutes!`.substr(0, 2048))
          .setFooter(es.footertext, es.footericon)
        );
      } else if(temptype == "1" || temptype == "2" || temptype == "3"){
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-membercount"]["variable6"]))
        .setColor(es.color)
        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-membercount"]["variable7"])).setFooter(es.footertext, es.footericon)
        })
        await tempmsg.channel.awaitMessages(m=>m.author.id == message.author.id, {
          max: 1,
          time: 90000,
          errors: ["time"]
        })
        .then(async collected => {
          var message = collected.first();
          if(!message) throw "NO MESSAGE SENT";
          let channel = message.mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first() || message.guild.channels.cache.get(message.content);
          if(channel){
            var settts = client.setups.get(message.guild.id, `membercount`);
            let curmessage = "";
            if(temptype == "1") {
              if(settts.channel2 == channel.id || settts.channel3 == channel.id) throw "This Channel is already setup!"
              curmessage = settts.message1
            }
            if(temptype == "2") {
              if(settts.channel1 == channel.id || settts.channel3 == channel.id) throw "This Channel is already setup!"
              curmessage = settts.message2
            }
            if(temptype == "3") {
              if(settts.channel2 == channel.id || settts.channel1 == channel.id) throw "This Channel is already setup!"
              curmessage = settts.message3
            }
            if(temptype == "1") client.setups.set(message.guild.id, channel.id, `membercount.channel1`)
            if(temptype == "2") client.setups.set(message.guild.id, channel.id, `membercount.channel2`)
            if(temptype == "3") client.setups.set(message.guild.id, channel.id, `membercount.channel3`)

            message.reply(new Discord.MessageEmbed()
              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-membercount"]["variable8"]))
              .setColor(es.color)
              .setDescription(`Current Name: \`${curmessage}\``.substr(0, 2048))
              .setFooter(es.footertext, es.footericon)
            );
            

            tempmsg = await message.reply({embed: new Discord.MessageEmbed()
              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-membercount"]["variable9"]))
              .setColor(es.color)
              .setDescription(`Current Name: \`${curmessage}\`

**Examples:**
> \`🗣 Members: {member}\`
> \`🗣 Bots: {bot} \`
> \`🗣 All Users: {user}\`

> \`{member}\` will be replaced with the amount of all Members (Humans)
> \`{bot}\` will be replaced with the amount of all bots
> \`{user}\` will be replaced with the amount of all users, no matter if bot or not

*Send the Name NOW!, mind that the Name must be shorter then 32 Characters!!!*`).setFooter(es.footertext, es.footericon)
              })
              await tempmsg.channel.awaitMessages(m=>m.author.id == message.author.id, {
                max: 1,
                time: 90000,
                errors: ["time"]
              })
              .then(async collected => {
                var message = collected.first();
                if(!message) throw "NO MESSAGE SENT";
                let name = message.content;
                if(name && name.length <= 32){
                  
                  if(temptype == "1") client.setups.set(message.guild.id, name, `membercount.message1`)
                  if(temptype == "2") client.setups.set(message.guild.id, name, `membercount.message2`)
                  if(temptype == "3") client.setups.set(message.guild.id, name, `membercount.message3`)
                  channel.setName(String(name)
                    .replace(/{user}/i, message.guild.memberCount)
                    .replace(/{member}/i, message.guild.members.cache.filter(member => !member.user.bot).size)
                    .replace(/{bot}/i, message.guild.members.cache.filter(member => member.user.bot).size)
                    .replace(/{users}/i,  message.guild.memberCount)
                    .replace(/{members}/i, message.guild.members.cache.filter(member => !member.user.bot).size)
                    .replace(/{bots}/i, message.guild.members.cache.filter(member => member.user.bot).size)
                  )
                  return message.reply(new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-membercount"]["variable10"]))
                    .setColor(es.color)
                    .setDescription(`Example: \`${String(name)
                      .replace(/{user}/i, message.guild.memberCount)
                      .replace(/{member}/i, message.guild.members.cache.filter(member => !member.user.bot).size)
                      .replace(/{bot}/i, message.guild.members.cache.filter(member => member.user.bot).size)
                      .replace(/{users}/i,  message.guild.memberCount)
                      .replace(/{members}/i, message.guild.members.cache.filter(member => !member.user.bot).size)
                      .replace(/{bots}/i, message.guild.members.cache.filter(member => member.user.bot).size)}\``.substr(0, 2048))
                    .setFooter(es.footertext, es.footericon)
                  );
                }
                else{
                  throw "No Name added, or the Name is too long!";
                }
              })
              .catch(e => {
                console.log(e.stack ? String(e.stack).grey : String(e).grey)
                timeouterror = e;
              })
            if (timeouterror)
              return message.reply(new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-membercount"]["variable11"]))
                .setColor(es.wrongcolor)
                .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                .setFooter(es.footertext, es.footericon)
              );
          }
          else{
            throw "NO CHANNEL PINGED / NO ID ADDED";
          }
        })
        .catch(e => {
          timeouterror = e;
        })
      if (timeouterror)
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-membercount"]["variable12"]))
          .setColor(es.wrongcolor)
          .setDescription(`Cancelled the Operation!`.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        );
      } else if (temptype == "disable") {
        
      }
       else if (temptype == "thesettings") {
        let thesettings = client.setups.get(message.guild.id, `membercount`)
        console.log(thesettings)
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-membercount"]["variable13"]))
          .setColor(es.color)
          .setDescription(`**Enabled: ${thesettings.enabled ? "<a:yes:833101995723194437>" : "<:no:833101993668771842>"}

**Channel-1: ${thesettings.channel1 == "no" ? "Not Setupped" : `<#${thesettings.channel1}> | \`${thesettings.channel1}\``}**\n**Message of Channel-1:** \`${thesettings.message1.replace(/{user}/i, message.guild.memberCount)
  .replace(/{member}/i, message.guild.members.cache.filter(member => !member.user.bot).size)
  .replace(/{bot}/i, message.guild.members.cache.filter(member => member.user.bot).size)
  .replace(/{users}/i,  message.guild.memberCount)
  .replace(/{members}/i, message.guild.members.cache.filter(member => !member.user.bot).size)
  .replace(/{bots}/i, message.guild.members.cache.filter(member => member.user.bot).size)
}\`

**Channel-2: ${thesettings.channel2 == "no" ? "Not Setupped" : `<#${thesettings.channel2}> | \`${thesettings.channel2}\``}**\n**Message of Channel-1:** \`${thesettings.message2.replace(/{user}/i, message.guild.memberCount)
  .replace(/{member}/i, message.guild.members.cache.filter(member => !member.user.bot).size)
  .replace(/{bot}/i, message.guild.members.cache.filter(member => member.user.bot).size)
  .replace(/{users}/i,  message.guild.memberCount)
  .replace(/{members}/i, message.guild.members.cache.filter(member => !member.user.bot).size)
  .replace(/{bots}/i, message.guild.members.cache.filter(member => member.user.bot).size)
}\`

**Channel-3: ${thesettings.channel3 == "no" ? "Not Setupped" : `<#${thesettings.channel3}> | \`${thesettings.channel3}\``}**\n**Message of Channel-1:** \`${thesettings.message3.replace(/{user}/i, message.guild.memberCount)
  .replace(/{member}/i, message.guild.members.cache.filter(member => !member.user.bot).size)
  .replace(/{bot}/i, message.guild.members.cache.filter(member => member.user.bot).size)
  .replace(/{users}/i,  message.guild.memberCount)
  .replace(/{members}/i, message.guild.members.cache.filter(member => !member.user.bot).size)
  .replace(/{bots}/i, message.guild.members.cache.filter(member => member.user.bot).size)
}\`

**Cooldown:** Updating the Channels every \`10 Minutes\` with a 2min Delay between each one!`.substr(0, 2048))
          .setFooter(es.footertext, es.footericon)
        );
      } else {
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-membercount"]["variable14"]))
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
        );
      }

    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-membercount"]["variable15"]))
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