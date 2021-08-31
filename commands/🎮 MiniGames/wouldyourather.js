const TicTacToe = require("discord-tictactoe");
const game = new TicTacToe()
module.exports = {
    name: "wouldyourather",
    aliases: ["wyr"],
    category: "🎮 MiniGames",
    description: "Would you Rather?",
    usage: "wouldyourather --> Play the Game",
     run: async (client, message, args, cmduser, text, prefix) => {
      return message.reply("This Command is not currently not supported!");
    
        let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
        if(!client.settings.get(message.guild.id, "MINIGAMES")){
          return message.reply(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(client.la[ls].common.disabled.title)
            .setDescription(require(`../../handlers/functions`).handlemsg(client.la[ls].common.disabled.description, {prefix: prefix}))
          );
        }
        const { WouldYouRather } = require('weky')
        await WouldYouRather({
          message: message,
          embed: {
            title: 'Would you rather...',
            color: es.color,
            timestamp: true,
          },
          thinkMessage: 'I am thinking',
          othersMessage: 'Only <@{{author}}> can use the buttons!',
          buttons: { optionA: 'Option A', optionB: 'Option B' },
        });
        
    }
  }