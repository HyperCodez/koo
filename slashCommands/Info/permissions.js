const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const moment = require('moment');
const { GetUser, GetGlobalUser } = require("../../handlers/functions")
const { handlemsg } = require("../../handlers/functions");
module.exports = {
  name: "permissions",
  description: "Get permissions information about a user",
  options: [ 
		//{"Integer": { name: "ping_amount", description: "How many times do you want to ping?", required: true }}, //to use in the code: interacton.getInteger("ping_amount")
		//{"String": { name: "ping_amount", description: "How many times do you want to ping?", required: true }}, //to use in the code: interacton.getString("ping_amount")
		{"User": { name: "which_user", description: "From Which User do you want to see the Invites?", required: false }}, //to use in the code: interacton.getUser("ping_a_user")
		//{"Channel": { name: "what_channel", description: "To Ping a Channel lol", required: false }}, //to use in the code: interacton.getChannel("what_channel")
		//{"Role": { name: "what_role", description: "To Ping a Role lol", required: false }}, //to use in the code: interacton.getRole("what_role")
		//{"IntChoices": { name: "what_ping", description: "What Ping do you want to get?", required: true, choices: [["Bot", 1], ["Discord Api", 2]] }, //here the second array input MUST BE A NUMBER // TO USE IN THE CODE: interacton.getInteger("what_ping")
		//{"StringChoices": { name: "what_ping", description: "What Ping do you want to get?", required: true, choices: [["Bot", "botping"], ["Discord Api", "api"]] }}, //here the second array input MUST BE A STRING // TO USE IN THE CODE: interacton.getString("what_ping")
  ],
  run: async (client, interaction, cmduser, es, ls, prefix, player) => {
    //things u can directly access in an interaction!
		const { member, channelId, guildId, applicationId, commandName, deferred, replied, ephemeral, options, id, createdTimestamp } = interaction; 
    const { guild } = member;
    let user = options.getUser("which_user");
    if(!user) user = member.user;
		try { try{
        const member = guild.members.cache.get(user.id);
        //create the EMBED
        const embeduserinfo = new MessageEmbed()
        embeduserinfo.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
        embeduserinfo.setAuthor(handlemsg(client.la[ls].cmds.info.permissions.from, {usertag: member.user.tag}), member.user.displayAvatarURL({ dynamic: true }), "https://clan.milrato.eu")
        embeduserinfo.addField(handlemsg(client.la[ls].cmds.info.permissions.from2),`${member.permissions.toArray().map(p=>`\`${p}\``).join(", ")}`)
        embeduserinfo.setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        embeduserinfo.setFooter(es.footertext, es.footericon)
        //send the EMBED
        interaction.reply({ephemeral: true, embeds: [embeduserinfo]})
      }catch (e){
        console.log(e)
        //create the EMBED
        const embeduserinfo = new MessageEmbed()
        embeduserinfo.setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
        embeduserinfo.setAuthor(handlemsg(client.la[ls].cmds.info.permissions.from, {usertag: member.user.tag}), member.user.displayAvatarURL({ dynamic: true }), "https://clan.milrato.eu")
        embeduserinfo.addField(handlemsg(client.la[ls].cmds.info.permissions.from2),`${member.permissions.toArray().map(p=>`\`${p}\``).join(", ")}`)
        embeduserinfo.setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        embeduserinfo.setFooter(es.footertext, es.footericon)
        //send the EMBED
        interaction.reply({ephemeral: true, embeds: [embeduserinfo]})
      }
      
    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
    }
  }
}
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://discord.gg/sngXqWK2eP
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention him / Milrato Development, when using this Code!
 * @INFO
 */
