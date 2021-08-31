const {
    MessageEmbed, Collection, MessageAttachment
  } = require("discord.js");
  const Discord = require("discord.js");
  const config = require("../botconfig/config.json");
  var ee = require("../botconfig/embed.json");
  const moment = require("moment")
  const officegen = require('officegen')
  const fs = require('fs')
  const { MessageButton, MessageActionRow } = require('discord.js')
  const {
    databasing, delay, create_transcript, GetUser, GetRole, create_transcript_buffer
  } = require("../handlers/functions");

module.exports = client => {
    //Event
    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isButton()) return;
        var { guild, channel, user, message } = interaction;
        if(!guild || !channel || !message || !user) return;
        if(!interaction.customId.includes("ticket_")) return;
        if(interaction.customId.includes("create_a_ticket")) return;
        let temptype = interaction.customId.replace("ticket_", "")
        let buttonuser = user;
        let member = guild.members.cache.get(user.id);
        if(!client.settings.has(guild.id, "language")) client.settings.ensure(guild.id, { language: "en" });
        let ls = client.settings.get(guild.id, "language");
        if(!member) member = await guild.members.fetch(user.id).catch((e)=>{
            return interaction.reply(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable1"]))
        });
        if(!member)return interaction.reply(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable2"]))
        
        interaction.deferUpdate();
        let prefix = client.settings.get(interaction.guild.id, "prefix")
        let adminroles = client.settings.get(guild.id, "adminroles")
        let cmdroles = client.settings.get(guild.id, "cmdadminroles.ticket")
        let cmdroles2 = client.settings.get(guild.id, "cmdadminroles.close")
        let es = client.settings.get(guild.id, "embed");
        try{for (const r of cmdroles2) cmdrole.push(r)}catch{}
        
        let ticket = client.setups.get(guild.id, "ticketsystem")
        var cmdrole = []
            if(cmdroles.length > 0){
            for(const r of cmdroles){
                if(guild.roles.cache.get(r)){
                cmdrole.push(` | <@&${r}>`)
                }
                else if(guild.members.cache.get(r)){
                cmdrole.push(` | <@${r}>`)
                }
                else {
                try{ client.settings.remove(guild.id, r, `cmdadminroles.ticket`) }catch{ }
                try{ client.settings.remove(guild.id, r, `cmdadminroles.close`) }catch{ }
                }
            }
            }
            let edited = false;
            if(temptype == "close"){
                let data = client.setups.get(channel.id, "ticketdata");
                if(data.state === "closed") {
                    return channel.send({content: `<@${buttonuser.id}>`,embeds: [new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable5"]))
                    .setColor(es.wrongcolor)]})
                }
                let button_ticket_verify = new MessageButton().setStyle('SUCCESS').setCustomId('ticket_verify').setLabel("Verify this Step").setEmoji("833101995723194437")
                channel.send({content: `<@${buttonuser.id}>`,embeds: [new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable6"]))
                    .setColor(es.color)
                ], buttons: [button_ticket_verify]}).then(async msg=>{
                const collector = msg.createMessageComponentCollector(bb => !bb.user.bot, { time: 30000 }); //collector for 5 seconds
                collector.on('collect', async b => {
                    if(b.user.id !== user.id)
                        return b.reply(`<:no:833101993668771842> **Only the one who typed ${prefix}help is allowed to react!**`, true)
                        
                        edited = true;
                        msg.edit({content: `<@${buttonuser.id}>`,embeds: [new Discord.MessageEmbed()
                        .setTitle("Verified!")
                        .setColor(es.color)], buttons: [button_ticket_verify.setDisabled(true)]}).catch((e)=>{console.log(String(e).grey.italic.dim)});
                        
                        //page forward
                        if(b.customId == "ticket_verify") {
                            if(data.type == "ticket-setup-1"){
                                client.setups.remove("TICKETS", data.user, "tickets");
                                client.setups.remove("TICKETS", data.channel, "tickets");
                            } else if(data.type == "ticket-setup-2"){
                                client.setups.remove("TICKETS", data.user, "tickets2");
                                client.setups.remove("TICKETS", data.channel, "tickets2");
                            }else if(data.type == "ticket-setup-3"){
                                client.setups.remove("TICKETS", data.user, "tickets3");
                                client.setups.remove("TICKETS", data.channel, "tickets3");
                            }else if(data.type == "ticket-setup-4"){
                                client.setups.remove("TICKETS", data.user, "tickets4");
                                client.setups.remove("TICKETS", data.channel, "tickets4");
                            } else if(data.type == "ticket-setup-5"){
                                client.setups.remove("TICKETS", data.user, "tickets5");
                                client.setups.remove("TICKETS", data.channel, "tickets5");
                            } else if(data.type == "ticket-setup-apply-1"){ 
                                client.setups.remove("TICKETS", data.user, "applytickets1");
                                client.setups.remove("TICKETS", data.channel, "tickets5");
                            }else if(data.type == "ticket-setup-apply-2"){ 
                                client.setups.remove("TICKETS", data.user, "applytickets2");
                                client.setups.remove("TICKETS", data.channel, "applytickets2");
                            }else if(data.type == "ticket-setup-apply-3"){ 
                                client.setups.remove("TICKETS", data.user, "applytickets3");
                                client.setups.remove("TICKETS", data.channel, "applytickets3");
                            }else if(data.type == "ticket-setup-apply-4"){ 
                                client.setups.remove("TICKETS", data.user, "applytickets4");
                                client.setups.remove("TICKETS", data.channel, "applytickets4");
                            }else if(data.type == "ticket-setup-apply-5"){ 
                                client.setups.remove("TICKETS", data.user, "applytickets5");
                                client.setups.remove("TICKETS", data.channel, "applytickets5");
                            }
                        client.setups.set(msg.channel.id, "closed", "ticketdata.state");
                        data = client.setups.get(msg.channel.id, "ticketdata");
                        await msg.channel.permissionOverwrites.edit(data.user, {
                            SEND_MESSAGES: false,
                            VIEW_CHANNEL: false,
                        });
                        msg.channel.send({content: `<@${buttonuser.id}>`,embeds: [new Discord.MessageEmbed()
                            .setTitle(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable7"]))
                            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                            .setDescription(`Closed the Ticket of <@${data.user}> and removed him from the Channel!`.substr(0, 2000))
                            .addField("User: ", `<@${data.user}>`)
                            .addField(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variablex_8"]), eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable8"]))
                            .addField("State: ", `${data.state}`)
                            .setFooter(es.footertext, es.footericon)]})

                        if (client.settings.get(guild.id, `adminlog`) != "no") {
                            let message = msg; //NEEDED FOR THE EVALUATION!
                                try {
                                    var adminchannel = guild.channels.cache.get(client.settings.get(guild.id, `adminlog`))
                                    if (!adminchannel) return client.settings.set(guild.id, "no", `adminlog`);
                                    adminchannel.send({embeds: [new MessageEmbed()
                                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                                    .setAuthor(`ticket --> LOG | ${user.tag}`, user.displayAvatarURL({
                                        dynamic: true
                                    }))
                                    .setDescription(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable9"]))
                                    .addField(eval(client.la[ls]["cmds"]["administration"]["ban"]["variablex_15"]), eval(client.la[ls]["cmds"]["administration"]["ban"]["variable15"]))
                                    .addField(eval(client.la[ls]["cmds"]["administration"]["ban"]["variablex_16"]), eval(client.la[ls]["cmds"]["administration"]["ban"]["variable16"]))
                                    .setTimestamp().setFooter("ID: " + user.id)]
                                })
                                } catch (e) {
                                    console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
                                }
                        }
                        }
                });
                let endedembed = new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable12"]))
                    .setColor(es.wrongcolor)
                collector.on('end', collected => {
                    if(!edited){
                        edited = true;
                        msg.edit({content: `<@${buttonuser.id}>`,embeds: [endedembed], buttons: [button_ticket_verify.setDisabled(true).setLabel("FAILED TO VERIFY").setEmoji("833101993668771842").setStyle('DANGER')]}).catch((e)=>{console.log(String(e).grey.italic.dim)});
                    }
                });
                setTimeout(()=>{
                    if(!edited){
                        edited = true;
                        msg.edit({content: `<@${buttonuser.id}>`,embeds: [endedembed], buttons: [button_ticket_verify.setDisabled(true).setLabel("FAILED TO VERIFY").setEmoji("833101993668771842").setStyle('DANGER')]}).catch((e)=>{console.log(String(e).grey.italic.dim)});
                    }
                }, 30000 + 150)
            })
            }
            else if(temptype == "delete"){
                
                if ((Array.from(member.roles.cache.values()) && !member.roles.cache.some(r => cmdroles.includes(r.id))) && !cmdroles.includes(interaction.user.id) && (Array.from(member.roles.cache.values()) && !member.roles.cache.some(r => adminroles.includes(r ? r.id : r))) && !Array(guild.ownerID, config.ownerid).includes(interaction.user.id) && !member.permissions.has("ADMINISTRATOR") && !member.roles.cache.some(r => ticket.adminroles.includes(r ? r.id : r)))
                    {
                    return channel.send({content: `<@${buttonuser.id}>`, embeds: [new MessageEmbed()
                        .setColor(es.wrongcolor)
                        .setFooter(es.footertext, es.footericon)
                        .setTitle("<:no:833101993668771842> You are not allowed to delete this Ticket")
                        .setDescription(`${adminroles.length > 0 ? "You need one of those Roles: " + adminroles.map(role => `<@&${role}>`).join(" | ") + cmdrole.join(" | ") + ticket.adminroles.join(" | ")  : `No Admin Roles Setupped yet! Do it with: \`${prefix}setup-admin\` You can also add Ticket only Roles with \`${prefix}setup-ticket\``}`)]
                    });
                }
            let button_ticket_verify = new MessageButton().setStyle('SUCCESS').setCustomId('ticket_verify').setLabel("Verify this Step").setEmoji("833101995723194437")
            let msg = await channel.send({content: `<@${buttonuser.id}>`,embeds: [new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable13"]))
            .setColor(es.color)], buttons: [button_ticket_verify]})
            const collector = msg.createMessageComponentCollector(bb => !bb.user.bot, { time: 30000 }); //collector for 5 seconds
            collector.on('collect', async b => {
                if(b.user.id !== user.id)
                    return b.reply(`<:no:833101993668771842> **Only the one who typed ${prefix}help is allowed to react!**`, true)
                
                    edited = true;
                    msg.edit({content: `<@${buttonuser.id}>`,embeds: [new Discord.MessageEmbed()
                    .setTitle("Verified!")
                    .setColor(es.color)], buttons: [button_ticket_verify.setDisabled(true)]}).catch((e)=>{console.log(String(e).grey.italic.dim)});
                    
                    //page forward
                    if(b.customId == "ticket_verify") {
                    let data = client.setups.get(msg.channel.id, "ticketdata");
                    if(data.type == "ticket-setup-1"){
                        client.setups.remove("TICKETS", data.user, "tickets");
                        client.setups.remove("TICKETS", data.channel, "tickets");
                    } else if(data.type == "ticket-setup-2"){
                        client.setups.remove("TICKETS", data.user, "tickets2");
                        client.setups.remove("TICKETS", data.channel, "tickets2");
                    }else if(data.type == "ticket-setup-3"){
                        client.setups.remove("TICKETS", data.user, "tickets3");
                        client.setups.remove("TICKETS", data.channel, "tickets3");
                    }else if(data.type == "ticket-setup-4"){
                        client.setups.remove("TICKETS", data.user, "tickets4");
                        client.setups.remove("TICKETS", data.channel, "tickets4");
                    } else if(data.type == "ticket-setup-5"){
                        client.setups.remove("TICKETS", data.user, "tickets5");
                        client.setups.remove("TICKETS", data.channel, "tickets5");
                    } else if(data.type == "ticket-setup-apply-1"){ 
                        client.setups.remove("TICKETS", data.user, "applytickets1");
                        client.setups.remove("TICKETS", data.channel, "tickets5");
                    }else if(data.type == "ticket-setup-apply-2"){ 
                        client.setups.remove("TICKETS", data.user, "applytickets2");
                        client.setups.remove("TICKETS", data.channel, "applytickets2");
                    }else if(data.type == "ticket-setup-apply-3"){ 
                        client.setups.remove("TICKETS", data.user, "applytickets3");
                        client.setups.remove("TICKETS", data.channel, "applytickets3");
                    }else if(data.type == "ticket-setup-apply-4"){ 
                        client.setups.remove("TICKETS", data.user, "applytickets4");
                        client.setups.remove("TICKETS", data.channel, "applytickets4");
                    }else if(data.type == "ticket-setup-apply-5"){ 
                        client.setups.remove("TICKETS", data.user, "applytickets5");
                        client.setups.remove("TICKETS", data.channel, "applytickets5");
                    }
                    try{
                        client.setups.delete(msg.channel.id);
                    }catch{
    
                    }
                    await msg.channel.send({embeds: [new Discord.MessageEmbed()
                        .setTitle(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable14"]))
                        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                        .setDescription(`Deleting Ticket in less then **\`3 Seconds\`** ....\n\n*If not you can do it manually*`.substr(0, 2000))
                        .setFooter(es.footertext, es.footericon)]})
                    setTimeout(()=>{
                        msg.channel.delete().catch((e)=>{console.log(String(e).grey.italic.dim)});
                    }, 3500)
                   
                    if (client.settings.get(guild.id, `adminlog`) != "no") {
                        let message = msg; //NEEDED FOR THE EVALUATION!
                            try {
                                var adminchannel = guild.channels.cache.get(client.settings.get(guild.id, `adminlog`))
                                if (!adminchannel) return client.settings.set(guild.id, "no", `adminlog`);
                                adminchannel.send({embeds: [new MessageEmbed()
                                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                                .setAuthor(`ticket --> LOG | ${user.tag}`, user.displayAvatarURL({
                                    dynamic: true
                                }))
                                .setDescription(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable15"]))
                                .addField(eval(client.la[ls]["cmds"]["administration"]["ban"]["variablex_15"]), eval(client.la[ls]["cmds"]["administration"]["ban"]["variable15"]))
                                .addField(eval(client.la[ls]["cmds"]["administration"]["ban"]["variablex_16"]), eval(client.la[ls]["cmds"]["administration"]["ban"]["variable16"]))
                                .setTimestamp().setFooter("ID: " + user.id)
                            ]})
                            } catch (e) {
                                console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
                            }
                    }
                    }
            });
            let endedembed = new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable18"]))
                .setColor(es.wrongcolor)
                collector.on('end', collected => {
                    if(!edited){
                        edited = true;
                        msg.edit({content: `<@${buttonuser.id}>`,embeds: [endedembed], buttons: [button_ticket_verify.setDisabled(true).setLabel("FAILED TO VERIFY").setEmoji("833101993668771842").setStyle('DANGER')]}).catch((e)=>{console.log(String(e).grey.italic.dim)});
                    }
                });
                setTimeout(()=>{
                    if(!edited){
                        edited = true;
                        msg.edit({content: `<@${buttonuser.id}>`,embeds: [endedembed], buttons: [button_ticket_verify.setDisabled(true).setLabel("FAILED TO VERIFY").setEmoji("833101993668771842").setStyle('DANGER')]}).catch((e)=>{console.log(String(e).grey.italic.dim)});
                    }
                }, 30000 + 150)
            } 
            else if(temptype == "log" || temptype == "transcript"){
            msglimit = 1000;
            let data = client.setups.get(channel.id, "ticketdata");
            //do transcripting - making a docx file with design. Here the Docs: https://github.com/Ziv-Barber/officegen/blob/4bfff80e0915f884199495c0ea64e5a0f0549cfe/manual/docx/README.md#prgapi
            //let tmmpmsg = await channel.send({content: `<@${buttonuser.id}>`,embeds: [new MessageEmbed().setAuthor(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable19"]))})
            //The text content collection
            let messageCollection = new Collection(); //make a new collection
            let channelMessages = await channel.messages.fetch({ //fetch the last 100 messages
                limit: 100
            }).catch(err => console.log(err)); //catch any error
            messageCollection = messageCollection.concat(channelMessages); //add them to the Collection
            let tomanymsgs = 1; //some calculation for the messagelimit
            if (Number(msglimit) === 0) msglimit = 100; //if its 0 set it to 100
            let messagelimit = Number(msglimit) / 100; //devide it by 100 to get a counter
            if (messagelimit < 1) messagelimit = 1; //set the counter to 1 if its under 1
            while (channelMessages.size === 100) { //make a loop if there are more then 100 messages in this channel to fetch
                if (tomanymsgs === messagelimit) break; //if the counter equals to the limit stop the loop
                tomanymsgs += 1; //add 1 to the counter
                let lastMessageId = channelMessages.lastKey(); //get key of the already fetched messages above
                channelMessages = await channel.messages.fetch({
                    limit: 100,
                    before: lastMessageId
                }).catch(err => console.log(err)); //Fetch again, 100 messages above the already fetched messages
                if (channelMessages) //if its true
                    messageCollection = messageCollection.concat(channelMessages); //add them to the collection
            }
            //reverse the array to have it listed like the discord chat
            create_transcript_buffer(messageCollection.array(), channel, guild).then(async path=>{
                try { // try to send the file
                    const attachment = new MessageAttachment(path); //send it as an attachment
                    //send the Transcript Into the Channel and then Deleting it again from the FOLDER
                    let sendembed = new MessageEmbed()
                    .setTitle(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable20"]))
                    .setColor(ee.color)
                    .setFooter(ee.footertext, ee.footericon)
                    try {
                        let user = guild.members.cache.get(data.user)
                        sendembed.setDescription(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable21"]))
                        sendembed.setThumbnail(user.user.displayAvatarURL({
                            dynamic: true
                        }))
            
                    } catch {
                        sendembed.setDescription(channel.topic)
                    }
                    await channel.send({content: `<@${buttonuser.id}>`,embeds: [sendembed]})
                    await channel.send(attachment)
                    //await tmmpmsg.delete().catch(e=>console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim))
                    await fs.unlinkSync(path)
                    if (client.settings.get(guild.id, `adminlog`) != "no") {
                    try {
                        var adminchannel = guild.channels.cache.get(client.settings.get(guild.id, `adminlog`))
                        if (!adminchannel) return client.settings.set(guild.id, "no", `adminlog`);
                        adminchannel.send({embeds: [new MessageEmbed()
                        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                        .setAuthor(`ticket --> LOG | ${user.tag}`, user.displayAvatarURL({
                            dynamic: true
                        }))
                        .setDescription(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable22"]))
                        .addField(eval(client.la[ls]["cmds"]["administration"]["ban"]["variablex_15"]), eval(client.la[ls]["cmds"]["administration"]["ban"]["variable15"]))
                        .addField(eval(client.la[ls]["cmds"]["administration"]["ban"]["variablex_16"]), eval(client.la[ls]["cmds"]["administration"]["ban"]["variable16"]))
                        .setTimestamp().setFooter("ID: " + user.id)
                    ]})
                    } catch (e) {
                        console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
                    }
                    }
                } catch (error) { //if the file is to big to be sent, then catch it!
                    console.log(error)
                    channel.send({content: `<@${buttonuser.id}>`,embeds: [new MessageEmbed().setAuthor("ERROR! Transcript is to big, to be sent into the Channel!",user.displayAvatarURL({
                        dynamic: true
                    })).setFooter(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable25"]))]})
                }
            }).catch(e=>{
                console.log(String(e).grey.italic.dim)
            })
            /*let docx = officegen({
                type: 'docx',
                author: client.user.username,
                creator: client.user.username,
                description: `Transcript for the Channel #${channel.name} with the ID: ${channel.id}`,
                pageMargins: {
                top: 1000,
                right: 1000,
                bottom: 1000,
                left: 1000
                },
                title: `Transcript!`
            })
            //Logs when to File Got CREATED   =  This does NOT mean that it is finished putting the text in!
            docx.on('finalize', function (written) {})
            //if an error occurs then stop
            docx.on('error', function (err) {
                console.log(err);
                return channel.send(err.substr(0, 2000), {code: "js"});
            })
            //The "TITLE" 
            pObj = docx.createP() //Make a new paragraph
            pObj.options.align = 'left'; //align it to the left page
            pObj.options.indentLeft = -350; //overdrive it 350px to the left
            pObj.options.indentFirstLine = -250; //go 250 px to the - left so right of the overdrive
            pObj.addText('Transcript for:    #' + channel.name, {
                font_face: 'Arial',
                color: '3c5c63',
                bold: true,
                font_size: 22
            }); //add the TEXT CHANNEL NAME
            pObj.addLineBreak() //make a new LINE
            pObj.addText("Channelid: " + channel.id, {
                font_face: 'Arial',
                color: '000000',
                bold: false,
                font_size: 10
            }); //Channel id
            pObj.addLineBreak() //Make a new LINE
            pObj.addText(`Oldest message at the BOTTOM `, {
                hyperlink: 'myBookmark',
                font_face: 'Arial',
                color: '5dbcd2',
                italic: true,
                font_size: 8
            }); //Make a hyperlink to the BOOKMARK (Created later)
            pObj.addText(`  [CLICK HERE TO JUMP]`, {
                hyperlink: 'myBookmark',
                font_face: 'Arial',
                color: '1979a9',
                italic: false,
                bold: true,
                font_size: 8
            }); //Make a hyperlink to the BOOKMARK (Created later)
            pObj.addLineBreak() //Make a new Line
            //The text content collection
            let messageCollection = new Collection(); //make a new collection
            let channelMessages = await channel.messages.fetch({ //fetch the last 100 messages
                limit: 100
            }).catch(err => console.log(err)); //catch any error
            messageCollection = messageCollection.concat(channelMessages); //add them to the Collection
            let tomanymsgs = 1; //some calculation for the messagelimit
            if (Number(msglimit) === 0) msglimit = 100; //if its 0 set it to 100
            let messagelimit = Number(msglimit) / 100; //devide it by 100 to get a counter
            if (messagelimit < 1) messagelimit = 1; //set the counter to 1 if its under 1
            while (channelMessages.size === 100) { //make a loop if there are more then 100 messages in this channel to fetch
                if (tomanymsgs === messagelimit) break; //if the counter equals to the limit stop the loop
                tomanymsgs += 1; //add 1 to the counter
                let lastMessageId = channelMessages.lastKey(); //get key of the already fetched messages above
                channelMessages = await channel.messages.fetch({
                limit: 100,
                before: lastMessageId
                }).catch(err => console.log(err)); //Fetch again, 100 messages above the already fetched messages
                if (channelMessages) //if its true
                messageCollection = messageCollection.concat(channelMessages); //add them to the collection
            }
            //now for every message in the array make a new paragraph!
            await msgs.forEach(async msg => {
                // Create a new paragraph:
                pObj = docx.createP()
                pObj.options.align = 'left'; //Also 'right' or 'justify'.
                //Username and Date
                pObj.addText(`${msg.author.tag}`, {
                font_face: 'Arial',
                color: '3c5c63',
                bold: true,
                font_size: 14
                });
                pObj.addText(`  |  ${msg.createdAt.toDateString()}  |  ${msg.createdAt.toLocaleTimeString()}`, {
                font_face: 'Arial',
                color: '3c5c63',
                bold: true,
                font_size: 14
                }); //
                //LINEBREAK
                pObj.addLineBreak()
                //message of user     
                let umsg;

                if (msg.content.startsWith("```")) {
                umsg = msg.content.replace(/```/g, "");
                } else if (msg.attachments.size > 0) {
                umsg = "Unable to transcript (Embed/Video/Audio/etc.)";
                } else {
                umsg = msg.content;
                }
                pObj.addText(umsg, {
                font_face: 'Arial',
                color: '000000',
                bold: false,
                font_size: 10
                });
                //LINEBREAK
                pObj.addLineBreak()
                pObj.addText(`______________________________________________________________________________________________________________________________________________________________________________________________________________`, {
                color: 'a6a6a6',
                font_size: 4
                });

            });
            // Start somewhere a bookmark:
            pObj.startBookmark('myBookmark'); //add a bookmark at tha last message to make the jump 
            pObj.endBookmark();
            let out = fs.createWriteStream(`${channel.name}.docx`) //write everything in the docx file
            //if a error happens tells it
            out.on('error', function (err) {
                console.log(err)
            })
            //wenn the writing is finished
            out.on("finish", async function (err, result) {
                await delay(3000);
            })
            // Async call to generate the output file:
            await docx.generate(out)
            await delay(2000);
            try { // try to send the file
                const buffer = fs.readFileSync(`./${channel.name}.docx`); //get a buffer file
                const attachment = new MessageAttachment(buffer, `./${channel.name}.docx`); //send it as an attachment
                //send the Transcript Into the Channel and then Deleting it again from the FOLDER
                let sendembed = new MessageEmbed()
                .setTitle(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable26"]))
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                
                try {
                let user = guild.members.cache.get(data.user)
                sendembed.setDescription(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable27"]))
                sendembed.setThumbnail(user.user.displayAvatarURL({
                    dynamic: true
                }))
        
                } catch {
                sendembed.setDescription(channel.topic)
                }
                await channel.send({content: `<@${buttonuser.id}>`,embeds: [sendembed})
                await channel.send(attachment)
                await tmmpmsg.delete().catch(e=>console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim))
                await fs.unlinkSync(`./${channel.name}.docx`)
                if (client.settings.get(guild.id, `adminlog`) != "no") {
                try {
                    var adminchannel = guild.channels.cache.get(client.settings.get(guild.id, `adminlog`))
                    if (!adminchannel) return client.settings.set(guild.id, "no", `adminlog`);
                    adminchannel.send({embeds: [new MessageEmbed()
                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                    .setAuthor(`ticket --> LOG | ${user.tag}`, user.displayAvatarURL({
                        dynamic: true
                    }))
                    .setDescription(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable28"]))
                                    .addField(eval(client.la[ls]["cmds"]["administration"]["ban"]["variablex_15"]), eval(client.la[ls]["cmds"]["administration"]["ban"]["variable15"]))
                                   .addField(eval(client.la[ls]["cmds"]["administration"]["ban"]["variablex_16"]), eval(client.la[ls]["cmds"]["administration"]["ban"]["variable16"]))
                    .setTimestamp().setFooter("ID: " + user.id)
                    )
                } catch (e) {
                    console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
                }
                }
            } catch (error) { //if the file is to big to be sent, then catch it!
            console.log(error)
            channel.send({content: `<@${buttonuser.id}>`,embeds: [new MessageEmbed().setAuthor("ERROR! Transcript is to big, to be sent into the Channel!",user.displayAvatarURL({
                dynamic: true
            })).setFooter(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable31"]))})
            fs.unlinkSync(`./${channel.name}.docx`) //delete the docx
            }*/
            }
            else if(temptype == "user"){
                if ((Array.from(member.roles.cache.values()) && !member.roles.cache.some(r => cmdroles.includes(r.id))) && !cmdroles.includes(interaction.user.id) && (Array.from(member.roles.cache.values()) && !member.roles.cache.some(r => adminroles.includes(r ? r.id : r))) && !Array(guild.ownerID, config.ownerid).includes(interaction.user.id) && !member.permissions.has("ADMINISTRATOR") && !member.roles.cache.some(r => ticket.adminroles.includes(r ? r.id : r)))
                    {
                    return channel.send({content: `<@${buttonuser.id}>`, embeds: [new MessageEmbed()
                        .setColor(es.wrongcolor)
                        .setFooter(es.footertext, es.footericon)
                        .setTitle("<:no:833101993668771842> You are not allowed to add/remove Users to/from this Ticket")
                        .setDescription(`${adminroles.length > 0 ? "You need one of those Roles: " + adminroles.map(role => `<@&${role}>`).join(" | ") + cmdrole.join(" | ") + ticket.adminroles.join(" | ")  : `No Admin Roles Setupped yet! Do it with: \`${prefix}setup-admin\` You can also add Ticket only Roles with \`${prefix}setup-ticket\``}`)]
                    });
                }
            channel.send({content: `<@${buttonuser.id}>`,embeds: [new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable32"]))
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setDescription(`Either with <@USERID> or with the USERNAME, or with the USERID`.substr(0, 2000))
                .setFooter(es.footertext, es.footericon)]
            }).then(async msg=>{
                msg.channel.awaitMessages(m=>m.author.id === buttonuser.id, {max: 1, time: 90000, errors: ["time"]}).then(async collected=>{
                    var message = collected.first();
                    var args = message.content.split(" ")
                    var user;
                        try{
                            user = await GetUser(message, args)
                        }catch (e){
                        if(!e) return channel.send(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable33"]))
                        return channel.send(e)
                        }
                    if(!user || user == null || user.id == null || !user.id) channel.send(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable34"]))
                    var mapped = msg.channel.permissionOverwrites.map(p => {
                        if(p.type == "member"){
                        var obj = {id: "", allow: []};
                        obj.id = p.id;
                        obj.allow = p.allow ? p.allow.toArray() : []
                        return obj;
                        }
                        else{
                        return {id: "", allow: []};
                        }
                    })
                    var oldmapped = mapped;
                    var undermapped = mapped.map(p=> p.id)
                    if(undermapped.includes(user.id)){
                        oldmapped.forEach((element) => {
                            if(element.id == user.id){
                            if(!element.allow.includes("VIEW_CHANNEL")){
                                channel.permissionOverwrites.edit(user.id, {
                                SEND_MESSAGES: true,
                                VIEW_CHANNEL: true,
                                }).then(channel => {
                                channel.send({content: `<@${buttonuser.id}>`,embeds: [new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                                    .setFooter(es.footertext, es.footericon)
                                    .setTitle(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable35"]))
                                ]})
                                if (client.settings.get(guild.id, `adminlog`) != "no") {
                                    try {
                                        var adminchannel = guild.channels.cache.get(client.settings.get(guild.id, `adminlog`))
                                        if (!adminchannel) return client.settings.set(guild.id, "no", `adminlog`);
                                        adminchannel.send({embeds: [new MessageEmbed()
                                        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                                        .setAuthor(`ticket --> LOG | ${user.tag}`, user.displayAvatarURL({
                                            dynamic: true
                                        }))
                                        .setDescription(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable36"]))
                                        .addField(eval(client.la[ls]["cmds"]["administration"]["ban"]["variablex_15"]), eval(client.la[ls]["cmds"]["administration"]["ban"]["variable15"]))
                                        .addField(eval(client.la[ls]["cmds"]["administration"]["ban"]["variablex_16"]), eval(client.la[ls]["cmds"]["administration"]["ban"]["variable16"]))
                                        .setTimestamp().setFooter("ID: " + user.id)
                                    ]})
                                    } catch (e) {
                                        console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
                                    }
                                    }
                                })
                                .catch(e=>{
                                return channel.send({embeds: [new MessageEmbed()
                                    .setColor(es.wrongcolor)
                                    .setFooter(es.footertext, es.footericon)
                                    .setTitle(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable39"]))
                                    .setDescription(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable40"]))
                                ]});
                                });
                            }else {
                                channel.permissionOverwrites.edit(user.id, {
                                SEND_MESSAGES: false,
                                VIEW_CHANNEL: false,
                                }).then(channel => {
                                    return channel.send({content: `<@${buttonuser.id}>`,embeds: [new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                                        .setFooter(es.footertext, es.footericon)
                                        .setTitle(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable41"]))
                                    ]})
                                })
                                .catch(e=>{
                                    return channel.send({embeds: [new MessageEmbed()
                                        .setColor(es.wrongcolor)
                                        .setFooter(es.footertext, es.footericon)
                                        .setTitle(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable42"]))
                                        .setDescription(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable43"]))
                                    ]});
                                });
                            }
                            }
                        });
                    }else{
                        channel.permissionOverwrites.edit(user.id, {
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true,
                        }).then(channel => {
                        channel.send({content: `<@${buttonuser.id}>`,embeds: [new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                            .setFooter(es.footertext, es.footericon)
                            .setTitle(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable44"]))
                        ]})
                        if (client.settings.get(guild.id, `adminlog`) != "no") {
                            try {
                                var adminchannel = guild.channels.cache.get(client.settings.get(guild.id, `adminlog`))
                                if (!adminchannel) return client.settings.set(guild.id, "no", `adminlog`);
                                adminchannel.send({embeds: [new MessageEmbed()
                                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                                .setAuthor(`ticket --> LOG | ${user.tag}`, user.displayAvatarURL({
                                    dynamic: true
                                }))
                                .setDescription(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable45"]))
                                .addField(eval(client.la[ls]["cmds"]["administration"]["ban"]["variablex_15"]), eval(client.la[ls]["cmds"]["administration"]["ban"]["variable15"]))
                                .addField(eval(client.la[ls]["cmds"]["administration"]["ban"]["variablex_16"]), eval(client.la[ls]["cmds"]["administration"]["ban"]["variable16"]))
                                .setTimestamp().setFooter("ID: " + user.id)]} ) 
                            } catch (e) {
                                console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
                            }
                            }
                        }).catch(e=>{
                            return channel.send({embeds: [new MessageEmbed()
                                .setColor(es.wrongcolor)
                                .setFooter(es.footertext, es.footericon)
                                .setTitle(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable48"]))
                                .setDescription(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable49"]))
                            ]});
                        }).catch(e=>{
                            console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
                            return channel.send({content: `<@${buttonuser.id}>`,embeds: [new Discord.MessageEmbed()
                                .setTitle(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable50"]))
                                .setColor(es.wrongcolor)
                                .setDescription(`"Cancelled"`.substr(0, 2000))
                                .setFooter(es.footertext, es.footericon)
                            ]});
                        })
                    }
                }).catch(e=>{
                    console.log(String(e).grey.italic.dim)
                })
            })
            }
            else if(temptype == "role"){
                if ((Array.from(member.roles.cache.values()) && !member.roles.cache.some(r => cmdroles.includes(r.id))) && !cmdroles.includes(interaction.user.id) && (Array.from(member.roles.cache.values()) && !member.roles.cache.some(r => adminroles.includes(r ? r.id : r))) && !Array(guild.ownerID, config.ownerid).includes(interaction.user.id) && !member.permissions.has("ADMINISTRATOR") && !member.roles.cache.some(r => ticket.adminroles.includes(r ? r.id : r)))
                    {
                    return channel.send({content: `<@${buttonuser.id}>`, embeds: [new MessageEmbed()
                        .setColor(es.wrongcolor)
                        .setFooter(es.footertext, es.footericon)
                        .setTitle("<:no:833101993668771842> You are not allowed to add/remove Roles to/from this Ticket")
                        .setDescription(`${adminroles.length > 0 ? "You need one of those Roles: " + adminroles.map(role => `<@&${role}>`).join(" | ") + cmdrole.join(" | ") + ticket.adminroles.join(" | ")  : `No Admin Roles Setupped yet! Do it with: \`${prefix}setup-admin\` You can also add Ticket only Roles with \`${prefix}setup-ticket\``}`)
                    ]});
                }
            channel.send({content: `<@${buttonuser.id}>`,embeds: [new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable51"]))
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setDescription(`Either with <@&ROLEID> or with the ROLEID or with the ROLENAME`.substr(0, 2000))
                .setFooter(es.footertext, es.footericon)
            ]}).then(async msg=>{
                msg.channel.awaitMessages(m=>m.author.id === buttonuser.id, {max: 1, time: 90000, errors: ["time"]}).then(async collected=>{
                var message = collected.first();
                var args = message.content.split(" ")
                var user;
                    try{
                        user = await GetRole(message, args)
                    }catch (e){
                    if(!e) return channel.send(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable52"]))
                    return channel.send("ERROR" + e)
                    }
                if(!user || user == null || user.id == null || !user.id) channel.send(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable53"]))
                var mapped = msg.channel.permissionOverwrites.map(p => {
                    if(p.type == "role"){
                    var obj = {id: "", allow: []};
                    obj.id = p.id;
                    obj.allow = p.allow ? p.allow.toArray() : []
                    return obj;
                    }
                    else{
                    return {id: "", allow: []};
                    }
                })
                var oldmapped = mapped;
                var undermapped = mapped.map(p=> p.id)
                if(undermapped.includes(user.id)){
                    oldmapped.forEach((element) => {
                        if(element.id == user.id){
                        console.log(element)
                        if(!element.allow.includes("VIEW_CHANNEL")){
                            channel.permissionOverwrites.edit(user.id, {
                            SEND_MESSAGES: true,
                            VIEW_CHANNEL: true,
                            }).then(channel => {
                            channel.send({embeds: [new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                                .setFooter(es.footertext, es.footericon)
                                .setTitle(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable54"]))
                            ]})
                            if (client.settings.get(guild.id, `adminlog`) != "no") {
                                try {
                                    var adminchannel = guild.channels.cache.get(client.settings.get(guild.id, `adminlog`))
                                    if (!adminchannel) return client.settings.set(guild.id, "no", `adminlog`);
                                    adminchannel.send({embeds: [new MessageEmbed()
                                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                                    .setAuthor(`ticket --> LOG | ${user.tag}`, user.displayAvatarURL({
                                        dynamic: true
                                    }))
                                    .setDescription(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable55"]))
                                    .addField(eval(client.la[ls]["cmds"]["administration"]["ban"]["variablex_15"]), eval(client.la[ls]["cmds"]["administration"]["ban"]["variable15"]))
                                    .addField(eval(client.la[ls]["cmds"]["administration"]["ban"]["variablex_16"]), eval(client.la[ls]["cmds"]["administration"]["ban"]["variable16"]))
                                    .setTimestamp().setFooter("ID: " + user.id)
                                ]})
                                } catch (e) {
                                    console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
                                }
                                }
                            })
                            .catch(e=>{
                            return channel.send({embeds: [new MessageEmbed()
                                .setColor(es.wrongcolor)
                                .setFooter(es.footertext, es.footericon)
                                .setTitle(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable58"]))
                                .setDescription(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable59"]))
                            ]});
                            });
                        }else {
                            channel.permissionOverwrites.edit(user.id, {
                            SEND_MESSAGES: false,
                            VIEW_CHANNEL: false,
                            }).then(channel => {
                            return channel.send({embeds: [new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                                .setFooter(es.footertext, es.footericon)
                                .setTitle(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable60"]))
                            ]})
                            })
                            .catch(e=>{
                            return channel.send({embeds: [new MessageEmbed()
                                .setColor(es.wrongcolor)
                                .setFooter(es.footertext, es.footericon)
                                .setTitle(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable61"]))
                                .setDescription(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable62"]))
                            ]});
                            });
                        }
                        }
                    });
                }else{
                    channel.permissionOverwrites.edit(user.id, {
                    SEND_MESSAGES: true,
                    VIEW_CHANNEL: true,
                    }).then(channel => {
                    channel.send({embeds: [new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                        .setFooter(es.footertext, es.footericon)
                        .setTitle(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable63"]))
                    ]})
                    if (client.settings.get(guild.id, `adminlog`) != "no") {
                        try {
                            var adminchannel = guild.channels.cache.get(client.settings.get(guild.id, `adminlog`))
                            if (!adminchannel) return client.settings.set(guild.id, "no", `adminlog`);
                            adminchannel.send({embeds: [new MessageEmbed()
                            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                            .setAuthor(`ticket --> LOG | ${user.tag}`, user.displayAvatarURL({
                                dynamic: true
                            }))
                            .setDescription(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable64"]))
                            .addField(eval(client.la[ls]["cmds"]["administration"]["ban"]["variablex_15"]), eval(client.la[ls]["cmds"]["administration"]["ban"]["variable15"]))
                            .addField(eval(client.la[ls]["cmds"]["administration"]["ban"]["variablex_16"]), eval(client.la[ls]["cmds"]["administration"]["ban"]["variable16"]))
                            .setTimestamp().setFooter("ID: " + user.id)
                        ]})
                        } catch (e) {
                            console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
                        }
                        }
                    })
                    .catch(e=>{
                    return channel.send({embeds: [new MessageEmbed()
                        .setColor(es.wrongcolor)
                        .setFooter(es.footertext, es.footericon)
                        .setTitle(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable67"]))
                        .setDescription(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable68"]))
                    ]});
                    });
                }
                }).catch(e=>{
                console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
                return channel.send({content: `<@${buttonuser.id}>`,embeds: [new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["handlers"]["ticketeventjs"]["ticketevent"]["variable69"]))
                    .setColor(es.wrongcolor)
                    .setDescription(`"Cancelled"`.substr(0, 2000))
                    .setFooter(es.footertext, es.footericon)
                ]});
                })
            })
            }
    });
}