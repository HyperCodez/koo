//import the config.json file
const config = require("../botconfig/config.json")
var ee = require(`../botconfig/embed.json`);
var emoji = require(`../botconfig/emojis.json`);
var {
    MessageEmbed, MessageAttachment, User
} = require(`discord.js`);
const { databasing } = require("./functions")
const fetch = require("node-fetch")
module.exports = client => {


    //CMD

    client.on("messageCreate", async message => {
        try{
            if (!message.guild || !message.channel || message.author.bot) return;
            client.settings.ensure(message.guild.id, {
                aichat: "no",
            });
            let chatbot = client.settings.get(message.guild.id, "aichat");
            if(!chatbot || chatbot == "no") return;
            if(message.channel.id == chatbot){
              if(message.attachments.size > 0)
              {
                  const attachment = new MessageAttachment("https://cdn.discordapp.com/attachments/816645188461264896/826736269509525524/I_CANNOT_READ_FILES.png")
                  return message.channel.send({files: [attachment]})
              }
              try{
                fetch(`http://api.brainshop.ai/get?bid=153861&key=0ZjvbPWKAxJvcJ96&uid=1&msg=${encodeURIComponent(message)}`)
               .then(res => res.json())
               .then(data => {
                  message.channel.send({content: data.cnt}).catch(e => console.log("CHATBOT:".underline.red + " :: " + e.stack.toString().grey.italic.dim));
               });
              }catch (e){
                message.channel.send({content: "<:no:833101993668771842> AI CHAT API IS DOWN"})
              }
            }
        }catch(e){console.log(String(e).grey.italic.dim)}
    })
    //AFK SYSTEM
    client.on("messageCreate", async message => {
        try{
            if (!message.guild || !message.channel || message.author.bot ) return;
            for(const user of Array.from(message.mentions.users)){
                if(client.afkDB.has(message.guild.id + user.id)){
                    await message.reply({content: `<:Crying:867724032316407828> **${user.tag}** went AFK <t:${Math.floor(client.afkDB.get(message.guild.id+user.id, "stamp") / 1000)}:R>!${client.afkDB.get(message.guild.id+user.id, "message") && client.afkDB.get(message.guild.id+user.id, "message").length > 1 ? `\n\n__His Message__\n>>> ${String(client.afkDB.get(message.guild.id+user.id, "message")).substr(0, 1800).split(`@`).join(`\`@\``)}` : "" }`}).then(msg=>{
                        setTimeout(()=>{
                            try{
                                msg.delete();
                            }catch{  }
                        }, 5000)
                    });
                }
            }
        }catch(e){
            console.log(String(e).grey.italic.dim)
        }
    });
    //AFK SYSTEM
    client.on("messageCreate", async message => {
        try{
            if (!message.guild || !message.channel || message.author.bot) return;
            if(message.content && !message.content.toLowerCase().startsWith("[afk]") && client.afkDB.has(message.guild.id + message.author.id)){
                if(Math.floor(client.afkDB.get(message.guild.id+message.author.id, "stamp") / 1000) == Math.floor(Date.now() / 1000)) return console.log("AFK CMD");
                await message.reply({content: `:tada: Welcome back **${message.author.username}!** :tada:\n> You went <t:${Math.floor(client.afkDB.get(message.guild.id+message.author.id, "stamp") / 1000)}:R> Afk`}).then(msg=>{
                    setTimeout(()=>{
                        try{
                            msg.delete();
                        }catch{  }
                    }, 5000)
                });
                client.afkDB.delete(message.guild.id + message.author.id)
            }
        }catch(e){
            console.log(String(e).grey.italic.dim)
        }
    });
}