module.exports = {
    name: "guessthenumber",
    category: "🎮 MiniGames",
    description: "Plays a Game",
    aliases: ["guessnumber"],
    usage: "guessthenumber --> Play the Game",
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
        const { GuessTheNumber } = require("weky")
        await GuessTheNumber({
          message: message,
          embed: {
            title: 'Guess The Number',
            description: 'You have **{{time}}** to guess the number. (1-100)',
            color: '#7289da',
            timestamp: true,
          },
          publicGame: true,
          number: Math.floor(Math.random() * 100) + 1,
          time: 60000,
          winMessage: {
            publicGame:
              'GG, The number which I guessed was **{{number}}**. <@{{winner}}> made it in **{{time}}**.\n\n__**Stats of the game:**__\n**Duration**: {{time}}\n**Number of participants**: {{totalparticipants}} Participants\n**Participants**: {{participants}}',
            privateGame:
              'GG, The number which I guessed was **{{number}}**. You made it in **{{time}}**.',
          },
          loseMessage:
            'Better luck next time! The number which I guessed was **{{number}}**.',
          bigNumberMessage: 'No {{author}}! My number is greater than **{{number}}**.',
          smallNumberMessage:
            'No {{author}}! My number is smaller than **{{number}}**.',
          othersMessage: 'Only <@{{author}}> can use the buttons!',
          buttonText: 'Cancel',
          ongoingMessage:
            "A game is already runnning in <#{{channel}}>. You can't start a new one!",
          returnWinner: false,
        });
        
    }
  }