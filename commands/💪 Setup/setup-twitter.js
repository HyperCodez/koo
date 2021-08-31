var {
    MessageEmbed
  } = require(`discord.js`);
  var Discord = require(`discord.js`);
  var config = require(`../../botconfig/config.json`);
  var ee = require(`../../botconfig/embed.json`);
  var emoji = require(`../../botconfig/emojis.json`);
  var fs = require("fs");
  var {
    databasing,
  } = require(`../../handlers/functions`);
  const twitconfig = require("../../social_log/twitter.json");
  const Twit = require('twit');
  module.exports = {
    name: "setup-twitter",
    category: "💪 Setup",
    aliases: ["setuptwitter", "twitter-setup"],
    cooldown: 5,
    usage: "setup-twitter  --> Follow the Steps",
    description: "Manage the 2x Twitter Systems (set channel, set twitter)",
    memberpermissions: ["ADMINISTRATOR"],
    run: async (client, message, args, cmduser, text, prefix) => {
    
      let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
      try {
        
        var adminroles = client.settings.get(message.guild.id, "adminroles")
  
  
        var timeouterror = false;
        var filter = (reaction, user) => {
          return user.id === message.author.id;
        };
        var temptype = ""
        var tempmsg;
        var add = "";
  


        tempmsg = await message.reply(new Discord.MessageEmbed()
        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable1"]))
        .setColor(es.color)
        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable2"])).setFooter(es.footertext, es.footericon)
      )
      try {
        tempmsg.react("1️⃣")
        tempmsg.react("2️⃣")
      } catch (e) {
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable3"]))
          .setColor(es.wrongcolor)
          .setDescription(`\`\`\` ${e.message ? e.message : e.stack ? String(e.stack).grey.substr(0, 2000) : String(e).grey.substr(0, 2000)}\`\`\``.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        );
      }
      await tempmsg.awaitReactions(filter, {
          max: 1,
          time: 90000,
          errors: ["time"]
        })
        .then(collected => {
          var reaction = collected.first()
          reaction.users.remove(message.author.id)
          if (reaction.emoji.name === "1️⃣") add = ""
          else if (reaction.emoji.name === "2️⃣") add = "second"
          else throw "You reacted with a wrong emoji"

        })
        .catch(e => {
          timeouterror = e;
        })
      if (timeouterror)
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable4"]))
          .setColor(es.wrongcolor)
          .setDescription(`Cancelled the Operation!`.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        );




        if(add == "second")
        return message.reply(new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable5"]))
          .setColor(es.wrongcolor)
          .setDescription(`Due to rate limits, the second Twitter Log got disabled! SORRY!`.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        );




        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable6"]))
          .setColor(es.color)
          .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable7"])).setFooter(es.footertext, es.footericon)
        })
        try {
          tempmsg.react("1️⃣")
          tempmsg.react("2️⃣")
          tempmsg.react("3️⃣")
          tempmsg.react("4️⃣")
          tempmsg.react("5️⃣")
        } catch (e) {
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable8"]))
            .setColor(es.wrongcolor)
            .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable21"]).substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
        }
        await tempmsg.awaitReactions(filter, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var reaction = collected.first()
            reaction.users.remove(message.author.id)
            if (reaction.emoji.name === "1️⃣") temptype = "account"
            else if (reaction.emoji.name === "2️⃣") temptype = "channel"
            else if (reaction.emoji.name === "3️⃣") temptype = "message"
            else if (reaction.emoji.name === "4️⃣") temptype = "retweet"
            else if (reaction.emoji.name === "5️⃣") temptype = "id"
            else throw "You reacted with a wrong emoji"
  
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable9"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
  
        if (temptype == "account") {
            var username;
            var userid;
          tempmsg = await message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable10"]))
            .setColor(es.color)
            .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable11"]))
            .setFooter(es.footertext, es.footericon)
          )
          await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
              max: 1,
              time: 90000,
              errors: ["time"]
            })
            .then(collected => {
              var twitlink = collected.first().content;
              if(!String(twitlink).toLowerCase().includes("https")) {
                timeouterror = "INVALID LINK";return message.reply(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable12"]));}
              if(!String(twitlink).toLowerCase().includes("twitter")) {
                timeouterror = "INVALID LINK";return message.reply(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable13"]));}
              username = twitlink.replace("https://twitter", "").split("/")[1];
            })
            .catch(e => {
              timeouterror = e;
            })
          if (timeouterror)
            return message.reply(new Discord.MessageEmbed()
              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable14"]))
              .setColor(es.wrongcolor)
              .setDescription(`Cancelled the Operation!`.substr(0, 2000))
              .setFooter(es.footertext, es.footericon)
            );

            var T = new Twit({
              consumer_key: twitconfig.consumer_key,
              consumer_secret: twitconfig.consumer_secret,
              access_token: twitconfig.access_token,
              access_token_secret: twitconfig.access_token_secret,
              timeout_ms: twitconfig.timeout_ms,
              strictSSL: twitconfig.strictSSL,
            })
            await T.get('users/search', {
              q: `${username}`,
              count: 1
            }, function (err, data, response) {
              if (err) return message.reply(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable15"]))
              var user = data[0];
              if(!user) return message.reply(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable16"]))
              userid = user.id_str;
              var TwitterName = user.screen_name;
              try {
                client.social_log.set(message.guild.id, userid, `${add}twitter.TWITTER_USER_ID`)
                client.social_log.set(message.guild.id, username, `${add}twitter.TWITTER_USER_NAME_ONLY_THOSE`)
                //require("../../social_log/twitterfeed").creat_twit(client);
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable17"]))
                  .setColor(es.color)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable18"]))
                  .addField(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variablex_19"]), eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable19"]))
                  .setURL(`https://twitter.com/${TwitterName}`)
                  .setFooter(es.footertext, es.footericon)
                );
            } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable20"]))
                .setColor(es.wrongcolor)
                .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable28"]))
                .setFooter(es.footertext, es.footericon)
                );
            }
            })
          
        } else if (temptype == "channel") {
  
            tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable22"]))
              .setColor(es.color)
              .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable23"]))
              .setFooter(es.footertext, es.footericon)
            })
            await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                max: 1,
                time: 90000,
                errors: ["time"]
              })
              .then(collected => {
                var message = collected.first();
                var channel = message.mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first() || message.guild.channels.cache.get(message.content.trim().split(" ")[0]);
                if (channel) {
                    try {
                        client.social_log.set(message.guild.id, channel.id, `${add}twitter.DISCORD_CHANNEL_ID`)
                        //require("../../social_log/twitterfeed").creat_twit(client);
                        return message.reply(new Discord.MessageEmbed()
                          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable24"]))
                          .setColor(es.color)
                          .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable25"]))
                          .addField(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variablex_26"]), eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable26"]))
                          .setFooter(es.footertext, es.footericon)
                        );
                    } catch (e) {
                        return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable27"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable36"]))
                        .setFooter(es.footertext, es.footericon)
                        );
                    }
                } else {
                  throw "you didn't ping a valid Channel"
                }
              })
              .catch(e => {
                timeouterror = e;
              })
            if (timeouterror)
              return message.reply(new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable29"]))
                .setColor(es.wrongcolor)
                .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                .setFooter(es.footertext, es.footericon)
              );
    
        } else if (temptype == "message") {
  
            tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable30"]))
              .setColor(es.color)
              .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable31"]))
              .setFooter(es.footertext, es.footericon)
            })
            await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                max: 1,
                time: 90000,
                errors: ["time"]
              })
              .then(collected => {
                try {
                  client.social_log.set(message.guild.id, collected.first().content, `${add}twitter.infomsg`)
                  //require("../../social_log/twitterfeed").creat_twit(client);
                  return message.reply(new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable32"]))
                    .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable33"]))
                    .setColor(es.color)
                    .addField(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variablex_34"]), eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable34"]))
                    .setFooter(es.footertext, es.footericon)
                  );

                } catch (e) {
                    return message.reply(new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable35"]))
                    .setColor(es.wrongcolor)
                    .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable49"]))
                    .setFooter(es.footertext, es.footericon)
                    );
                }
              })
              .catch(e => {
                timeouterror = e;
              })
            if (timeouterror)
              return message.reply(new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable37"]))
                .setColor(es.wrongcolor)
                .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                .setFooter(es.footertext, es.footericon)
              );
    
        } else if (temptype == "retweet") {

                  client.social_log.set(message.guild.id, !client.social_log.get(message.guild.id, `${add}twitter.REETWET`), `${add}twitter.REETWET`)
                  //require("../../social_log/twitterfeed").creat_twit(client);
                  return message.reply(new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable38"]))
                    .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable39"]))
                    .setColor(es.color)
                    .addField(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variablex_40"]), eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable40"]))
                    .setFooter(es.footertext, es.footericon)
                  );
   
        } else if (temptype == "id") {

          tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable41"]))
            .setColor(es.color)
            .setURL("https://tweeterid.com")
            .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable42"]))
            .setFooter(es.footertext, es.footericon)
          })
          await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
              max: 1,
              time: 90000,
              errors: ["time"]
            })
            .then(async collected => {
              try {
                client.social_log.set(message.guild.id, collected.first().content, `${add}twitter.TWITTER_USER_ID`)
                //require("../../social_log/twitterfeed").creat_twit(client);
                message.reply(new Discord.MessageEmbed()
                  .setTitle(`<a:yes:833101995723194437> Set the TWITTER USER ID TO: \`${collected.first().content}\``.substr(0, 256))
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable43"]))
                  .setColor(es.color)
                  .setFooter(es.footertext, es.footericon)
                );

                tempmsg = await message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable44"]))
                  .setColor(es.color)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable45"]))
                  .setFooter(es.footertext, es.footericon)
                )
                await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                    max: 1,
                    time: 90000,
                    errors: ["time"]
                  })
                  .then(async collected => {
                    try {
                      client.social_log.set(message.guild.id, collected.first().content, `${add}twitter.TWITTER_USER_NAME_ONLY_THOSE`)
                      //require("../../social_log/twitterfeed").creat_twit(client);
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(`<a:yes:833101995723194437> Set the TWITTER USER Name TO: \`${collected.first().content}\``.substr(0, 256))
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable46"]))
                        .setColor(es.color)
                        .addField(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variablex_47"]), eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable47"]))
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                        return message.reply(new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable48"]))
                        .setColor(es.wrongcolor)
                        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable52"]))
                        .setFooter(es.footertext, es.footericon)
                        );
                    }
                  })
                  .catch(e => {
                    timeouterror = e;
                  })
                if (timeouterror)
                  return message.reply(new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable50"]))
                    .setColor(es.wrongcolor)
                    .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                    .setFooter(es.footertext, es.footericon)
                  );


              } catch (e) {
                  return message.reply(new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable51"]))
                  .setColor(es.wrongcolor)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable55"]))
                  .setFooter(es.footertext, es.footericon)
                  );
              }
            })
            .catch(e => {
              timeouterror = e;
            })
          if (timeouterror)
            return message.reply(new Discord.MessageEmbed()
              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable53"]))
              .setColor(es.wrongcolor)
              .setDescription(`Cancelled the Operation!`.substr(0, 2000))
              .setFooter(es.footertext, es.footericon)
            );
  
       } else {
            return message.reply(new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-twitter"]["variable54"]))
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            );
        }

      } catch (e) {
        console.log(String(e.stack).grey.bgRed)
        return message.reply(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(client.la[ls].common.erroroccur)
          .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
        );
      }
    },
  };
  /**
   * @INFO
   * Bot Coded by Tomato#6966 | https://github.com/MilratoDev/discord-js-lavalink-Music-Bot-erela-js
   * @INFO
   * Work for Milrato Development | https://milrato.eu
   * @INFO
   * Please mention him / Milrato Development, when using this Code!
   * @INFO
   */
  