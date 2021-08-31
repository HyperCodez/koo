//import the config.json file
const config = require("../botconfig/config.json")
var ee = require(`../botconfig/embed.json`);
var emoji = require(`../botconfig/emojis.json`);
var {
    MessageEmbed
} = require(`discord.js`);
let countermap = new Map();
module.exports = client => {
    const {
        databasing,
        check_voice_channels,
        create_join_to_create_Channel,
        isValidURL
    } = require("../handlers/functions");

    client.on("messageCreate", async message => {
        try {
            if (!message.guild || !message.channel || message.author.bot) return;
            if(!client.settings.has(message.guild.id, "language")) client.settings.ensure(message.guild.id, { language: "en" });
            let ls = client.settings.get(message.guild.id, "language")
            client.settings.ensure(message.guild.id, {
                adminroles: [],
            });
            var adminroles = client.settings.get(message.guild.id, "adminroles")
            try {
                if (((adminroles && adminroles.length > 0) && Array.from(message.member.roles.cache.values()).length > 0 && message.member.roles.cache.some(r => adminroles.includes(r ? r.id : r))) || Array(message.guild.ownerID, config.ownerid).includes(message.author.id) || message.member.permissions.has("ADMINISTRATOR")) return;
                client.settings.ensure(message.guild.id, {
                    antilink: {
                        enabled: false,
                        whitelistedchannels: []
                    },
                });
                let antisettings = client.settings.get(message.guild.id, `antilink`)

                if (!antisettings.enabled) return;
                if (client.setups.get("TICKETS", "tickets").includes(message.channel.id) ||
                    client.setups.get("TICKETS", "tickets2").includes(message.channel.id) ||
                    client.setups.get("TICKETS", "tickets3").includes(message.channel.id) ||
                    client.setups.get("TICKETS", "tickets4").includes(message.channel.id) ||
                    client.setups.get("TICKETS", "tickets5").includes(message.channel.id)
                ) return; //it is a ticket
                let es = client.settings.get(message.guild.id, "embed");
                try {
                    if (isValidURL(message.content) && !message.content.includes("```")
                    
                    && !message.content.toLowerCase().includes(".gif") && !message.content.toLowerCase().includes(".png") &&
                     !message.content.toLowerCase().includes(".jpg")&& !message.content.toLowerCase().includes(".webp")
                     && !message.content.toLowerCase().includes(".gifv")&& !message.content.toLowerCase().includes(".webm")) {


                        if (antisettings.whitelistedchannels.includes(message.channel.id) || antisettings.whitelistedchannels.some(r=> message.channel.parentID == r)) return;
                        
                        await message.delete().catch(e => console.log("PREVENTED A BUG"))

                        if (!countermap.get(message.author.id)) countermap.set(message.author.id, 1)
                        setTimeout(() => {
                            countermap.set(message.author.id, Number(countermap.get(message.author.id)) - 1)
                            if (Number(countermap.get(message.author.id)) < 0) countermap.set(message.author.id, 1)
                        }, 5000)
                        countermap.set(message.author.id, Number(countermap.get(message.author.id)) + 1)



                        if (Number(countermap.get(message.author.id)) > 5) {
                            let member = message.member
                            let time = 10 * 60 * 1000;
                            let reason = "Sending too many Links in a Short Time";
                            let allguildroles = message.guild.roles.cache.array();
                            let mutedrole = false;
                            for (let i = 0; i < allguildroles.length; i++) {
                                if (allguildroles[i].name.toLowerCase().includes(`muted`)) {
                                    mutedrole = allguildroles[i];
                                    break;
                                }
                            }
                            if (!mutedrole) {
                                let highestrolepos = message.guild.me.roles.highest.position;
                                mutedrole = await message.guild.roles.create({
                                    data: {
                                        name: `muted`,
                                        color: `#222222`,
                                        hoist: true,
                                        position: Number(highestrolepos) - 1
                                    },
                                    reason: `This role got created, to mute Members!`
                                }).catch((e) => {
                                    return console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim);
                                });
                            }
                            await message.guild.channels.cache.filter(c => 
                                !c.permissionOverwrites.has(mutedrole.id) || 
                               (c.permissionOverwrites.has(mutedrole.id) && !c.permissionOverwrites.get(mutedrole.id).deny.toArray().includes("SEND_MESSAGE")) ||
                               (c.permissionOverwrites.has(mutedrole.id) && !c.permissionOverwrites.get(mutedrole.id).deny.toArray().includes("ADD_REACTIONS")) ).forEach((ch) => {
                                try {
                                    ch.permissionOverwrites.edit(mutedrole, {
                                        SEND_MESSAGES: false,
                                        ADD_REACTIONS: false,
                                        CONNECT: false,
                                        SPEAK: false
                                    }).catch(e => console.log(String(e).grey.italic.dim));
                                } catch (e) {
                                    console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim);
                                }
                            });
                            try {
                                member.roles.add(mutedrole).catch(e => console.log(String(e).grey.italic.dim));
                            } catch (e) {
                                console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
                            }
                            message.reply({embeds: [new MessageEmbed()
                                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                                .setFooter(es.footertext, es.footericon)
                                .setTitle(eval(client.la[ls]["handlers"]["antilinksjs"]["antilinks"]["variable1"]))
                                .setDescription(eval(client.la[ls]["handlers"]["antilinksjs"]["antilinks"]["variable2"]))
                            ]}).catch(e => console.log(String(e).grey.italic.dim));
                            countermap.set(message.author.id, 1)
                            setTimeout(() => {
                                try {
                                  message.reply({embeds: [new MessageEmbed()
                                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                                    .setFooter(es.footertext, es.footericon)
                                    .setTitle(eval(client.la[ls]["handlers"]["antilinksjs"]["antilinks"]["variable3"]))
                                    .setDescription(eval(client.la[ls]["handlers"]["antilinksjs"]["antilinks"]["variable4"]))
                                  ]}).catch(e => console.log(String(e).grey.italic.dim));
                                  member.roles.remove(mutedrole).catch(e => console.log(String(e).grey.italic.dim));
                                } catch (e) {
                                    console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
                                }
                              }, time);
                        }
                        else {
                            await message.reply({embeds: [new MessageEmbed()
                                .setColor(es.wrongcolor)
                                .setFooter(es.footertext, es.footericon)
                                .setTitle(eval(client.la[ls]["handlers"]["antilinksjs"]["antilinks"]["variable5"]))
                            ]}).then(msg => msg.delete({
                                timeout: 3000
                            }).catch(e => console.log(String(e).grey.italic.dim))).catch(e => console.log(String(e).grey.italic.dim));
                        }
                    } else {
                        // Do nothing ;)
                    }
                } catch (e) {
                    console.log(String(e.stack).grey.italic.dim.bgRed)
                    return message.reply({embeds: [new MessageEmbed()
                        .setColor(es.wrongcolor)
                        .setFooter(es.footertext, es.footericon)
                        .setTitle(client.la[ls].common.erroroccur)
                        .setDescription(eval(client.la[ls]["handlers"]["antilinksjs"]["antilinks"]["variable6"]))
                    ]}).catch(e => console.log(String(e).grey.italic.dim));
                }
            } catch {
                return;
            }
        } catch (e){
            console.log(String(e).grey.italic.dim)
        }
    })

}