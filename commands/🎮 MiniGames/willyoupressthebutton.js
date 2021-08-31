const TicTacToe = require("discord-tictactoe");
const game = new TicTacToe()
module.exports = {
    name: "willyoupressthebutton",
    category: "🎮 MiniGames",
    description: "Allows you to play a Game1",
    aliases: ["willyoupress"],
    usage: "willyoupressthebutton --> Play the Game",
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
        const { WillYouPressTheButton } = require('weky');
        await WillYouPressTheButton({
          message: message,
          embed: {
            title: 'Will you press the button?',
            description: '```{{statement1}}```\n**but**\n\n```{{statement2}}```',
            color: es.color,
            timestamp: true,
          },
          button: { yes: 'Yes', no: 'No' },
          thinkMessage: 'I am thinking',
          othersMessage: 'Only <@{{author}}> can use the buttons!',
        });         
    }
  }