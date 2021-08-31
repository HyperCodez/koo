//Import npm modules
const Discord = require("discord.js");
const Canvas = require("canvas");
const canvacord = require("canvacord");
//Load fonts
//Canvas.registerFont( "./assets/fonts/DMSans-Bold.ttf" , { family: "DM Sans", weight: "bold" } );
//Canvas.registerFont( "./assets/fonts/DMSans-Regular.ttf" , { family: "DM Sans", weight: "regular" } );
//Canvas.registerFont( "./assets/fonts/STIXGeneral.ttf" , { family: "STIXGeneral" } );
//Canvas.registerFont( "./assets/fonts/AppleSymbol.ttf" , { family: "AppleSymbol" } );
//Canvas.registerFont( "./assets/fonts/Arial.ttf"       , { family: "Arial" } );
//Canvas.registerFont( "./assets/fonts/ArialUnicode.ttf", { family: "ArielUnicode" } );
//Canvas.registerFont(`./assets/fonts/Genta.ttf`, { family: `Genta` } );
//Canvas.registerFont("./assets/fonts/UbuntuMono.ttf", { family: "UbuntuMono" } );
//require functions from files
const config = require("../botconfig/config.json");
const ee = require("../botconfig/embed.json");
const {
  delay,
  isEqual
} = require("../handlers/functions");
const {
  CaptchaGenerator
} = require(`captcha-canvas`); //require package here
//Create Variables
const Fonts = "Genta, UbuntuMono, `DM Sans`, STIXGeneral, AppleSymbol, Arial, ArialUnicode";
const wideFonts = "`DM Sans`, STIXGeneral, AppleSymbol, Arial, ArialUnicode";
let invitemessage;
//Start the module
module.exports = client => {

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
  async function resolveUser(id) {
    let user = null;
    user = client.users.cache.get(id);
    if(!user)
      user = await client.users.fetch(id).catch((e) => {
        console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
      });
    if(!user) user = null
    return user;
  }

  client.on("ready", async () => {
    let invites = {};
    client.fetching = true;
    client.fetched = false;
    await asyncForEach(Array.from(client.guilds.cache.values()), async (guild) => {
      let i = (guild.me.permissions.has("MANAGE_GUILD") ? await guild.invites.fetch().catch(() => {}) : new Map());
      invites[guild.id] = i || new Map();
    });
    client.invitations = invites;
    client.fetched = true;
    client.fetching = false;
  })

  client.on("guildCreate", async (guild) => {
    let i = (guild.me.permissions.has("MANAGE_GUILD") ? await guild.invites.fetch().catch(() => {}) : new Map());
    client.invitations[guild.id] = i || new Map();
  })

  client.on("guildMemberAdd", async mem => {
    if (!mem.guild) return; //if not finished yet return
    if(!client.settings.has(mem.guild.id, "language")) client.settings.ensure(mem.guild.id, { language: "en" });
    
    welcome(mem);
    async function welcome(member) {
      if (!client.fetched) {
        console.log("NOT FETCHED YET PLS WAIT! Retrying in 5 Seconds...");
        setTimeout(() => {
          welcome(member);
        }, 5000)
        return;
      }
      // Fetch guild and member data from the db
      client.invitesdb.ensure(member.guild.id + member.id, {
        /* REQUIRED */
        id: member.id, // Discord ID of the user
        guildId: member.guild.id,
        /* STATS */
        fake: 0,
        leaves: 0,
        invites: 0,
        /* INVITES DATA */
        invited: [],
        left: [],
        /* INVITER */
        joinData: {
          type: "unknown",
          invite: null
        }, // { type: "normal" || "oauth" || "unknown" || "vanity", invite: inviteData || null }
        messagesCount: 0,
        /* BOT */
        bot: member.user.bot
      });
      let memberData = await client.invitesdb.find(v => v.id == member.id && v.guildId == member.guild.id && v.bot == member.user.bot);
      let memberDataKey = await client.invitesdb.findKey(v => v.id == member.id && v.guildId == member.guild.id && v.bot == member.user.bot);
      /* Find who is the inviter */
      let invite = null;
      let vanity = false; //if a vanity invite
      let oauth = false; //if a bot
      let perm = false; //if manage guild permissions
      if (!member.guild.me.permissions.has("MANAGE_GUILD")) perm = true;
      if (member.user.bot) {
        oauth = true;
      } else if (!perm) {
        // Fetch the current invites of the guild
        let guildInvites = await member.guild.invites.fetch().catch(e => console.log(String(e).grey.italic.dim));
        if (guildInvites) {
          // Fetch the invites of the guild BEFORE that the member has joined
          let oldGuildInvites = client.invitations[member.guild.id];
          // Update the cache
          client.invitations[member.guild.id] = guildInvites;
          // Find the invitations which doesn`t have the same number of use
          let inviteUsed = guildInvites.find((i) => oldGuildInvites.get(i.code) && oldGuildInvites.get(i.code).uses && oldGuildInvites.get(i.code).uses < i.uses);
          if ((isEqual(oldGuildInvites.map((i) => `${i.code}|${i.uses}`).sort(), guildInvites.map((i) => `${i.code}|${i.uses}`).sort())) && !inviteUsed && member.guild.features.includes("VANITY_URL")) {
            vanity = true;
          } else if (!inviteUsed) {
            let newAndUsed = guildInvites.filter((i) => !oldGuildInvites.get(i.code) && i.uses === 1);
            if (newAndUsed.size === 1) {
              inviteUsed = newAndUsed.first();
            }
          } else {

          }
          invite = inviteUsed;
        }
      }
      let inviter = invite ? await resolveUser(invite.inviter.id) : null;
      let inveterUser = inviter;
      if (invite) {
        client.invitesdb.ensure(member.guild.id + inviter.id, {
          /* REQUIRED */
          id: inviter.id, // Discord ID of the user
          guildId: member.guild.id,
          /* STATS */
          fake: 0,
          leaves: 0,
          invites: 0,
          /* INVITES DATA */
          invited: [],
          left: [],
          /* INVITER */
          joinData: {
            type: "unknown",
            invite: null
          }, // { type: "normal" || "oauth" || "unknown" || "vanity", invite: inviteData || null }
          messagesCount: 0,
          /* BOT */
          bot: inviter.bot
        });
        let inviterData = inviter ? client.invitesdb.find(v => v.id == inviter.id && v.guildId == member.guild.id && v.bot == inviter.bot) : null;
        let inviterDataKey = client.invitesdb.findKey(v => v.id == inviter.id && v.guildId == member.guild.id && v.bot == inviter.bot)
        // If the member had previously invited this member and he had left
        if(!Array.isArray(inviterData.left)){
          inviterData.left = [];
        }
        if(!Array.isArray(inviterData.invited)){
          inviterData.invited = [];
        }
        if (inviterData && inviterData.left && inviterData.left.includes(member.id)) {
          // It is removed from the invited members
          inviterData.left = inviterData.left.filter((id) => id !== member.id);
          // We`re removing a leave
          inviterData.leaves--;
        }
        // If the member had already invited this member before
        if (inviterData && inviterData.invited && inviterData.invited.includes(member.id)) {
          // We increase the number of fake invitations
          inviterData.fake++;
          // We increase the number of regular invitations
          inviterData.invites++;
        } else {
          // We increase the number of ordinary invitations
          inviterData.invites++;
          // We save that this member invited this member
          inviterData.invited.push(member.id);
        }
        // If the member ever has more invitations than the highest role, the highest role is added
        try {
          client.invitesdb.set(inviterDataKey, inviterData)
        } catch (e) {
          console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
        }
      }

      if (invite) {
        memberData.joinData = {
          type: "normal",
          invite: {
            uses: invite.uses,
            url: invite.url,
            code: invite.code,
            inviter: inviter.id
          }
        };
      } else if (oauth) {
        memberData.joinData = {
          type: "oauth"
        }
      } else if (vanity) {
        memberData.joinData = {
          type: "vanity"
        }
      } else if (perm) {
        memberData.joinData = {
          type: "perm"
        }
      }
      try {
        client.invitesdb.set(memberDataKey, memberData)
      } catch (e) {
        console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
      }

      if (invite) {
        //get the new memberdata
        memberData = client.invitesdb.get(member.guild.id + inveterUser.id)
        let {
          invites,
          fake,
          leaves
        } = memberData;
        if(fake < 0) fake *= -1;
        if(leaves < 0) leaves *= -1;
        if(invites < 0) invites *= -1;
        let realinvites = invites - fake - leaves;
        invitemessage = `Invited by **${inveterUser.tag}**\n<:Like:857334024087011378> **${realinvites} Invite${realinvites == 1 ? "" : "s"}**\n[<:joines:866356465299488809> ${invites} Joins | <:leaves:866356598356049930> ${leaves} Leaves | <:no:833101993668771842> ${fake} Fakes]`;
      } else if (oauth) {
        invitemessage = `It's a Bot! ${inveterUser && inveterUser.tag ? `**${inveterUser.tag}** Invited him!`: `Can't find out who invited him`}`;
      } else if (vanity) {
        invitemessage = `Invited by a **Vanity Link!**`;
      } else if (perm) {
        //get the new memberdata
        invitemessage = `I need the **Manage Server** Permission, to fetch Invites!`;

      }
      
      let es = client.settings.get(member.guild.id, "embed")

      if (client.settings.get(member.guild.id, "welcome.captcha") && !member.user.bot) {
        const captcha = new CaptchaGenerator({
          height: 200,
          width: 600
        });

        const buffer = await captcha.generate(); //returns buffer of the captcha image
        const attachment = new Discord.MessageAttachment(buffer, `${captcha.text}_Captcha.png`)
        let mutedrole = false;
        let allguildroles = Array.from(member.guild.roles.cache.values());
        for (let i = 0; i < allguildroles.length; i++) {
          if (allguildroles[i].name.toLowerCase().includes(`captcha`)) {
            mutedrole = allguildroles[i];
            break;
          }
        }
        if (!mutedrole) {
          let highestrolepos = member.guild.me.roles.highest.position;
          mutedrole = await member.guild.roles.create({
            data: {
              name: `DISABLED - CAPTCHA`,
              color: `#222222`,
              hoist: true,
              position: Number(highestrolepos) - 1
            },
            reason: `This role got created, to DISABLED - CAPTCHA Members!`
          }).catch((e) => {
            console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim);
          });
        }
        await member.guild.channels.cache.forEach((ch) => {
          try {
            ch.permissionOverwrites.edit(mutedrole, {
              VIEW_CHANNEL: false,
              SEND_MESSAGES: false,
              ADD_REACTIONS: false,
              CONNECT: false,
              SPEAK: false
            });
          } catch (e) {
            console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim);
          }
        });

        member.roles.add(mutedrole.id).catch(e => console.log(String(e).grey.italic.dim));
        const captchaembed = new Discord.MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setTimestamp()
          .setFooter(es.footertext, es.footericon)
          .setTitle(eval(client.la[ls]["handlers"]["welcomejs"]["welcome"]["variable1"]))
          .setDescription(eval(client.la[ls]["handlers"]["welcomejs"]["welcome"]["variable2"]));
        member.send({embeds: [captchaembed], files: [attachment]}).then(msg => {
          msg.channel.awaitMessages(m => m.author.id === member.user.id, {
            max: 1,
            time: 30000,
            errors: ["time"]
          }).then(collected => {
            if (collected.first().content.trim().toLowerCase() == captcha.text.toLowerCase()) {
              member.roles.remove(mutedrole.id).catch(e => console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim))
              msg.edit({
                embeds: [msg.embeds[0].setDescription(eval(client.la[ls]["handlers"]["welcomejs"]["welcome"]["variable3"])).setImage("https://cdn.discordapp.com/attachments/807985610265460766/834519837782704138/success-3345091_1280.png")]
              })
              add_roles(member)
              message(member)
            } else {
              member.guild.channels.cache.filter(ch => ch.type == "GUILD_TEXT").first().create({
                temporary: false
              }).then(invite => {
                member.user.send(eval(client.la[ls]["handlers"]["welcomejs"]["welcome"]["variable4"]))
                member.kick("FAILED THE CAPTCHA")
              }).catch(e => {
                console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
                member.user.send(eval(client.la[ls]["handlers"]["welcomejs"]["welcome"]["variable5"]))
                member.kick("FAILED THE CAPTCHA")
              })
            }
          })
        }).catch(e => {
          member.guild.channels.create(`VERIFY-YOURSELF`, {
            type: "GUILD_TEXT",
            topic: "PLEASE SEND THE CAPTCHA CODE IN THE CHAT!",
            permissionOverwrites: [{
                id: member.user.id,
                allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
              },
              {
                id: member.guild.id,
                deny: ["VIEW_CHANNEL"]
              }
            ]
          }).then(ch => {
            ch.send({
              content: `<@${member.user.id}>`,
              embeds: [captchaembed]
            }).then(msg => {
              msg.channel.awaitMessages(m => m.author.id === member.user.id, {
                max: 1,
                time: 30000,
                errors: ["time"]
              }).then(collected => {
                if (collected.first().content.trim().toLowerCase() == captcha.text.toLowerCase()) {
                  member.roles.remove(mutedrole.id).catch(e => console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim))
                  msg.edit({
                    embeds: [msg.embeds[0].setDescription(eval(client.la[ls]["handlers"]["welcomejs"]["welcome"]["variable6"])).setImage("https://cdn.discordapp.com/attachments/807985610265460766/834519837782704138/success-3345091_1280.png")]
                  }).catch(e => console.log("PREVENTED BUG"))
                  ch.delete().catch(e => console.log("e"))
                  add_roles(member)
                  message(member)
                } else {
                  member.guild.channels.cache.filter(ch => ch.type == "GUILD_TEXT").first().create({
                    temporary: false
                  }).then(invite => {
                    member.kick("FAILED THE CAPTCHA").catch(e => console.log("e"))
                    ch.delete().catch(e => console.log("e"))
                  }).catch(e => {
                    console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
                    member.kick("FAILED THE CAPTCHA").catch(e => console.log("e"))
                    console.log("channel delete")
                    ch.delete().catch(e => console.log("e"))

                  })
                }
              })
            })
          })
        })
      } else {
        add_roles(member)
        message(member)
      }



    }
    async function message(member) {
      let welcome = client.settings.get(member.guild.id, "welcome");
      if(!client.settings.has(member.guild.id, "language")) client.settings.ensure(member.guild.id, { language: "en" });
      let ls = client.settings.get(member.guild.id, "language");
      if (welcome && welcome.channel !== "nochannel") {
        if (welcome.image) {
          if (welcome.dm) {
            if (welcome.customdm === "no") dm_msg_autoimg(member);
            else dm_msg_withimg(member);
          }

          if (welcome.custom === "no") msg_autoimg(member);
          else msg_withimg(member);
        } else {

          if (welcome.dm) {
            dm_msg_withoutimg(member);
          }

          msg_withoutimg(member)
        }
      }


      async function msg_withoutimg(member) {
        if (!member.guild) return;
        let es = client.settings.get(member.guild.id, "embed")
        let welcomechannel = client.settings.get(member.guild.id, "welcome.channel");
        if (!welcomechannel) return;
        let channel = await client.channels.fetch(welcomechannel)
        if (!channel) return;

        //define the welcome embed
        const welcomeembed = new Discord.MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setTimestamp()
          .setFooter("WELCOME  |  " + member.user.id, member.user.displayAvatarURL({
            dynamic: true
          }))
          .setTitle(eval(client.la[ls]["handlers"]["welcomejs"]["welcome"]["variable7"]))
          .setDescription(client.settings.get(member.guild.id, "welcome.msg").replace("{user}", `${member.user}`))
          .addField(eval(client.la[ls]["handlers"]["welcomejs"]["welcome"]["variablex_8"]), eval(client.la[ls]["handlers"]["welcomejs"]["welcome"]["variable8"]))
        //send the welcome embed to there
        channel.send({
          content: `<@${member.user.id}>`,
          embeds: [welcomeembed]
        }).catch(e => console.log(String(e).grey.italic.dim));
      }
      async function dm_msg_withoutimg(member) {
        if (!member.guild) return;
        let es = client.settings.get(member.guild.id, "embed")
        //define the welcome embed
        const welcomeembed = new Discord.MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setTimestamp()
          .setFooter("WELCOME  |  " + member.user.id, member.user.displayAvatarURL({
            dynamic: true
          }))
          .setTitle(eval(client.la[ls]["handlers"]["welcomejs"]["welcome"]["variable9"]))
          .setDescription(client.settings.get(member.guild.id, "welcome.dm_msg").replace("{user}", `${member.user}`))
          .addField("\u200b", invitemessage)
        //send the welcome embed to there
        member.user.send({
          content: `<@${member.user.id}>`,
          embeds: [welcomeembed]
        }).catch(e => console.log(String(e).grey.italic.dim));
      }


      async function dm_msg_withimg(member) {
        if (!member.guild) return;
        let es = client.settings.get(member.guild.id, "embed")
        //define the welcome embed
        const welcomeembed = new Discord.MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setTimestamp()
          .setFooter("WELCOME  |  " + member.user.id, member.user.displayAvatarURL({
            dynamic: true
          }))
          .setTitle(eval(client.la[ls]["handlers"]["welcomejs"]["welcome"]["variable10"]))
          .setDescription(client.settings.get(member.guild.id, "welcome.dm_msg").replace("{user}", `${member.user}`))
          .setImage(client.settings.get(member.guild.id, "welcome.customdm"))
          .addField("\u200b", invitemessage)
        //send the welcome embed to there
        member.user.send({
          content: `<@${member.user.id}>`,
          embeds: [welcomeembed]
        }).catch(e => console.log(String(e).grey.italic.dim));
      }
      async function msg_withimg(member) {
        if (!member.guild) return;
        let es = client.settings.get(member.guild.id, "embed")
        let welcomechannel = client.settings.get(member.guild.id, "welcome.channel");
        if (!welcomechannel) return;
        let channel = await client.channels.fetch(welcomechannel)
        if (!channel) return;

        //define the welcome embed
        const welcomeembed = new Discord.MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setTimestamp()
          .setFooter("WELCOME  |  " + member.user.id, member.user.displayAvatarURL({
            dynamic: true
          }))
          .setTitle(eval(client.la[ls]["handlers"]["welcomejs"]["welcome"]["variable11"]))
          .setDescription(client.settings.get(member.guild.id, "welcome.msg").replace("{user}", `${member.user}`))
          .setImage(client.settings.get(member.guild.id, "welcome.custom"))
          .addField("\u200b", invitemessage)
        //send the welcome embed to there
        channel.send({
          content: `<@${member.user.id}>`,
          embeds: [welcomeembed]
        }).catch(e => console.log(String(e).grey.italic.dim));
      }

      async function dm_msg_autoimg(member) {
        try {
          if (!member.guild) return;

          let es = client.settings.get(member.guild.id, "embed")
          //define the welcome embed
          const welcomeembed = new Discord.MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTimestamp()
            .setFooter("WELCOME  |  " + member.user.id, member.user.displayAvatarURL({
              dynamic: true
            }))
            .setTitle(eval(client.la[ls]["handlers"]["welcomejs"]["welcome"]["variable12"]))
            .addField("\u200b", invitemessage)
            .setDescription(client.settings.get(member.guild.id, "welcome.dm_msg").replace("{user}", `${member.user}`))

          //member roles add on welcome every single role
          const canvas = Canvas.createCanvas(1772, 633);
          //make it "2D"
          const ctx = canvas.getContext(`2d`);

          if (client.settings.get(member.guild.id, "welcome.backgrounddm") !== "transparent") {
            try {
              const bgimg = await Canvas.loadImage(client.settings.get(member.guild.id, "welcome.backgrounddm"));
              ctx.drawImage(bgimg, 0, 0, canvas.width, canvas.height);
            } catch {}
          } else {
            try {
              if (!member.guild.iconURL() || member.guild.iconURL() == null || member.guild.iconURL() == undefined) return;
              const img = await Canvas.loadImage(member.guild.iconURL({
                format: "png"
              }));
              ctx.globalAlpha = 0.3;
              //draw the guildicon
              ctx.drawImage(img, 1772 - 633, 0, 633, 633);
              ctx.globalAlpha = 1;
            } catch {}
          }

          if (client.settings.get(member.guild.id, "welcome.framedm")) {
            let background;
            var framecolor = client.settings.get(member.guild.id, "welcome.framecolordm").toUpperCase();
            if (framecolor == "WHITE") framecolor = "#FFFFF9";
            if (client.settings.get(member.guild.id, "welcome.discriminatordm") && client.settings.get(member.guild.id, "welcome.servernamedm"))
              background = await Canvas.loadImage(`./assets/welcome/${framecolor}/welcome3frame.png`);

            else if (client.settings.get(member.guild.id, "welcome.discriminatordm"))
              background = await Canvas.loadImage(`./assets/welcome/${framecolor}/welcome2frame_unten.png`);

            else if (client.settings.get(member.guild.id, "welcome.servernamedm"))
              background = await Canvas.loadImage(`./assets/welcome/${framecolor}/welcome2frame_oben.png`);

            else
              background = await Canvas.loadImage(`./assets/welcome/${framecolor}/welcome1frame.png`);

            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            if (client.settings.get(member.guild.id, "welcome.pbdm")) {
              background = await Canvas.loadImage(`./assets/welcome/${framecolor}/welcome1framepb.png`);
              ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            }
          }

          var fillcolors = client.settings.get(member.guild.id, "welcome.framecolordm").toUpperCase();
          if (fillcolors == "WHITE") framecolor = "#FFFFF9";
          ctx.fillStyle = fillcolors.toLowerCase();

          //set the first text string 
          var textString3 = `${member.user.username}`;
          //if the text is too big then smaller the text
          if (textString3.length >= 14) {
            ctx.font = `100px ${Fonts}`;         
            await canvacord.Util.renderEmoji(ctx, textString3, 720, canvas.height / 2);
          }
          //else dont do it
          else {
            ctx.font = `150px ${Fonts}`;
            await canvacord.Util.renderEmoji(ctx, textString3, 720, canvas.height / 2 + 20);
          }



          ctx.font = `bold 50px ${wideFonts}`;
          //define the Discriminator Tag
          if (client.settings.get(member.guild.id, "welcome.discriminatordm")) {
            await canvacord.Util.renderEmoji(ctx, `#${member.user.discriminator}`, 750, canvas.height / 2 + 125);
          }
          //define the Member count
          if (client.settings.get(member.guild.id, "welcome.membercountdm")) {
            await canvacord.Util.renderEmoji(ctx, `Member #${member.guild.memberCount}`, 750, canvas.height / 2 + 200);
          }
          //get the Guild Name
          if (client.settings.get(member.guild.id, "welcome.servernamedm")) {
            await canvacord.Util.renderEmoji(ctx, `${member.guild.name}`, 700, canvas.height / 2 - 150);
          }

          if (client.settings.get(member.guild.id, "welcome.pbdm")) {
            //create a circular "mask"
            ctx.beginPath();
            ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true); //position of img
            ctx.closePath();
            ctx.clip();
            //define the user avatar
            const avatar = await Canvas.loadImage(member.user.displayAvatarURL({
              format: `png`
            }));
            //draw the avatar
            ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
          }

          //get it as a discord attachment
          const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `welcome-image.png`);
          //send the welcome embed to there
          member.user.send({
            content: `<@${member.user.id}>`,
            embeds: [welcomeembed],
            files: [attachment]
          }).catch(e => console.log(String(e).grey.italic.dim));
          //member roles add on welcome every single role
        } catch {}
      }
      async function msg_autoimg(member) {
        try {
          if (!member.guild) return 
          let es = client.settings.get(member.guild.id, "embed")
          let welcomechannel = client.settings.get(member.guild.id, "welcome.channel");
          if (!welcomechannel) return
          let channel = await client.channels.fetch(welcomechannel)
          if (!channel) return 
          //define the welcome embed
          const welcomeembed = new Discord.MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTimestamp()
            .setFooter("WELCOME  |  " + member.user.id, member.user.displayAvatarURL({
              dynamic: true
            }))
            .addField("\u200b", invitemessage)
            .setTitle(eval(client.la[ls]["handlers"]["welcomejs"]["welcome"]["variable13"]))
            .setDescription(client.settings.get(member.guild.id, "welcome.msg").replace("{user}", `${member.user}`))
          try {
            //member roles add on welcome every single role
            const canvas = Canvas.createCanvas(1772, 633);
            //make it "2D"
            const ctx = canvas.getContext(`2d`);

            if (client.settings.get(member.guild.id, "welcome.background") !== "transparent") {
              try {
                const bgimg = await Canvas.loadImage(client.settings.get(member.guild.id, "welcome.background"));
                ctx.drawImage(bgimg, 0, 0, canvas.width, canvas.height);
              } catch {}
            } else {
              try {
                if (!member.guild.iconURL() || member.guild.iconURL() == null || member.guild.iconURL() == undefined) return;
                const img = await Canvas.loadImage(member.guild.iconURL({
                  format: "png"
                }));
                ctx.globalAlpha = 0.3;
                //draw the guildicon
                ctx.drawImage(img, 1772 - 633, 0, 633, 633);
                ctx.globalAlpha = 1;
              } catch {}
            }


            if (client.settings.get(member.guild.id, "welcome.frame")) {
              let background;
              var framecolor = client.settings.get(member.guild.id, "welcome.framecolor").toUpperCase();
              if (framecolor == "WHITE") framecolor = "#FFFFF9";
              if (client.settings.get(member.guild.id, "welcome.discriminator") && client.settings.get(member.guild.id, "welcome.servername"))
                background = await Canvas.loadImage(`./assets/welcome/${framecolor}/welcome3frame.png`);

              else if (client.settings.get(member.guild.id, "welcome.discriminator"))
                background = await Canvas.loadImage(`./assets/welcome/${framecolor}/welcome2frame_unten.png`);

              else if (client.settings.get(member.guild.id, "welcome.servername"))
                background = await Canvas.loadImage(`./assets/welcome/${framecolor}/welcome2frame_oben.png`);

              else
                background = await Canvas.loadImage(`./assets/welcome/${framecolor}/welcome1frame.png`);

              ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

              if (client.settings.get(member.guild.id, "welcome.pb")) {
                background = await Canvas.loadImage(`./assets/welcome/${framecolor}/welcome1framepb.png`);
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
              }
            }

            var fillcolor = client.settings.get(member.guild.id, "welcome.framecolor").toUpperCase();
            if (fillcolor == "WHITE") framecolor = "#FFFFF9";
            ctx.fillStyle = fillcolor.toLowerCase();

            //set the first text string 
            var textString3 = `${member.user.username}`;
            //if the text is too big then smaller the text
            if (textString3.length >= 14) {
              ctx.font = `100px ${Fonts}`;
              await canvacord.Util.renderEmoji(ctx, textString3, 720, canvas.height / 2);
            }
            //else dont do it
            else {
              ctx.font = `150px ${Fonts}`;
              await canvacord.Util.renderEmoji(ctx, textString3, 720, canvas.height / 2 + 20);
            }

            ctx.font = `bold 50px ${wideFonts}`;
            //define the Discriminator Tag
            if (client.settings.get(member.guild.id, "welcome.discriminator")) {
              await canvacord.Util.renderEmoji(ctx, `#${member.user.discriminator}`, 750, canvas.height / 2 + 125);
            }
            //define the Member count
            if (client.settings.get(member.guild.id, "welcome.membercount")) {
              await canvacord.Util.renderEmoji(ctx, `Member #${member.guild.memberCount}`, 750, canvas.height / 2 + 200);
            }
            //get the Guild Name
            if (client.settings.get(member.guild.id, "welcome.servername")) {
              await canvacord.Util.renderEmoji(ctx, `${member.guild.name}`, 700, canvas.height / 2 - 150);
            }


            if (client.settings.get(member.guild.id, "welcome.pb")) {
              //create a circular "mask"
              ctx.beginPath();
              ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true); //position of img
              ctx.closePath();
              ctx.clip();
              //define the user avatar
              const avatar = await Canvas.loadImage(member.user.displayAvatarURL({
                format: `png`
              }));
              //draw the avatar
              ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
            }
            //get it as a discord attachment
            const attachment = new Discord.MessageAttachment(await canvas.toBuffer(), `welcome-image.png`);
            //send the welcome embed to there
            channel.send({
              content: `<@${member.user.id}>`,
              embeds: [welcomeembed],
              files: [attachment]
            }).catch(e => console.log(String(e).grey.italic.dim));


          } catch (e) {
            console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim);
            channel.send({
              content: `<@${member.user.id}>`,
              embeds: [welcomeembed]
            }).catch(e => console.log(String(e).grey.italic.dim));
          }
        } catch (e) {

        }
      }
    }

    function add_roles(member) {
      let roles = client.settings.get(member.guild.id, "welcome.roles")
      if (roles && roles.length > 0) {
        for (const role of roles) {
          try {
            member.roles.add(role).catch(e => console.log(String(e).grey.italic.dim));
          } catch {}
        }
      }
    }
  })


  //if a User leaves, remove him from the db
  client.on("guildMemberRemove", async mem => {
    if (!mem.guild) return; //if not finished yet return
    leave(mem);
    async function leave(member) {
      if (!client.fetched) {
        console.log("NOT FETCHED YET PLS WAIT! Retrying in 5 Seconds...");
        setTimeout(() => {
          leave(member);
        }, 5000)
        return;
      }
      // Fetch guild and member data from the db
      client.invitesdb.ensure(member.guild.id + member.id, {
        /* REQUIRED */
        id: member.id, // Discord ID of the user
        guildId: member.guild.id,
        /* STATS */
        fake: 0,
        leaves: 0,
        invites: 0,
        /* INVITES DATA */
        invited: [],
        left: [],
        /* INVITER */
        joinData: {
          type: "unknown",
          invite: null
        }, // { type: "normal" || "oauth" || "unknown" || "vanity", invite: inviteData || null }
        messagesCount: 0,
        /* BOT */
        bot: member.user.bot
      });
      let memberData = await client.invitesdb.find(v => v.id == member.id && v.guildId == member.guild.id && v.bot == member.user.bot);
      let memberDataKey = await client.invitesdb.findKey(v => v.id == member.id && v.guildId == member.guild.id && v.bot == member.user.bot);
      /* Find who is the inviter */
      if(!memberData.joinData || !memberData.joinData.type){
        memberData.joinData = {
          type: "unknown",
          invite: null
        }
      }
      let invitedby = memberData.joinData.type == "normal" ? await resolveUser(memberData.joinData.invite.inviter) : null;
      if(!invitedby) return;
      let inviterData = client.invitesdb.find(v => v.id == invitedby.id && v.guildId == member.guild.id && v.bot == invitedby.bot);
      let inviterDataKey = client.invitesdb.findKey(v => v.id == invitedby.id && v.guildId == member.guild.id && v.bot == invitedby.bot)
      if(!Array.isArray(inviterData.left)){
        inviterData.left = [];
      }
      if(!Array.isArray(inviterData.invited)){
        inviterData.invited = [];
      }
      // If the member had previously invited this member and he had left
      if (inviterData && inviterData.invited && inviterData.invited.includes(member.id)) {
        inviterData.fake--;
      } 
      inviterData.leaves++;
      inviterData.left = inviterData.left.push(member.id);
      
      try {
        client.invitesdb.set(inviterDataKey, inviterData)
      } catch (e) {
        console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
      }
    }
  })

  //INCREASE THE MESSAGECOUNTER 
  client.on("messageCreate", message => {
    if(message.guild && message.author.id){
      // Fetch guild and member data from the db
      client.invitesdb.ensure(message.guild.id + message.author.id, {
        messagesCount: 0,
      });
      client.invitesdb.inc(message.guild.id + message.author.id, "messagesCount")
    }
     
  })

}