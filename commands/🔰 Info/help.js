const {
	MessageEmbed, MessageButton, MessageActionRow
} = require("discord.js")
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const {
  duration, handlemsg
} = require("../../handlers/functions")
module.exports = {
  name: "help",
  category: "🔰 Info",
  aliases: ["h", "commandinfo", "halp", "hilfe"],
  usage: "help [Command/Category]",
  description: "Returns all Commmands, or one specific command",
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    try {
      if (args[0]) {
        const embed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null);
        const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
        var cat = false;
        if(args[0].toLowerCase().includes("cust")){
          let cuc = client.customcommands.get(message.guild.id, "commands");
          if (cuc.length < 1) cuc = [handlemsg(client.la[ls].cmds.info.help.error1)]
          else cuc = cuc.map(cmd => `\`${cmd.name}\``)
          const items = cuc


          const embed = new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle(eval(client.la[ls]["cmds"]["info"]["help"]["variable1"]))
            .setDescription(items.join(", "))
            .setFooter(handlemsg(client.la[ls].cmds.info.help.nocustom), client.user.displayAvatarURL());
          
          message.reply({embeds: [embed]})
          return;
        }var cat = false;
        if (!cmd) {
          cat = client.categories.find(cat => cat.toLowerCase().includes(args[0].toLowerCase()))
        }
        if (!cmd && (!cat || cat == null)) {
          return message.reply({embeds: [embed.setColor(es.wrongcolor).setDescription(handlemsg(client.la[ls].cmds.info.help.noinfo, {command: args[0].toLowerCase()}))]});
        } else if (!cmd && cat) {
          var category = cat;
          const items = client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
          const embed = new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle(eval(client.la[ls]["cmds"]["info"]["help"]["variable2"]))
            .setFooter(handlemsg(client.la[ls].cmds.info.help.nocustom, {prefix: prefix}), client.user.displayAvatarURL());

          if (category.toLowerCase().includes("custom")) {
            const cmd = client.commands.get(items[0].split("`").join("").toLowerCase()) || client.commands.get(client.aliases.get(items[0].split("`").join("").toLowerCase()));
            try {
              embed.setDescription(eval(client.la[ls]["cmds"]["info"]["help"]["variable3"]));
            } catch {}
          } else {
            embed.setDescription(eval(client.la[ls]["cmds"]["info"]["help"]["variable4"]))
          }
          return message.reply({embeds: [embed]})
        }
        if (cmd.name) embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.name), `\`${cmd.name}\``);
        if (cmd.name) embed.setTitle(handlemsg(client.la[ls].cmds.info.help.detail.about, {cmdname: cmd.name}));
        if (cmd.description) embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.desc), `\`\`\`${cmd.description}\`\`\``);
        if (cmd.aliases) try {
          embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.aliases), `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``);
        } catch {}
        if (cmd.cooldown) embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.cooldown), `\`\`\`${cmd.cooldown} Seconds\`\`\``);
        else embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.cooldown), `\`\`\`3 Seconds\`\`\``);
        if (cmd.usage) {
          embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.usage), `\`\`\`${prefix}${cmd.usage}\`\`\``);
          embed.setFooter(handlemsg(client.la[ls].cmds.info.help.detail.syntax), es.footericon);
        }
        return message.reply({embeds: [embed]});
      } else {
        let button_back = new MessageButton().setStyle('SUCCESS').setCustomId('1').setEmoji("833802907509719130").setLabel(handlemsg(client.la[ls].cmds.info.help.buttons.back))
        let button_home = new MessageButton().setStyle('DANGER').setCustomId('2').setEmoji("🏠").setLabel(handlemsg(client.la[ls].cmds.info.help.buttons.home))
        let button_forward = new MessageButton().setStyle('SUCCESS').setCustomId('3').setEmoji('832598861813776394').setLabel(handlemsg(client.la[ls].cmds.info.help.buttons.forward))
        let button_tutorial = new MessageButton().setStyle('LINK').setEmoji("840260133686870036").setLabel("Tutorial").setURL("https://youtu.be/E0R7d8gS908")
        let button_cat_information = new MessageButton().setStyle('PRIMARY').setCustomId('button_cat_information')/*.setLabel('​Information')*/.setEmoji("🔰").setDisabled(false);
        let button_cat_music = new MessageButton().setStyle('PRIMARY').setCustomId('button_cat_music')/*.setLabel('​Music Related')*/.setEmoji("🎶").setDisabled(false);
        let button_cat_settings = new MessageButton().setStyle('PRIMARY').setCustomId('button_cat_settings')/*.setLabel('​Settings & 👑 Owner & ⌨️Programming')*/.setEmoji("⚙").setDisabled(false);
        
        let button_cat_voice = new MessageButton().setStyle('PRIMARY').setCustomId('button_cat_voice')/*.setLabel('Voice & 📈 Ranking')*/.setEmoji("🎤").setDisabled(false);
        let button_cat_minigames = new MessageButton().setStyle('PRIMARY').setCustomId('button_cat_minigames')/*.setLabel('​Mini Games & 🕹️ Fun')*/.setEmoji("🎮").setDisabled(false);
        let button_cat_admin = new MessageButton().setStyle('PRIMARY').setCustomId('button_cat_admin')/*.setLabel('Administration & 💪 Setup')*/.setEmoji("🚫") .setDisabled(false);
        
        let button_cat_nsfw = new MessageButton().setStyle('PRIMARY').setCustomId('button_cat_nsfw')/*.setLabel('​NSFW')*/.setEmoji("🔞").setDisabled(false);
        let button_cat_customcommand = new MessageButton().setStyle('PRIMARY').setCustomId('button_cat_customcommand')/*.setLabel('​Custom Commands')*/.setEmoji("🦾").setDisabled(false);
        let button_cat_advertisement = new MessageButton().setStyle('PRIMARY').setCustomId('button_cat_advertisement')/*.setLabel('​Advertisement')*/.setEmoji("840259659163893820").setDisabled(false);
        let button_cat_overview = new MessageButton().setStyle('PRIMARY').setCustomId('button_cat_overview')/*.setLabel('​Advertisement')*/.setEmoji("833101995723194437").setDisabled(false);
        //array of all buttons
        

        let buttonRow1 = new MessageActionRow().addComponents([button_back,button_home, button_forward, button_tutorial])
        let buttonRow2 = new MessageActionRow().addComponents([button_cat_information,button_cat_music, button_cat_settings, button_cat_admin, button_cat_voice])
        let buttonRow3 = new MessageActionRow().addComponents([button_cat_minigames,button_cat_nsfw, button_cat_customcommand, button_cat_advertisement, button_cat_overview])
        const allbuttons = [buttonRow1, buttonRow2, buttonRow3]
        //define default embed
        let OverviewEmbed = new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter("Page Overview\n"+ client.user.username + " | Made by: milrato.eu", client.user.displayAvatarURL())
        .setTitle(eval(client.la[ls]["cmds"]["info"]["help"]["variable5"]))
        .addField(":muscle: **__My Features__**",
`>>> **58+ Systems**, like: <:twitter:840255600851812393> **Twitter-** & <:Youtube:840260133686870036> **Youtube-Auto-Poster** 
**Application-**, Ticket-, **Welcome-Images-** and Reaction Role-, ... Systems
:notes: An advanced <:Spotify:846090652231663647> **Music System** with **Audio Filtering**
:video_game: Many **Minigames** and :joystick: **Fun** Commands (150+)
:no_entry_sign: **Administration** and **Auto-Moderation** and way much more!`)
        .addField(":question: **__How do you use me?__**",
`>>> \`${prefix}setup\` and react with the Emoji for the right action,
but you can also do \`${prefix}setup-SYSTEM\` e.g. \`${prefix}setup-welcome\``)
.addField(":chart_with_upwards_trend: **__STATS:__**",
`>>> :gear: **${client.commands.map(a=>a).length} Commands**
:file_folder: on **${client.guilds.cache.size} Guilds**
⌚️ **${duration(client.uptime).map(i=> `\`${i}\``).join(", ")} Uptime**
📶 **\`${Math.floor(client.ws.ping)}ms\` Ping**`)    
  let FIRSTEMBED = new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter("Page Home\n" + client.user.username + " | Made by: milrato.eu", client.user.displayAvatarURL())
        .setTitle(handlemsg(client.la[ls].cmds.info.help.overview.title))
        .setDescription(handlemsg(client.la[ls].cmds.info.help.overview.desc))          

        //Send message with buttons
        let helpmsg = await message.reply({   
            content: `***Click on the __Buttons__ to swap the Help-Pages***`,
            embeds: [FIRSTEMBED], 
            components: allbuttons
        });
        var edited = false;
        var embeds = [FIRSTEMBED, OverviewEmbed]
        for(const e of allotherembeds())
          embeds.push(e)        
        let currentPage = 0;

        //create a collector for the thinggy
        const collector = helpmsg.createMessageComponentCollector({filter: (i) => i.isButton() && i.user && i.user.id == cmduser.id && i.message.author.id == client.user.id, time: 180e3 });
        //array of all embeds, here simplified just 10 embeds with numbers 0 - 9
        collector.on('collect', async b => {
          try{
            if(b.user.id !== message.author.id)
              return b.reply(handlemsg(client.la[ls].cmds.info.help.buttonerror, {prefix: prefix}), true)
            if(b.customId.includes("button_cat_")){
                            //b.reply(`***Going to the ${b.customId.replace("button_cat_", "")} Page***, *please wait 2 Seconds for the next Input*`, true)
              //information, music, admin, settings, voice, minigames, nsfw
              let index = 0;
              switch (b.customId.replace("button_cat_", "")){
                case "overview": index = 0; break;
                case "information": index = 1; break;
                case "music": index = 2; break;
                case "admin": index = 3; break;
                case "settings": index = 4; break;
                case "GUILD_VOICE": index = 5; break;
                case "minigames": index = 6; break;
                case "nsfw": index = 7; break;
                case "customcommand": index = 8; break;
                case "advertisement": index = 9; break;
              }
              currentPage = index + 1;
              await helpmsg.edit({embeds: [embeds[currentPage]], components: allbuttons});
              await b.deferUpdate();
            } else {
              //page forward
              if(b.customId == "1") {
                //b.reply("***Swapping a PAGE FORWARD***, *please wait 2 Seconds for the next Input*", true)
                  if (currentPage !== 0) {
                    currentPage -= 1
                    await helpmsg.edit({embeds: [embeds[currentPage]], components: allbuttons});
                    await b.deferUpdate();
                  } else {
                      currentPage = embeds.length - 1
                      await helpmsg.edit({embeds: [embeds[currentPage]], components: allbuttons});
                      await b.deferUpdate();
                  }
              }
              //go home
              else if(b.customId == "2"){
                //b.reply("***Going Back home***, *please wait 2 Seconds for the next Input*", true)
                  currentPage = 0;
                  await helpmsg.edit({embeds: [embeds[currentPage]], components: allbuttons});
                  await b.deferUpdate();
              } 
              //go forward
              else if(b.customId == "3"){
                //b.reply("***Swapping a PAGE BACK***, *please wait 2 Seconds for the next Input*", true)
                  if (currentPage < embeds.length - 1) {
                      currentPage++;
                      await helpmsg.edit({embeds: [embeds[currentPage]], components: allbuttons});
                      await b.deferUpdate();
                  } else {
                      currentPage = 0
                      await helpmsg.edit({embeds: [embeds[currentPage]], components: allbuttons});
                      await b.deferUpdate();
                  }
              }
            }
          }catch (e){
            console.log(e)
            console.log(String(e).italic.italic.grey.dim)
          }
        });
        
        //array of all disabled buttons
        let d_buttonRow1 = new MessageActionRow().addComponents([button_back.setDisabled(true),button_home.setDisabled(true), button_forward.setDisabled(true), button_tutorial.setDisabled(true)])
        let d_buttonRow2 = new MessageActionRow().addComponents([button_cat_information.setDisabled(true),button_cat_music.setDisabled(true), button_cat_settings.setDisabled(true), button_cat_admin.setDisabled(true), button_cat_voice.setDisabled(true)])
        let d_buttonRow3 = new MessageActionRow().addComponents([button_cat_minigames.setDisabled(true),button_cat_nsfw.setDisabled(true), button_cat_customcommand.setDisabled(true), button_cat_advertisement.setDisabled(true), button_cat_overview.setDisabled(true)])
        const alldisabledbuttons = [d_buttonRow1, d_buttonRow2, d_buttonRow3]
        collector.on('end', collected => {
          if(!edited){
            edited = true;
            helpmsg.edit({content: handlemsg(client.la[ls].cmds.info.help.timeended, {prefix: prefix}), embeds: [helpmsg.embeds[0]], components: alldisabledbuttons}).catch((e)=>{})
          }
        });
        setTimeout(()=>{
          if(!edited){
            edited = true;
            helpmsg.edit({content: handlemsg(client.la[ls].cmds.info.help.timeended, {prefix: prefix}), embeds: [helpmsg.embeds[0]], components: alldisabledbuttons}).catch((e)=>{})
          }
          }, 180e3 + 150)
        }
        function allotherembeds(){
          const settings = client.settings.get(message.guild.id);
          var embeds = [];
          var embed0 = new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(eval(client.la[ls]["cmds"]["info"]["help"]["variable6"]))
            .setDescription(eval(client.la[ls]["cmds"]["info"]["help"]["variable7"]))
            .addField(settings.ECONOMY ? "💸 **Economy** | <a:yes:833101995723194437> ENABLED" : "💸 **Economy** | <:no:833101993668771842> DISABLED",`> ${client.commands.filter((cmd) => cmd.category === "💸 Economy").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .addField(settings.SCHOOL ? "🏫 **School** | <a:yes:833101995723194437> ENABLED" : "🏫 **School** | <:no:833101993668771842> DISABLED", `> ${client.commands.filter((cmd) => cmd.category === "🏫 School Commands").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .setFooter(`Page 1 / 9  |  Made by: milrato.eu\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
          embeds.push(embed0)
          var embed1 = new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(eval(client.la[ls]["cmds"]["info"]["help"]["variable8"]))
            .setDescription(eval(client.la[ls]["cmds"]["info"]["help"]["variable9"]))
            .addField(settings.MUSIC ? "👀 **Filter** | <a:yes:833101995723194437> ENABLED" : "👀 **Filter** | <:no:833101993668771842> DISABLED", `>>> ${client.commands.filter((cmd) => cmd.category === "👀 Filter").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .addField(settings.MUSIC ? "⚜️ **Custom Queue(s)** | <a:yes:833101995723194437> ENABLED" : "⚜️ **Custom Queue(s)** | <:no:833101993668771842> DISABLED", `> ${client.commands.filter((cmd) => cmd.category === "⚜️ Custom Queue(s)").map((cmd) => `${cmd.extracustomdesc}`).join(", ")}`.substr(0, 1024))
            .setFooter(`Page 2 / 9  |  Made by: milrato.eu\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
          embeds.push(embed1)
          var embed2 = new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(eval(client.la[ls]["cmds"]["info"]["help"]["variable10"]))
            .setDescription(eval(client.la[ls]["cmds"]["info"]["help"]["variable11"]))
            .addField(eval(client.la[ls]["cmds"]["info"]["help"]["variablex_12"]), eval(client.la[ls]["cmds"]["info"]["help"]["variable12"]))
            .setFooter(`Page 3 / 9  |  Made by: milrato.eu\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
          embeds.push(embed2)
          var embed3 = new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(eval(client.la[ls]["cmds"]["info"]["help"]["variable13"]))
            .setDescription(eval(client.la[ls]["cmds"]["info"]["help"]["variable14"]))
            .addField(eval(client.la[ls]["cmds"]["info"]["help"]["variablex_15"]), eval(client.la[ls]["cmds"]["info"]["help"]["variable15"]))
            .addField(eval(client.la[ls]["cmds"]["info"]["help"]["variablex_16"]), eval(client.la[ls]["cmds"]["info"]["help"]["variable16"]))
            .setFooter(`Page 4 / 9  |  Made by: milrato.eu\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
          embeds.push(embed3)
          var embed4 = new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(eval(client.la[ls]["cmds"]["info"]["help"]["variable17"]))
            .setDescription(eval(client.la[ls]["cmds"]["info"]["help"]["variable18"]))
            .addField(eval(client.la[ls]["cmds"]["info"]["help"]["variablex_19"]), eval(client.la[ls]["cmds"]["info"]["help"]["variable19"]))
            .addField(settings.SOUNDBOARD ? "🔊 **Soundboard** | <a:yes:833101995723194437> ENABLED" : "🔊 **Soundboard** | <:no:833101993668771842> DISABLED", `${client.commands.filter((cmd) => cmd.category === "🔊 Soundboard").map((cmd) => `\`${cmd.name}\``).join(", ")}`.substr(0, 1024))
            .setFooter(`Page 5 / 9  |  Made by: milrato.eu\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
          embeds.push(embed4)
          var embed5 = new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(eval(client.la[ls]["cmds"]["info"]["help"]["variable20"]))
            .setDescription(eval(client.la[ls]["cmds"]["info"]["help"]["variable21"]))
            .addField(settings.MINIGAMES ? "🎮 **Mini Games** | <a:yes:833101995723194437> ENABLED" : "🎮 **Mini Games**| <:no:833101993668771842> DISABLED", `> ${client.commands.filter((cmd) => cmd.category === "🎮 MiniGames").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .setFooter(`Page 6 / 9  |  Made by: milrato.eu\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
          embeds.push(embed5)
          var embed6 = new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(settings.NSFW ? "🔞 NSFW Commands 🔞 | <a:yes:833101995723194437> ENABLED" : "🔞 NSFW Commands 🔞 | <:no:833101993668771842> DISABLED")
            .setDescription(eval(client.la[ls]["cmds"]["info"]["help"]["variable22"]))
            .setFooter(`Page 7 / 9  |  Made by: milrato.eu\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
          embeds.push(embed6)
          
          var embed7 = new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setTitle(eval(client.la[ls]["cmds"]["info"]["help"]["variable23"]))
          .setFooter(`Page 8 / 9  |  Made by: milrato.eu\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
          let cuc = client.customcommands.get(message.guild.id, "commands");
          if (cuc.length < 1) cuc = ["NO CUSTOM COMMANDS DEFINED YET, do it with: `!setup-customcommands`"]
          else cuc = cuc.map(cmd => `\`${cmd.name}\``)
          const items = cuc
            embed7.setTitle(eval(client.la[ls]["cmds"]["info"]["help"]["variable24"]))
            embed7.setDescription(items.join(", "))
        
          embeds.push(embed7)
        
        var embed8 = new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setTitle(eval(client.la[ls]["cmds"]["info"]["help"]["variable25"]))
          .setImage("https://cdn.discordapp.com/attachments/808335747882942464/838362966658514954/standard.gif")
          .addField("<:BeroHost:852970925695041646> __**Bero-Host.de**・Best Root Servers__", `${client.ad.textad}`)
          .addField(eval(client.la[ls]["cmds"]["info"]["help"]["variablex_26"]), eval(client.la[ls]["cmds"]["info"]["help"]["variable26"]))
          .setFooter(`Page 9 / 9  |  Made by: milrato.eu\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
        embeds.push(embed8)
      
 

          return embeds
        }
    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply({embeds: [new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(eval(client.la[ls]["cmds"]["info"]["color"]["variable2"]))
      ]});
    }
  }
}
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://discord.gg/sngXqWK2eP
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention him / Milrato Development, when using this Code!
 * @INFO
 */
