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
  name: "setup-anticaps",
  category: "💪 Setup",
  aliases: ["setupanticaps", "setup-caps", "setupcaps", "anticaps-setup", "anticapssetup"],
  cooldown: 5,
  usage: "setup-anticaps  -->  Follow the Steps",
  description: "Enable + Change the maximum Percent of UPPERCASE (caps) inside of a Message",
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
            value: `Enable & Set Anti Caps %`,
            description: "Enable to set an allowed % for CAPS in a Msg",
            emoji: "833101995723194437"
          },
          {
            value: `Disable Valid Code`,
            description: "Don't delete Messages with CAPS",
            emoji: "833101993668771842"
          },
          {
            value: "Settings",
            description: `Show the Current Settings of the Anti-Caps System`,
            emoji: "📑"
          },
          {
            value: "Cancel",
            description: `Cancel and stop the Ticket-Setup!`,
            emoji: "862306766338523166"
          }
        ]
        let Selection = new MessageMenu()
          .setPlaceholder('Click me to setup the Anti Caps System!').setCustomId('MenuSelection') 
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
          .setAuthor("Anti-Caps System Setup", 
          "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/282/a-button-blood-type_1f170-fe0f.png",
          "https://discord.gg/sngXqWK2eP")
          .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-anticaps"]["variable1"]))
        let used1 = false;
        //send the menu msg
        let menumsg = await message.reply(MenuEmbed, Selection)
        //function to handle the menuselection
        function menuselection(menu) {
          let menuoptiondata = menuoptions.find(v => v.value == menu.values[0])
          let menuoptionindex = menuoptions.findIndex(v => v.value == menu.values[0])
          if(menu.values[0] == "Cancel") return menu.reply(eval(client.la[ls]["cmds"]["setup"]["setup-anticaps"]["variable2"]))
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
              let tempmsg = await message.reply({embed: new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-anticaps"]["variable3"]))
                .setColor(es.color)
                .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-anticaps"]["variable4"]))
                .setFooter(es.footertext, es.footericon)
              });
              await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                  max: 1,
                  time: 90000,
                  errors: ["time"]
                }) .then(collected => {
                  var message = collected.first();
                  if (message.content) {
                    var userpercent = Number(message.content.trim().replace("%", "").split(" ")[0]);
                    if(userpercent > 100 || userpercent < 0) 
                      return message.reply({embed: new Discord.MessageEmbed()
                          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-anticaps"]["variable5"]))
                          .setColor(es.wrongcolor)
                          .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-anticaps"]["variable6"]))
                          .setFooter(es.footertext, es.footericon)
                        }); 
                    try {
                      client.settings.set(message.guild.id, userpercent, "anticaps.percent");
                      client.settings.set(message.guild.id, true, "anticaps.enabled");
                      return message.reply({embed: new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-anticaps"]["variable7"]))
                        .setColor(es.color)
                        .setDescription(`If a non Admin User types a message with more then ${userpercent}% amount of CAPS his message will be deleted + he will be "warned" (no warn system warn but yeah)`.substr(0, 2048))
                        .setFooter(es.footertext, es.footericon)
                      });
                    } catch (e) {
                      console.log(e.stack ? String(e.stack).grey : String(e).grey)
                      return message.reply({embed: new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-anticaps"]["variable8"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-anticaps"]["variable9"]))
                        .setFooter(es.footertext, es.footericon)
                      });
                    }
                  } else {
                    throw "you didn't ping a valid Channel"
                  }
                }) .catch(e => {
                  timeouterror = e;
                })

              if (timeouterror){
                return message.reply({embed: new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-anticaps"]["variable10"]))
                  .setColor(es.wrongcolor)
                  .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                  .setFooter(es.footertext, es.footericon)
                });
              }
          }
          case 1: {
            client.settings.set(message.guild.id, false, "anticaps.enabled");
            return message.reply({embed: new Discord.MessageEmbed()
              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-anticaps"]["variable11"]))
              .setColor(es.color)
              .setDescription(`To enabled it type \`${prefix}setup-anticaps\``.substr(0, 2048))
              .setFooter(es.footertext, es.footericon)
            });
          }
          case 2: {
            let thesettings = client.settings.get(message.guild.id, `anticaps`)
            return message.reply(new Discord.MessageEmbed()
              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-anticaps"]["variable12"]))
              .setColor(es.color)
              .setDescription(`**Enabled:** ${thesettings.enabled ? "<a:yes:833101995723194437>" : "<:no:833101993668771842>"}\n\n**Percentage, of Message allowed to be in caps:** \`${thesettings.percent} %\``.substr(0, 2048))
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
      return message.reply({embed: new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-anticaps"]["variable13"]))
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
