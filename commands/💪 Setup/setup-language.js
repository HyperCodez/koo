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
  name: "setup-language",
  category: "💪 Setup",
  aliases: ["setuplanguage", "setup-caps", "setupcaps", "language-setup", "languagesetup"],
  cooldown: 5,
  usage: "setup-language  -->  Follow the Steps",
  description: "Enable + Change the maximum Percent of UPPERCASE (caps) inside of a Message",
  memberpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    
    try {
      let languages = {
        "en": "🇬🇧 English",
        "de": "🇩🇪 German",
        "fr": "🇫🇷 French",
        "it": "🇮🇹 Italian",
        "sp": "🇪🇸 Spanish",
        "in": "🇮🇳 India (Hindi)",
        "nl": "🇳🇱 Dutch",
        "tr": "🇹🇷 Turkish",
        "ir": "🇮🇷 Iran"
      }
      
      //function to handle true/false
      const d2p = (bool) => bool ? "`✔️ Enabled`" : "`❌ Disabled`"; 
      //call the first layer
      first_layer()

      //function to handle the FIRST LAYER of the SELECTION
      async function first_layer(){
        let menuoptions = [
          {
            value: `Change Language`,
            description: "Change the Language of the Bot",
            emoji: "833101995723194437"
          },
          {
            value: `Reset Language`,
            description: "Reset to the Default Language (English)",
            emoji: "833101993668771842"
          },
          {
            value: "Settings",
            description: `Show the Current Language`,
            emoji: "📑"
          },
          {
            value: "Cancel",
            description: `Cancel and stop the Ticket-Setup!`,
            emoji: "862306766338523166"
          }
        ]
        let Selection = new MessageMenu()
          .setPlaceholder('Click me to setup the Language!').setCustomId('MenuSelection') 
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
          .setAuthor("Language System Setup", 
          "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/282/flag-united-kingdom_1f1ec-1f1e7.png",
          "https://discord.gg/sngXqWK2eP")
          .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-language"]["variable1"]))
        let used1 = false;
        //send the menu msg
        let menumsg = await message.reply(MenuEmbed, Selection)
        //function to handle the menuselection
        function menuselection(menu) {
          let menuoptiondata = menuoptions.find(v => v.value == menu.values[0])
          let menuoptionindex = menuoptions.findIndex(v => v.value == menu.values[0])
          if(menu.values[0] == "Cancel") return menu.reply(eval(client.la[ls]["cmds"]["setup"]["setup-language"]["variable2"]))
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
            let button_en = new MessageButton().setStyle('blurple').setCustomId('language_en').setEmoji("🇬🇧").setLabel("English").setDisabled(false)
            let button_de = new MessageButton().setStyle('blurple').setCustomId('language_de').setEmoji("🇩🇪").setLabel("German").setDisabled(false)
            let button_fr = new MessageButton().setStyle('blurple').setCustomId('language_fr').setEmoji("🇫🇷").setLabel("French").setDisabled(false)
            let button_it = new MessageButton().setStyle('blurple').setCustomId('language_it').setEmoji("🇮🇹").setLabel("Italian").setDisabled(false)
            let button_sp = new MessageButton().setStyle('blurple').setCustomId('language_sp').setEmoji("🇪🇸").setLabel("Spanish").setDisabled(false)
            let button_ae = new MessageButton().setStyle('blurple').setCustomId('language_in').setEmoji("🇮🇳").setLabel("India (Hindi)").setDisabled(false)
            let button_nl = new MessageButton().setStyle('blurple').setCustomId('language_nl').setEmoji("🇳🇱").setLabel("Dutch").setDisabled(false)
            let button_tr = new MessageButton().setStyle('blurple').setCustomId('language_tr').setEmoji("🇹🇷").setLabel("Turkish").setDisabled(false)
            let button_ir = new MessageButton().setStyle('blurple').setCustomId('language_ir').setEmoji("🇮🇷").setLabel("Iran").setDisabled(false)
            

        let buttonRow1 = new MessageActionRow()
        .addComponent(button_en).addComponent(button_de).addComponent(button_fr).addComponent(button_it).addComponent(button_sp)
        let buttonRow2 = new MessageActionRow()
        .addComponent(button_ae).addComponent(button_nl).addComponent(button_tr).addComponent(button_ir)
            let allbuttons = [buttonRow1, buttonRow2]
            //Send message with buttons
            let helpmsg = await message.reply({   
                content: `***Click on the __Buttons__ to select the Language***`,
                embed: new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-language"]["variable3"]))
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-language"]["variable4"]))
                  .setColor(es.color)
                  .setFooter(es.footertext, es.footericon), 
                components: allbuttons
            });
            
            button_en = new MessageButton().setStyle('blurple').setCustomId('language_en').setEmoji("🇬🇧").setLabel("English").setDisabled(true)
            button_de = new MessageButton().setStyle('blurple').setCustomId('language_de').setEmoji("🇩🇪").setLabel("German").setDisabled(true)
            button_fr = new MessageButton().setStyle('blurple').setCustomId('language_fr').setEmoji("🇫🇷").setLabel("French").setDisabled(true)
            button_it = new MessageButton().setStyle('blurple').setCustomId('language_it').setEmoji("🇮🇹").setLabel("Italian").setDisabled(true)
            button_sp = new MessageButton().setStyle('blurple').setCustomId('language_sp').setEmoji("🇪🇸").setLabel("Spanish").setDisabled(true)
            button_ae = new MessageButton().setStyle('blurple').setCustomId('language_in').setEmoji("🇮🇳").setLabel("India (Hindi)").setDisabled(true)
            button_nl = new MessageButton().setStyle('blurple').setCustomId('language_nl').setEmoji("🇳🇱").setLabel("Dutch").setDisabled(true)
            button_tr = new MessageButton().setStyle('blurple').setCustomId('language_tr').setEmoji("🇹🇷").setLabel("Turkish").setDisabled(true)
            button_ir = new MessageButton().setStyle('blurple').setCustomId('language_ir').setEmoji("🇮🇷").setLabel("Iran").setDisabled(true)
            buttonRow1 = new MessageActionRow()
            .addComponent(button_en).addComponent(button_de).addComponent(button_fr).addComponent(button_it).addComponent(button_sp)
            buttonRow2 = new MessageActionRow()
            .addComponent(button_ae).addComponent(button_nl).addComponent(button_tr).addComponent(button_ir)
            let alldisabledbuttons = [buttonRow1, buttonRow2] 
            //create a collector for the thinggy
            const collector = helpmsg.createMessageComponentCollector({filter: (i) => i.isButton() && i.user && i.message.author.id == client.user.id, time: 180e3 }); //collector for 5 seconds
            //array of all embeds, here simplified just 10 embeds with numbers 0 - 9
            var edited = false; 
            let currentPage = 0;
            collector.on('collect', async b => {
                if(b.user.id !== message.author.id)
                  return b.reply(`<:no:833101993668771842> **Only the one who typed ${prefix}setup-language is allowed to react!**`, true)
                if(b.user.id == message.author.id && b.message.id == helpmsg.id && b.customId.includes("language_")){
                  b.deferUpdate();
                  console.log(b.user.id)
                  let lang = b.customId.replace("language_", "")
                  client.settings.set(message.guild.id, lang, "language");
                  message.reply({embed: new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-language"]["variable5"]))
                    .setColor(es.color)
                    .setFooter(es.footertext, es.footericon)
                  });
                  edited = true;
                  helpmsg.edit({content: `Time has ended type ${prefix}setup-language again!`, embed: helpmsg.embeds[0], components: alldisabledbuttons})
                }
            });
            collector.on('end', collected => {
              if(!edited){
                edited = true;
                helpmsg.edit({content: `Time has ended type ${prefix}setup-language again!`, embed: helpmsg.embeds[0], components: alldisabledbuttons})
              }
            });
            setTimeout(()=>{
              if(!edited){
                edited = true;
                helpmsg.edit({content: `Time has ended type ${prefix}setup-language again!`, embed: helpmsg.embeds[0], components: alldisabledbuttons})
              }
            }, 180e3 + 150)
            return;
          }
          case 1: {
            client.settings.set(message.guild.id, "en", "language");
            return message.reply({embed: new Discord.MessageEmbed()
              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-language"]["variable6"]))
              .setColor(es.color)
              .setFooter(es.footertext, es.footericon)
            });
          }
          case 2: {
            let thesettings = client.settings.get(message.guild.id, `language`)
            return message.reply(new Discord.MessageEmbed()
              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-language"]["variable7"]))
              .setColor(es.color)
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
        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-language"]["variable8"]))
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
