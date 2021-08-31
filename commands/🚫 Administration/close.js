const {
  MessageEmbed, Collection, MessageAttachment, Permissions
} = require("discord.js");
const Discord = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const moment = require("moment")
const officegen = require('officegen')
const fs = require('fs')
const {
  databasing, delay, create_transcript, GetUser, GetRole
} = require("../../handlers/functions");
const { MessageButton, MessageActionRow } = require('discord.js')
module.exports = {
  name: "ticket",
  category: "🚫 Administration",
  aliases: ["close", "manageticket"],
  cooldown: 2,
  usage: "ticket",
  description: "Manages the Ticket, closes, deletes, createlog, etc. etc.",
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    try {
      let adminroles = client.settings.get(message.guild.id, "adminroles")
      let cmdroles = client.settings.get(message.guild.id, "cmdadminroles.ticket")
      let cmdroles2 = client.settings.get(message.guild.id, "cmdadminroles.close")
      try{for (const r of cmdroles2) cmdrole.push(r)}catch{}
     
      let ticket = client.setups.get(message.guild.id, "ticketsystem")
      if (!ticket.enabled) return message.reply({content : eval(client.la[ls]["cmds"]["administration"]["close"]["variable1"])})
      if(!client.setups.get("TICKETS", "tickets").includes(message.channel.id) &&
          !client.setups.get("TICKETS", "tickets2").includes(message.channel.id) &&
          !client.setups.get("TICKETS", "tickets3").includes(message.channel.id) &&
          !client.setups.get("TICKETS", "tickets4").includes(message.channel.id) &&
          !client.setups.get("TICKETS", "tickets5").includes(message.channel.id) &&
          !client.setups.get("TICKETS", "applytickets1").includes(message.channel.id) &&
          !client.setups.get("TICKETS", "applytickets2").includes(message.channel.id) &&
          !client.setups.get("TICKETS", "applytickets3").includes(message.channel.id) &&
          !client.setups.get("TICKETS", "applytickets4").includes(message.channel.id) &&
          !client.setups.get("TICKETS", "applytickets5").includes(message.channel.id) 
      ) return message.reply({content : eval(client.la[ls]["cmds"]["administration"]["close"]["variable2"])})
      var cmdrole = []
        if(cmdroles.length > 0){
          for(const r of cmdroles){
            if(message.guild.roles.cache.get(r)){
              cmdrole.push(` | <@&${r}>`)
            }
            else if(message.guild.members.cache.get(r)){
              cmdrole.push(` | <@${r}>`)
            }
            else {
              console.log("F")
              console.log(r)
              try{ client.settings.remove(message.guild.id, r, `cmdadminroles.ticket`) }catch{ }
              try{ client.settings.remove(message.guild.id, r, `cmdadminroles.close`) }catch{ }
            }
          }
        }
      if ((Array.from(message.member.roles.cache.values()) && !message.member.roles.cache.some(r => cmdroles.includes(r.id))) && !cmdroles.includes(message.author.id) && (Array.from(message.member.roles.cache.values()) && !message.member.roles.cache.some(r => adminroles.includes(r ? r.id : r))) && !Array(message.guild.ownerID, config.ownerid).includes(message.author.id) && !message.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR]) && !message.member.roles.cache.some(r => ticket.adminroles.includes(r ? r.id : r)))
        return message.reply({embeds : [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(eval(client.la[ls]["cmds"]["administration"]["close"]["variable3"]))
          .setDescription(eval(client.la[ls]["cmds"]["administration"]["close"]["variable4"]))
        ]});
        
        


        var originalowner = message.author;
        
          var timeouterror = false;
          var filter = (reaction, user) => {
            return user.id === message.author.id;
          };
          var temptype = ""
          var tempmsg;

          let button_close = new MessageButton().setStyle('PRIMARY').setCustomId('ticket_close').setLabel('Close').setEmoji("🔒") 
          let button_delete = new MessageButton().setStyle('SECONDARY').setCustomId('ticket_delete').setLabel("Delete").setEmoji("🗑️")
          let button_transcript = new MessageButton().setStyle('blurple').setCustomId('ticket_transcript').setLabel("Transcript").setEmoji("📑")
          let button_user = new MessageButton().setStyle('SUCCESS').setCustomId('ticket_user').setLabel("Manage Users").setEmoji("👤")
          let button_role = new MessageButton().setStyle('SUCCESS').setCustomId('ticket_role').setLabel("Manage Roles").setEmoji("📌") 
          let buttonRow1 = new MessageActionRow()
          .addComponent(button_close).addComponent(button_delete).addComponent(button_transcript)
          let buttonRow2 = new MessageActionRow()
          .addComponent(button_user).addComponent(button_role)
          const allbuttons = [buttonRow1, buttonRow2]
          
          tempmsg = await message.reply({embeds: [new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["administration"]["close"]["variable5"]))
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setDescription(`> 🔒 **== Close** the Ticket
            
>  🗑 **== Delete** the Ticket

> 📑 **== Create a Log** of the Ticket

> 👤 **==** Manage **User** Access (Add/Remove)

> 📌 **==** Manage **Role** Access (Add/Remove)`).setFooter(es.footertext, es.footericon)
          ], components: allbuttons})
          return; 
    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply({embeds :[new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(eval(client.la[ls]["cmds"]["administration"]["close"]["variable6"]))
        .setDescription(eval(client.la[ls]["cmds"]["administration"]["close"]["variable7"]))
      ]});
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
