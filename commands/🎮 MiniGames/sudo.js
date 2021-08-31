const TicTacToe = require("discord-tictactoe");
const game = new TicTacToe()
module.exports = {
    name: "sudo",
    category: "🎮 MiniGames",
    description: "Allows you to play a Game1",
    usage: "sudo @MEMBER <TEXT> --> Play the Game",
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
        const opponent = message.mentions.members.first();
        if (!opponent) return message.reply(eval(client.la[ls]["cmds"]["minigames"]["sudo"]["variable1"]));
        if (!args[1]) return message.reply(eval(client.la[ls]["cmds"]["minigames"]["sudo"]["variable2"]));
        const { Sudo } = require('weky');
        await Sudo({
          message: message,
          member: opponent,
          text: args.slice(1).join(" "),
          deleteMessage: false
        });
         
    }
  }