const TicTacToe = require("discord-tictactoe");
const game = new TicTacToe()
module.exports = {
    name: "reverse",
    aliases: ["reversetext"],
    category: "🎮 MiniGames",
    description: "Would you Rather?",
    usage: "reverse TEXT",
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
        const { reverseText } = require('weky')
        message.reply(reverseText(args[0] ? args.join(" ") : "No Text Added! Please Retry!"))
        
    }
  }