
module.exports = function (client, options) {

    client.on("messageCreate", message => {
        if(!message.guild || message.author.bot) return;
        
        client.settings.ensure(message.guild.id, {
          counter: "no",
          counternum: 0,
          counterauthor: ""
        })
        if(message.channel.id == client.settings.get(message.guild.id, `counter`)){
        
        if(!client.settings.has(message.guild.id, "language")) client.settings.ensure(message.guild.id, { language: "en" });
        let ls = client.settings.get(message.guild.id, "language")
        let count = client.settings.get(message.guild.id, `counternum`);        
        if (!message.author.bot && message.author.id === count.author) {
          message.delete();
          message.reply(eval(client.la[ls]["handlers"]["counterjs"]["counter"]["variable1"])).then(m => m.delete({timeout: 3000}));
          return;
        }
        if (!message.author.bot && isNaN(message.content)) {
          message.delete();
          message.reply(eval(client.la[ls]["handlers"]["counterjs"]["counter"]["variable2"])).then(m => m.delete({timeout: 3000}));
          return;
        }
        if (!message.author.bot && parseInt(message.content) !== count.number + 1) {
          message.delete();
          message.reply(eval(client.la[ls]["handlers"]["counterjs"]["counter"]["variable3"])).then(m => m.delete({timeout: 3000}));
          return;
        }
        client.settings.inc(message.guild.id, `counternum`);
        client.settings.set(message.guild.id, message.author.id, `counterauthor`);
      }
  })
}
