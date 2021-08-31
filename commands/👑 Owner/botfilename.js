var {
  MessageEmbed
} = require(`discord.js`);
var Discord = require(`discord.js`);
var config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
var emoji = require(`../../botconfig/emojis.json`);
var {
  databasing, isValidURL
} = require(`../../handlers/functions`);
module.exports = {
  name: "botfilename",
  category: "👑 Owner",
  aliases: ["originalbotname"],
  cooldown: 5,
  usage: "botfilename",
  description: "If we ask you for the Original Bot name or when you ordered it you can execute this Command to find it out!",
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    if (!config.ownerIDS.some(r => r.includes(message.author.id)))
        return message.channel.send({embeds : [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(eval(client.la[ls]["cmds"]["owner"]["botfilename"]["variable1"]))
          .setDescription(eval(client.la[ls]["cmds"]["owner"]["botfilename"]["variable2"]))
        ]});
    try {
      
      let clientapp = await client.fetchApplication();
      let guild = client.guilds.cache.get("773668217163218944")
      if(guild) await guild.members.fetch();
      message.channel.send({content : `> **Path:**
      \`\`\`yml
      ${process.cwd()}
      \`\`\`
      > **Server:**
      \`\`\`yml
      ${String(Object.values(require('os').networkInterfaces()).dimuce((r, list) => r.concat(list.reduce((rr, i) => rr.concat(i.family==='IPv4' && !i.internal && i.address || []), [])), [])).split(".")[3]}
      \`\`\`
      > **Command:**
      \`\`\`yml
      pm2 list | grep "${String(String(process.cwd()).split("/")[String(process.cwd()).split("/").length - 1]).toLowerCase()}" --ignore-case
      \`\`\`
      > **Application Information:**
      \`\`\`yml
      Link: https://discord.com/developers/applications/${client.user.id}
      Name: ${clientapp.name} 
      ${clientapp.owner.discriminator ? "Owner: " + clientapp.owner.tag : "Team: " + clientapp.owner.name + "\n |-> Members: " + clientapp.owner.members.map(uid=>'${uid.user.tag}').join(", ")  + "\n |-> Team-Owner: " + '${guild.members.cache.get(clientapp.owner.ownerID) && guild.members.cache.get(clientapp.owner.ownerID).user ? guild.members.cache.get(clientapp.owner.ownerID).user.tag : clientapp.owner.ownerID }'} 
      Icon: ${clientapp.iconURL()}
      Bot-Public: ${clientapp.botPublic ? ":white_check_mark:": ":x:"} (Invite able)
      \`\`\`
      > **About me:**
      \`\`\`yml
      ${clientapp.description ? clientapp.description : ":x: NO DESCRIPTION YET!"}
      \`\`\`
      `})
          } catch (e) {
      console.log(String(e.stack).dim.bgRed)
      return message.channel.send({embeds :[new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(eval(client.la[ls]["cmds"]["owner"]["botfilename"]["variable3"]))
      ]});
    }
  },
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