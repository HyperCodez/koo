const Discord = require("discord.js")
const {
  MessageEmbed
} = require("discord.js")
const config = require("../botconfig/config.json")
ee = require("../botconfig/embed.json")
const {
  format,
  delay,
  arrayMove
} = require("../handlers/functions")
module.exports = async (client, message, args, type) => {
  let method = type.includes(":") ? type.split(":") : Array(type)
  if (!message.guild) return;
  
  //just visual for the console
  
  ee = client.settings.get(message.guild.id, "embed")
  if(!client.settings.has(message.guild.id, "language")) client.settings.ensure(message.guild.id, { language: "en" });
  let ls = client.settings.get(message.guild.id, "language");

  let {
    channel
  } = message.member.voice;
  const permissions = channel.permissionsFor(client.user);

  if (!permissions.has("CONNECT"))
    return message.channel.send({embeds: [new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(eval(client.la[ls]["handlers"]["playermanagerjs"]["playermanager"]["variable1"]))
    ]}).catch((e)=>console.log(String(e).grey.italic.dim));
  if (!permissions.has("SPEAK"))
    return message.channel.send({embeds: [new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(eval(client.la[ls]["handlers"]["playermanagerjs"]["playermanager"]["variable2"]))
    ]}).catch((e)=>console.log(String(e).grey.italic.dim));
  
  if (method[0] === "song")
    require("./playermanagers/song")(client, message, args, type); 
  else if (method[0] === "request")
    require("./playermanagers/request")(client, message, args, type);  
  else if (method[0] === "playlist")
    require("./playermanagers/playlist")(client, message, args, type);
  else if (method[0] === "similar")
    require("./playermanagers/similar")(client, message, args, type);
  else if (method[0] === "search")
    require("./playermanagers/search")(client, message, args, type);
  else if (method[0] === "skiptrack")
    require("./playermanagers/skiptrack")(client, message, args, type); 
  else if (method[0] === "playtop")
    require("./playermanagers/playtop")(client, message, args, type)
  else
    return message.channel.send({embeds: [new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(eval(client.la[ls]["handlers"]["playermanagerjs"]["playermanager"]["variable3"]))
    ]}).catch((e)=>console.log(String(e).grey.italic.dim));
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
