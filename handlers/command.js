const {
  readdirSync
} = require("fs");
console.log("Welcome to SERVICE HANDLER /--/ By https://milrato.eu /--/ Discord: Tomato#6966".yellow);
module.exports = (client) => {
  try {
    readdirSync("./commands/").forEach((dir) => {
      const commands = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js"));
      for (let file of commands) {
        try{
          let pull = require(`../commands/${dir}/${file}`);
          if (pull.name) {
            client.commands.set(pull.name, pull);
            //console.log(`    | ${file} :: Ready`.brightGreen)
          } else {
            console.log(`    | ${file} :: error -> missing a help.name,or help.name is not a string.`.brightRed)
            continue;
          }
          if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
        }catch(e){
          console.log(String(e.stack).grey.italic.dim.bgRed)
        }
      }
    });
  } catch (e) {
    console.log(String(e.stack).grey.italic.dim.bgRed)
  }


  // Requires Manager from discord-giveaways
  const { GiveawaysManager } = require('discord-giveaways');
  // Starts updating currents giveaways
  const manager = new GiveawaysManager(client, {
      storage: './giveaways.json',
      updateCountdownEvery: 10000,
      hasGuildMembersIntent: false,
      default: {
          botsCanWin: false,
          embedColor: require("../botconfig/embed.json").color,
          embedColorEnd: require("../botconfig/embed.json").wrongcolor,
          reaction: '🎉',
          messages: {
              giveaway: '🎉 **GIVEAWAY** 🎉',
              giveawayEnded: '🎉 **GIVEAWAY ENDED** 🎉',
              timeRemaining: 'Time remaining: **{duration}**!',
              inviteToParticipate: 'React with 🎉 to participate!',
              winMessage: 'Congratulations, {winners}!\n\n> You won **{prize}**!\n\n{messageURL}',
              embedFooter: 'Giveaway',
              noWinner: 'Giveaway cancelled, no valid participations.',
              hostedBy: 'Hosted by: {user}',
              winners: 'Winner(s)',
              endedAt: 'Ended at',
              units: {
                  seconds: 'Seconds',
                  minutes: 'Minutes',
                  hours: 'Hours',
                  days: 'Days',
                  pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
              }
          }
      }
  });
  // We now have a giveawaysManager property to access the manager everywhere!
  client.giveawaysManager = manager;
};
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://discord.gg/sngXqWK2eP
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention him / Milrato Development, when using this Code!
 * @INFO
 */
