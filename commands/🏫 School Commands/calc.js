const math = require('math-expression-evaluator');
const ms = require("ms");
const moment = require("moment")
const {
  MessageEmbed,
  MessageAttachment
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: "calc",
  aliases: ["calculate"],
  category: "🏫 School Commands",
  description: "Calculates a math equation",
  usage: "calc <INPUT>",
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    if(!client.settings.get(message.guild.id, "SCHOOL")){
      return message.reply(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(client.la[ls].common.disabled.title)
        .setDescription(require(`../../handlers/functions`).handlemsg(client.la[ls].common.disabled.description, {prefix: prefix}))
      );
    }
    //command

    if (args.length < 1)
      return message.reply(new MessageEmbed()
      .setColor(es.wrongcolor)
      .setFooter(es.footertext, es.footericon)
      .setTitle(eval(client.la[ls]["cmds"]["schoolcommands"]["calc"]["variable1"]))
      .setDescription(eval(client.la[ls]["cmds"]["schoolcommands"]["calc"]["variable2"]))
      );

    let answer;

    try {
      answer = math.eval(args.join(" "));
    } catch (err) {
      message.reply(eval(client.la[ls]["cmds"]["schoolcommands"]["calc"]["variable3"]));
    }

    message.reply(new MessageEmbed() 
      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
      .setDescription(eval(client.la[ls]["cmds"]["schoolcommands"]["calc"]["variable4"]))
      .setFooter(es.footertext, es.footericon)
      .addField(eval(client.la[ls]["cmds"]["schoolcommands"]["calc"]["variablex_5"]), eval(client.la[ls]["cmds"]["schoolcommands"]["calc"]["variable5"]))
      .addField(eval(client.la[ls]["cmds"]["schoolcommands"]["calc"]["variablex_6"]), eval(client.la[ls]["cmds"]["schoolcommands"]["calc"]["variable5"]))
    );
  }
};