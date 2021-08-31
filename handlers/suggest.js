const { Client, Collection, MessageEmbed, MessageAttachment } = require(`discord.js`);const {
  MessageButton,
  MessageActionRow
} = require('discord.js');
const ee = require(`${process.cwd()}/botconfig/embed.json`);
module.exports = (client) => {

  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (message.partial) await message.fetch().catch(e => console.log(String(e).grey.italic.dim));

    //////////////////////////////////////////
    //////////////////////////////////////////
    /////////////FEEDBACK SYSTEM//////////////
    //////////////////////////////////////////
    //////////////////////////////////////////
    client.settings.ensure(message.guild.id, {
        suggest: {
          channel: "",
          approvemsg: `<a:yes:833101995723194437> Accepted Idea! Expect this soon.`,
          denymsg: `<:no:833101993668771842> Thank you for the feedback, but we are not interested in this idea at this time.`,
          maybemsg: `💡 We are thinking about this idea!`,
          duplicatemsg: `💢 This is a duplicated Suggestion`,
          soonmsg: `👌 Expect this Feature Soon!`,
          statustext: `<a:Loading:833101350623117342> Waiting for Community Feedback, please vote!`,
          footertext: `Want to suggest / Feedback something? Simply type in this channel!`,
          approveemoji: `833101995723194437`,
          denyemoji: `833101993668771842`,
        }
    });
    let settings = client.settings.get(message.guild.id, "suggest");
    var approveemoji = settings.approveemoji;
    var denyemoji = settings.denyemoji;
    var footertext = settings.footertext;
    var statustext = settings.statustext
    var feedbackchannel = settings.channel;
    let upvotebutton = new MessageButton().setStyle('PRIMARY') .setEmoji(approveemoji) .setCustomId("Suggest_upvote")
    let downvotebutton = new MessageButton().setStyle('PRIMARY') .setEmoji(denyemoji) .setCustomId("Suggest_downvote")
    let allbuttons = [new MessageActionRow().addComponents(upvotebutton, downvotebutton)];
    let supvotebutton = new MessageButton().setStyle('PRIMARY') .setEmoji("✅") .setCustomId("Suggest_upvote")
    let sdownvotebutton = new MessageButton().setStyle('PRIMARY') .setEmoji("❌") .setCustomId("Suggest_downvote")
    let allbuttonsSave = [new MessageActionRow().addComponents(supvotebutton, sdownvotebutton)];
    if(!feedbackchannel) return;
    if (message.channel.id === feedbackchannel) {
      
      try{
        message.delete({ timeout: 500 }).catch(e=>{console.log(String(e).grey.italic.dim)});
      }catch(e){
        console.log(String(e).grey.italic.dim)
      }
      client.settings.ensure(message.guild.id, {
        embed: {
          color: ee.color
        }
      });
      var es = client.settings.get(message.guild.id, `embed`)
      var url = ``;
      var imagename = `Unknown`;
      var embed = new MessageEmbed()
        .setThumbnail(message.member.user.displayAvatarURL({ dynamic: true }))
        .addField(`:thumbsup: **__Up Votes__**`, `**\`\`\`0 Votes\`\`\`**`, true)
        .addField(`:thumbsdown: **__Down Votes__**`, `**\`\`\`0 Votes\`\`\`**`, true)
        .setColor(es.color)
        .setAuthor(message.author.tag + "' Suggestion", message.member.user.displayAvatarURL({ dynamic: true }), `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
        .setDescription("\n" + message.content + "\n")
        .setFooter(footertext, message.guild.iconURL({dynamic: true}))
        //.addField(`Status`, `REASON`)
        if (message.content) {
            embed.setDescription(">>> " + message.content);
        }
        //add images if added (no videos possible)
        if (message.attachments.size > 0){
            if (message.attachments.every(attachIsImage)) {
                const attachment = new MessageAttachment(url, imagename)
                embed.attachFiles(attachment)
                embed.setImage(`attachment://${imagename}`)
            }
        }
        //if no content and no image, return and dont continue
        if (!message.content && message.attachments.size <= 0) return;

        function attachIsImage(msgAttach) {
            url = msgAttach.url;
            imagename = msgAttach.name || `Unknown`;
            return url.indexOf(`png`, url.length - 3 ) !== -1 ||
                url.indexOf(`jpeg`, url.length - 4 ) !== -1 ||
                url.indexOf(`gif`, url.length - 3) !== -1 ||
                url.indexOf(`jpg`, url.length - 3) !== -1;
        }
        message.channel.send({
            embeds: [embed],
            components: allbuttons
        }).then(msg => {
            //ste suggestions Data
            client.settings.set(msg.id, {
                upvotes: 0,
                downvotes: 0,
                user: message.author.id,
                voted_ppl: []
            })
        }).catch((e)=>{
          console.log(String(e).grey.italic.dim)
            message.channel.send({
              embeds: [embed],
              components: allbuttonsSave
          }).then(msg => {
              //ste suggestions Data
              client.settings.set(msg.id, {
                  upvotes: 0,
                  downvotes: 0,
                  user: message.author.id,
                  voted_ppl: []
              })
          }).catch((e)=>{
            console.log(String(e).grey.italic.dim)
          })
        })
    }

    function attachIsImage(msgAttach) {
      url = msgAttach.url;
      imagename = msgAttach.name || `Unknown`;
      return url.indexOf(`png`, url.length - `png`.length /*or 3*/ ) !== -1 ||
        url.indexOf(`jpeg`, url.length - `jpeg`.length /*or 3*/ ) !== -1 ||
        url.indexOf(`gif`, url.length - `gif`.length /*or 3*/ ) !== -1 ||
        url.indexOf(`jpg`, url.length - `jpg`.length /*or 3*/ ) !== -1;
    }
  })
  //Event for the Mod Log & Suggestions System
  client.on("interactionCreate", async (button) => {
      if(!button.inGuild() || !button.isButton()) return
      if(!button.message.guild || !button.message.channel) return;
      if (button.message.author.id != client.user.id) return;
      let guild = button.message.guild;
      let channel = button.message.channel;
      if (button.customId.startsWith("Suggest_")) {
          if(client.settings.get(guild.id, "suggest.channel") !== channel.id) return;
          let SuggestionsData = client.settings.get(button.message.id)
          if(button.customId == "Suggest_upvote") {
              if(SuggestionsData.voted_ppl.includes(button.clicker.id)){
                  return button.reply(`You can't vote the Suggestion of <@${SuggestionsData.user}>, because you've already voted it!`, true)
              }
              client.settings.math(button.message.id, "+", 1, "upvotes")
              client.settings.push(button.message.id, button.clicker.id, "voted_ppl")
          }
          if(button.customId == "Suggest_downvote") {
              if(SuggestionsData.voted_ppl.includes(button.clicker.id)){
                  return button.reply(`You can't vote the Suggestion of <@${SuggestionsData.user}>, because you've already voted it!`, true)
              }
              client.settings.math(button.message.id, "+", 1, "downvotes")
              client.settings.push(button.message.id, button.clicker.id, "voted_ppl")
          }
          SuggestionsData = client.settings.get(button.message.id);
          let embed = button.message.embeds[0];
          embed.fields[0].key = `:thumbsup: **__Up Votes__**`;
          embed.fields[0].value = `**\`\`\`${SuggestionsData.upvotes} Votes\`\`\`**`;
          embed.fields[1].key = `:thumbsdown: **__Down Votes__**`;
          embed.fields[1].value = `**\`\`\`${SuggestionsData.downvotes} Votes\`\`\`**`;
          let upvotebutton = new MessageButton().setStyle("grey") .setEmoji(client.settings.get(guild.id, "approveemoji")).setCustomId("Suggest_upvote").setLabel(SuggestionsData.upvotes)
          let downvotebutton = new MessageButton().setStyle("grey") .setEmoji(client.settings.get(guild.id, "denyemoji")) .setCustomId("Suggest_downvote").setLabel(SuggestionsData.downvotes)
          let supvotebutton = new MessageButton().setStyle("grey") .setEmoji("✅").setCustomId("Suggest_upvote").setLabel(SuggestionsData.upvotes)
          let sdownvotebutton = new MessageButton().setStyle("grey") .setEmoji("❌") .setCustomId("Suggest_downvote").setLabel(SuggestionsData.downvotes)
            button.message.edit({embed: embed, components: [new MessageActionRow().addComponents([upvotebutton, downvotebutton])]}).catch((e)=>{
              button.message.edit({embed: embed, components: [new MessageActionRow().addComponents([supvotebutton, sdownvotebutton])]}) .catch((e)=>{
                console.log(e)
              })
            })
          button.deferUpdate();
      }
  });
}
