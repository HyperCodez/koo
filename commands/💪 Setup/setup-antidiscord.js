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
  name: "setup-antidiscord",
  category: "💪 Setup",
  aliases: ["setupantidiscord", "setup-mod", "setupmod", "antidiscord-setup", "antidiscordsetup"],
  cooldown: 5,
  usage: "setup-antidiscord  -->  Follow the Steps",
  description: "Enable/Disable anti Discord Link advertisements",
  memberpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    try {
      ///////////////////////////////////////
      ///////////////////////////////////////
      ///////////////////////////////////////
      let tempmsg;
      
      //function to handle true/false
      const d2p = (bool) => bool ? "`✔️ Enabled`" : "`❌ Disabled`"; 
      //call the first layer
      first_layer()

      //function to handle the FIRST LAYER of the SELECTION
      async function first_layer(){
        let menuoptions = [
          {
            value: `${client.settings.get(message.guild.id, `antidiscord.enabled`) ? "Disable" : "Enable"} Anti Discord`,
            description: `${client.settings.get(message.guild.id, `antidiscord.enabled`) ? "Don't delete other Discord Links" : "Delete other Discord Links"}`,
            emoji: `${client.settings.get(message.guild.id, `antidiscord.enabled`) ? "833101993668771842" : "833101995723194437"}`
          },
          {
            value: "Settings",
            description: `Show the current Settings of the Anti-Discord System`,
            emoji: "📑"
          },
          {
            value: "Add Whitelist-Channel",
            description: `Allow Channels where DC-Links are allowed`,
            emoji: "💯"
          },
          {
            value: "Remove Whitelist-Channel",
            description: `Remove allowed Channels`,
            emoji: "💢"
          },
          {
            value: "Cancel",
            description: `Cancel and stop the Ticket-Setup!`,
            emoji: "862306766338523166"
          }
        ]
        let Selection = new MessageMenu()
          .setPlaceholder('Click me to setup the Anti-Discord-Links System!').setCustomId('MenuSelection') 
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
          .setAuthor("Anti-Discord-Links System Setup", 
          "https://cdn.discordapp.com/emojis/858405056238714930.gif?v=1",
          "https://discord.gg/sngXqWK2eP")
          .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-antidiscord"]["variable1"]))
        let used1 = false;
        //send the menu msg
        let menumsg = await message.reply(MenuEmbed, Selection)
        //function to handle the menuselection
        function menuselection(menu) {
          let menuoptiondata = menuoptions.find(v => v.value == menu.values[0])
          let menuoptionindex = menuoptions.findIndex(v => v.value == menu.values[0])
          if(menu.values[0] == "Cancel") return menu.reply(eval(client.la[ls]["cmds"]["setup"]["setup-antidiscord"]["variable2"]))
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
            client.settings.set(message.guild.id, !client.settings.get(message.guild.id, `antidiscord.enabled`), `antidiscord.enabled`)
            return message.reply(new Discord.MessageEmbed()
              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-antidiscord"]["variable3"]))
              .setColor(es.color)
              .setFooter(es.footertext, es.footericon)
            );
          }
          case 1: {
           let thesettings = client.settings.get(message.guild.id, `antidiscord`)
            return message.reply(new Discord.MessageEmbed()
              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-antidiscord"]["variable4"]))
              .setColor(es.color)
              .setDescription(`**Enabled:** ${thesettings.enabled ? "<a:yes:833101995723194437>" : "<:no:833101993668771842>"}\n\n**Witelisted Channels:** ${thesettings.whitelistedchannels.length > 0 ? `<#${thesettings.whitelistedchannels.join("> | <#")}>` : "No Channels Whitelisted!"}\n\n**Information:** *Anti Discord are not enabled in Tickets from THIS BOT*`.substr(0, 2048))
              .setFooter(es.footertext, es.footericon)
            );
          }
          case 2: {
            tempmsg = await message.reply({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-antidiscord"]["variable5"]))
          .setColor(es.color)
          .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-antidiscord"]["variable6"]))
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
              let antisettings = client.settings.get(message.guild.id, "antidiscord.whitelistedchannels")
              if (antisettings.includes(channel.id)) return message.reply({embed: new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-antidiscord"]["variable7"]))
                .setColor(es.wrongcolor)
                .setFooter(es.footertext, es.footericon)
              });
              try {
                client.settings.push(message.guild.id, channel.id, "antidiscord.whitelistedchannels");
                return message.reply({embed: new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-antidiscord"]["variable8"]))
                  .setColor(es.color)
                  .setDescription(`Every single Channel:\n<#${client.settings.get(message.guild.id, "antidiscord.whitelistedchannels").join(">\n<#")}>\nis not a checked by the Anti Discord Links System`.substr(0, 2048))
                  .setFooter(es.footertext, es.footericon)
                });
              } catch (e) {
                return message.reply({embed: new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-antidiscord"]["variable9"]))
                  .setColor(es.wrongcolor)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-antidiscord"]["variable10"]))
                  .setFooter(es.footertext, es.footericon)
                });
              }
            } else {
              throw "you didn't ping a valid Channel"
            }
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply({embed: new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-antidiscord"]["variable11"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          });
          }
          case 3: {
            tempmsg = await message.reply({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-antidiscord"]["variable12"]))
          .setColor(es.color)
          .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-antidiscord"]["variable13"]))
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
              let antisettings = client.settings.get(message.guild.id, "antidiscord.whitelistedchannels")
              if (!antisettings.includes(channel.id)) return message.reply({embed: new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-antidiscord"]["variable14"]))
                .setColor(es.wrongcolor)
                .setFooter(es.footertext, es.footericon)
              });
              try {
                client.settings.remove(message.guild.id, channel.id, "antidiscord.whitelistedchannels");
                return message.reply({embed: new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-antidiscord"]["variable15"]))
                  .setColor(es.color)
                  .setDescription(`Every single Channel:\n> <#${client.settings.get(message.guild.id, "antidiscord.whitelistedchannels").join(">\n> <#")}>\nis not checked by the Anti Discord Links System`.substr(0, 2048))
                  .setFooter(es.footertext, es.footericon)
                });
              } catch (e) {
                return message.reply({embed: new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-antidiscord"]["variable16"]))
                  .setColor(es.wrongcolor)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-antidiscord"]["variable17"]))
                  .setFooter(es.footertext, es.footericon)
                });
              }
            } else {
              throw "you didn't ping a valid Channel"
            }
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply({embed: new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-antidiscord"]["variable18"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          });
          }
        }

      }

      ///////////////////////////////////////
      ///////////////////////////////////////
      ///////////////////////////////////////
    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply({embed: new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-antidiscord"]["variable19"]))
      });
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
