const TicTacToe = require("discord-tictactoe");
const game = new TicTacToe()
module.exports = {
    name: "snake",
    category: "🎮 MiniGames",
    description: "Allows you to play a Game1",
    usage: "snake --> Play the Game",
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
        const { Snake } = require('weky');
        await Snake({
            message: message,
            embed: {
                title: 'Snake',
                description: 'GG, you scored **{{score}}** points!',
                color: es.color,
                timestamp: true,
            },
            emojis: {
                empty: '⬛',
                snakeBody: '🟦',
                food: '🌮',
                up: '⬆️',
                right: '⬅️',
                down: '⬇️',
                left: '➡️',
            },
            othersMessage: 'Only <@{{author}}> can use the buttons!',
            buttonText: 'Cancel',
        });        
    }
  }