module.exports = {
    name: "chaoswords",
    category: "🎮 MiniGames",
    description: "Plays a Game",
    usage: "chaoswords [wordcount] --> Play the Game",
    run: async (client, message, args, cmduser, text, prefix) => {
        let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
        //executes if fun commands are disabled
        if(!client.settings.get(message.guild.id, "MINIGAMES")){
          return message.reply(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(client.la[ls].common.disabled.title)
            .setDescription(require(`../../handlers/functions`).handlemsg(client.la[ls].common.disabled.description, {prefix: prefix}))
          );
        }
        return message.reply("This Command is not currently not supported!");
        const { ChaosWords } = require("weky")
        var randomWords = require('random-words');
        const words = randomWords(args[0] && !isNaN(args[0]) && Number(args[0]) > 0 ? Number(args[0]) : 3) // generating 3 words
        await ChaosWords({
          message: message,
          embed: {
              title: 'ChaosWords',
              description: 'You have **{{time}}** to find the hidden words in the below sentence.',
              color: es.color,
              field1: 'Sentence:',
              field2: 'Words Found/Remaining Words:',
              field3: 'Words found:',
              field4: 'Words:',
              timestamp: true
          },
          winMessage: 'GG, You won! You made it in **{{time}}**.',
          loseMessage: 'Better luck next time!',
          wrongWordMessage: 'Wrong Guess! You have **{{remaining_tries}}** tries left.',
          correctWordMessage: 'GG, **{{word}}** was correct! You have to find **{{remaining}}** more word(s).',
          time: 60000,
          words: words,
          charGenerated: 17,
          maxTries: 10,
          buttonText: 'Cancel',
          othersMessage: 'Only <@{{author}}> can use the buttons!'
      });
    }
  }