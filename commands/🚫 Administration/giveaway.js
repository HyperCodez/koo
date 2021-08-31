const Discord = require("discord.js");
const {MessageEmbed, Permissions} = require("discord.js");
const config = require("../../botconfig/config.json")
const ms = require("ms");
const {
    databasing
} = require("../../handlers/functions");
module.exports = {
    name: "giveaway",
    aliases: ["g"],
    category: "🚫 Administration",
    description: "Giveaway manager",
    usage: "giveaway <start/end/reroll/edit/delete/list>",
    run: async (client, message, args, cmduser, text, prefix) => {
    
        let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
        let adminroles = client.settings.get(message.guild.id, "adminroles")
        let cmdroles = client.settings.get(message.guild.id, "cmdadminroles.giveaway")
        var cmdrole = []
        if (cmdroles.length > 0) {
            for (const r of cmdroles) {
                if (message.guild.roles.cache.get(r)) {
                    cmdrole.push(` | <@&${r}>`)
                } else if (message.guild.members.cache.get(r)) {
                    cmdrole.push(` | <@${r}>`)
                } else {
                    console.log("F")
                    console.log(r)
                    client.settings.remove(message.guild.id, r, `cmdadminroles.giveaway`)
                }
            }
        }
        if ((Array.from(message.member.roles.cache.values()) && !message.member.roles.cache.some(r => cmdroles.includes(r.id))) && !cmdroles.includes(message.author.id) && (Array.from(message.member.roles.cache.values()) && !message.member.roles.cache.some(r => adminroles.includes(r ? r.id : r))) && !Array(message.guild.ownerID, config.ownerid).includes(message.author.id) && !message.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR]))
            return message.reply({embeds : [new MessageEmbed()
                .setColor(es.wrongcolor)
                .setFooter(es.footertext, es.footericon)
                .setTitle(eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable1"]))
                .setDescription(eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable2"]))
            ]});
        if (!args[0]) return message.reply({embeds: [new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable3"]))
            .setDescription(eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable4"]))
        ]})
        var originalowner = message.author.id
        if (args[0].toLowerCase() === "start") {
            const filter = m => {
                return m.author.id == originalowner;
            };

            let giveawayChannel;
            await message.reply({
                embeds: [new Discord.MessageEmbed()
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setFooter(es.footertext, es.footericon)
                .setTitle(eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable5"]))
                .setDescription(eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable6"]))
            ]})
            console.log("WAIT FOR COLLECTION")
            try{
                var collected = await message.channel.awaitMessages(m=>m.author.id == originalowner, { max: 1, time: 60e3, errors: ['time'] })
                var channel = collected.first().mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first() || message.guild.channels.cache.get(collected.first().content);
                if(!channel) throw "nomention"
                giveawayChannel = channel;
            }catch (error){
                console.log(error)
                if(error = "nomention") 
                    return message.reply({embeds:[ new Discord.MessageEmbed()
                        .setColor(es.wrongcolor)
                        .setFooter(es.footertext, es.footericon)
                        .setTitle(eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable7"]))
                        .setDescription(eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable8"]))
                    ]})
                return message.reply({embeds: [new Discord.MessageEmbed()
                    .setColor(es.wrongcolor)
                    .setFooter(es.footertext, es.footericon)
                    .setTitle(eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable9"]))
                    .setDescription(eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable10"]))
                ]})
            }


            let giveawayDuration;
            await message.reply({
                embeds: [new Discord.MessageEmbed()
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setFooter(es.footertext, es.footericon)
                .setTitle(eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable11"]))
                .setDescription(eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable12"]))
            ]})
            try{
                var collected = await message.channel.awaitMessages(m=>m.author.id == originalowner, { max: 1, time: 60e3, errors: ['time'] })
                gargs = collected.first().content.split("+");
                giveawayDuration = 0;
                for(const a of gargs){
                    giveawayDuration += ms(a.split(" ").join(""))
                }
                if(!giveawayDuration || isNaN(giveawayDuration)) throw "notime";
            }catch (error){
                console.log(error)
                if(error = "notime") 
                    return message.reply({embeds: [new Discord.MessageEmbed()
                        .setColor(es.wrongcolor)
                        .setFooter(es.footertext, es.footericon)
                        .setTitle(eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable13"]))
                        .setDescription(eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable14"]))
                    ]})
                return message.reply({embeds: [new Discord.MessageEmbed()
                    .setColor(es.wrongcolor)
                    .setFooter(es.footertext, es.footericon)
                    .setTitle(eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable15"]))
                    .setDescription(eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable16"]))
                ]})
            }


            let giveawayNumberWinners;
            await message.reply({
                embeds: [new Discord.MessageEmbed()
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setFooter(es.footertext, es.footericon)
                .setTitle(eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable17"]))
                .setDescription(eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable18"]))
            ]})
            try{
                var collected = await message.channel.awaitMessages(m=>m.author.id == originalowner, { max: 1, time: 60e3, errors: ['time'] })
                giveawayNumberWinners = collected.first().content;
                if(!giveawayNumberWinners || isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)) throw "nowinners";
            }catch (error){
                console.log(error)
                if(error = "nowinners") 
                    return message.reply({embeds: [new Discord.MessageEmbed()
                        .setColor(es.wrongcolor)
                        .setFooter(es.footertext, es.footericon)
                        .setTitle(eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable19"]))
                        .setDescription(eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable20"]))
                    ]})
                return message.reply({embeds: [new Discord.MessageEmbed()
                    .setColor(es.wrongcolor)
                    .setFooter(es.footertext, es.footericon)
                    .setTitle(eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable21"]))
                    .setDescription(eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable22"]))
                ]})
            }

            
            let giveawayPrize;
            await message.reply({
                embeds: [new Discord.MessageEmbed()
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setFooter(es.footertext, es.footericon)
                .setTitle(eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable23"]))
                .setDescription(eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable24"]))
            ]})
            try{
                var collected = await message.channel.awaitMessages(m=>m.author.id == originalowner, { max: 1, time: 60e3, errors: ['time'] })
                giveawayPrize = collected.first().content;
            }catch (error){
                console.log(error)
                return message.reply({embeds: [new Discord.MessageEmbed()
                    .setColor(es.wrongcolor)
                    .setFooter(es.footertext, es.footericon)
                    .setTitle(eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable25"]))
                    .setDescription(eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable26"]))
                ]})
            }
            client.giveawaysManager.start(giveawayChannel, {
                time: giveawayDuration,
                prize: `<a:Gift:853993605868683285> ${giveawayPrize} <a:Gift:853993605868683285>`,
                winnerCount: giveawayNumberWinners,
                hostedBy: message.author,
                embedColorEnd: es.wrongcolor,
                embedColor: es.color,
                messages: {
                    giveaway: '🎉 **A GIVEAWAY Started** 🎉',
                    giveawayEnded: '🎉 **The GIVEAWAY Ended** 🎉',
                    timeRemaining: 'Time remaining: **{duration}**!',
                    inviteToParticipate: '*React with 🎉 to participate!*',
                    winMessage: ':tada: **Congratulations,** {winners} :tada:\n\n> You won **{prize}**!\n\n**Jump to it:**\n> {messageURL}',
                    embedFooter: 'Ends at: ',
                    noWinner: 'Giveaway cancelled, no valid participations.',
                    hostedBy: 'Hosted by: {user}',
                    winners: giveawayNumberWinners == 1 ? 'Winner' : "Winners",
                    before_winners: "<:arrow:832598861813776394>",
                    endedAt: 'Ended at',
                    units: {
                        seconds: 'Seconds',
                        minutes: 'Minutes',
                        hours: 'Hours',
                        days: 'Days',
                        pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
                    }
                }
            });

            message.reply({content : eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable27"])});
            // And the giveaway has started!
        } else if (args[0].toLowerCase() === "end") {
            args.shift();
            if (!args[0]) {
                return message.reply({content : eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable28"])});
            }
            let giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
                client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

            if (!giveaway) {
                return message.reply({content : eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable29"])});
            }

            client.giveawaysManager.edit(giveaway.messageID, {
                    setEndTimestamp: Date.now()
                })
                .then(() => {
                    message.reply({content : eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable30"])});
                })
                .catch((e) => {
                    if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} is already ended.`)) {
                        message.reply({content : eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable31"])});
                    } else {
                        console.error(e);
                        message.reply({content : eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable32"])});
                    }
                });
        } else if (args[0].toLowerCase() === "reroll") {
            args.shift();
            if (!args[0]) {
                return message.reply({content : eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable33"])});
            }
            let giveaway =
                client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
                client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);
            if (!giveaway) {
                return message.reply({content : eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable34"])});
            }
            client.giveawaysManager.reroll(giveaway.messageID, { winnerCount: !isNaN(args[1]) ? Number(args[1]) : 1})
                .then(() => {
                    message.reply({content : eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable35"])});
                })
                .catch((e) => {
                    if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)) {
                        message.reply(eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable36"]));
                    } else {
                        console.error(e);
                        message.reply({content : '<:no:833101993668771842> **An error occured...**```' + String(e.message).substr(0, 1900) + "```"});
                    }
                });


        } else if (args[0].toLowerCase() === "edit") {
            args.shift();
            let messageID = args[0];
            if (!messageID) {
                return message.reply({content : eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable37"])});
            }
            let giveawayPrize = args.slice(1).join(' ');
            if (!giveawayPrize) {
                return message.reply({content : eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable38"])});
            }
            client.giveawaysManager.edit(messageID, {
                newWinnerCount: 3,
                newPrize: giveawayPrize,
                addTime: 5000
            }).then(() => {
                // here, we can calculate the time after which we are sure that the lib will update the giveaway
                const numberOfSecondsMax = client.giveawaysManager.options.updateCountdownEvery / 1000;
                message.reply({content : eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable39"])});
            }).catch((err) => {
                message.reply({content : eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable40"])});
            });
        } else if (args[0].toLowerCase() === "delete") {
            args.shift();
            let messageID = args[0];
            if (!messageID) {
                return message.reply({content : eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable41"])});
            }
            client.giveawaysManager.delete(messageID).then(() => {
                    message.reply({content : eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable42"])});
                })
                .catch((err) => {
                    message.reply({content : eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable43"])});
                });
        } else if (args[0].toLowerCase() === "list") {
            args.shift();
            if (!args[0]) return message.reply({content : eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable44"])})
            if (args[0].toLowerCase() === "server") {
                let onServer = client.giveawaysManager.giveaways.filter((g) => g.guildId === message.guild.id && !g.ended);
                let embed = new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle(eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable45"]))
                buffer = "";
                for (let i = 0; i < onServer.length; i++) {
                    let invite = await client.guilds.cache.get(onServer[i].guildId).channels.cache.first().createInvite();
                    let CH = await client.guilds.cache.get(onServer.guildId).messages.fetch(onServer.messageID);
                    buffer += `**>>** Prize: \`${onServer[i].prize}\` | Duration: \`${ms(new Date() - onServer[0].startAt)}\`\n | [\`JUMP TO IT\`](https://discord.com/channels/${onServer.guildId}/${onServer.channelId}/${onServer.messageID})\n`
                }
                embed.setDescription(buffer ? buffer : "No Giveaways")
                message.reply({embeds : [embed]})
            } else {
                let allGiveaways = client.giveawaysManager.giveaways.filter((g) => !g.ended); // [ {Giveaway}, {Giveaway} ]

                let embed = new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle(eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable46"]))
                buffer = "";
                for (let i = 0; i < allGiveaways.length; i++) {
                    try{
                    let invite = await client.guilds.cache.get(allGiveaways[i].guildId).channels.cache.first().createInvite();
                    buffer += `**>>** Guild: [\`${client.guilds.cache.get(allGiveaways[i].guildId).name}\`](${invite}) | Prize: \`${allGiveaways[i].prize}\` | Duration: \`${ms(new Date() - allGiveaways[i].startAt)}\` | [\`JUMP TO IT\`](https://discord.com/channels/${allGiveaways[i].guildId}/${allGiveaways[i].channelId}/${allGiveaways[i].messageID})\n\n`
                }catch{}
                }
                embed.setDescription(buffer ? buffer : "No Giveaways")
                message.reply({embeds : [embed]})
            }

        } else {
            return message.reply({embeds: [new Discord.MessageEmbed()
                .setColor(es.wrongcolor)
                .setFooter(es.footertext, es.footericon)
                .setTitle(eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable47"]))
                .setDescription(eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable48"]))
            ]})
        }

        if(client.settings.get(message.guild.id, `adminlog`) != "no"){
            try{
              var channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, `adminlog`))
              if(!channel) return client.settings.set(message.guild.id, "no", `adminlog`);
              channel.send({embeds :[new MessageEmbed()
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                .setAuthor(`${require("path").parse(__filename).name} | ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
                .setDescription(eval(client.la[ls]["cmds"]["administration"]["giveaway"]["variable49"]))
                .addField(eval(client.la[ls]["cmds"]["administration"]["ban"]["variablex_15"]), eval(client.la[ls]["cmds"]["administration"]["ban"]["variable15"]))
               .addField(eval(client.la[ls]["cmds"]["administration"]["ban"]["variablex_16"]), eval(client.la[ls]["cmds"]["administration"]["ban"]["variable16"]))
                .setTimestamp().setFooter("ID: " + message.author.id)
              ]})
            }catch (e){
              console.log(e.stack ? String(e.stack).grey : String(e).grey)
            }
          } 
    }
}

function delay(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, delayInms);
    });
}