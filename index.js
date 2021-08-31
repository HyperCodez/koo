
/**********************************************************
 * @INFO  [TABLE OF CONTENTS]
 * 1  Import_Modules
   * 1.1 Validating script for advertisement
 * 2  CREATE_THE_DISCORD_BOT_CLIENT
 * 3  Load_Discord_Buttons_and_Discord_Menus
 * 4  Create_the_client.memer
 * 5  create_the_languages_objects
 * 6  Raise_the_Max_Listeners
 * 7  Define_the_Client_Advertisments
 * 8  LOAD_the_BOT_Functions
 * 9  Login_to_the_Bot
 * 10 RESTART_BOT_FUNCTION
 * 
 *   BOT CODED BY: TOMato6966 | https://milrato.eu
 *********************************************************/



/**********************************************************
 * @param {1} Import_Modules for this FIle
 *********************************************************/
const Discord = require("discord.js");
const colors = require("colors");
const enmap = require("enmap"); 
const fs = require("fs"); 
//1.1 Validating script
if(!fs.existsSync("./botconfig/advertisement.json")){
  const data = {
    "adenabled": true,
    "statusad": { "name": "Bero-Host.de | Host Bots, Websites and Games 4 CHEAP", "type": "PLAYING", "url": "https://twitch.tv/#" },
    "spacedot": "・",
    "textad": "> ***[Milrato Development](https://discord.gg/sngXqWK2eP) partnered with:***\n> [**Bero-Host.de**](https://bero.milrato.eu)"
  }
  fs.writeFileSync("./botconfig/advertisement.json", JSON.stringify(data), err => {
    if(err){
      console.log(err)
      return;
    }
  })
}
const emojis = require("./botconfig/emojis.json")
const config = require("./botconfig/config.json")
const advertisement = require("./botconfig/advertisement.json")
const { delay } = require("./handlers/functions")


/**********************************************************
 * @param {2} CREATE_THE_DISCORD_BOT_CLIENT with some default settings
 *********************************************************/
const client = new Discord.Client({
  //fetchAllMembers: false,
  //restTimeOffset: 0,
  //restWsBridgetimeout: 100,
  shards: "auto",
  allowedMentions: {
    parse: ["roles", "users"],
    repliedUser: false,
  },
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  intents: [ Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_BANS,
    Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
    //Discord.Intents.FLAGS.GUILD_WEBHOOKS,
    Discord.Intents.FLAGS.GUILD_INVITES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    Discord.Intents.FLAGS.GUILD_PRESENCES,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    //Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
    //Discord.Intents.FLAGS.DIRECT_MESSAGES,
    //Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    //Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
  ],
  presence: {
    activity: {
      name: `${config.status.text}`.replace("{prefix}", config.prefix), 
      type: config.status.type, 
      url: config.status.url
    },
    status: "online"
  }
});



/**********************************************************
 * @param {4} Create_the_client.memer property from Tomato's Api 
 *********************************************************/
const Meme = require("memer-api");
client.memer = new Meme("PASTEYOURTOKEN"); //GET a TOKEN HERE: https://discord.gg/Mc2FudJkgP



/**********************************************************
 * @param {5} create_the_languages_objects to select via CODE
 *********************************************************/
client.la = { }
var langs = fs.readdirSync("./languages")
for(const lang of langs.filter(file => file.endsWith(".json"))){
  client.la[`${lang.split(".json").join("")}`] = require(`./languages/${lang}`)
}
Object.freeze(client.la)
//function "handlemsg(txt, options? = {})" is in /handlers/functions 



/**********************************************************
 * @param {6} Raise_the_Max_Listeners to 100 (default 10)
 *********************************************************/
client.setMaxListeners(100);
require('events').defaultMaxListeners = 100;



/**********************************************************
 * @param {7} Define_the_Client_Advertisments from the Config File
 *********************************************************/
client.ad = {
  enabled: advertisement.adenabled,
  statusad: advertisement.statusad,
  spacedot: advertisement.spacedot,
  textad: advertisement.textad
}



/**********************************************************
 * @param {8} LOAD_the_BOT_Functions 
 *********************************************************/
//those are must haves, they load the dbs, events and commands and important other stuff
function requirehandlers(){
  client.basicshandlers = Array(
    "extraevents", "loaddb", "clientvariables", "command", "events", "erelahandler", "slashCommands"
  );
  client.basicshandlers.forEach(handler => {
    try{ require(`./handlers/${handler}`)(client); }catch (e){ console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim) }
  });
}requirehandlers();
module.exports.requirehandlers = requirehandlers;

//they are loading just the social loggers
function requiresociallogs(){
  client.socialhandlers = Array(
    "twitterfeed", /*"twitterfeed2",*/ "livelog", "youtube", "tiktok"
  );
  client.socialhandlers.forEach(handler=>{
    try{ require(`./social_log/${handler}`)(client); }catch (e){ console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim) }
  })
}requiresociallogs();
module.exports.requiresociallogs = requiresociallogs;

//they are loading all other functions
function requireallhandlers(){
  client.allhandlers = Array(
    "anti_nuke",
    "apply", "apply2", "apply3", "apply4", "apply5",
    "ticket", "ticket2", "ticket3", "ticket4", "ticket5", "ticketevent",
    "roster", "roster2", "roster3",
    "welcome", "leave",
    "jointocreate", "logger", "reactionrole", "ranking",
    "antidiscord", "antilinks","anticaps", "blacklist", "keyword",
    "membercount", "autoembed", "suggest", "validcode", "dailyfact", "autonsfw",
    "aichat", "mute", "automeme", "counter"
  )
  client.allhandlers.forEach(handler => {
    try{ require(`./handlers/${handler}`)(client); }catch (e){ console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim) }
  });
}requireallhandlers();
module.exports.requireallhandlers = requireallhandlers;



/**********************************************************
 * @param {9} Login_to_the_Bot
 *********************************************************/
setTimeout(()=>{
  client.login(config.token);
}, 2500)


/**********************************************************
 * @param {10} RESTART_BOT_FUNCTION
 *********************************************************/
async function restartbot(){
  //clear the commands collection
  await client.commands.clear();
  //Delete all files from the cache
  await fs.readdirSync("./commands/").forEach((dir) => {
    const commands = fs.readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js"));
    for (let file of commands) {
      try{
        console.log(`SUCCESS :: ./commands/${dir}/${file}.js`)
        delete require.cache[require.resolve(`./commands/${dir}/${file}.js`)]
      }catch{ 
      }  
    }
  })
  //WAIT 1 SEC
  await delay(1000);
  //clear all events
  await client.removeAllListeners()
  //wait 1 Sec
  await delay(1000);
  //REMOVE ALL BASICS HANDLERS
  await client.basicshandlers.forEach(handler => {
    try{ delete require.cache[require.resolve(`./handlers/${handler}`)]; console.log(`SUCCESS :: ./handlers/${handler}`); }catch (e){ console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim) }
  });
  //REMOVE ALL SOCIAL HANDLERS
  await client.socialhandlers.forEach(handler=>{
    try{ delete require.cache[require.resolve(`./social_log/${handler}`)]; console.log(`SUCCESS :: ./social_log/${handler}`); }catch (e){ console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim) }
  })
  //REMOVE ALL OTHER HANDLERS
  await client.allhandlers.forEach(handler => {
    try{ delete require.cache[require.resolve(`./handlers/${handler}`)]; console.log(`SUCCESS :: ./handlers/${handler}`); }catch (e){ console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim) }
  });
  client.Joblivelog.stop()
  client.Joblivelog2.stop()
  client.Jobyoutube.stop()
  client.Jobtwitterfeed.stop()
  client.Jobtiktok.stop()
  client.Jobautonsfw.stop()
  client.Jobroster.stop()
  client.Jobroster2.stop()
  client.Jobroster3.stop()
  client.Jobmembercount.stop()
  client.JobJointocreate.stop()
  client.JobJointocreate2.stop()
  client.Jobdailyfact.stop()
  client.Jobmute.stop()
  //wait 1 Sec
  await delay(1000);
  //Load the basics, (commands, dbs, events, etc.)
  requirehandlers();
  //LOAD THE SOCIAL LOGS
  requiresociallogs();
  //LOAD ALL OTHER HANDLERS
  requireallhandlers();
  client.login(config.token);
  return true;
}
module.exports.restartbot = restartbot


/**********************************************************
 * @INFO
 * Bot Coded by Tomato#6966 | https://discord.gg/sngXqWK2eP
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention him / Milrato Development, when using this Code!
 * @INFO
 *********************************************************/