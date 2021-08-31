


  
const Discord = require('discord.js'),
CronJob = require('cron').CronJob;
module.exports = async client => {
 //function that will run the checks
    client.on("guildMemberAdd", async member => {
        client.mutes.ensure("MUTES", {
          MUTES: []
        })
        let data = client.mutes.get("MUTES")
        var unmutes = data.MUTES.sort((a, b) => a.timestamp - b.timestamp).filter(v => {
            return v.mutetime - (Date.now() - v.timestamp) > 0 && v.guild == member.guild.id && v.user == member.user.id
        }, "MUTES")
        if(unmutes) {
            for(const unmute of unmutes){
                try{
                    member.roles.add(unmute.role).catch(e => console.log(String(e).grey.italic.dim));
                }catch (e){
                    console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
                }
            }
        }
    })
    client.Jobmute = new CronJob('*/5 * * * * *', async function() {
        client.mutes.ensure("MUTES", {
            MUTES: []
          })
        let data = client.mutes.get("MUTES")
        var unmutes = data.MUTES.filter(v=>{
            return v.mutetime - (Date.now() - v.timestamp) <= 0
        })
        if(unmutes && unmutes.length > 0){
            unmutes.forEach(async muteuser => {
                try{
                    let es = client.settings.get(muteuser.guild, "embed")
                    if(!client.settings.has(muteuser.guild.id, "language")) client.settings.ensure(muteuser.guild.id, { language: "en" });
                    let ls = client.settings.get(muteuser.guild.id, "language");
                    let guild = client.guilds.cache.get(muteuser.guild)
                    let member = await guild.members.fetch(muteuser.user);
                    if(member.roles.cache.has(muteuser.role)) {
                        member.roles.remove(muteuser.role)
                        let channel = guild.channels.cache.get(muteuser.channel);
                        let ls = client.settings.get(guild.id, "language")
                        channel.send({embeds: [new Discord.MessageEmbed()
                            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                            .setFooter(es.footertext, es.footericon)
                            .setTitle(eval(client.la[ls]["handlers"]["mutejs"]["mute"]["variable1"]))
                            .setDescription(eval(client.la[ls]["handlers"]["mutejs"]["mute"]["variable2"]))]
                        });
                    }
                    client.mutes.remove("MUTES", v=>v.user == muteuser.user, "MUTES")
                }catch (e){
                    client.mutes.remove("MUTES", v=>v.user == muteuser.user, "MUTES")
                }
            })
        }
    }, null, true, 'America/Los_Angeles');
}