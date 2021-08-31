module.exports = (client) => {
    //ADDING ROLES    
    client.on("messageReactionAdd", async (reaction, user) => {
        try {
            const {
                message
            } = reaction;
            if (user.bot || !message.guild) return;
            if (message && message.partial) await message.fetch().catch(e => console.log(String(e).grey.italic.dim));
            if (reaction.partial) await reaction.fetch().catch(e => console.log(String(e).grey.italic.dim));
            if (user.bot) return;
            client.reactionrole.ensure(reaction.message.guild.id, {
                reactionroles: []
            });
            const reactionsetup = client.reactionrole.get(reaction.message.guild.id, "reactionroles");
            if(!reactionsetup || reactionsetup == undefined || reactionsetup == null) return;
            for (let k = 0; k < reactionsetup.length; k++) {
                if (reaction.message.id === reactionsetup[k].MESSAGE_ID) {
                    let messagereaction = await reaction.message.guild.members.fetch(user.id);
                    let rr = reactionsetup[k].Parameters;
                    let currrole;
                    for (let j = 0; j < rr.length; j++) {
                        if (reaction.emoji.id == rr[j].Emoji) {
                            try {
                                currrole = rr[j].Role;
                                if(!messagereaction.roles.cache.has(rr[j].Role))
                                await messagereaction.roles.add(rr[j].Role).catch(e => console.log(String(e).grey.italic.dim));
                            } catch (error) {
                                reaction.message.channel.send({content: error.message, 
                                    codeBlock: "js"
                                }).then(msg=>{
                                    msg.delete({timeout: 3000}).catch(e => console.log(String(e).grey.italic.dim))
                                }).catch(e => console.log(String(e).grey.italic.dim))
                            }
                        }
                        else if (reaction.emoji.name == rr[j].Emoji) {
                            try {
                                currrole = rr[j].Role;
                                if(!messagereaction.roles.cache.has(rr[j].Role))
                                await messagereaction.roles.add(rr[j].Role).catch(e => console.log(String(e).grey.italic.dim));
                            } catch (error) {
                                reaction.message.channel.send({content: error.message, 
                                    codeBlock: "js"
                                }).then(msg=>{
                                    msg.delete({timeout: 3000}).catch()
                                }).catch(e => console.log(String(e).grey.italic.dim));
                            }
                        } else {
                            continue;
                        }
                    }

                    if (reactionsetup[k].remove_others) {
                        let rr2 = reactionsetup[k].Parameters;
                        //REMOVE REACTIONS
                        let oldreact = reaction;
                        await reaction.message.fetch().catch(e => console.log(String(e).grey.italic.dim));
                        const userReactions = reaction.message.reactions.cache;
                        try {
                            for (const reaction of userReactions.values()) {
                                if (reaction.users.cache.has(user.id) && oldreact.emoji.name != reaction.emoji.name) {
                                    reaction.users.remove(user.id);
                                }
                            }
                        } catch {}
                        //REMOVE THE ROLE
                        for (let z = 0; z < rr2.length; z++) {
                            try {
                                if (rr2[z].Role != currrole) {
                                    if (messagereaction.roles.cache.has(rr2[z].Role)) {
                                        await messagereaction.roles.remove(rr2[z].Role)
                                    }
                                }
                            } catch (error) {
                                reaction.message.channel.send({content: error.message, 
                                    codeBlock: "js"
                                }).then(msg=>{
                                    msg.delete({timeout: 3000}).catch()
                                }).catch(e => console.log(String(e).grey.italic.dim));
                            }
                        }
                    }
                }
                else {
                    continue;
                }
            }
        } catch (e) {
            console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
        }
    });

    //REMOVING ROLES
    client.on("messageReactionRemove", async (reaction, user) => {
        try {
            if (reaction.message && reaction.message.partial) await reaction.message.fetch().catch(e => console.log(String(e).grey.italic.dim));
            if (reaction.partial) await reaction.fetch().catch(e => console.log(String(e).grey.italic.dim));
            if (user.bot) return;
            if (!reaction.message.guild) return;
            client.reactionrole.ensure(reaction.message.guild.id, {
                reactionroles: []
            });
            const reactionsetup = client.reactionrole.get(reaction.message.guild.id, "reactionroles");

            for (let k = 0; k < reactionsetup.length; k++) {
                if (reaction.message.id === reactionsetup[k].MESSAGE_ID) {
                    let messagereaction = await reaction.message.guild.members.fetch(user.id);
                    let rr = reactionsetup[k].Parameters;
                    for (let j = 0; j < rr.length; j++) {
                        if (reaction.emoji.id === rr[j].Emoji) {
                            try {
                                if(messagereaction.roles.cache.has(rr[j].Role))
                                await messagereaction.roles.remove(rr[j].Role);
                            } catch (error) {
                                reaction.message.channel.send({content: error.message, 
                                    codeBlock: "js"
                                }).then(msg=>{
                                    msg.delete({timeout: 3000}).catch()
                                }).catch(e => console.log(String(e).grey.italic.dim));
                            }
                        }
                        else if (reaction.emoji.name === rr[j].Emoji) {
                            try {
                                if(messagereaction.roles.cache.has(rr[j].Role))
                                await messagereaction.roles.remove(rr[j].Role);
                            } catch (error) {
                                reaction.message.channel.send({content: error.message, 
                                    codeBlock: "js"
                                }).then(msg=>{
                                    msg.delete({timeout: 3000}).catch()
                                }).catch(e => console.log(String(e).grey.italic.dim));
                            }
                        }
                        else {
                            continue;
                        }
                    }
                }
            }
        } catch (e) {
            console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
        }
    });
}