module.exports = {
    name: "lieswatter",
    category: "🎮 MiniGames",
    description: "Plays a Game",
    usage: "lieswatter --> Play the Game",
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
        const { LieSwatter } = require("weky")
        await LieSwatter({
          message: message,
          embed: {
            title: 'Lie Swatter',
            color: es.color,
            timestamp: true,
          },
          thinkMessage: 'I am thinking',
          winMessage:
            'GG, It was a **{{answer}}**. You got it correct in **{{time}}**.',
          loseMessage: 'Better luck next time! It was a **{{answer}}**.',
          othersMessage: 'Only <@{{author}}> can use the buttons!',
          buttons: { true: 'Truth', lie: 'Lie' },
        });
    }
  }