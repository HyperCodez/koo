const { DiscordUNO } = require("discord-uno");
const discordUNO = new DiscordUNO("#2f3136");
const {
    MessageEmbed,
    MessageAttachment
  } = require("discord.js");
  const config = require("../../botconfig/config.json");
  var ee = require("../../botconfig/embed.json");
  const emoji = require(`../../botconfig/emojis.json`);
  const fetch = require("node-fetch");
module.exports = {
    name: "uno",
    aliases: ["cardgame"],
    category: "🎮 MiniGames",
    description: "Allows you to play a Game of UNO",
    usage: "uno --> Play the Game",
    run: async (client, message, args, cmduser, text, prefix) => {
    
        let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
        if(!client.settings.get(message.guild.id, "MINIGAMES")){
          return message.reply(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(client.la[ls].common.disabled.title)
            .setDescription(require(`../../handlers/functions`).handlemsg(client.la[ls].common.disabled.description, {prefix: prefix}))
          );
        }
        if(!args[0]) 
            return message.reply(new MessageEmbed()
                .setColor(es.wrongcolor)
                .setFooter(es.footertext, es.footericon)
                .setTitle(eval(client.la[ls]["cmds"]["minigames"]["uno"]["variable1"]))
                .setDescription(`**Valid Types:**\n\`join\`, \`creategame\`, \`leave\`, \`startgame\`, \`endgame\`, \`play\`, \`UNO\`,
\`draw\`, \`cards\`, \`table\`, \`viewwinners\`, \`settings\`, \`viewsettings\``)
            );
        switch(args[0]){
            case "join": { await discordUNO.addUser(message); }  break;
            case "creategame": { await discordUNO.createGame(message); }  break;
            case "leave": { await discordUNO.removeUser(message); }  break;
            case "startgame": { await discordUNO.startGame(message); }  break;
            case "endgame": { await discordUNO.endGame(message); }  break;
            case "play": { await discordUNO.playCard(message); }  break;
            case "draw": { await discordUNO.draw(message); }  break;
            case "cards": { await discordUNO.viewCards(message); }  break;
            case "table": { await discordUNO.viewTable(message); }  break;
            case "viewwinners": { await discordUNO.viewWinners(message); }  break;
            case "settings": { await discordUNO.updateSettings(message); }  break;
            case "viewsettings": { await discordUNO.viewSettings(message); }  break;
            default:
                {
                    return message.reply(new MessageEmbed()
                    .setColor(es.wrongcolor)
                    .setFooter(es.footertext, es.footericon)
                    .setTitle(eval(client.la[ls]["cmds"]["minigames"]["uno"]["variable2"]))
                    .setDescription(eval(client.la[ls]["cmds"]["minigames"]["uno"]["variable3"]))
                );
                }
            break;
        }
            

    }
  }