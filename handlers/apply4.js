//all reactions for the finished channel
let all_finished_reactions = [
  "✅", "❌", "🎟️", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"
]
var moment = require('moment'); // require
//import the config.json file
const config = require("../botconfig/config.json")
//import the Discord Library
const Discord = require("discord.js");

//antispam SET
const antimap = new Map()

//apply cooldown
const cooldown = new Set();

const { MessageButton, MessageActionRow } = require('discord.js')
//Start the module
module.exports = client => {

  //define the apply system variable
  let apply_db = client.apply4;
  let acceptbutton = new MessageButton().setStyle('DANGER').setEmoji( "✅") .setCustomId("Apply_accept").setLabel("Accept");
  let dclinebutton = new MessageButton().setStyle('DANGER') .setEmoji("❌") .setCustomId("Apply_deny").setLabel("Decline");
  let ticketbutton = new MessageButton().setStyle('SECONDARY') .setEmoji("🎟️") .setCustomId("Apply_ticket").setLabel("Ask Question");
  let emoji1button = new MessageButton().setStyle('PRIMARY') .setEmoji("1️⃣") .setCustomId("Apply_1");
  let emoji2button = new MessageButton().setStyle('PRIMARY') .setEmoji("2️⃣") .setCustomId("Apply_2");
  let emoji3button = new MessageButton().setStyle('PRIMARY') .setEmoji("3️⃣") .setCustomId("Apply_3");
  let emoji4button = new MessageButton().setStyle('PRIMARY') .setEmoji("4️⃣") .setCustomId("Apply_4");
  let emoji5button = new MessageButton().setStyle('PRIMARY') .setEmoji("5️⃣") .setCustomId("Apply_5");
  let buttonRow1 = new MessageActionRow().addComponents([acceptbutton, dclinebutton, ticketbutton]);
  let buttonRow2 = new MessageActionRow().addComponents([emoji1button, emoji2button, emoji3button, emoji4button, emoji5button]);
  let allbuttons = [buttonRow1, buttonRow2];
 //once a reaction is added this will fire
  client.on("messageReactionAdd", async (reaction, user) => {
    const {
      message
    } = reaction;
    if (user.bot || !message.guild) return;
    if (message.partial) await message.fetch().catch(e => console.log(String(e).grey.italic.dim));
    if (reaction.partial) await reaction.fetch().catch(e => console.log(String(e).grey.italic.dim));
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    if(!client.settings.has(message.guild.id, "language")) client.settings.ensure(message.guild.id, { language: "en" });

    apply_db.ensure(message.guild.id, {
      "channel_id": "",
      "message_id": "",
      "f_channel_id": "", //changequestions --> which one (lists everyone with index) --> 4. --> Question

      "QUESTIONS": [{
        "1": "DEFAULT"
      }],

      "TEMP_ROLE": "0",

      "accept": "You've got accepted!",
      "accept_role": "0",

      "deny": "You've got denied!",

      "ticket": "Hey {user}! We have some Questions!",

      "one": {
        "role": "0",
        "message": "Hey you've got accepted for Team 1",
        "image": {
          "enabled": false,
          "url": ""
        }
      },
      "two": {
        "role": "0",
        "message": "Hey you've got accepted for Team 2",
        "image": {
          "enabled": false,
          "url": ""
        }
      },
      "three": {
        "role": "0",
        "message": "Hey you've got accepted for Team 3",
        "image": {
          "enabled": false,
          "url": ""
        }
      },
      "four": {
        "role": "0",
        "message": "Hey you've got accepted for Team 4",
        "image": {
          "enabled": false,
          "url": ""
        }
      },
      "five": {
        "role": "0",
        "message": "Hey you've got accepted for Team 5",
        "image": {
          "enabled": false,
          "url": ""
        }
      }
    });
    /** ///////////////////////////////////////////////////////////// *
     *
     * THIS IF IS FOR DISPLAYING IF THERE WAS A VALID REACTION START POINT
     *
     * ///////////////////////////////////////////////////////////// *
     */
    if (message.id === apply_db.get(message.guild.id, "message_id") && message.channel.id === apply_db.get(message.guild.id, "channel_id") && reaction.emoji.name === "✅") {
      try {
        //remove the users' reaction
        reaction.users.remove(user);

        //COOLDOWN SYSTEM
        if (cooldown.has(user.id)) {
          return user.send({embeds: [new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable1"]))
            .addField(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable2"]))
          ]}).catch(e => {
            message.reply({content: `${user}`,embeds: [new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setFooter(es.footertext, es.footericon)
              .setTitle(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable5"]))
              .setDescription(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable6"]))]
            }).then(msg=>{
              setTimeout(()=>{
                try{msg.delete();}catch{}
              }, 5000)
            })
          })
        } else {
          cooldown.add(user.id);
          setTimeout(() => {
            cooldown.delete(user.id);
          }, 120 * 1000);
        }
        var originaluser = user;
        var originalchannel = reaction.message.channel;
        //get the guild
        var guild = await message.guild.fetch().catch(e => console.log(String(e).grey.italic.dim));

        //get the channel to send the finished applies
        var channel_tosend = guild.channels.cache.get(apply_db.get(message.guild.id, "f_channel_id"));

        //if channel-to-send not found return error
        if (!channel_tosend) return;

        //if no running-application catcher is active set it too true!
        if (!antimap.has(user.id)) antimap.set(user.id)

        //but if he is having an running application somewhere then return error
        else return user.send({embeds: [new Discord.MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable3"]))
          .setTitle(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable4"]))
          .setFooter(es.footertext, es.footericon)
        ]}).catch(e => {
          message.reply({content: `${user}`,embeds: [new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable5"]))
            .setDescription(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable6"]))]
          }).then(msg=>{
            setTimeout(()=>{
              try{msg.delete();}catch{}
            }, 5000)
          })
        })

        //the array of answers for the current user
        var answers = [];

        //set the counter variable to 0
        var counter = 0;

        //define the url, if there would be an attachment ;)
        var url = "";

        //get all Questions from the Database
        var Questions = apply_db.get(message.guild.id, "QUESTIONS");

        //get the actual current question from the Questions
        var current_question = Object.values(Questions[counter]).join(" ")

        //ask the current (first) Question from the Database
        ask_question(current_question);

        /** @param ask_question {qu} Question == Ask the current Question and push the answer
         * This function is for asking ONE SINGLE Question to the USER
         */
        function ask_question(qu) {
          if (counter === Questions.length) return send_finished();
          //send the user the first question
          user.send({embeds: [new Discord.MessageEmbed()
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setDescription(qu)
              .setAuthor(`Question ${counter + 1} / ${Questions.length}`, client.user.displayAvatarURL(), "https://discord.com/api/oauth2/authorize?client_id=806086994031411221&permissions=8&scope=bot%20applications.commands")
              .setFooter(es.footertext, es.footericon)
          ]}).then(msg => {
              msg.channel.awaitMessages(m => m.author.id === user.id, {
                max: 1,
                time: 300e3,
                errors: ["time"]
              }).then(async collected => {
                //push the answer of the user into the answers lmfao
                if (collected.first().attachments.size > 0) {
                  if (collected.first().attachments.every(attachIsImage)) {
                    answers.push(`${collected.first().content}\n${url}`);
                  } else {
                    answers.push(`${collected.first().content}\nThere was an attachment, which i cannot display!`);
                  }
                } else {
                  answers.push(`${collected.first().content}`);
                }
                //count up with 1
                counter++;
                //if it reached the questions limit return with the finished embed
                if (counter === Questions.length) return send_finished();

                //get the new current question
                var new_current_question = Object.values(Questions[counter]).join(" ")

                //ask the new current question
                ask_question(new_current_question);

              }).catch(error => {
                antimap.delete(user.id)
                return user.send({embeds: [new Discord.MessageEmbed()
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setTitle(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable7"]))
                  .setFooter(es.footertext, es.footericon)
                ]}).catch(e => {
                  antimap.delete(user.id)
                  message.reply({embeds: [new Discord.MessageEmbed()
                    .setColor(es.wrongcolor)
                    .setFooter(es.footertext, es.footericon)
                    .setTitle(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable8"]))
                    .setDescription(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable9"]))
                  ]}).then(msg=>{
                    setTimeout(()=>{
                      try{msg.delete();}catch{}
                    }, 5000)
                  })
                })
              })
            })
            .catch(e => {
              antimap.delete(user.id)
              message.reply({content: `${user}`, embeds: [new Discord.MessageEmbed()
                .setColor(es.wrongcolor)
                .setFooter(es.footertext, es.footericon)
                .setTitle(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable10"]))
                .setDescription(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable11"]))]
              }).then(msg=>{
                setTimeout(()=>{
                  try{msg.delete();}catch{}
                }, 5000)
              })
            })
        }

        /** @param send_finished {*} == Send the finished application embed to the finished application questions channel ;)
         * This function is for asking ONE SINGLE Question to the USER
         */
        async function send_finished() {
          if (apply_db.get(guild.id, "last_verify")) {
            user.send({embeds: [new Discord.MessageEmbed()
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setTitle(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable12"]))
              .setFooter(es.footertext, es.footericon)
            ]}).then(async msg => {

              msg.react("✅")
              msg.react("❌")

              const filter = (reaction, user) => {
                return user.id === originaluser.id;
              };
              msg.awaitReactions(filter, {
                  max: 1,
                  time: 300e3,
                  errors: ['time']
                })
                .then(async collected => {
                  let reaction = collected.first();
                  if (reaction.emoji.name === "✅") {
                    antimap.delete(originaluser.id)
                    var embed = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon)
                      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                      .setTitle(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable13"])) //${user.tag} -
                      .setDescription(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable14"]))
                      .setFooter(originaluser.id, originaluser.displayAvatarURL({
                        dynamic: true
                      }))
                      .setThumbnail(originaluser.displayAvatarURL({
                        dynamic: true
                      }))
                      .setTimestamp()

                    //for each question add a field
                    for (var i = 0; i < Questions.length; i++) {
                      try {
                        let qu = Object.values(Questions[i]);
                        if (qu.length > 100) qu = String(Object.values(Questions[i])).substr(0, 100) + " ..."
                        embed.addField(("**" + Object.keys(Questions[i]) + ". |** " + qu).substr(0, 256), ">>> " + String(answers[i]).substr(0, 1000))
                      } catch (e) {
                        console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
                        /* */
                      }
                    }


                    //send the embed into the channel
                    channel_tosend.send({embeds: [embed]}).then(thmsg => {
                      //set the message to the database
                        apply_db.set(thmsg.id, originaluser.id, "temp");
                      //react with each emoji of all reactions
                      for (const emoji of all_finished_reactions)
                        thmsg.react(emoji).catch((O)=>{ });
                    });
                    // "Producing Code" (May take some time)
                    const finished_embed = new Discord.MessageEmbed()
                      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                      .setTitle(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable15"]))
                      .addField("\u200b", `**❯** Go Back to the Channel ${originalchannel}`).setFooter(es.footertext, es.footericon)

                    //send an informational message
                    originaluser.send({embeds: [finished_embed]})
                    //then try catch
                    try {
                      //find the role from the database
                      var roleid = apply_db.get(message.guild.id, "TEMP_ROLE");
                      if (roleid) {
                        if (roleid.length == 18) {
                          //find the member from the reaction event
                          var member = message.guild.members.cache.get(originaluser.id);
                          //find the role
                          var role = await message.guild.roles.cache.get(roleid);
                          if (!role) return channel_tosend.send({content: eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable16"])})
                          if (!member) return channel_tosend.send({content: eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable17"])})
                          //add the role
                          member.roles.add(role.id).catch((e)=>{channel_tosend.send({content: "I am Missing Permissions to grant the Role\n" + e.message})});
                        }
                      }

                    } catch (e) {
                      console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
                      channel_tosend.send({content: "I am Missing Permissions to grant the TEMPROLE\n" + e.message})
                      /* */
                    }




                  } else {
                    antimap.delete(originaluser.id)
                    originaluser.send({embeds: [new Discord.MessageEmbed()
                      .setColor(es.wrongcolor)
                      .setTitle(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable18"]))
                      .setFooter(es.footertext, es.footericon)
                    ]})
                  }
                }).catch(e => {
                  console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
                  antimap.delete(originaluser.id)
                  originaluser.send({embeds: [new Discord.MessageEmbed()
                    .setColor(es.wrongcolor)
                    .setTitle(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable19"]))
                    .setFooter(es.footertext, es.footericon)
                  ]})
                });
            })

          } else {
            antimap.delete(user.id)
            var embed = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon)
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setTitle(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable20"])) //${user.tag} -
              .setDescription(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable21"]))
              .setFooter(originaluser.id, originaluser.displayAvatarURL({
                dynamic: true
              }))
              .setTimestamp()

            //for each question add a field
            for (var i = 0; i < Questions.length; i++) {
              try {
                let qu = Object.values(Questions[i]);
                if (qu.length > 100) qu = String(Object.values(Questions[i])).substr(0, 100) + " ..."
                embed.addField(("**" + Object.keys(Questions[i]) + ". |** " + qu).substr(0, 256), ">>> " + String(answers[i]).substr(0, 1000))
              } catch {
                /* */
              }
            }

            //send the embed into the channel
            let thhmsg = await channel_tosend.send({embeds: [ embed ]})
            //set the message to the database
            apply_db.set(thhmsg.id, originaluser.id, "temp");
            //react with each emoji of all reactions
            for (const emoji of all_finished_reactions)
              thhmsg.react(emoji).catch((O)=>{});
            

            // "Producing Code" (May take some time)
            const finished_embed = new Discord.MessageEmbed()
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setTitle(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable22"]))
              .addField("\u200b", `**❯** Go Back to the Channel ${originalchannel}`).setFooter(es.footertext, es.footericon)
            originaluser.send({embeds: [finished_embed]})

            //then try catch
            try {
              //find the role from the database
              var roleid = apply_db.get(message.guild.id, "TEMP_ROLE");
              if (roleid) {
                if (roleid.length == 18) {
                  //find the member from the reaction event
                  var member = message.guild.members.cache.get(originaluser.id);
                  //find the role
                  var role = await message.guild.roles.cache.get(roleid);
                  if (!role) return channel_tosend.send({content: eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable23"])})
                  if (!member) return channel_tosend.send({content: eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable24"])})
                  //add the role
                  member.roles.add(role.id).catch((e)=>{channel_tosend.send({content: "I am Missing Permissions to grant the Role\n" + e.message})});
                }
              }

            } catch (e) {
              console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
              channel_tosend.send({content: eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable25"])})
              /* */
            }


          }

        }

        //this function is for turning each attachment into a url
        function attachIsImage(msgAttach) {
          url = msgAttach.url;
          //True if this url is a png image.
          return url.indexOf("png", url.length - "png".length /*or 3*/ ) !== -1 ||
            url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/ ) !== -1 ||
            url.indexOf("gif", url.length - "gif".length /*or 3*/ ) !== -1 ||
            url.indexOf("jpg", url.length - "jpg".length /*or 3*/ ) !== -1;
        }
      } catch (e) {
        console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
        message.reply({embeds: [new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable26"]))
          .setDescription(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable27"]))
        ]}).then(msg=>{
          setTimeout(()=>{
            try{msg.delete();}catch{}
          }, 5000)
        })
      }
    }



    /** ///////////////////////////////////////////////////////////// *
     *
     * THIS IS FOR IF SOMEONE REACTS ON A FINISHED APPLICATION OVERVIEW MESSAGE
     *
     * ///////////////////////////////////////////////////////////// *
     */
    if (message.channel.id === apply_db.get(message.guild.id, "f_channel_id") && (all_finished_reactions.includes(reaction.emoji.name))) {
      try{
        console.log("APPLY", apply_db.get(message.id, "temp"))
      }catch{
        return;
      }
      try {
        //Entferne Alle Reactions vom BOT
        reaction.message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));

        //fetch the message from the data
        const targetMessage = await message.channel.messages.fetch(message.id, false, true)

        //if no message found, return an error
        if (!targetMessage)
          return message.reply({embeds: [new Discord.MessageEmbed()
            .setFooter(es.footertext, es.footericon)
            .setColor(es.wrongcolor)
            .setTitle(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable28"]))
            .setFooter(es.footertext, es.footericon)
          ]});

        //get the old embed information
        const oldEmbed = targetMessage.embeds[0];

        //if there is no old embed, return an error
        if (!oldEmbed)
          return message.reply({embeds: [new Discord.MessageEmbed()
            .setFooter(es.footertext, es.footericon)
            .setColor(es.wrongcolor)
            .setTitle(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable29"]))
            .setFooter(es.footertext, es.footericon)
          ]});

        //create a new embed
        const embed = new Discord.MessageEmbed()
          .setFooter(es.footertext, es.footericon)
          .setTitle(oldEmbed.title)
          .setDescription(`${oldEmbed.description ? `${oldEmbed.description}\n`: ""} Edited by: ${user} | ${reaction.emoji}`.substr(0, 2048))

        //for each data in it from before hand
        if (oldEmbed.fields[0]) {
          try {
            for (var i = 0; i <= oldEmbed.fields.length; i++) {
              try {
                if (oldEmbed.fields[i]) embed.addField(oldEmbed.fields[i].name, oldEmbed.fields[i].value)
              } catch {}
            }
          } catch {}
        }

        //if the reaction is for APPROVE
        if (reaction.emoji.name === "✅") {
          //SET THE EMBED COLOR TO GREEN
          embed.setColor("GREEN")

          //EDIT THE EMBED
          targetMessage.edit({embeds: [embed]})

          //CREATE THE APPROVE MESSAGE
          var approve = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon)
            .setColor("GREEN")
            .setTitle(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable30"]))
            .setFooter("By  |  " + user.tag, user.displayAvatarURL({
              dynamic: true
            }))
            .setDescription(apply_db.get(message.guild.id, "accept"))

          //GET THE USER FROM THE DATABASE
          var usert = await client.users.fetch(apply_db.get(message.id, "temp"))
          console.log(apply_db.get(message.id, "temp"))
          if(!usert) message.reply({content: eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable31"])});
          //try to remove all roles after that continue?
          await rome_old_roles(message, usert, apply_db);

          //send the user the approve message
          usert.send({embeds: [approve]}).catch(e => {
            message.reply({content: eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable32"])});
            console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim);
          });
          //TRY CATCH --- ADDING ROLE
          try {
            //get the roleid from the db
            let roleid = apply_db.get(message.guild.id, "accept_role");
            if (roleid) {
              //if no roleid added then return error
              if (roleid.length !== 18) return;
              //try to add the role
              var member = reaction.message.guild.members.cache.get(usert.id)
              member.roles.add(roleid).catch((e)=>{channel_tosend.send({content: "I am Missing Permissions to grant the Role\n" + e.message})});
            }
          } catch (e) {
            //if an error happens, show it
            message.reply({content: eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable33"])}).then(msg=>{
              setTimeout(()=>{
                try{msg.delete();}catch{}
              }, 5000)
            })
          }
        }

        //if the reaction is for deny
        if (reaction.emoji.name === "❌") {
          embed.setColor(es.wrongcolor)
          targetMessage.edit({embeds: [embed]})
          var deny = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon)
            .setColor(es.wrongcolor)
            .setTitle(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable34"]))
            .setDescription(apply_db.get(message.guild.id, "deny"))
            .setFooter("By  |  " + user.tag, user.displayAvatarURL({
              dynamic: true
            }))
          var usert = await client.users.fetch(apply_db.get(message.id, "temp"))
          
          usert.send({embeds: [deny]}).catch(e => {
            message.reply({content: eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable35"])});
            console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim);
          });
          //try to remove all roles after that continue?
          await rome_old_roles(message, usert, apply_db);
        }


        //if the reaction is for CREATE A TICKET
        if (reaction.emoji.name === "🎟️") {
          //SET THE EMBED COLOR TO GREEN
          embed.setColor("ORANGE")

          //EDIT THE EMBED
          targetMessage.edit({embeds: [embed] })

          //GET THE USER FROM THE DATABASE
          var usert = await client.users.fetch(apply_db.get(message.id, "temp"))

          //try to remove all roles after that continue?
          await rome_old_roles(message, usert, apply_db);

          //TRY CATCH --- ADDING ROLE
          try {
            message.guild.channels.create(`Ticket-${usert.username}`.substr(0, 32), {
                type: 'text',
                topic: "Just Delete this channel, if not needed there is no delete/close command!",
                permissionOverwrites: [{
                    id: message.guild.id,
                    deny: ['VIEW_CHANNEL'],
                  },
                  {
                    id: usert.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                  },
                  {
                    id: user.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                  },
                ],
              })
              .then((channel) => {
                setTimeout(()=>{
                  try{
                    channel.permissionOverwrites.edit(usert.id,{
                      VIEW_CHANNEL: true,
                      SEND_MESSAGES: true
                    })
                    channel.permissionOverwrites.edit(user.id,{
                      VIEW_CHANNEL: true,
                      SEND_MESSAGES: true
                    })
                  }catch{

                  }
                }, 2000)
                //TRY CATCH SEND CHANNEL INFORMATION
                let button_close = new MessageButton().setStyle('PRIMARY').setCustomId('ticket_close').setLabel('Close').setEmoji("🔒") 
                let button_delete = new MessageButton().setStyle('SECONDARY').setCustomId('ticket_delete').setLabel("Delete").setEmoji("🗑️")
                let button_transcript = new MessageButton().setStyle('blurple').setCustomId('ticket_transcript').setLabel("Transcript").setEmoji("📑")
                let button_user = new MessageButton().setStyle('SUCCESS').setCustomId('ticket_user').setLabel("Managee Users").setEmoji("👤")
                let button_role = new MessageButton().setStyle('SUCCESS').setCustomId('ticket_role').setLabel("Managee Roles").setEmoji("📌") 
                let buttonRow1 = new MessageActionRow()
                .addComponent(button_close).addComponent(button_delete).addComponent(button_transcript)
                let buttonRow2 = new MessageActionRow()
                .addComponent(button_user).addComponent(button_role)
                const allbuttons = [buttonRow1, buttonRow2];
                try {
                  if(client.setups.get("TICKETS", "applytickets1").includes(usert.id)){
                    channel.send({ 
                      content: `<@${usert.id}>\nBecause he already has a TICKET for this Application System, this Channel got created!`,
                      embeds: [new Discord.MessageEmbed()
                            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                            .setTitle(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable36"]))
                            .setFooter(`"Just Delete this channel, if not needed there is no delete/close command!`, message.guild.iconURL({
                              dynamic: true
                            }))
                            .setDescription(apply_db.get(message.guild.id, "ticket").replace("{user}", `<@${usert.id}>`))]
                          })
                  }else {
                    client.setups.push("TICKETS", usert.id, "applytickets1");
                    client.setups.push("TICKETS", channel.id, "applytickets1");
                    client.setups.set(user.id, channel.id, "applytickets1");
                    client.setups.set(channel.id, {
                      user: usert.id,
                      channel: channel.id,
                      guild: channel.guild.id,
                      type: "ticket-setup-apply-1",
                      state: "open",
                      date: Date.now(),
                    }, "ticketdata");
                    channel.send({ 
                      content: `<@${usert.id}>`,
                      embeds: [new Discord.MessageEmbed()
                            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                            .setTitle(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable37"]))
                            .setFooter(`To close/manage this ticket type: ${client.settings.get(channel.guild.id, "prefix")}ticket!`, message.guild.iconURL({
                              dynamic: true
                            }))
                            .setDescription(apply_db.get(message.guild.id, "ticket").replace("{user}", `<@${usert.id}>`))],
                       components: allbuttons})
                    }
                } catch {
                  /* */
                }

                //try catch send user message
                try {
                  //CREATE THE APPROVE MESSAGE
                  var approve = new Discord.MessageEmbed()
                    .setColor("ORANGE")
                    .setTitle(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable38"]))
                    .setFooter("By  |  " + user.tag, user.displayAvatarURL({
                      dynamic: true
                    }))
                    .setDescription(apply_db.get(message.guild.id, "ticket").replace("{user}", `<@${usert.id}>`) + `Channel: <#${channel.id}>`)

                  //send the user the approve message
                  usert.send({embeds: [approve]}).catch(e => {
                    message.reply({content: eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable39"])});
                    console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim);
                  });
                } catch {
                  /* */
                }
              });
          } catch (e) {
            //if an error happens, show it
            message.reply({content: eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable40"])}).then(msg=>{
              setTimeout(()=>{
                try{msg.delete();}catch{}
              }, 5000)
            })
          }

        }


        //if the reaction is for FIRST ROLE APPROVE
        if (reaction.emoji.name === "1️⃣") {
          //SET THE EMBED COLOR TO GREEN
          embed.setColor("#54eeff")

          //EDIT THE EMBED
          targetMessage.edit({embeds: [embed]})

          //CREATE THE APPROVE MESSAGE
          var approve = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon)
            .setColor("GREEN")
            .setTitle(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable41"]))
            .setFooter("By  |  " + user.tag, user.displayAvatarURL({
              dynamic: true
            }))
            .setDescription(apply_db.get(message.guild.id, "one.message"))
          //if image is enabled then set the image
          if (apply_db.get(message.guild.id, "one.image.enabled")) try {
            approve.setImage(apply_db.get(message.guild.id, "one.image.url"))
          } catch {
            /* */
          }

          //GET THE USER FROM THE DATABASE
          var usert = await client.users.fetch(apply_db.get(message.id, "temp"))

          //try to remove all roles after that continue?
          await rome_old_roles(message, usert, apply_db);

          //send the user the approve message
          usert.send({embeds: [approve]}).catch(e => {
            message.reply({content: eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable42"])});
            console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim);
          });

          //TRY CATCH --- ADDING ROLE
          try {
            //get the roleid from the db
            let roleid = apply_db.get(message.guild.id, "one.role");
            if (roleid) {
              //if no roleid added then return error
              if (roleid.length !== 18) return;
              //try to add the role
              var member = reaction.message.guild.members.cache.get(usert.id)
              member.roles.add(roleid).catch((e)=>{channel_tosend.send("I am Missing Permissions to grant the Role\n" + e.message)});
            }
          } catch (e) {
            //if an error happens, show it
            message.reply({content: eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable43"])}).then(msg=>{
              setTimeout(()=>{
                try{msg.delete();}catch{}
              }, 5000)
            })
          }


        }


        //if the reaction is for SECOND ROLE APPROVE
        if (reaction.emoji.name === "2️⃣") {
          //SET THE EMBED COLOR TO GREEN
          embed.setColor("#54cfff")

          //EDIT THE EMBED
          targetMessage.edit({embeds: [embed]})

          //CREATE THE APPROVE MESSAGE
          var approve = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon)
            .setColor("GREEN")
            .setTitle(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable44"]))
            .setFooter("By  |  " + user.tag, user.displayAvatarURL({
              dynamic: true
            }))
            .setDescription(apply_db.get(message.guild.id, "two.message"))
          //if image is enabled then set the image
          if (apply_db.get(message.guild.id, "two.image.enabled")) try {
            approve.setImage(apply_db.get(message.guild.id, "two.image.url"))
          } catch {
            /* */
          }

          //GET THE USER FROM THE DATABASE
          var usert = await client.users.fetch(apply_db.get(message.id, "temp"))

          //try to remove all roles after that continue?
          await rome_old_roles(message, usert, apply_db);

          //send the user the approve message
          usert.send({embeds: [approve]}).catch(e => {
            message.reply({content: eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable45"])});
            console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim);
          });

          //TRY CATCH --- ADDING ROLE
          try {
            //get the roleid from the db
            let roleid = apply_db.get(message.guild.id, "two.role");
            if (roleid) {
              //if no roleid added then return error
              if (roleid.length !== 18) return;
              //try to add the role
              var member = reaction.message.guild.members.cache.get(usert.id)
              member.roles.add(roleid).catch((e)=>{channel_tosend.send({content: "I am Missing Permissions to grant the Role\n" + e.message})});
            }
          } catch (e) {
            //if an error happens, show it
            message.reply({content: eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable46"])}).then(msg=>{
              setTimeout(()=>{
                try{msg.delete();}catch{}
              }, 5000)
            })
          }

        }


        //if the reaction is for THIRD ROLE APPROVE
        if (reaction.emoji.name === "3️⃣") {
          //SET THE EMBED COLOR TO GREEN
          embed.setColor("#549bff")

          //EDIT THE EMBED
          targetMessage.edit({embeds: [embed]})

          //CREATE THE APPROVE MESSAGE
          var approve = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon)
            .setColor("GREEN")
            .setTitle(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable47"]))
            .setFooter("By  |  " + user.tag, user.displayAvatarURL({
              dynamic: true
            }))
            .setDescription(apply_db.get(message.guild.id, "three.message"))
          //if image is enabled then set the image
          if (apply_db.get(message.guild.id, "three.image.enabled")) try {
            approve.setImage(apply_db.get(message.guild.id, "three.image.url"))
          } catch {
            /* */
          }

          //GET THE USER FROM THE DATABASE
          var usert = await client.users.fetch(apply_db.get(message.id, "temp"))

          //try to remove all roles after that continue?
          await rome_old_roles(message, usert, apply_db);

          //send the user the approve message
          usert.send({embeds: [approve]}).catch(e => {
            message.reply({content: eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable48"])});
            console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim);
          });

          //TRY CATCH --- ADDING ROLE
          try {
            //get the roleid from the db
            let roleid = apply_db.get(message.guild.id, "three.role");
            if (roleid) {
              //if no roleid added then return error
              if (roleid.length !== 18) return;
              //try to add the role
              var member = reaction.message.guild.members.cache.get(usert.id)
              member.roles.add(roleid).catch((e)=>{channel_tosend.send({content: "I am Missing Permissions to grant the Role\n" + e.message})});
            }
          } catch (e) {
            //if an error happens, show it
            message.reply({content: eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable49"])}).then(msg=>{
              setTimeout(()=>{
                try{msg.delete();}catch{}
              }, 5000)
            })
          }
        }


        //if the reaction is for FOURTH ROLE APPROVE
        if (reaction.emoji.name === "4️⃣") {
          //SET THE EMBED COLOR TO GREEN
          embed.setColor("#6254ff")

          //EDIT THE EMBED
          targetMessage.edit({embeds: [embed]})

          //CREATE THE APPROVE MESSAGE
          var approve = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon)
            .setColor("GREEN")
            .setTitle(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable50"]))
            .setFooter("By  |  " + user.tag, user.displayAvatarURL({
              dynamic: true
            }))
            .setDescription(apply_db.get(message.guild.id, "four.message"))
          //if image is enabled then set the image
          if (apply_db.get(message.guild.id, "four.image.enabled")) try {
            approve.setImage(apply_db.get(message.guild.id, "four.image.url"))
          } catch {
            /* */
          }

          //GET THE USER FROM THE DATABASE
          var usert = await client.users.fetch(apply_db.get(message.id, "temp"))

          //try to remove all roles after that continue?
          await rome_old_roles(message, usert, apply_db);
          
          //send the user the approve message
          usert.send({embeds: [approve]}).catch(e => {
            message.reply({content: eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable51"])});
            console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim);
          });

          //TRY CATCH --- ADDING ROLE
          try {
            //get the roleid from the db
            let roleid = apply_db.get(message.guild.id, "four.role");
            if (roleid) {
              //if no roleid added then return error
              if (roleid.length !== 18) return;
              //try to add the role
              var member = reaction.message.guild.members.cache.get(usert.id)
              member.roles.add(roleid).catch((e)=>{channel_tosend.send({content: "I am Missing Permissions to grant the Role\n" + e.message})});
            }
          } catch (e) {
            //if an error happens, show it
            message.reply({content: eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable52"])}).then(msg=>{
              setTimeout(()=>{
                try{msg.delete();}catch{}
              }, 5000)
            })
          }
        }


        //if the reaction is for FITH ROLE APPROVE
        if (reaction.emoji.name === "5️⃣") {
          //SET THE EMBED COLOR TO GREEN
          embed.setColor("#1705e6")

          //EDIT THE EMBED
          targetMessage.edit({embeds: [embed]})

          //CREATE THE APPROVE MESSAGE
          var approve = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon)
            .setColor("GREEN")
            .setTitle(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable53"]))
            .setFooter("By  |  " + user.tag, user.displayAvatarURL({
              dynamic: true
            }))
            .setDescription(apply_db.get(message.guild.id, "five.message"))
          //if image is enabled then set the image
          if (apply_db.get(message.guild.id, "five.image.enabled")) try {
            approve.setImage(apply_db.get(message.guild.id, "five.image.url"))
          } catch {
            /* */
          }

          //GET THE USER FROM THE DATABASE
          var usert = await client.users.fetch(apply_db.get(message.id, "temp"))

          //try to remove all roles after that continue?
          await rome_old_roles(message, usert, apply_db);

          //send the user the approve message
          usert.send({embeds: [approve]}).catch(e => {
            message.reply({content: eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable54"])});
            console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim);
          });

          //TRY CATCH --- ADDING ROLE
          try {
            //get the roleid from the db
            let roleid = apply_db.get(message.guild.id, "five.role");
            if (roleid) {
              //if no roleid added then return error
              if (roleid.length !== 18) return;
              //try to add the role
              var member = reaction.message.guild.members.cache.get(usert.id)
              member.roles.add(roleid).catch((e)=>{channel_tosend.send({content: "I am Missing Permissions to grant the Role\n" + e.message})});
            }
          } catch (e) {
            //if an error happens, show it
            message.reply({content: eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable55"])}).then(msg=>{
              setTimeout(()=>{
                try{msg.delete();}catch{}
              }, 5000)
            })
          }
        }
        //EDIT THE TARGET MESSAGE WITH THE NEW EMBED ! ;)
        targetMessage.edit({embeds: [embed]})

      } catch (e) {
        console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
        message.reply({embeds: [new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable56"]))
          .setDescription(eval(client.la[ls]["handlers"]["apply2js"]["apply2"]["variable57"]))]
        }).then(msg=>{
          setTimeout(()=>{
            try{msg.delete();}catch{}
          }, 5000)
        })
      }
    }
  })
  //For the application start
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return;
    var { guild, channel, user, message } = interaction;
    if(!guild || !channel || !message || !user) return;
    if (message.author.id != client.user.id) return;
    let es = client.settings.get(guild.id, "embed");let ls = client.settings.get(guild.id, "language")
    if (interaction.customId.startsWith("User_Apply")) {
      apply_db.ensure(interaction.guild.id, {
        "channel_id": "",
        "message_id": "",
        "f_channel_id": "", //changequestions --> which one (lists everyone with index) --> 4. --> Question
  
        "QUESTIONS": [{
          "1": "DEFAULT"
        }],
  
        "TEMP_ROLE": "0",
  
        "accept": "You've got accepted!",
        "accept_role": "0",
  
        "deny": "You've got denied!",
  
        "ticket": "Hey {user}! We have some Questions!",
  
        "one": {
          "role": "0",
          "message": "Hey you've got accepted for Team 1",
          "image": {
            "enabled": false,
            "url": ""
          }
        },
        "two": {
          "role": "0",
          "message": "Hey you've got accepted for Team 2",
          "image": {
            "enabled": false,
            "url": ""
          }
        },
        "three": {
          "role": "0",
          "message": "Hey you've got accepted for Team 3",
          "image": {
            "enabled": false,
            "url": ""
          }
        },
        "four": {
          "role": "0",
          "message": "Hey you've got accepted for Team 4",
          "image": {
            "enabled": false,
            "url": ""
          }
        },
        "five": {
          "role": "0",
          "message": "Hey you've got accepted for Team 5",
          "image": {
            "enabled": false,
            "url": ""
          }
        }
      });
      
      if (message.id === apply_db.get(guild.id, "message_id") && channel.id === apply_db.get(guild.id, "channel_id")) {
        try {
          //COOLDOWN SYSTEM
          if (cooldown.has(user.id)) {
            return interaction.reply({embeds: [new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setFooter(es.footertext, es.footericon)
              .setTitle(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable1"]))
              .addField(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variablex_2"]), eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable2"]))]
             ,ephemeral: true})
          } else {
            cooldown.add(user.id);
            setTimeout(() => {
              cooldown.delete(user.id);
            }, 120 * 1000);
          }
          var originaluser = user;
          var originalchannel = message.channel;
          //get the guild
          guild = await message.guild.fetch().catch(e => console.log(String(e).grey.italic.dim));

          //get the channel to send the finished applies
          var channel_tosend = guild.channels.cache.get(apply_db.get(message.guild.id, "f_channel_id"));

          //if channel-to-send not found return error
          if (!channel_tosend) return;

          //if no running-application catcher is active set it too true!
          if (!antimap.has(user.id)) antimap.set(user.id)

          //but if he is having an running application somewhere then return error
          else return interaction.reply({content: `${user}`,embeds: [new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable5"]))
            .setDescription(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable6"]))
          ], ephemeral: true}).then(msg=>{
            setTimeout(()=>{
              try{msg.delete();}catch{}
            }, 5000)
          })

          //the array of answers for the current user
          var answers = [];

          //set the counter variable to 0
          var counter = 0;

          //define the url, if there would be an attachment ;)
          var url = "";

          //get all Questions from the Database
          var Questions = apply_db.get(message.guild.id, "QUESTIONS");

          //get the actual current question from the Questions
          var current_question = Object.values(Questions[counter]).join(" ")

          interaction.reply(`Starting the Application in your **Direct Messages!**`, true)
          //ask the current (first) Question from the Database
          ask_question(current_question);

          /** @param ask_question {qu} Question == Ask the current Question and push the answer
           * This function is for asking ONE SINGLE Question to the USER
           */
          function ask_question(qu) {
            if (counter === Questions.length) return send_finished();
            //send the user the first question
            user.send({embeds: [new Discord.MessageEmbed()
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setDescription(qu)
                .setAuthor(`Question ${counter + 1} / ${Questions.length}`, client.user.displayAvatarURL(), "https://discord.com/api/oauth2/authorize?client_id=806086994031411221&permissions=8&scope=bot%20applications.commands")
                .setFooter(es.footertext, es.footericon)
            ]}).then(msg => {
                msg.channel.awaitMessages(m => m.author.id === user.id, {
                  max: 1,
                  time: 300e3,
                  errors: ["time"]
                }).then(async collected => {
                  //push the answer of the user into the answers lmfao
                  if (collected.first().attachments.size > 0) {
                    if (collected.first().attachments.every(attachIsImage)) {
                      answers.push(`${collected.first().content}\n${url}`);
                    } else {
                      answers.push(`${collected.first().content}\nThere was an attachment, which i cannot display!`);
                    }
                  } else {
                    answers.push(`${collected.first().content}`);
                  }
                  //count up with 1
                  counter++;
                  //if it reached the questions limit return with the finished embed
                  if (counter === Questions.length) return send_finished();

                  //get the new current question
                  var new_current_question = Object.values(Questions[counter]).join(" ")

                  //ask the new current question
                  ask_question(new_current_question);

                }).catch(error => {
                  antimap.delete(user.id)
                  return user.send({embeds: [new Discord.MessageEmbed()
                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .setTitle(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable7"]))
                    .setFooter(es.footertext, es.footericon)
                  ]}).catch(e => {
                    antimap.delete(user.id)
                    message.reply({embeds: [new Discord.MessageEmbed()
                      .setColor(es.wrongcolor)
                      .setFooter(es.footertext, es.footericon)
                      .setTitle(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable8"]))
                      .setDescription(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable9"]))]
                    }).then(msg=>{
                      setTimeout(()=>{
                        try{msg.delete();}catch{}
                      }, 5000)
                    })
                  })
                })
              })
              .catch(e => {
                antimap.delete(user.id)
                return interaction.editReply({content: `${user}`, embeds: [new Discord.MessageEmbed()
                  .setColor(es.wrongcolor)
                  .setFooter(es.footertext, es.footericon)
                  .setTitle(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable10"]))
                  .setDescription(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable11"]))
                ]}).then(msg=>{
                  setTimeout(()=>{
                    try{msg.delete();}catch{}
                  }, 5000)
                })
              })
          }

          /** @param send_finished {*} == Send the finished application embed to the finished application questions channel ;)
           * This function is for asking ONE SINGLE Question to the USER
           */
          async function send_finished() {
            if (apply_db.get(guild.id, "last_verify")) {
              user.send({embeds: [new Discord.MessageEmbed()
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setTitle(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable12"]))
                .setFooter(es.footertext, es.footericon)
              ]}).then(async msg => {

                msg.react("✅")
                msg.react("❌")

                const filter = (reaction, user) => {
                  return user.id === originaluser.id;
                };
                msg.awaitReactions(filter, {
                    max: 1,
                    time: 300e3,
                    errors: ['time']
                  })
                  .then(async collected => {
                    let reaction = collected.first();
                    if (reaction.emoji.name === "✅") {
                      antimap.delete(originaluser.id)
                      var embed = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon)
                        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                        .setTitle(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable13"])) //${user.tag} -
                        .setDescription(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable14"]))
                        .setFooter(originaluser.id, originaluser.displayAvatarURL({
                          dynamic: true
                        }))
                        .setThumbnail(originaluser.displayAvatarURL({
                          dynamic: true
                        }))
                        .setTimestamp()

                      //for each question add a field
                      for (var i = 0; i < Questions.length; i++) {
                        try {
                          let qu = Object.values(Questions[i]);
                          if (qu.length > 100) qu = String(Object.values(Questions[i])).substr(0, 100) + " ..."
                          embed.addField(("**" + Object.keys(Questions[i]) + ". |** " + qu).substr(0, 256), ">>> " + String(answers[i]).substr(0, 1000))
                        } catch (e) {
                          console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
                          /* */
                        }
                      }


                      //send the embed into the channel
                      
                      channel_tosend.send({embeds: [embed], components: allbuttons}).then(thmsg => {
                        //set the message to the database
                          apply_db.set(thmsg.id, originaluser.id, "temp");
                        //react with each emoji of all reactions
                      });
                      // "Producing Code" (May take some time)
                      const finished_embed = new Discord.MessageEmbed()
                        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                        .setTitle(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable15"]))
                        .addField("\u200b", `**❯** Go Back to the Channel ${originalchannel}`).setFooter(es.footertext, es.footericon)

                      //send an informational message
                      originaluser.send({embeds: [finished_embed]})
                      //then try catch
                      try {
                        //find the role from the database
                        var roleid = apply_db.get(message.guild.id, "TEMP_ROLE");
                        if (roleid) {
                          if (roleid.length == 18) {
                            //find the member from the reaction event
                            var member = message.guild.members.cache.get(originaluser.id);
                            //find the role
                            var role = await message.guild.roles.cache.get(roleid);
                            if (!role) return channel_tosend.send(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable16"]))
                            if (!member) return channel_tosend.send(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable17"]))
                            //add the role
                            member.roles.add(role.id).catch((e)=>{channel_tosend.send("I am Missing Permissions to grant the Role\n" + e.message)});
                          }
                        }

                      } catch (e) {
                        console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
                        channel_tosend.send("I am Missing Permissions to grant the TEMPROLE\n" + e.message)
                        /* */
                      }




                    } else {
                      antimap.delete(originaluser.id)
                      originaluser.send({embeds: [new Discord.MessageEmbed()
                        .setColor(es.wrongcolor)
                        .setTitle(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable18"]))
                        .setFooter(es.footertext, es.footericon)
                      ]})
                    }
                  }).catch(e => {
                    console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
                    antimap.delete(originaluser.id)
                    originaluser.send({embeds: [new Discord.MessageEmbed()
                      .setColor(es.wrongcolor)
                      .setTitle(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable19"]))
                      .setFooter(es.footertext, es.footericon)
                    ]})
                  });
              })

            } else {
              antimap.delete(user.id)
              var embed = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon)
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setTitle(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable20"])) //${user.tag} -
                .setDescription(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable21"]))
                .setFooter(originaluser.id, originaluser.displayAvatarURL({
                  dynamic: true
                }))
                .setTimestamp()

              //for each question add a field
              for (var i = 0; i < Questions.length; i++) {
                try {
                  let qu = Object.values(Questions[i]);
                  if (qu.length > 100) qu = String(Object.values(Questions[i])).substr(0, 100) + " ..."
                  embed.addField(("**" + Object.keys(Questions[i]) + ". |** " + qu).substr(0, 256), ">>> " + String(answers[i]).substr(0, 1000))
                } catch {
                  /* */
                }
              }

              //send the embed into the channel
              let thhmsg = await channel_tosend.send({ embeds: [embed], components: allbuttons })
              //set the message to the database
              apply_db.set(thhmsg.id, originaluser.id, "temp");
              //react with each emoji of all reactions            

              // "Producing Code" (May take some time)
              const finished_embed = new Discord.MessageEmbed()
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setTitle(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable22"]))
                .addField("\u200b", `**❯** Go Back to the Channel ${originalchannel}`).setFooter(es.footertext, es.footericon)
              originaluser.send({content: `**❯** Go Back to the Channel ${originalchannel}`, embeds: [finished_embed]})

              //then try catch
              try {
                //find the role from the database
                var roleid = apply_db.get(message.guild.id, "TEMP_ROLE");
                if (roleid) {
                  if (roleid.length == 18) {
                    //find the member from the reaction event
                    var member = message.guild.members.cache.get(originaluser.id);
                    //find the role
                    var role = await message.guild.roles.cache.get(roleid);
                    if (!role) return channel_tosend.send(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable23"]))
                    if (!member) return channel_tosend.send(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable24"]))
                    //add the role
                    member.roles.add(role.id).catch((e)=>{channel_tosend.send("I am Missing Permissions to grant the Role\n" + e.message)});
                  }
                }

              } catch (e) {
                console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
                channel_tosend.send(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable25"]))
                /* */
              }


            }

          }

          //this function is for turning each attachment into a url
          function attachIsImage(msgAttach) {
            url = msgAttach.url;
            //True if this url is a png image.
            return url.indexOf("png", url.length - "png".length /*or 3*/ ) !== -1 ||
              url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/ ) !== -1 ||
              url.indexOf("gif", url.length - "gif".length /*or 3*/ ) !== -1 ||
              url.indexOf("jpg", url.length - "jpg".length /*or 3*/ ) !== -1;
          }
        } catch (e) {
          console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
          message.reply({embeds: [new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable26"]))
            .setDescription(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable27"]))
          ]}).then(msg=>{
            setTimeout(()=>{
              try{msg.delete();}catch{}
            }, 5000)
          })
        }
      }
    }
  })
  //for the accepting etc.
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return;
    var { guild, channel, user, message } = interaction;
    if(!guild || !channel || !message || !user) return;
    let es = client.settings.get(guild.id, "embed");let ls = client.settings.get(guild.id, "language")
    if (interaction.customId.startsWith("Apply_")) {
        if(apply_db.get(message.guild.id, "f_channel_id") !== channel.id) return;
        try {
              //fetch the message from the data
          const targetMessage = await message.channel.messages.fetch(message.id, false, true)
  
          //if no message found, return an error
          if (!targetMessage)
            return interaction.reply({embeds: [new Discord.MessageEmbed()
              .setFooter(es.footertext, es.footericon)
              .setColor(es.wrongcolor)
              .setTitle(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable28"]))
              .setFooter(es.footertext, es.footericon)], ephemeral: true});
          
          //get the old embed information
          const oldEmbed = targetMessage.embeds[0];
  
          //if there is no old embed, return an error
          if (!oldEmbed)
            return interaction.reply({embeds: [new Discord.MessageEmbed()
              .setFooter(es.footertext, es.footericon)
              .setColor(es.wrongcolor)
              .setTitle(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable29"]))
              .setFooter(es.footertext, es.footericon)]
            , ephemeral: true});
  
            let emoji = {
              "Apply_accept": "✅",
              "Apply_deny": "❌",
              "Apply_ticket": "🎟️",
              "Apply_1": "1️⃣",
              "Apply_2": "2️⃣",
              "Apply_3": "3️⃣",
              "Apply_4": "4️⃣",
              "Apply_5": "5️⃣",
            }
          //create a new embed
          const embed = new Discord.MessageEmbed()
            .setFooter(es.footertext, es.footericon)
            .setTitle(oldEmbed.title)
            .setDescription(`${oldEmbed.description ? `${oldEmbed.description}\n`: ""} Edited by: <@${interaction.user.id}> | ${emoji[interaction.customId]}`.substr(0, 2048))
  
          //for each data in it from before hand
          if (oldEmbed.fields[0]) {
            try {
              for (var i = 0; i <= oldEmbed.fields.length; i++) {
                try {
                  if (oldEmbed.fields[i]) embed.addField(oldEmbed.fields[i].name, oldEmbed.fields[i].value)
                } catch {}
              }
            } catch {}
          }
          
          let acceptbutton_d = new MessageButton().setStyle('DANGER') .setEmoji( "✅") .setCustomId("Apply_accept").setLabel("Accept").setDisabled(true);
          let dclinebutton_d = new MessageButton().setStyle('DANGER') .setEmoji("❌") .setCustomId("Apply_deny").setLabel("Decline").setDisabled(true);
          let ticketbutton_d = new MessageButton().setStyle('SECONDARY') .setEmoji("🎟️") .setCustomId("Apply_ticket").setLabel("Ask Question").setDisabled(true);
          let emoji1button_d = new MessageButton().setStyle('PRIMARY') .setEmoji("1️⃣") .setCustomId("Apply_1").setDisabled(true);
          let emoji2button_d = new MessageButton().setStyle('PRIMARY') .setEmoji("2️⃣") .setCustomId("Apply_2").setDisabled(true);
          let emoji3button_d = new MessageButton().setStyle('PRIMARY') .setEmoji("3️⃣") .setCustomId("Apply_3").setDisabled(true);
          let emoji4button_d = new MessageButton().setStyle('PRIMARY') .setEmoji("4️⃣") .setCustomId("Apply_4").setDisabled(true);
          let emoji5button_d = new MessageButton().setStyle('PRIMARY') .setEmoji("5️⃣") .setCustomId("Apply_5").setDisabled(true);
          let buttonRow1_d = new MessageActionRow().addComponent(acceptbutton_d).addComponent(dclinebutton_d).addComponent(ticketbutton_d);
          let buttonRow2_d = new MessageActionRow().addComponent(emoji1button_d).addComponent(emoji2button_d).addComponent(emoji3button_d).addComponent(emoji4button_d).addComponent(emoji5button_d);
          let allbuttons_d = [buttonRow1_d, buttonRow2_d];
          //if the reaction is for APPROVE
          if (interaction.customId == "Apply_accept") {
            //SET THE EMBED COLOR TO GREEN
            embed.setColor("GREEN")
            
            //EDIT THE EMBED
            targetMessage.edit({embeds: [embed], components: allbuttons_d}).catch((e)=>{console.log(String(e).grey.italic.dim)}).then(msg=>{
              apply_db.set(msg.id, {
                id: msg.id,
                user: interaction.user.id,
                State: interaction.customId,
              }, "Apply")
            })
  
            //CREATE THE APPROVE MESSAGE
            var approve = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon)
              .setColor("GREEN")
              .setTitle(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable30"]))
              .setFooter("By  |  " + interaction.user.user.tag, interaction.user.user.displayAvatarURL({
                dynamic: true
              }))
              .setDescription(apply_db.get(message.guild.id, "accept"))
  
            //GET THE USER FROM THE DATABASE
            var usert = await client.users.fetch(apply_db.get(message.id, "temp")).catch((e)=>{console.log(String(e).grey.italic.dim)});
            
            if(!usert) return interaction.reply(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable31"]), true);
            //try to remove all roles after that continue?
            await rome_old_roles(message, usert, apply_db);
  
            //send the user the approve message
            usert.send({embeds: [approve]}).catch(e => {
              interaction.reply(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable32"]), true);
              console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim);
            });
            //TRY CATCH --- ADDING ROLE
            try {
              //get the roleid from the db
              let roleid = apply_db.get(message.guild.id, "accept_role");
              if (roleid) {
                //if no roleid added then return error
                if (roleid.length !== 18) return;
                //try to add the role
                var member = message.guild.members.cache.get(usert.id)
                member.roles.add(roleid).catch((e)=>{channel_tosend.send("I am Missing Permissions to grant the Role\n" + e.message)});
              }
            } catch (e) {
              console.log(String(e).grey.italic.dim)
              //if an error happens, show it
              interaction.reply(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable33"]), true).then(msg=>{
                setTimeout(()=>{
                  try{msg.delete();}catch{}
                }, 5000)
              })
            }
          }
  
          //if the reaction is for deny
          if (interaction.customId === "Apply_deny") {
            embed.setColor(es.wrongcolor)
            targetMessage.edit({embeds: [embed], components: allbuttons_d}).catch((e)=>{console.log(String(e).grey.italic.dim)}).then(msg=>{
              apply_db.set(msg.id, {
                id: msg.id,
                user: interaction.user.id,
                State: interaction.customId,
              }, "Apply")
            })
            var deny = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon)
              .setColor(es.wrongcolor)
              .setTitle(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable34"]))
              .setDescription(apply_db.get(message.guild.id, "deny"))
              .setFooter("By  |  " + interaction.user.user.tag, interaction.user.user.displayAvatarURL({
                dynamic: true
              }))
            var usert = await client.users.fetch(apply_db.get(message.id, "temp")).catch((e)=>{console.log(String(e).grey.italic.dim)});
            
            if(!usert) return interaction.reply(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable31"]), true);

            usert.send({embeds: [deny]}).catch(e => {
              interaction.reply(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable35"]), true);
              console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim);
            });
            //try to remove all roles after that continue?
            await rome_old_roles(message, usert, apply_db);
          }
  
  
          //if the reaction is for CREATE A TICKET
          if (interaction.customId === "Apply_ticket") {
            //SET THE EMBED COLOR TO GREEN
            embed.setColor("ORANGE")
  
            //EDIT THE EMBED
            targetMessage.edit({embeds: [embed], components: allbuttons_d}).catch((e)=>{console.log(String(e).grey.italic.dim)}).then(msg=>{
              apply_db.set(msg.id, {
                id: msg.id,
                user: interaction.user.id,
                State: interaction.customId,
              }, "Apply")
            })
  
            //GET THE USER FROM THE DATABASE
            var usert = await client.users.fetch(apply_db.get(message.id, "temp")).catch((e)=>{console.log(String(e).grey.italic.dim)});
  
            if(!usert) return interaction.reply(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable31"]), true);

            //try to remove all roles after that continue?
            await rome_old_roles(message, usert, apply_db);
  
            //TRY CATCH --- ADDING ROLE
            try {
              message.guild.channels.create(`Ticket-${usert.username}`.substr(0, 32), {
                  type: 'text',
                  topic: "Just Delete this channel, if not needed there is no delete/close command!",
                  permissionOverwrites: [{
                      id: message.guild.id,
                      deny: ['VIEW_CHANNEL'],
                    },
                    {
                      id: usert.id,
                      allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                    },
                    {
                      id: interaction.user.user.id,
                      allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                    },
                  ],
                })
                .then((channel) => {
                  setTimeout(()=>{
                    try{
                      channel.permissionOverwrites.edit (usert.id,{
                        VIEW_CHANNEL: true,
                        SEND_MESSAGES: true
                      })
                      channel.permissionOverwrites.edit (interaction.user.user.id,{
                        VIEW_CHANNEL: true,
                        SEND_MESSAGES: true
                      })
                    }catch{
  
                    }
                  }, 2000)
                  //TRY CATCH SEND CHANNEL INFORMATION
                  let button_close = new MessageButton().setStyle('PRIMARY').setCustomId('ticket_close').setLabel('Close').setEmoji("🔒") 
                  let button_delete = new MessageButton().setStyle('SECONDARY').setCustomId('ticket_delete').setLabel("Delete").setEmoji("🗑️")
                  let button_transcript = new MessageButton().setStyle('blurple').setCustomId('ticket_transcript').setLabel("Transcript").setEmoji("📑")
                  let button_user = new MessageButton().setStyle('SUCCESS').setCustomId('ticket_user').setLabel("Managee Users").setEmoji("👤")
                  let button_role = new MessageButton().setStyle('SUCCESS').setCustomId('ticket_role').setLabel("Managee Roles").setEmoji("📌") 
                  let buttonRow1 = new MessageActionRow()
                  .addComponent(button_close).addComponent(button_delete).addComponent(button_transcript)
                  let buttonRow2 = new MessageActionRow()
                  .addComponent(button_user).addComponent(button_role)
                  const allbuttons = [buttonRow1, buttonRow2]
                  try {
                    if(client.setups.get("TICKETS", "applytickets1").includes(usert.id)){
                      channel.send({ 
                        content: `<@${usert.id}>\nBecause he already has a TICKET for this Application System, this Channel got created!`,
                        embeds: [new Discord.MessageEmbed()
                              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                              .setTitle(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable36"]))
                              .setFooter(`"Just Delete this channel, if not needed there is no delete/close command!`, message.guild.iconURL({
                                dynamic: true
                              }))
                              .setDescription(apply_db.get(message.guild.id, "ticket").replace("{user}", `<@${usert.id}>`))]
                            })
                    }else {
                      client.setups.push("TICKETS", usert.id, "applytickets1");
                      client.setups.push("TICKETS", channel.id, "applytickets1");
                      client.setups.set(interaction.user.user.id, channel.id, "applytickets1");
                      client.setups.set(channel.id, {
                        user: usert.id,
                        channel: channel.id,
                        guild: channel.guild.id,
                        type: "ticket-setup-apply-1",
                        state: "open",
                        date: Date.now(),
                      }, "ticketdata");
                      channel.send({ 
                        content: `<@${usert.id}>`,
                        embeds: [new Discord.MessageEmbed()
                              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                              .setTitle(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable37"]))
                              .setFooter(`To close/manage this ticket type: ${client.settings.get(channel.guild.id, "prefix")}ticket!`, message.guild.iconURL({
                                dynamic: true
                              }))
                              .setDescription(apply_db.get(message.guild.id, "ticket").replace("{user}", `<@${usert.id}>`))],
                         components: allbuttons})
                      }
                  } catch {
                    /* */
                  }
  
                  //try catch send user message
                  try {
                    //CREATE THE APPROVE MESSAGE
                    var approve = new Discord.MessageEmbed()
                      .setColor("ORANGE")
                      .setTitle(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable38"]))
                      .setFooter("By  |  " + interaction.user.user.tag, interaction.user.user.displayAvatarURL({
                        dynamic: true
                      }))
                      .setDescription(apply_db.get(message.guild.id, "ticket").replace("{user}", `<@${usert.id}>`) + `Channel: <#${channel.id}>`)
  
                    //send the user the approve message
                    usert.send({embeds: [approve]}).catch(e => {
                      interaction.reply(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable39"]), true);
                      console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim);
                    });
                  } catch {
                    /* */
                  }
                });
            } catch (e) {
              //if an error happens, show it
              interaction.reply(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable40"]), true).then(msg=>{
                setTimeout(()=>{
                  try{msg.delete();}catch{}
                }, 5000)
              })
            }
  
          }
  
  
          //if the reaction is for FIRST ROLE APPROVE
          if (interaction.customId === "Apply_1") {
            //SET THE EMBED COLOR TO GREEN
            embed.setColor("#54eeff")
  
            //EDIT THE EMBED
            targetMessage.edit({embeds: [embed], components: allbuttons_d}).catch((e)=>{console.log(String(e).grey.italic.dim)}).then(msg=>{
              apply_db.set(msg.id, {
                id: msg.id,
                user: interaction.user.id,
                State: interaction.customId,
              }, "Apply")
            })
  
            //CREATE THE APPROVE MESSAGE
            var approve = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon)
              .setColor("GREEN")
              .setTitle(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable41"]))
              .setFooter("By  |  " + interaction.user.user.tag, interaction.user.user.displayAvatarURL({
                dynamic: true
              }))
              .setDescription(apply_db.get(message.guild.id, "one.message"))
            //if image is enabled then set the image
            if (apply_db.get(message.guild.id, "one.image.enabled")) try {
              approve.setImage(apply_db.get(message.guild.id, "one.image.url"))
            } catch {
              /* */
            }
  
            //GET THE USER FROM THE DATABASE
            var usert = await client.users.fetch(apply_db.get(message.id, "temp")).catch((e)=>{console.log(String(e).grey.italic.dim)});
  
            if(!usert) return interaction.reply(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable31"]), true);
            //try to remove all roles after that continue?
            await rome_old_roles(message, usert, apply_db);
  
            //send the user the approve message
            usert.send({embeds: [approve]}).catch(e => {
              interaction.reply(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable42"]), true);
              console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim);
            });
  
            //TRY CATCH --- ADDING ROLE
            try {
              //get the roleid from the db
              let roleid = apply_db.get(message.guild.id, "one.role");
              if (roleid) {
                //if no roleid added then return error
                if (roleid.length !== 18) return;
                //try to add the role
                var member = message.guild.members.cache.get(usert.id)
                member.roles.add(roleid).catch((e)=>{channel_tosend.send("I am Missing Permissions to grant the Role\n" + e.message)});
              }
            } catch (e) {
              //if an error happens, show it
              interaction.reply(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable43"]), true).then(msg=>{
                setTimeout(()=>{
                  try{msg.delete();}catch{}
                }, 5000)
              })
            }
  
  
          }
  
  
          //if the reaction is for SECOND ROLE APPROVE
          if (interaction.customId === "Apply_2") {
            //SET THE EMBED COLOR TO GREEN
            embed.setColor("#54cfff")
  
            //EDIT THE EMBED
            targetMessage.edit({embeds: [embed], components: allbuttons_d}).catch((e)=>{console.log(String(e).grey.italic.dim)}).then(msg=>{
              apply_db.set(msg.id, {
                id: msg.id,
                user: interaction.user.id,
                State: interaction.customId,
              }, "Apply")
            })
  
            //CREATE THE APPROVE MESSAGE
            var approve = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon)
              .setColor("GREEN")
              .setTitle(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable44"]))
              .setFooter("By  |  " + interaction.user.user.tag, interaction.user.user.displayAvatarURL({
                dynamic: true
              }))
              .setDescription(apply_db.get(message.guild.id, "two.message"))
            //if image is enabled then set the image
            if (apply_db.get(message.guild.id, "two.image.enabled")) try {
              approve.setImage(apply_db.get(message.guild.id, "two.image.url"))
            } catch {
              /* */
            }
  
            //GET THE USER FROM THE DATABASE
            var usert = await client.users.fetch(apply_db.get(message.id, "temp")).catch((e)=>{console.log(String(e).grey.italic.dim)});
            if(!usert) return interaction.reply(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable31"]), true);
  
            //try to remove all roles after that continue?
            await rome_old_roles(message, usert, apply_db);
  
            //send the user the approve message
            usert.send({embeds: [approve]}).catch(e => {
              interaction.reply(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable45"]), true);
              console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim);
            });
  
            //TRY CATCH --- ADDING ROLE
            try {
              //get the roleid from the db
              let roleid = apply_db.get(message.guild.id, "two.role");
              if (roleid) {
                //if no roleid added then return error
                if (roleid.length !== 18) return;
                //try to add the role
                var member = message.guild.members.cache.get(usert.id)
                member.roles.add(roleid).catch((e)=>{channel_tosend.send("I am Missing Permissions to grant the Role\n" + e.message)});
              }
            } catch (e) {
              //if an error happens, show it
              interaction.reply(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable46"]), true).then(msg=>{
                setTimeout(()=>{
                  try{msg.delete();}catch{}
                }, 5000)
              })
            }
  
          }
  
  
          //if the reaction is for THIRD ROLE APPROVE
          if (interaction.customId === "Apply_3") {
            //SET THE EMBED COLOR TO GREEN
            embed.setColor("#549bff")
  
            //EDIT THE EMBED
            targetMessage.edit({embeds: [embed], components: allbuttons_d}).catch((e)=>{console.log(String(e).grey.italic.dim)}).then(msg=>{
              apply_db.set(msg.id, {
                id: msg.id,
                user: interaction.user.id,
                State: interaction.customId,
              }, "Apply")
            })
  
            //CREATE THE APPROVE MESSAGE
            var approve = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon)
              .setColor("GREEN")
              .setTitle(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable47"]))
              .setFooter("By  |  " + interaction.user.user.tag, interaction.user.user.displayAvatarURL({
                dynamic: true
              }))
              .setDescription(apply_db.get(message.guild.id, "three.message"))
            //if image is enabled then set the image
            if (apply_db.get(message.guild.id, "three.image.enabled")) try {
              approve.setImage(apply_db.get(message.guild.id, "three.image.url"))
            } catch {
              /* */
            }
  
            //GET THE USER FROM THE DATABASE
            var usert = await client.users.fetch(apply_db.get(message.id, "temp")).catch((e)=>{console.log(String(e).grey.italic.dim)});
            if(!usert) return interaction.reply(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable31"]), true);
  
            //try to remove all roles after that continue?
            await rome_old_roles(message, usert, apply_db);
  
            //send the user the approve message
            usert.send({embeds: [approve]}).catch(e => {
              interaction.reply(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable48"]), true);
              console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim);
            });
  
            //TRY CATCH --- ADDING ROLE
            try {
              //get the roleid from the db
              let roleid = apply_db.get(message.guild.id, "three.role");
              if (roleid) {
                //if no roleid added then return error
                if (roleid.length !== 18) return;
                //try to add the role
                var member = message.guild.members.cache.get(usert.id)
                member.roles.add(roleid).catch((e)=>{channel_tosend.send("I am Missing Permissions to grant the Role\n" + e.message)});
              }
            } catch (e) {
              //if an error happens, show it
              interaction.reply(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable49"]), true).then(msg=>{
                setTimeout(()=>{
                  try{msg.delete();}catch{}
                }, 5000)
              })
            }
          }
  
  
          //if the reaction is for FOURTH ROLE APPROVE
          if (interaction.customId === "Apply_4") {
            //SET THE EMBED COLOR TO GREEN
            embed.setColor("#6254ff")
  
            //EDIT THE EMBED
            targetMessage.edit({embeds: [embed], components: allbuttons_d}).catch((e)=>{console.log(String(e).grey.italic.dim)}).then(msg=>{
              apply_db.set(msg.id, {
                id: msg.id,
                user: interaction.user.id,
                State: interaction.customId,
              }, "Apply")
            })
  
            //CREATE THE APPROVE MESSAGE
            var approve = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon)
              .setColor("GREEN")
              .setTitle(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable50"]))
              .setFooter("By  |  " + interaction.user.user.tag, interaction.user.user.displayAvatarURL({
                dynamic: true
              }))
              .setDescription(apply_db.get(message.guild.id, "four.message"))
            //if image is enabled then set the image
            if (apply_db.get(message.guild.id, "four.image.enabled")) try {
              approve.setImage(apply_db.get(message.guild.id, "four.image.url"))
            } catch {
              /* */
            }
  
            //GET THE USER FROM THE DATABASE
            var usert = await client.users.fetch(apply_db.get(message.id, "temp")).catch((e)=>{console.log(String(e).grey.italic.dim)});
            if(!usert) return interaction.reply(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable31"]), true);
  
            //try to remove all roles after that continue?
            await rome_old_roles(message, usert, apply_db);
            
            //send the user the approve message
            usert.send({embeds: [approve]}).catch(e => {
              interaction.reply(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable51"]), true);
              console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim);
            });
  
            //TRY CATCH --- ADDING ROLE
            try {
              //get the roleid from the db
              let roleid = apply_db.get(message.guild.id, "four.role");
              if (roleid) {
                //if no roleid added then return error
                if (roleid.length !== 18) return;
                //try to add the role
                var member = message.guild.members.cache.get(usert.id)
                member.roles.add(roleid).catch((e)=>{channel_tosend.send("I am Missing Permissions to grant the Role\n" + e.message)});
              }
            } catch (e) {
              //if an error happens, show it
              interaction.reply(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable52"]), true).then(msg=>{
                setTimeout(()=>{
                  try{msg.delete();}catch{}
                }, 5000)
              })
            }
          }
  
  
          //if the reaction is for FITH ROLE APPROVE
          if (interaction.customId === "Apply_5") {
            //SET THE EMBED COLOR TO GREEN
            embed.setColor("#1705e6")
  
            //EDIT THE EMBED
            targetMessage.edit({embeds: [embed], components: allbuttons_d}).catch((e)=>{console.log(String(e).grey.italic.dim)}).then(msg=>{
              apply_db.set(msg.id, {
                id: msg.id,
                user: interaction.user.id,
                State: interaction.customId,
              }, "Apply")
            })
  
            //CREATE THE APPROVE MESSAGE
            var approve = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon)
              .setColor("GREEN")
              .setTitle(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable53"]))
              .setFooter("By  |  " + interaction.user.user.tag, interaction.user.user.displayAvatarURL({
                dynamic: true
              }))
              .setDescription(apply_db.get(message.guild.id, "five.message"))
            //if image is enabled then set the image
            if (apply_db.get(message.guild.id, "five.image.enabled")) try {
              approve.setImage(apply_db.get(message.guild.id, "five.image.url"))
            } catch {
              /* */
            }
  
            //GET THE USER FROM THE DATABASE
            var usert = await client.users.fetch(apply_db.get(message.id, "temp")).catch((e)=>{console.log(String(e).grey.italic.dim)});
            if(!usert) return interaction.reply(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable31"]), true);
  
            //try to remove all roles after that continue?
            await rome_old_roles(message, usert, apply_db);
  
            //send the user the approve message
            usert.send({embeds: [approve]}).catch(e => {
              interaction.reply(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable54"]), true);
              console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim);
            });
  
            //TRY CATCH --- ADDING ROLE
            try {
              //get the roleid from the db
              let roleid = apply_db.get(message.guild.id, "five.role");
              if (roleid) {
                //if no roleid added then return error
                if (roleid.length !== 18) return;
                //try to add the role
                var member = message.guild.members.cache.get(usert.id)
                member.roles.add(roleid).catch((e)=>{channel_tosend.send("I am Missing Permissions to grant the Role\n" + e.message)});
              }
            } catch (e) {
              //if an error happens, show it
              interaction.reply(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable55"]), true).then(msg=>{
                setTimeout(()=>{
                  try{msg.delete();}catch{}
                }, 5000)
              })
            }
          }
          try{ interaction.deferUpdate() }catch{ }
        } catch (e) {
          console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
          interaction.reply({embeds: [new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable56"]))
            .setDescription(eval(client.la[ls]["handlers"]["applyjs"]["apply"]["variable57"]))]
            , ephemeral: true}).then(msg=>{
              setTimeout(()=>{
                try{msg.delete();}catch{}
              }, 5000)
            })
        }
    }
});
}

/** ////////////////////////////////////////// *
 * FUNCTION FOR REMOVING ALL OLD ROLES
 * ////////////////////////////////////////// *
 */
function rome_old_roles(message, user, apply_db) {
  return new Promise(async (resolve, reject) => {
    //get the reactionmember from the reactions
    let reactionmember = message.guild.member(user);

    //get the temprole, Try to remove the temprole if its valid
    let temprole = apply_db.get(message.guild.id, "TEMP_ROLE");
    if (temprole != "0") {
      try {
        if (reactionmember.roles.cache.has(temprole))
        await reactionmember.roles.remove(temprole);
      } catch {
        /* */
      }
    }

    //get the one.role, Try to remove the temprole if its valid
    let onerole = apply_db.get(message.guild.id, "one.role");
    if (onerole != "0") {
      try {
        if (reactionmember.roles.cache.has(onerole))
        await reactionmember.roles.remove(onerole);
      } catch {
        /* */
      }
    }
    //get the two.role, Try to remove the temprole if its valid
    let tworole = apply_db.get(message.guild.id, "two.role");
    if (tworole != "0") {
      try {
        if (reactionmember.roles.cache.has(tworole))
        await reactionmember.roles.remove(tworole);
      } catch {
        /* */
      }
    }

    //get the three.role, Try to remove the temprole if its valid
    let threerole = apply_db.get(message.guild.id, "three.role");
    if (threerole != "0") {
      try {
        if (reactionmember.roles.cache.has(threerole))
        await reactionmember.roles.remove(threerole);
      } catch {
        /* */
      }
    }

    //get the four.role, Try to remove the temprole if its valid
    let fourrole = apply_db.get(message.guild.id, "four.role");
    if (fourrole != "0") {
      try {
        if (reactionmember.roles.cache.has(fourrole))
        await reactionmember.roles.remove(fourrole);
      } catch {
        /* */
      }
    }

    //get the five.role, Try to remove the temprole if its valid
    let fiverole = apply_db.get(message.guild.id, "five.role");
    if (fiverole != "0") {
      try {
        if (reactionmember.roles.cache.has(fiverole))
          await reactionmember.roles.remove(fiverole);
      } catch {
        /* */
      }
    }
    return resolve("FINISHED")
  })
}
