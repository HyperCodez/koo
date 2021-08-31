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
  name: "setup-validcode",
  category: "💪 Setup",
  aliases: ["setupvalidcode", "validcode-setup", "validcodesetup"],
  cooldown: 5,
  usage: "setup-validcode  -->  Follow the Steps",
  description: "This Setup allows you to send logs into a specific Channel, when someone enters a the Command: report",
  memberpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    try {
      ///////////////////////////////////////
      ///////////////////////////////////////
      ///////////////////////////////////////
      
      
      //function to handle true/false
      const d2p = (bool) => bool ? "`✔️ Enabled`" : "`❌ Disabled`"; 
      //call the first layer
      first_layer()

      //function to handle the FIRST LAYER of the SELECTION
      async function first_layer(){
        let menuoptions = [
          {
            value: `${client.settings.get(message.guild.id, `validcode`) ? "Disable" : "Enable"} Valid Code`,
            description: client.settings.get(message.guild.id, `validcode`) ? "Don't do anything with Messages containing Code" : "React to messages containing a Valid Code Snippet",
            emoji: client.settings.get(message.guild.id, `validcode`) ? "833101993668771842" : "833101995723194437"
          },
          {
            value: "Settings",
            description: `Show the Current Settings of the Valid-Code System`,
            emoji: "📑"
          },
          {
            value: "Cancel",
            description: `Cancel and stop the Ticket-Setup!`,
            emoji: "862306766338523166"
          }
        ]
        let Selection = new MessageMenu()
          .setPlaceholder('Click me to setup the Valid-Code System!').setCustomId('MenuSelection') 
          .setMaxValues(1).setMinValues(1);
        menuoptions.forEach(option => {
          let row = new MessageMenuOption()
            .setLabel(option.label ? option.label : option.value)
            .setValue(option.value).setDefault() 
            .setDescription(option.description.substr(0, 50))
          if(option.emoji) row.setEmoji(option.emoji) 
          Selection.addOption(row)
        })
        //define the embed
        let MenuEmbed = new Discord.MessageEmbed()
          .setColor(es.color)
          .setAuthor("Valid-Code System Setup", 
          "https://cdn.discordapp.com/emojis/858405056238714930.gif?v=1",
          "https://discord.gg/sngXqWK2eP")
          .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-validcode"]["variable1"]))
        let used1 = false;
        //send the menu msg
        let menumsg = await message.reply(MenuEmbed, Selection)
        //function to handle the menuselection
        function menuselection(menu) {
          let menuoptiondata = menuoptions.find(v => v.value == menu.values[0])
          let menuoptionindex = menuoptions.findIndex(v => v.value == menu.values[0])
          if(menu.values[0] == "Cancel") return menu.reply(eval(client.la[ls]["cmds"]["setup"]["setup-validcode"]["variable2"]))
          menu.deferUpdate(); used1 = true;
          handle_the_picks(menuoptionindex, menuoptiondata)
        }
        //Event
        client.on('clickMenu', (menu) => {
          if (menu.message.id === menumsg.id) {
            if (menu.user.id === cmduser.id) {
              if(used1) return menu.reply(`<:no:833101993668771842> You already selected something, this Selection is now disabled!`, true);
              menuselection(menu);
            }
            else menu.reply(`<:no:833101993668771842> You are not allowed to do that! Only: <@${cmduser.id}>`, true);
          }
        });
      }

      //THE FUNCTION TO HANDLE THE SELECTION PICS
      async function handle_the_picks(menuoptionindex, menuoptiondata) {
        switch(menuoptionindex){
          case 0: {
            client.settings.set(message.guild.id, !client.settings.get(message.guild.id, `validcode`), `validcode`)
            return message.reply(new Discord.MessageEmbed()
              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-validcode"]["variable3"]))
              .setColor(es.color)
              .setFooter(es.footertext, es.footericon)
            );
          }
          case 1: {
          let thesettings = client.settings.get(message.guild.id, `validcode`)
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-validcode"]["variable4"]))
            .setColor(es.color)
            .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-validcode"]["variable5"]))
            .setFooter(es.footertext, es.footericon)
          );
          }
        }

      }

      ///////////////////////////////////////
      ///////////////////////////////////////
      ///////////////////////////////////////
    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-validcode"]["variable6"]))
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