
module.exports = {
    name: "rockpaperscissors",
    aliases: ["rpc"],
    category: "🎮 MiniGames",
    description: "Allows you to play a Game of Rock Paper Scissors",
    usage: "rockpaperscissors --> Play the Game",
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
        const opponent = message.mentions.users.first();
        if (!opponent) return message.reply(eval(client.la[ls]["cmds"]["minigames"]["rockpaperscissors"]["variable1"]));
        const { RockPaperScissors } = require('weky')
        await RockPaperScissors({
          message: message,
          opponent: opponent,
          embed: {
            title: 'Rock Paper Scissors',
            description: 'Press the button below to choose your element.',
            color: es.color,
            timestamp: true,
          },
          buttons: {
            rock: 'Rock',
            paper: 'Paper',
            scissors: 'Scissors',
            accept: 'Accept',
            deny: 'Deny',
          },
          time: 60000,
          acceptMessage:
            '<@{{challenger}}> has challenged <@{{opponent}}> for a game of Rock Paper and Scissors!',
          winMessage: 'GG, <@{{winner}}> won!',
          drawMessage: 'This game is deadlock!',
          endMessage: "<@{{opponent}}> didn't answer in time. So, I dropped the game!",
          timeEndMessage:
            "Both of you didn't pick something in time. So, I dropped the game!",
          cancelMessage:
            '<@{{opponent}}> refused to have a game of Rock Paper and Scissors with you!',
          choseMessage: 'You picked {{emoji}}',
          noChangeMessage: 'You cannot change your selection!',
          othersMessage: 'Only {{author}} can use the buttons!',
          returnWinner: false,
        });
        
    }
  }