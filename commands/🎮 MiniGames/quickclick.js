module.exports = {
    name: "quickclick",
    category: "🎮 MiniGames",
    description: "Plays a Game",
    aliases: ["quickclicker"],
    usage: "quickclick --> Play the Game",
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
        const { QuickClick } = require("weky")
        await QuickClick({
          message: message,
          embed: {
            title: 'Quick Click',
            color: es.color,
            timestamp: true,
          },
          time: 60000,
          waitMessage: 'The buttons may appear anytime now!',
          startMessage:
            'First person to press the correct button will win. You have **{{time}}**!',
          winMessage: 'GG, <@{{winner}}> pressed the button in **{{time}} seconds**.',
          loseMessage: 'No one pressed the button in time. So, I dropped the game!',
          emoji: '👆',
          ongoingMessage:
            "A game is already runnning in <#{{channel}}>. You can't start a new one!",
        });
        
    }
  }