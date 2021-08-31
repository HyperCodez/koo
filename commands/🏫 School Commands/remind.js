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
const { duration } = require('../../handlers/functions');
module.exports = {
  name: "remind",
  aliases: ["remindme"],
  category: "🏫 School Commands",
  description: "Reminds you at a specific day for something",
  usage: "remind TIME ++ TEXT",
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
    if(!args[0])
    return message.reply(new MessageEmbed()
      .setColor(es.wrongcolor)
      .setFooter(es.footertext, es.footericon)
      .setTitle(eval(client.la[ls]["cmds"]["schoolcommands"]["remind"]["variable1"]))
      .setDescription(eval(client.la[ls]["cmds"]["schoolcommands"]["remind"]["variable2"]))
    );
    let newargs = args.join(" ").split("++")
    let time = 0;
      try {
        const timeargs = newargs[0].trim().split(" ")
        for(const t of timeargs)
          time += ms(t);
      } catch (e) {
        return message.reply(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(eval(client.la[ls]["cmds"]["schoolcommands"]["remind"]["variable3"]))
          .setDescription(eval(client.la[ls]["cmds"]["schoolcommands"]["remind"]["variable4"]))
        );
      }
    let content = newargs.slice(1).join(" ");
    if (!content) return message.reply(eval(client.la[ls]["cmds"]["schoolcommands"]["remind"]["variable5"]))
    // Based off the delimiter, sets the time
    let returntime = time;
    if (returntime > 2073600000) return message.reply(new MessageEmbed()
      .setColor(es.wrongcolor)
      .setFooter(es.footertext, es.footericon)
      .setTitle(eval(client.la[ls]["cmds"]["schoolcommands"]["remind"]["variable6"]))
      .setDescription(eval(client.la[ls]["cmds"]["schoolcommands"]["remind"]["variable7"]))
    );
    if (returntime == 0) return message.reply(new MessageEmbed()
      .setColor(es.wrongcolor)
      .setFooter(es.footertext, es.footericon)
      .setTitle(eval(client.la[ls]["cmds"]["schoolcommands"]["remind"]["variable8"]))
      .setDescription(eval(client.la[ls]["cmds"]["schoolcommands"]["remind"]["variable9"]))
    );
    const now = new Date();
    let string_of_time = duration(returntime).map(i=>`\`${i}\``).join(", ");
    message.reply(new MessageEmbed()
      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      .setTitle(eval(client.la[ls]["cmds"]["schoolcommands"]["remind"]["variable10"]))
      .setDescription(eval(client.la[ls]["cmds"]["schoolcommands"]["remind"]["variable11"]))
    );
    
    let olddate = Date();
    client.setTimeout(function () {
      message.author.send(new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
        .setTitle(eval(client.la[ls]["cmds"]["schoolcommands"]["remind"]["variable12"]))
        .addField(eval(client.la[ls]["cmds"]["schoolcommands"]["remind"]["variablex_13"]), eval(client.la[ls]["cmds"]["schoolcommands"]["remind"]["variable13"]))
        .addField("Created at:", `\`${olddate}\``)
        .setDescription(content)
      );
    }, returntime)
  }

};
