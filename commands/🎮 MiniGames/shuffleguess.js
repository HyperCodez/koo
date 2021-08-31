const TicTacToe = require("discord-tictactoe");
const game = new TicTacToe()
module.exports = {
    name: "shuffleguess",
    aliases: ["sg"],
    category: "🎮 MiniGames",
    description: "Allows you to play a Game1",
    usage: "shuffleguess --> Play the Game",
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
        var randomWords = require('random-words');
        const word = randomWords();

        const { ShuffleGuess } = require('weky');
        await ShuffleGuess({
          message: message,
          embed: {
            title: 'Shuffle Guess',
            color: es.color,
            timestamp: true,
          },
          word: ['Milrato'],
          button: { cancel: 'Cancel', reshuffle: 'Reshuffle' },
          startMessage:
            'I shuffled a word it is **`{{word}}`**. You have **{{time}}** to find the correct word!',
          winMessage:
            'GG, It was **{{word}}**! You gave the correct answer in **{{time}}.**',
          loseMessage: 'Better luck next time! The correct answer was **{{answer}}**.',
          incorrectMessage: "No {{author}}! The word isn't `{{answer}}`",
          othersMessage: 'Only <@{{author}}> can use the buttons!',
          time: 60000,
        });
        
    }
  }