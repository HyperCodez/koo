const TicTacToe = require("discord-tictactoe");
const game = new TicTacToe()
module.exports = {
    name: "fight",
    aliases: ["battle"],
    category: "🎮 MiniGames",
    description: "Plays a Fight with some1",
    usage: "fight --> Play the Game",
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
        if (!opponent) return message.reply(eval(client.la[ls]["cmds"]["minigames"]["fight"]["variable1"]));
        const { Fight } = require('weky');
        await Fight({
          message: message,
          opponent: opponent,
          embed: {
              title: 'Fight',
              color: es.color,
              timestamp: true
          },
          buttons: {
            hit: 'Hit',
            heal: 'Heal',
            cancel: 'Stop',
            accept: 'Accept',
            deny: 'Deny'
          },
          acceptMessage: '<@{{challenger}}> has challenged <@{{opponent}}> for a fight!',
          winMessage: 'GG, <@{{winner}}> won the fight!',
          endMessage: '<@{{opponent}}> didn\'t answer in time. So, I dropped the game!',
          cancelMessage: '<@{{opponent}}> refused to have a fight with you!',
          fightMessage: '{{player}} you go first!',
          opponentsTurnMessage: 'Please wait for your opponents move!',
          highHealthMessage: 'You cannot heal if your HP is above 80!',
          lowHealthMessage: 'You cannot cancel the fight if your HP is below 50!',
          returnWinner: false,
          othersMessage: 'Only {{author}} can use the buttons!'
      });
      
    }
  }