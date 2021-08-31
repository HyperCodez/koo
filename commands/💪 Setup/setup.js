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
  name: "setup",
  category: "💪 Setup",
  aliases: [""],
  cooldown: 5,
  usage: "setup  -->  Follow the Steps",
  description: "Shows all setup commands",
  memberpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language");
    try {
      first_layer()
        async function first_layer(){
          let menuoptions = [
            {
              value: "setup-admin",
              description: `Setup Roles/Users for all/specific Admin Cmds`,
              emoji: "🔨"
            },
            {
              value: "setup-admincmdlog",
              description: `Setup a Logger for Admin Commands to a Channel`,
              emoji: "📑"
            },
            {
              value: "setup-aichat",
              description: `Setup a fun AI-Chat System to chat with me`,
              emoji: "💬"
            },
            {
              value: "setup-anticaps",
              description: `Setup a Anit-CAPS System to prevent CAPS-only msgs`,
              emoji: "🅰️"
            },
            {
              value: "setup-antidiscord",
              description: `Setup a Anit-DISCORD System to prevent DC-LINKS`,
              emoji: "787321652345438228"
            },
            {
              value: "setup-antilink",
              description: `Setup a Anit-LINK System to prevent LINKS`,
              emoji: "🔗"
            },
            {
              value: "setup-apply",
              description: `Setup up to 5 different Apply Systems`,
              emoji: "📋"
            },
            {
              value: "setup-autoembed",
              description: `Define Channel(s) to replace messages with EMBEDS`,
              emoji: "📰"
            },
            {
              value: "setup-automeme",
              description: `Define a Channel to post MEMES every Minute`,
              emoji: "862749865460498524"
            },
            {
              value: "setup-autonsfw",
              description: `Define a Channel to post NSFW every Minute`,
              emoji: "🔞"
            },
            {
              value: "setup-blacklist",
              description: `Manage the Word(s)-Blacklist`,
              emoji: "🔠"
            },
            {
              value: "setup-commands",
              description: `Enable/Disable specific Commands`,
              emoji: "⚙️"
            },
            {
              value: "setup-counter",
              description: `Setup a fun Number-Counter Channel`,
              emoji: "#️⃣"
            },
            {
              value: "setup-customcommand",
              description: `Setup up to 20 different Custom-Commands`,
              emoji: "⌨️"
            },
            {
              value: "setup-dailyfact",
              description: `Setup a Channel to post daily Facts`,
              emoji: "🗓"
            },
            {
              value: "setup-embed",
              description: `Setup the Look of the Embeded Messages`,
              emoji: "📕"
            },
            {
              value: "setup-jtc",
              description: `Setup the Join-To-Create Channel(s)`,
              emoji: "🔈"
            },
            {
              value: "setup-keyword",
              description: `Setup up to 20 different Keyword-Messages`,
              emoji: "📖"
            },
            {
              value: "setup-language",
              description: `Manage the Bot's Language`,
              emoji: "🇬🇧"
            },
            {
              value: "setup-leave",
              description: `Manage the Leave Messages`,
              emoji: "📤"
            },
            {
              value: "setup-logger",
              description: `Setup the Audit-Log`,
              emoji: "🛠"
            },
            {
              value: "setup-membercount",
              description: `Setup up to 3 different Member-Counters`,
              emoji: "📈"
            },
            {
              value: "setup-radio",
              description: `Setup the Radio/Waitingroom System`,
              emoji: "📻"
            },
            {
              value: "setup-rank",
              description: `Setup the Ranking System`,
              emoji: "📊"
            },
            {
              value: "setup-reactionrole",
              description: `Setup Infinite Reaction Roles`,
              emoji: "📌"
            },
            {
              value: "setup-reportlog",
              description: `Setup the Report System & Channel`,
              emoji: "🗃"
            },
            {
              value: "setup-roster",
              description: `Setup the Roster System`,
              emoji: "📜"
            },
            {
              value: "setup-serverstats",
              description: `Setup up to 3 different Member-Counters`,
              emoji: "📈"
            },
            {
              value: "setup-suggestion",
              description: `Setup the Suggestion System`,
              emoji: "💡"
            },
            {
              value: "setup-ticket",
              description: `Setup up to 5 different Ticket-Systems`,
              emoji: "📨"
            },
            {
              value: "setup-tiktok",
              description: `Setup up to 3 different TikTok Logger Channels`,
              emoji: "840503976315060225"
            },
            {
              value: "setup-twitch",
              description: `Setup up to 5 different Twitch Logger Channels`,
              emoji: "840260133753061408"
            },
            {
              value: "setup-twitter",
              description: `Setup up to 2 different Twitter Logger Channels`,
              emoji: "840255600851812393"
            },
            {
              value: "setup-validcode",
              description: `Setup the Valid-Code System`,
              emoji: "842813038037696595"
            },
            {
              value: "setup-warn",
              description: `Setup the Warn System Settings`,
              emoji: "🚫"
            },
            {
              value: "setup-welcome",
              description: `Setup the Welcome System/Messages`,
              emoji: "📥"
            },
            {
              value: "setup-youtube",
              description: `Setup up to 5 different Youtube Logger Channels`,
              emoji: "🚫"
            },
          ]
          let Selection1 = new MessageMenu()
            .setPlaceholder('Click me to setup the (1/3) Systems [A-C]!').setCustomId('MenuSelection') 
            .setMaxValues(1).setMinValues(1);
          let Selection2 = new MessageMenu()
            .setPlaceholder('Click me to setup the (2/3) Systems [C-R]!').setCustomId('MenuSelection') 
            .setMaxValues(1).setMinValues(1);
          let Selection3 = new MessageMenu()
            .setPlaceholder('Click me to setup the (3/3) Systems [R-Z]!').setCustomId('MenuSelection') 
            .setMaxValues(1).setMinValues(1);
          menuoptions.forEach((option, index) => {
            if(index < Math.ceil(menuoptions.length/3)){
              let row = new MessageMenuOption()
                .setLabel(option.label ? option.label : option.value)
                .setValue(option.value).setDefault() 
                .setDescription(option.description.substr(0, 50))
              if(option.emoji) row.setEmoji(option.emoji) 
              Selection1.addOption(row)
            }
            if(index >= Math.ceil(menuoptions.length/3) && index < 2*Math.ceil(menuoptions.length/3)){
              let row = new MessageMenuOption()
                .setLabel(option.label ? option.label : option.value)
                .setValue(option.value).setDefault() 
                .setDescription(option.description.substr(0, 50))
              if(option.emoji) row.setEmoji(option.emoji) 
              Selection2.addOption(row)
            }
            if(index >= 2*Math.ceil(menuoptions.length/3)){
              let row = new MessageMenuOption()
                .setLabel(option.label ? option.label : option.value)
                .setValue(option.value).setDefault() 
                .setDescription(option.description.substr(0, 50))
              if(option.emoji) row.setEmoji(option.emoji) 
              Selection3.addOption(row)
            }
          })
          //define the embed
          let MenuEmbed1 = new Discord.MessageEmbed()
            .setColor(es.color)
            .setAuthor("Setup-Systems | (1/3) [A-C]", 
            "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/lg/57/gear_2699.png",
            "https://discord.gg/sngXqWK2eP")
            .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup"]["variable1"]))
          let MenuEmbed2 = new Discord.MessageEmbed()
            .setColor(es.color)
            .setAuthor("Setup-Systems | (2/3) [C-R]", 
            "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/lg/57/gear_2699.png",
            "https://discord.gg/sngXqWK2eP")
            .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup"]["variable2"]))
          let MenuEmbed3 = new Discord.MessageEmbed()
            .setColor(es.color)
            .setAuthor("Setup-Systems | (3/3) [R-Z]", 
            "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/lg/57/gear_2699.png",
            "https://discord.gg/sngXqWK2eP")
            .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup"]["variable3"]))
          //send the menu msg
          let menumsg1 = await message.reply(MenuEmbed1, Selection1)
          let menumsg2 = await message.reply(MenuEmbed2, Selection2)
          let menumsg3 = await message.reply(MenuEmbed3, Selection3)
          //function to handle the menuselection
          function menuselection(menu) {
            let menuoptiondata = menuoptions.find(v => v.value == menu.values[0])
            let menuoptionindex = menuoptions.findIndex(v => v.value == menu.values[0])
            menu.deferUpdate();
            handle_the_picks(menuoptionindex, menuoptiondata)
          }
          //Event
          client.on('clickMenu', (menu) => {
            if (menu.message.id === menumsg1.id) {
              if (menu.user.id === cmduser.id) {
                menuselection(menu);
              }
              else menu.reply(`<:no:833101993668771842> You are not allowed to do that! Only: <@${cmduser.id}>`, true);
            }
            if (menu.message.id === menumsg2.id) {
            if (menu.user.id === cmduser.id) {
               menuselection(menu);
            }
            else menu.reply(`<:no:833101993668771842> You are not allowed to do that! Only: <@${cmduser.id}>`, true);
          }
            if (menu.message.id === menumsg3.id) {
            if (menu.user.id === cmduser.id) {
              menuselection(menu);
            }
            else menu.reply(`<:no:833101993668771842> You are not allowed to do that! Only: <@${cmduser.id}>`, true);
          }
          });
        }

        async function handle_the_picks(menuoptionindex, menuoptiondata) {
          require(`./${menuoptiondata.value.toLowerCase()}`).run(client, message, args, cmduser, text, prefix);
        }


      return;
      const emojis = [
        "🚫", "🔨", "🅰️", "🅱️", "🔗", "📩", "🛠", "📘", "⚙️", "💯", "👍", "🔈", "🆗", "📤", "💥", "📻", "🔱", "📌", "📯", "📑", "💡", "🏷", "840260133753061408", "840255600851812393", "📥"
      ];
      var items = client.commands.filter((cmd) => cmd.category.toLowerCase().includes("setup")).map((cmd) => `\`${cmd.name}\``);
      var items2 = client.commands.filter((cmd) => cmd.category.toLowerCase().includes("setup")).map((cmd) => `*${cmd.description}*`);

      var embed = new MessageEmbed()
      .setColor(es.color)
      .setFooter(es.footertext, es.footericon)
      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup"]["variable4"]))
      var embed2 = new MessageEmbed()
      .setColor(es.color)
      .setFooter(es.footertext, es.footericon)
      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup"]["variable5"]))


      for(let i = 0; i < 20; i++){
        embed.addField(`${emojis[i] ? emojis[i].length == 18 ? `${emojistring(client.guilds.cache.get("773668217163218944").emojis.cache.find(emoji => emoji.customId === emojis[i]))}`: emojis[i] + " " : ""}`+ items[i], items2[i], true);
      }
      for(let i = 20; i < items.length; i++){
        embed2.addField(`${emojis[i] ? emojis[i].length == 18 ? `${emojistring(client.guilds.cache.get("773668217163218944").emojis.cache.find(emoji => emoji.customId === emojis[i]))}`: emojis[i] + " " : ""}`+ items[i], items2[i], true);
      } 
      function emojistring(emoji){
        if(!emoji || !emoji.customId) return "";
        var string = "<"
        if(emoji.customId.length == 18){
          if(emoji.animated) string += "a"
          string += `:${emoji.name}:${emoji.customId}>`
        }else {
          string = emoji.name
        }
        return string;
      }

      const themsg = await message.reply(embed);
      const themsg2 = await message.reply(embed2);


      for(let i = 0; i < 20; i++){
        try{
          themsg.react(emojis[i]);
        }catch{
          break;
        }
      }
      for(let i = 20; i < items.length; i++){
        try{
          themsg2.react(emojis[i]);
        }catch{
          break;
        }
      }

      var error = false;
      themsg.awaitReactions((r, u) => u.id == cmduser.id, {max: 1, time: 60000, errors: ["time"]}).then(collected=>{
        themsg.reactions.removeAll().catch(error => {if(error) return;});
        themsg2.reactions.removeAll().catch(error => {if(error) return;});
        require(`./${client.commands.filter((cmd) => cmd.category.toLowerCase().includes("setup")).map(cmd=>cmd.name)[emojis.indexOf(collected.first().emoji.customId || collected.first().emoji.name)]}.js`).run(client, message, args, cmduser, text, prefix);
      }).catch(e=>{
        themsg.reactions.removeAll().catch(error => {if(error) return;});
        themsg2.reactions.removeAll().catch(error => {if(error) return;});
        if(!error) {
          error = true;
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup"]["variable6"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
        }

      })
      themsg2.awaitReactions((r, u) => u.id == cmduser.id, {max: 1, time: 60000, errors: ["time"]}).then(collected=>{
        themsg.reactions.removeAll().catch(error => {if(error) return;});
        themsg2.reactions.removeAll().catch(error => {if(error) return;});
        require(`./${client.commands.filter((cmd) => cmd.category.toLowerCase().includes("setup")).map(cmd=>cmd.name)[emojis.indexOf(collected.first().emoji.customId || collected.first().emoji.name)]}.js`).run(client, message, args, cmduser, text, prefix);
      }).catch(e=>{
        themsg.reactions.removeAll().catch(error => {if(error) return;});
        themsg2.reactions.removeAll().catch(error => {if(error) return;});
        if(!error) {
          error = true;
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup"]["variable7"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
        }
      })
      /*
        first_layer()
        async function first_layer(){
          let menuoptions = [
            {
              value: "Toggle Data",
              description: `${data ? `A` : `B`}`,
              emoji: "🔨"
            },
            {
              value: "Pick Data",
              description: `Pick this and it will be cool`,
              emoji: "📤"
            },
            {
              value: "Cancel",
              description: `Cancel and stop the Ticket-Setup!`,
              emoji: "833101993668771842"
            }
          ]
          let Selection = new MessageMenu()
            .setPlaceholder('Click me to setup the Warn System!').setCustomId('MenuSelection') 
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
            .setAuthor("Warn Setup", 
            "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/lg/57/gear_2699.png",
            "https://discord.gg/sngXqWK2eP")
            .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup"]["variable8"]))
          let used1 = false;
          //send the menu msg
          let menumsg = await message.reply(MenuEmbed, Selection)
          //function to handle the menuselection
          function menuselection(menu) {
            let menuoptiondata = menuoptions.find(v => v.value == menu.values[0])
            let menuoptionindex = menuoptions.findIndex(v => v.value == menu.values[0])
            if(menu.values[0] == "Cancel") return menu.reply(eval(client.la[ls]["cmds"]["setup"]["setup"]["variable9"]))
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

        async function handle_the_picks(menuoptionindex, menuoptiondata) {
          switch(menuoptionindex){
            case 0: {

            }
            case 1: {

            }
            case 2: {

            }
          }

        }
      */
      } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup"]["variable10"]))
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
