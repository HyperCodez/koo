const config = require("../botconfig/config.json")
const canvacord = require("canvacord");
const Discord = require("discord.js");
const Canvas = require("canvas");
const { GetUser } = require("./functions")
const { parse } = require( "twemoji-parser" )
//Canvas.registerFont( "./assets/fonts/DMSans-Bold.ttf" , { family: "DM Sans", weight: "bold" } );
//Canvas.registerFont( "./assets/fonts/DMSans-Regular.ttf" , { family: "DM Sans", weight: "regular" } );
//Canvas.registerFont( "./assets/fonts/STIXGeneral.ttf" , { family: "STIXGeneral" } );
//Canvas.registerFont( "./assets/fonts/AppleSymbol.ttf" , { family: "AppleSymbol" } );
//Canvas.registerFont( "./assets/fonts/Arial.ttf"       , { family: "Arial" } );
//Canvas.registerFont( "./assets/fonts/ArialUnicode.ttf", { family: "ArielUnicode" } );
//Canvas.registerFont('./assets/fonts/Genta.ttf', { family: 'Genta' } );
//Canvas.registerFont("./assets/fonts/UbuntuMono.ttf", { family: "UbuntuMono" } );
const Fonts = "'DM Sans', STIXGeneral, AppleSymbol, Arial, ArialUnicode";
module.exports = function (client) {
    //log that the module is loaded
    client.on("messageCreate", async (message) => {
     try{

        if (message.author.bot || !message.guild) return;
        
        if(!client.settings.has(message.guild.id, "language")) client.settings.ensure(message.guild.id, { language: "en" });
        let ls = client.settings.get(message.guild.id, "language");

        client.setups.ensure(message.guild.id,  {
            ranking: {
                enabled: true,
                backgroundimage: "null",
            }
        });
        client.settings.ensure(message.guild.id, {
            embed: {
            "color": ee.color,
            "thumb": true,
            "wrongcolor": ee.wrongcolor,
            "footertext": client.guilds.cache.get(message.guild.id) ? client.guilds.cache.get(message.guild.id).name : ee.footertext,
            "footericon": client.guilds.cache.get(message.guild.id) ? client.guilds.cache.get(message.guild.id).iconURL({
              dynamic: true
            }) : ee.footericon,
          }
        })
        let guildsettings = client.settings.get(message.guild.id);
        const prefix = guildsettings.prefix
        const embedcolor = guildsettings.embed.color || "#fffff9";
        
        let ranking = client.setups.get(message.guild.id, "ranking");

        if(!ranking.enabled) return;
        const key = `${message.guild.id}-${message.author.id}`;

        function databasing(rankuser) {
            //if(rankuser && rankuser.bot) return console.log("GOTTA IGNORE BOT")
            client.points.ensure(rankuser ? `${message.guild.id}-${rankuser.id}` : `${message.guild.id}-${message.author.id}`, {
                user: rankuser ? rankuser.id : message.author.id,
                usertag: rankuser ? rankuser.tag : message.author.tag,
                xpcounter: 1,
                guild: message.guild.id,
                points: 0,
                neededpoints: 400,
                level: 1,
                oldmessage: "",
            });
            client.points.set(rankuser ? `${message.guild.id}-${rankuser.id}` : `${message.guild.id}-${message.author.id}`, rankuser ? rankuser.tag : message.author.tag, `usertag`); //set the usertag with EVERY message, if he has nitro his tag might change ;)
            client.points.ensure(message.guild.id, {setglobalxpcounter: 1}); 
            client.points.ensure(message.guild.id, {
                channel: false,
                disabled: false
            })

            }
        databasing(message.author);

     
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        let command = args.shift()
        if(!command || command.length == 0) return
        command = command.toLowerCase();

       
        if (message.content.startsWith(prefix)) {
            switch (command) {
                case `rank`:
                    try{
                        await message.guild.members.fetch();
                        let user = await GetUser(message, args)
                        rank(user);
                    }catch (e){
                        message.reply(e)
                    }
                    break;
                    /////////////////////////////////
                case `leaderboard`:
                case `lb`:
                case `top`:
                    if(args[0]){
                        if(args[0].toLowerCase() === "all"){
                            leaderboard();
                        } else{
                            newleaderboard();
                        }
                    } else
                    newleaderboard();
                    break;
                    /////////////////////////////////
                case `setxpcounter`: 
                if (!message.member.permissions.has("ADMINISTRATOR") || !message.member.permissions.has("MANAGE_GUILD")) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable1"]))
                    setxpcounter();
                break; 
                    /////////////////////////////////
                case `setglobalxpcounter`: 
                if (!message.member.permissions.has("ADMINISTRATOR") || !message.member.permissions.has("MANAGE_GUILD")) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable2"]))
                    setglobalxpcounter();
                break; 
                    /////////////////////////////////
                case `addpoints`:
                    if (!message.member.permissions.has("ADMINISTRATOR") || !message.member.permissions.has("MANAGE_GUILD")) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable3"]))
                    addpoints();
                    break;
                    /////////////////////////////////
                case `setpoints`:
                    if (!message.member.permissions.has("ADMINISTRATOR") || !message.member.permissions.has("MANAGE_GUILD")) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable4"]))

                    setpoints();
                    break;
                    /////////////////////////////////
                case `removepoints`:
                    if (!message.member.permissions.has("ADMINISTRATOR") || !message.member.permissions.has("MANAGE_GUILD")) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable5"]))

                    removepoints();
                    break;
                    /////////////////////////////////
                case `addlevel`:
                    if (!message.member.permissions.has("ADMINISTRATOR") || !message.member.permissions.has("MANAGE_GUILD")) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable6"]))

                    addlevel();
                    break;
                    /////////////////////////////////
                case `setlevel`:
                    if (!message.member.permissions.has("ADMINISTRATOR") || !message.member.permissions.has("MANAGE_GUILD")) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable7"]))

                    setlevel();
                    break;
                    /////////////////////////////////
                case `removelevel`:
                    if (!message.member.permissions.has("ADMINISTRATOR") || !message.member.permissions.has("MANAGE_GUILD")) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable8"]))

                    removelevel();
                    break;
                    /////////////////////////////////
                case `resetranking`:
                    if (!message.member.permissions.has("ADMINISTRATOR") || !message.member.permissions.has("MANAGE_GUILD")) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable9"]))

                    resetranking();
                    break;
                    /////////////////////////////////
                case `registerall`:
                    if (!message.member.permissions.has("ADMINISTRATOR") || !message.member.permissions.has("MANAGE_GUILD")) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable10"]))

                    registerall();
                    break;
                    /////////////////////////////////
                case `addrandomall`:
                    if (!message.member.permissions.has("ADMINISTRATOR") || !message.member.permissions.has("MANAGE_GUILD")) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable11"]))

                    addrandomall();
                    break;
                    /////////////////////////////////
                case `resetrankingall`:
                    if (!message.member.permissions.has("ADMINISTRATOR") || !message.member.permissions.has("MANAGE_GUILD")) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable12"]))

                    resetrankingall()
                    break;
                    /////////////////////////////////
                case `levelhelp`:
                case `rankinghelp`:
                case `levelinghelp`:
                case `rankhelp`:
                    levelinghelp();
                    break;
                    /////////////////////////////////
                default:
                    //message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable13"]))
                    break;
            }
            return;
        }


        function anti_double_messages() {
            const oldmessage = client.points.get(key, `oldmessage`);
            if (oldmessage.toLowerCase() === message.content.toLowerCase().replace(/\s+/g, '')) {
                return;
            }
            client.points.set(key, message.content.toLowerCase().replace(/\s+/g, ''), `oldmessage`); //setting the new old message
        }
        anti_double_messages();

        function Giving_Ranking_Points(thekey, maxnumber) {
            if(!thekey && message.author.bot) return;
            let setglobalxpcounter = client.points.get(message.guild.id, "setglobalxpcounter")
            if (!maxnumber) maxnumber = 5;
            var randomnum = ( Math.floor(Math.random() * Number(maxnumber)) + 1 ) * setglobalxpcounter;
            randomnum *= Number(client.points.get(key, `xpcounter`));
            randomnum = Number(Math.floor(randomnum));

            const curPoints = client.points.get(thekey ? thekey : key, `points`);
            const neededPoints = client.points.get(thekey ? thekey : key, `neededpoints`);
            let leftpoints = neededPoints - curPoints;

            let toaddpoints = randomnum;
            addingpoints(toaddpoints, leftpoints);

            function addingpoints(toaddpoints, leftpoints) {
                if (toaddpoints >= leftpoints) {
                    client.points.set(thekey ? thekey : key, 0, `points`); //set points to 0
                    client.points.inc(thekey ? thekey : key, `level`); //add 1 to level
                    //HARDING UP!
                    const newLevel = client.points.get(thekey ? thekey : key, `level`); //get current NEW level
                    if (newLevel % 4 === 0) client.points.math(thekey ? thekey : key, `+`, 100, `neededpoints`)

                    const newneededPoints = client.points.get(thekey ? thekey : key, `neededpoints`); //get NEW needed Points
                    const newPoints = client.points.get(thekey ? thekey : key, `points`); //get current NEW points

                    addingpoints(toaddpoints - leftpoints, newneededPoints); //Ofc there is still points left to add so... lets do it!
                    LEVELUP() 
                } else {
                    client.points.math(thekey ? thekey : key, `+`, Number(toaddpoints), `points`)
                }
            }
        }
        Giving_Ranking_Points();

                
        async function LEVELUP() {
            const newLevel = client.points.get(key, `level`); //get current NEW level
            const newPoints = client.points.get(key, `points`); //get current NEW points
            const newneededPoints = client.points.get(key, `neededpoints`);
            //send ping and embed message
            if(client.points.get(message.guild.id, "disabled")) return;

            const filtered = client.points.filter(p => p.guild === message.guild.id).array();
            const sorted = filtered.sort((a, b) => b.level - a.level || b.points - a.points);
            const top10 = sorted.splice(0, message.guild.memberCount);

            let i = 0;
            //count server rank sometimes an error comes
            for (const data of top10) {
                try {
                    i++;
                    if (data.user === message.author.id) break; //if its the right one then break it ;)
                } catch {
                    i = `X`;
                    break;
                }
            }

            const canvas = Canvas.createCanvas(1802, 430);
            
            const ctx = canvas.getContext('2d');
            ctx.font = '100px UbuntuMono';
            ctx.fillStyle = "#2697FF";


            const bgimg = await Canvas.loadImage("./assets/levelup.png");
            ctx.drawImage(bgimg, 0, 0, canvas.width, canvas.height);


            //USERNAME
            var text = `${message.author.username}`.trim();
            if (text.length > 15) text = text.substr(0, 11) + ".."
            text += ` leveled up!`
            await canvacord.Util.renderEmoji(ctx, text, 475, 150);
            ctx.font = '80px UbuntuMono';
            await canvacord.Util.renderEmoji(ctx, `New Level: ${newLevel}`, 475, 290);
            await canvacord.Util.renderEmoji(ctx, ` New Rank: #${i}`, 475, 380);
            

            //AVATAR
            ctx.beginPath();
            ctx.arc(345/2 + 83.5, 345/2 + 36, 345/2, 0, Math.PI * 2, true); 
            ctx.closePath();
            ctx.clip();
            const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ dynamic: false, format: 'png', size: 4096 }));
            ctx.drawImage(avatar, 83.5, 36, 345, 345);

            //get it as a discord attachment
            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'ranking-image.png');

            if(!client.points.get(message.guild.id, "channel")) return message.channel.send(message.author, attachment);
            try{
                let channel = message.guild.channels.cache.get(client.points.get(message.guild.id, "channel"))
                channel.send(message.author, attachment);

            }catch (e){ console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
                message.channel.send(message.author, attachment);
            }
        }

        async function rank(the_rankuser) {
            /**
             * GET the Rank User
             * @info you can tag him
             */
            try {
                let rankuser = the_rankuser || message.author;
                if (!rankuser) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable14"]));

                let tempmessage = await message.channel.send(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable15"]))
                // if(rankuser.bot) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable16"]));
                //Call the databasing function!
                const key = `${message.guild.id}-${rankuser.id}`;
                databasing(rankuser);
                //do some databasing
                const filtered = client.points.filter(p => p.guild === message.guild.id).array();
                const sorted = filtered.sort((a, b) => b.level - a.level || b.points - a.points);
                const top10 = sorted.splice(0, message.guild.memberCount);
                let i = 0;
                //count server rank sometimes an error comes
                for (const data of top10) {
                    try {
                        i++;
                        if (data.user === rankuser.id) break; //if its the right one then break it ;)
                    } catch {
                        i = `X`;
                        break;
                    }
                }
                let j = 0;
                //count server rank sometimes an error comes
                   
                let curpoints = Number(client.points.get(key, `points`).toFixed(2));
                let curnextlevel = Number(client.points.get(key, `neededpoints`).toFixed(2));
                if (client.points.get(key, `level`) === undefined) i = `No Rank`;

               
                var xp_data = {
                    avatar: rankuser.displayAvatarURL({ dynamic: false, format: 'png', size: 4096 }),
                    text: {
                        cur_level: Number(client.points.get(key, `level`)),
                        rank: Number(i),
                        current: Number(curpoints.toFixed(2)),
                        needed: Number(curnextlevel.toFixed(2)),
                        percent: Number(curpoints.toFixed(2)) / Number(curnextlevel.toFixed(2)) * 100,
                    },
                }


                const canvas = Canvas.createCanvas(1500, 500);
                const ctx = canvas.getContext('2d');
                ctx.roundRect = function ( x, y, width, height, radius, fill, stroke ) {
                    //just make the rectangle rounded with a bit px
                    let cornerRadius = { upperLeft: 0, upperRight: 0, lowerLeft: 0, lowerRight: 0 };
        
                    typeof stroke == "undefined" && ( stroke = true );
        
                    if ( typeof radius === "object" )
                        for ( let [ key ] of Object.entries( radius ) )
                            cornerRadius[key] = radius[key];
        
                    this.beginPath();
                    this.moveTo( x + cornerRadius.upperLeft, y );
                    this.lineTo( x + width - cornerRadius.upperRight, y );
                    this.quadraticCurveTo( x + width, y, x + width, y + cornerRadius.upperRight );
                    this.lineTo( x + width, y + height - cornerRadius.lowerRight );
                    this.quadraticCurveTo( x + width, y + height, x + width - cornerRadius.lowerRight, y + height );
                    this.lineTo( x + cornerRadius.lowerLeft, y + height );
                    this.quadraticCurveTo( x, y + height, x, y + height - cornerRadius.lowerLeft );
                    this.lineTo( x, y + cornerRadius.upperLeft );
                    this.quadraticCurveTo( x, y, x + cornerRadius.upperLeft, y );
                    this.closePath();
                    stroke  && this.stroke();
                    fill    && this.fill();
                };
                ctx.save();

                const bg = await Canvas.loadImage("./assets/base.png")
                ctx.drawImage(bg, 0, 0, canvas.width, canvas.height );
                if(rankuser.bot){
                    if(rankuser.flags && rankuser.flags.toArray().includes("VERIFIED_BOT")){
                        const bg = await Canvas.loadImage("https://cdn.discordapp.com/emojis/846290690534015018.png")
                        ctx.drawImage(bg, 480, 175, 225, 80 );
                    }else{
                        const bg = await Canvas.loadImage("https://cdn.discordapp.com/attachments/820695790170275871/869218298833829948/bot.png")
                        ctx.drawImage(bg, 480, 175, 150, 80 );
                    }
                }
                else{
                    if(rankuser.flags) {
                        let flags = rankuser.flags.toArray();
                        let member = message.guild.members.cache.get(rankuser);
                        if(member.premiumSinceTimestamp != 0) {
                            if(member.premiumSinceTimestamp){
                                flags.push("1_MONTH")
                            }else if(member.premiumSinceTimestamp < Date.now() - (2-1) * 2678400000){
                                flags.push("2_MONTH")
                            } else if(member.premiumSinceTimestamp < Date.now() - (3-1) * 2678400000){
                                flags.push("3_MONTH")
                            } else if(member.premiumSinceTimestamp < Date.now() - (6-1) * 2678400000){
                                flags.push("6_MONTH")
                            } else if(member.premiumSinceTimestamp < Date.now() - (9-1) * 2678400000){
                                flags.push("9_MONTH")
                            } else if(member.premiumSinceTimestamp < Date.now() - (12-1) * 2678400000){
                                flags.push("12_MONTH")
                            } else if(member.premiumSinceTimestamp < Date.now() - (15-1) * 2678400000){
                                flags.push("15_MONTH")
                            } else if(member.premiumSinceTimestamp < Date.now() - (18-1) * 2678400000){
                                flags.push("18_MONTH")
                            } else if(member.premiumSinceTimestamp < Date.now() - 24 * 2678400000){
                                flags.push("24_MONTH")
                            } 
                        }
                        if(rankuser.displayAvatarURL({dynamic:true}).endsWith('.gif')) flags.push("NITRO")
                        if(flags.includes("EARLY_VERIFIED_DEVELOPER")){
                            const index = flags.indexOf("EARLY_VERIFIED_DEVELOPER");
                            if(index > -1){
                                flags.splice(index, 1);
                            }
                        }
                        for(let i = 0; i< flags.length; i++){
                            if (flags[i] === "HOUSE_BALANCE") { 
                                const bg = await Canvas.loadImage("https://discord.com/assets/9fdc63ef8a3cc1617c7586286c34e4f1.svg")
                                ctx.drawImage(bg, 480 + 80 * i + (i > 0 ? 15 : 0), 175, 80, 80 ); 
                            } 
                            if (flags[i]  === "HOUSE_BRILLIANCE") { 
                                const bg = await Canvas.loadImage("https://discord.com/assets/48cf0556d93901c8cb16317be2436523.svg")
                                ctx.drawImage(bg, 480 + 80 * i + (i > 0 ? 15 : 0), 175, 80, 80 ); 
                                console.log("LOL")
                            } 
                            if (flags[i]  === "HOUSE_BRAVERY") { 
                                const bg = await Canvas.loadImage("https://discord.com/assets/64ae1208b6aefc0a0c3681e6be36f0ff.svg")
                                ctx.drawImage(bg, 480 + 80 * i + (i > 0 ? 15 : 0), 175, 80, 80 ); 
                            } 
                            if (flags[i]  === "VERIFIED_DEVELOPER") { 
                                const bg = await Canvas.loadImage("https://discord.com/assets/45cd06af582dcd3c6b79370b4e3630de.svg")
                                ctx.drawImage(bg, 480 + 80 * i, 175, 80, 80 ); 
                            } 
                            if (flags[i]  === "EARLY_SUPPORTER") { 
                                const bg = await Canvas.loadImage("https://discord.com/assets/23e59d799436a73c024819f84ea0b627.svg")
                                ctx.drawImage(bg, 480 + 80 * i + (i > 0 ? 15 : 0), 175, 80, 80 ); 
                            } 
                            if(flags[i]  === "NITRO"){
                                const bg = await Canvas.loadImage("https://cdn.discordapp.com/attachments/820695790170275871/869228654775918662/813372466759598110.png")
                                ctx.drawImage(bg, 480 + 80 * i + (i > 0 ? 15 : 0), 175, 100, 80 ); 
                            }
                            if(flags[i]  === "1_MONTH"){
                                const bg = await Canvas.loadImage("https://discordapp.com/assets/fbb6f1e160280f0e9aeb5d7c452eefe1.svg")
                                ctx.drawImage(bg, 480 + 80 * i + (i > 0 ? 15 : 0), 175, 80, 80 ); 
                            }
                            if(flags[i]  === "2_MONTH"){
                                const bg = await Canvas.loadImage("https://discordapp.com/assets/b4b741bef6c3de9b29e2e0653e294620.svg")
                                ctx.drawImage(bg, 480 + 80 * i + (i > 0 ? 15 : 0), 175, 80, 80 ); 
                            }
                            if(flags[i]  === "3_MONTH"){
                                const bg = await Canvas.loadImage("https://discordapp.com/assets/93f5a393e22796a850931483166d7cb9.svg")
                                ctx.drawImage(bg, 480 + 80 * i + (i > 0 ? 15 : 0), 175, 80, 80 ); 
                            }
                            if(flags[i]  === "6_MONTH"){
                                const bg = await Canvas.loadImage("https://discordapp.com/assets/4c380650960c2b1e1584115d5e9ad63b.svg")
                                ctx.drawImage(bg, 480 + 80 * i + (i > 0 ? 15 : 0), 175, 80, 80 ); 
                            }
                            if(flags[i]  === "9_MONTH"){
                                const bg = await Canvas.loadImage("https://discordapp.com/assets/438dd7ecbffcf21b6cbf2773ade51a04.svg")
                                ctx.drawImage(bg, 480 + 80 * i + (i > 0 ? 15 : 0), 175, 80, 80 ); 
                            }
                            if(flags[i]  === "12_MONTH"){
                                const bg = await Canvas.loadImage("https://discordapp.com/assets/7a5f78de816fcecbbd1d5d6e635cc7dd.svg")
                                ctx.drawImage(bg, 480 + 80 * i + (i > 0 ? 15 : 0), 175, 80, 80 ); 
                            }
                            if(flags[i]  === "15_MONTH"){
                                const bg = await Canvas.loadImage("https://discordapp.com/assets/5a24b20b84fb3eafc138916729386e76.svg")
                                ctx.drawImage(bg, 480 + 80 * i + (i > 0 ? 15 : 0), 175, 80, 80 ); 
                            }
                            if(flags[i]  === "18_MONTH"){
                                const bg = await Canvas.loadImage("https://discordapp.com/assets/f31d590e1f3629cd0b614330f4a8ee2a.svg")
                                ctx.drawImage(bg, 480 + 80 * i + (i > 0 ? 15 : 0), 175, 80, 80 ); 
                            }
                            if(flags[i]  === "24_MONTH"){
                                const bg = await Canvas.loadImage("https://discordapp.com/assets/9ba64f1fa91ccde0eba506c1c33f3d1a.svg")
                                ctx.drawImage(bg, 480 + 80 * i + (i > 0 ? 15 : 0), 175, 80, 80 ); 
                            } 
                        }
                   } 
                }
                ctx.restore();
                ctx.save();
                ctx.beginPath();
                ctx.arc(126 + 158.5, 92 + 158.5, 158.5, 0, Math.PI * 2, true); 
                ctx.closePath();
                ctx.clip();
                const avatar = await Canvas.loadImage(xp_data.avatar);
                ctx.drawImage(avatar, 126, 92, 317, 317);

                ctx.restore();


                let currWidth = 0;

                ctx.font = `bold 57px ${Fonts}`;
                ctx.fillStyle = "#ffffff"


                let fontsize = 57;
                const name = rankuser.username;

                while(ctx.measureText(name).width > 550){
                    ctx.font = `bold ${ fontsize-- }px ${Fonts}`;
                }
                for (const character of name) {
                    const parseEmoji = parse(character);
                    if ( parseEmoji.length ) {
        
                        const img = await Canvas.loadImage( parseEmoji[0].url );
        
                        ctx.drawImage( img, 482 + currWidth, 149 - fontsize + 10, fontsize - 3, fontsize - 3 );
        
                        currWidth += fontsize;
        
                    } else {
                        ctx.fillText( character, 482 + currWidth, 149 );
                        currWidth += ctx.measureText( character ).width;
                    };
                }
                const disriminator =  "#"+ rankuser.discriminator
                ctx.font = `bold 35px ${Fonts}`;
                ctx.fillStyle = "#666A73"
                ctx.fillText( disriminator, 482 + currWidth, 149 );


                ctx.fillStyle = "#008BFF";
                ctx.font = `bold 57px ${Fonts}`;
                let ranklength = ctx.measureText( xp_data.text.rank ).width;
                ctx.fillText( xp_data.text.rank, 1369 - ranklength , 92 + 57 );

                ctx.fillStyle = "#ffffff";
                ctx.font = `bold 38px ${Fonts}`;

                ctx.globalAlpha = 0.2;
                ctx.fillText( "Rank:" , 1345 - ranklength - ctx.measureText("Rank").width , 92 + 57 );
                ctx.globalAlpha = 1;

                ctx.font = `regular 31px ${Fonts}`;
                // —— Creation of the experience progress bar
                const grd = ctx.createLinearGradient( 482, 349, 907, 59 );
                grd.addColorStop( 0, "#4e5ff4" );
                grd.addColorStop( 1, "#2345e5" );
                ctx.lineWidth = 4;
                ctx.fillStyle = grd;
                ctx.strokeStyle = grd;

                ctx.beginPath();
                ctx.roundRect( 480, 347, 910, 63, { upperLeft: 32.5, upperRight: 32.5, lowerLeft: 32.5, lowerRight: 32.5 }, false, false );
                ctx.closePath();
                ctx.clip();

                ctx.roundRect( 482, 349, 907, 59, { upperLeft: 32.5, upperRight: 32.5, lowerLeft: 32.5, lowerRight: 32.5 }, false, true );
                ctx.roundRect( 482, 349, 907 * ( xp_data.text.percent / 100 ) , 59, { upperLeft: 32.5, upperRight: 32.5, lowerLeft: 32.5, lowerRight: 32.5 }, true, false );

                ctx.font = `regular 38px ${Fonts}`;
                ctx.fillStyle = "#ffffff";
                ctx.fillText( `Lvl. ${ xp_data.text.cur_level }`, 505, 355 + 36 );

                ctx.font = `regular 31px ${Fonts}`;

                const progression = ` ${xp_data.text.current} / ${xp_data.text.needed}`;

                ctx.fillText( progression, 1369 - ctx.measureText( progression ).width, 356 + 33 );

                tempmessage.delete().catch(e=>console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim));

                return message.channel.send( new Discord.MessageAttachment( canvas.toBuffer(), "card.png" ) );;
                async function oldrankcard(){//OLD RANK CARD

                const canvas = Canvas.createCanvas(1772, 900);
                
                const ctx = canvas.getContext('2d');
                ctx.font = '150px UbuntuMono';
                ctx.fillStyle = "#2697FF";


                const bgimg = await Canvas.loadImage("./assets/rankcard.png");
                ctx.drawImage(bgimg, 0, 0, canvas.width, canvas.height);


                //USERNAME
                var text = `${rankuser.username}`.trim();
                if (text.length > 15) text = text.substr(0, 11) + ".."
                await canvacord.Util.renderEmoji(ctx, text, 645, 300);

                //Discrimnator
                var text = `#${rankuser.discriminator}`.trim();
                await canvacord.Util.renderEmoji(ctx, text, 645, 475);

                ctx.font = '100px UbuntuMono';
                ctx.fillStyle = "#6caae7"
                    
                //CHAT TEXT: 
                var text4 = `Level ${xp_data.text.cur_level}`.trim();
                await canvacord.Util.renderEmoji(ctx, text4, 255, 715);
                var text5 = `Rank #${xp_data.text.rank}`.trim();
                await canvacord.Util.renderEmoji(ctx, text5, 1230, 715);


                ctx.font = '50px UbuntuMono';
                ctx.fillStyle = "#9b9b9b"
                ctx.textAlign = "right"
              
                //CHAT TEXT: 
                var text7 = `${shortenLargeNumber(String(xp_data.text.current), 3)}/${shortenLargeNumber(String(xp_data.text.needed), 2)}`
                await canvacord.Util.renderEmoji(ctx, text7, 1625, 840);


                
                ctx.fillStyle = "#2186e7"



                //progressbar TEXT
                var diagonal = 0;
                if(xp_data.text.percent > 0) diagonal += 1;
                if(xp_data.text.percent > 1) diagonal += 1;
                if(xp_data.text.percent > 2) diagonal += 1;
                if(xp_data.text.percent > 3) diagonal += 1;
                if(xp_data.text.percent > 4) diagonal += 1;
                if(xp_data.text.percent > 5) diagonal += 1;
                if(xp_data.text.percent > 6) diagonal += 1;
                if(xp_data.text.percent > 7) diagonal += 1;
                if(xp_data.text.percent > 8) diagonal += 1;
                if(xp_data.text.percent > 9) diagonal += 1;
                if(xp_data.text.percent > 10) diagonal += 1;
                if(xp_data.text.percent > 11) diagonal += 1;
                if(xp_data.text.percent > 12) diagonal += 1;
                if(xp_data.text.percent > 13) diagonal += 1;
                if(xp_data.text.percent > 14) diagonal += 1;
                if(xp_data.text.percent > 15) diagonal += 1;

                if(xp_data.text.percent > 84) diagonal -= 1;
                if(xp_data.text.percent > 85) diagonal -= 1;
                if(xp_data.text.percent > 86) diagonal -= 1;
                if(xp_data.text.percent > 87) diagonal -= 1;
                if(xp_data.text.percent > 88) diagonal -= 1;
                if(xp_data.text.percent > 89) diagonal -= 1;
                if(xp_data.text.percent > 90) diagonal -= 1;
                if(xp_data.text.percent > 91) diagonal -= 1;
                if(xp_data.text.percent > 92) diagonal -= 1;
                if(xp_data.text.percent > 93) diagonal -= 1;
                if(xp_data.text.percent > 94) diagonal -= 1;
                if(xp_data.text.percent > 95) diagonal -= 1;
                if(xp_data.text.percent > 96) diagonal -= 1;
                if(xp_data.text.percent > 97) diagonal -= 1;
                if(xp_data.text.percent > 98) diagonal -= 1;
                if(xp_data.text.percent > 99) diagonal -= 1;
                var bar_text_length = 1465;
                var bar_text_height = 40;
                ctx.save()
                ctx.beginPath();
                ctx.moveTo(163.5, 757 );
                ctx.lineTo(163.5 + bar_text_length * xp_data.text.percent / 100, 757);
                ctx.lineTo(163.5 + bar_text_length * xp_data.text.percent / 100 - diagonal, 757 + bar_text_height);
                ctx.lineTo(163.5, 757 + bar_text_height);
                ctx.closePath();
                ctx.fill();
                ctx.restore();


                //AVATAR
                ctx.beginPath();
                ctx.arc(470/2 + 130, 470/2 + 92, 470/2, 0, Math.PI * 2, true); 
                ctx.closePath();
                ctx.clip();
                const avatar = await Canvas.loadImage(xp_data.avatar);
                ctx.drawImage(avatar, 130, 92, 470, 470);

                //get it as a discord attachment
                const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'ranking-image.png');
                tempmessage.delete().catch(e=>console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim))
                message.channel.send( `Rank of: **${rankuser.tag}**`, attachment).catch(e=>console.log("ranking: " + e));
                return;
                }
            } catch (error) {
                console.log("RANKING:".underline.red + " :: " + error.stack.toString().grey.italic.dim)
                message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable17"]));
            }
        }

        function leaderboardembed() {
            const filtered = client.points.filter(p => p.guild === message.guild.id).array();
            let orilent;
            const sorted = filtered.sort((a, b) => b.level - a.level || b.points - a.points);
            let embeds = [];
            let j = 0;
            let maxnum = sorted.length;
            orilent = sorted.length;
            if(isNaN(maxnum)) {
                console.log("maximum_leaderboard NOT A NUMBER")
                maxnum = 50;}
            if (maxnum > sorted.length) 
                maxnum = sorted.length + (25 - Number(String(sorted.length/25).slice(2)));
            if(maxnum < 25) maxnum = 25;

            //do some databasing
            var userrank = 0;
            const filtered1 = client.points.filter(p => p.guild === message.guild.id).array();
            const sorted1 = filtered1.sort((a, b) => b.level - a.level || b.points - a.points);
            const top101 = sorted1.splice(0, message.guild.memberCount);
            for (const data of top101) {
                try {
                    userrank++;
                    if (data.user === message.author.id) break; //if its the right one then break it ;)
                } catch {
                    userrank = `X`;
                    break;
                }
            }


            for (let i = 25; i <= maxnum; i += 25) {
                const top = sorted.splice(0, 25);
                const embed = new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable18"]))
                    .setTimestamp()
                    .setColor(embedcolor);
                var string = "";
                for (const data of top) {
                    j++;
                    try {
                        if(j == 1) 
                        string += `:first_place: **${data.usertag}**: \`Level: ${data.level} | Points: ${shortenLargeNumber(data.points, 2)}\`\n`;
                        else if(j == 2)
                        string += `:second_place: **${data.usertag}**: \`Level: ${data.level} | Points: ${shortenLargeNumber(data.points, 2)}\`\n`;
                        else if(j == 3)
                        string += `:third_place: **${data.usertag}**: \`Level: ${data.level} | Points: ${shortenLargeNumber(data.points, 2)}\`\n`;
                        else
                        string += `\`${j}\`. **${data.usertag}**: \`Level: ${data.level} | Points: ${shortenLargeNumber(data.points, 2)}\`\n`;

                    } catch {

                    }
                }
                embed.setDescription(string.substr(0, 2048))
                embed.setFooter(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable19"]))
                embeds.push(embed);
            }
            return embeds;
        }
        async function leaderboard() {
            let currentPage = 0;
            const embeds = leaderboardembed();
            if(embeds.length == 1){
                return message.channel.send(embeds[0]).catch(e=>console.log("ranking: " + e))
            }
            const lbembed = await message.channel.send(
                `**Current Page - ${currentPage + 1}/${embeds.length}**`,
                embeds[currentPage]
            ).catch(e=>console.log("ranking: " + e));

            try {
                await lbembed.react("⏪");
                await lbembed.react("⏹");
                await lbembed.react("⏩");
            } catch (error) {
                console.error(error);
            }

            const filter = (reaction, user) => ["⏪", "⏹", "⏩"].includes(reaction.emoji.name) && message.author.id === user.id;
            const collector = lbembed.createReactionCollector(filter, {
                time: 60000
            });

            collector.on("collect", async (reaction, user) => {
                try {
                    if (reaction.emoji.name === "⏩") {
                        if (currentPage < embeds.length - 1) {
                            currentPage++;
                            lbembed.edit({content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embed: embeds[currentPage]});
                        } else {
                            currentPage = 0;
                            lbembed.edit({content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embed: embeds[currentPage]});
                        }
                    } else if (reaction.emoji.name === "⏪") {
                        if (currentPage !== 0) {
                            --currentPage;
                            lbembed.edit({content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embed: embeds[currentPage]});
                        } else {
                            currentPage = embeds.length - 1;
                            lbembed.edit({content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embed: embeds[currentPage]});
                        }
                    } else {
                        collector.stop();
                        reaction.message.reactions.removeAll();
                    }
                    await reaction.users.remove(message.author.id);
                } catch (error) {
                    console.error(error);
                }
            });
        }

        async function newleaderboard() {
            let tempmessage = await message.channel.send(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable20"]))
            const filtered = client.points.filter(p => p.guild === message.guild.id).array();
            const sorted = filtered.sort((a, b) => b.level - a.level || b.points - a.points);
            let embeds = [];
            let j = 0;
            let maxnum = 10;

            //do some databasing
            var userrank = 0;
            const filtered1 = client.points.filter(p => p.guild === message.guild.id).array();
            const sorted1 = filtered1.sort((a, b) => b.level - a.level || b.points - a.points);
            const top101 = sorted1.splice(0, message.guild.memberCount);

            for (const data of top101) {
                try {
                    userrank++;
                    if (data.user === message.author.id) break; //if its the right one then break it ;)
                } catch {
                    userrank = `X`;
                    break;
                }
            }
            var array_usernames = [];
            var array_tag = [];
            var array_textlevel = [];
            var array_avatar = [];
            for (let i = 10; i <= maxnum; i += 10) {
                const top = sorted.splice(0, 10);
                for (const data of top) {
                    try {
                        var user = await client.users.fetch(data.user)
                        array_usernames.push(user.username)
                        array_tag.push(user.discriminator)
                        array_textlevel.push(data.level || 1)
                        array_avatar.push(user.displayAvatarURL({size: 512, format: "png"}))      
                    } catch (e){
                        console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim)
                        array_usernames.push("UNKNOWN")
                        array_textlevel.push("X")
                    }
                }
            }

        
            var canvas = Canvas.createCanvas(830, 1030);
            var oldcanvas = false;
            var ctx = canvas.getContext('2d');
            ctx.font = '75px UbuntuMono';
            ctx.fillStyle = "#2697FF";

            console.log(require("fs").existsSync("./assets/first_leaderboard.png"))
            var bgimg = await Canvas.loadImage("./assets/first_leaderboard.png");
            ctx.drawImage(bgimg, 0, 0, canvas.width, canvas.height);
            array_usernames = array_usernames.slice(0, 10);
            new Promise(async (res, rej)=>{
                for(let i = 0; i < array_usernames.length; i++){
                    try{
                        var canvas = Canvas.createCanvas(830, 1030);
                        var ctx = canvas.getContext('2d');
                        ctx.font = '75px UbuntuMono';
                        ctx.fillStyle = "#2697FF";
                        var bgimg = await Canvas.loadImage(oldcanvas == false ? "./assets/first_leaderboard.png": oldcanvas.toBuffer());
                        ctx.drawImage(bgimg, 0, 0, canvas.width, canvas.height);

                        //USERNAME
                        var text = `${array_usernames[i]}`.trim();
                        if (text.length > 10) text = text.substr(0, 8) + ".."
                        canvacord.Util.renderEmoji(ctx, text, 435, 85 + i * 100);
        
                        ctx.font = '40px UbuntuMono';
                        ctx.fillStyle = "#6caae7"
                        //CHAT TEXT: 
                        var text4 = `LVL ${array_textlevel[i]}`.trim();
                        canvacord.Util.renderEmoji(ctx, text4, 275, 100 + i * 100 - 22.5);
        
                        ctx.font = '15px UbuntuMono';
                        ctx.fillStyle = "#7F7F7F"
                        canvacord.Util.renderEmoji(ctx, "#"+array_tag[i], 440, 100 + i * 100);
                            //CHAT TEXT: 
                            //var text7 = `${shortenLargeNumber(String(xp_data.text.current), 3)}/${shortenLargeNumber(String(xp_data.text.needed), 2)}`
                            //canvacord.Util.renderEmoji(ctx, text7, 1625, 840);
                        //AVATAR
                        ctx.beginPath();
                        ctx.arc(80/2 + 30, 80/2 + 25 + i * 100, 80/2, 0, Math.PI * 2, true); 
                        ctx.closePath();
                        ctx.clip();
                        const avatar = await Canvas.loadImage(array_avatar[i]);
                        ctx.drawImage(avatar, 30, 25 + i * 100, 80, 80);
                        oldcanvas = canvas;
                        if(i == array_usernames.length - 1) res(true)
                    }catch{
                        if(i == array_usernames.length - 1) res(true)
                    }
                }
                await res(true)
            }).then(()=>{
                const attachment = new Discord.MessageAttachment(oldcanvas.toBuffer(), 'ranking-image.png');
                tempmessage.delete().catch(e=>console.log(e.stack ? String(e.stack).grey.italic.dim : String(e).grey.italic.dim))
                message.channel.send( `Top 10 Leaderboard of **${message.guild.name}**\nType: \`leaderboard all\` to see all Ranks\n*Rank is counted for the CHAT RANK*`, attachment).catch(e=>console.log("ranking: " + e));
            })
       }

        function setxpcounter(){
            try {
            /**
                 * GET the Rank User
                 * @info you can tag him
                 */
                if (!args[0]) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable21"]));
                let rankuser = message.mentions.users.first();
                if (!rankuser) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable22"]));
                // if(rankuser.bot) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable23"]));
                //Call the databasing function!
                const key = `${message.guild.id}-${rankuser.id}`;
                databasing(rankuser);
                if (!args[1]) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable24"]));
                if(Number(args[1]) > 10) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable25"]))
                client.points.set(key, Number(args[1]), `xpcounter`); //set points to 0
                const embed = new Discord.MessageEmbed()
                .setColor(embedcolor)
                .setDescription(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable26"]))
                message.reply(embed);
            } catch (error) {
                console.log("RANKING:".underline.red + " :: " + error.stack.toString().grey.italic.dim)
                message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable27"]));
            }
        }
        
        function setglobalxpcounter(){
            try {
                if (!args[0]) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable28"]));
                if(Number(args[1]) > 10) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable29"]))
                client.points.set(message.guild.id, Number(args[0]), `setglobalxpcounter`); //set points to 0
                const embed = new Discord.MessageEmbed()
                .setColor(embedcolor)
                .setDescription(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable30"]))
                message.reply(embed);
            } catch {
            }
        }
        function addpoints(amount) {
            try {
                /**
                 * GET the Rank User
                 * @info you can tag him
                 */
                if (!args[0]) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable31"]));
                let rankuser = message.mentions.users.first();
                if (!rankuser) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable32"]));
                // if(rankuser.bot) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable33"]));
                //Call the databasing function!
                const key = `${message.guild.id}-${rankuser.id}`;
                databasing(rankuser);

                const curPoints = client.points.get(key, `points`);
                const neededPoints = client.points.get(key, `neededpoints`);
                let leftpoints = neededPoints - curPoints;
                if (!args[1] && !amount) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable34"]));
                if(Number(args[1]) > 10000 || Number(args[1]) < -10000) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable35"]))
                if (!amount) amount = Number(args[1]);
                if (amount < 0) removepoints(amount);
                let toaddpoints = amount;
                addingpoints(toaddpoints, leftpoints);

                function addingpoints(toaddpoints, leftpoints) {
                    if (toaddpoints >= leftpoints) {
                        client.points.set(key, 0, `points`); //set points to 0
                        client.points.inc(key, `level`); //add 1 to level
                        //HARDING UP!
                        const newLevel = client.points.get(key, `level`); //get current NEW level
                        if (newLevel % 4 === 0) client.points.math(key, `+`, 100, `neededpoints`)

                        const newneededPoints = client.points.get(key, `neededpoints`); //get NEW needed Points
                        const newPoints = client.points.get(key, `points`); //get current NEW points

                        //THE INFORMATION EMBED 
                        const embed = new Discord.MessageEmbed()
                            .setAuthor(`Ranking of:  ${rankuser.tag}`, rankuser.displayAvatarURL({
                                dynamic: true
                            }))
                            .setDescription(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable36"]))
                            .setColor(embedcolor);
                        //send ping and embed message only IF the adding will be completed!
                        if (toaddpoints - leftpoints < newneededPoints)
                            message.channel.send(rankuser, embed).catch(e=>console.log("ranking: " + e));

                        addingpoints(toaddpoints - leftpoints, newneededPoints); //Ofc there is still points left to add so... lets do it!
                    } else {
                        client.points.math(key, `+`, Number(toaddpoints), `points`)
                    }
                }


                const embed = new Discord.MessageEmbed()
                    .setColor(embedcolor)
                    .setDescription(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable37"]))
                message.reply(embed);
                rank(rankuser); //also sending the rankcard
            } catch (error) {
                console.log("RANKING:".underline.red + " :: " + error.stack.toString().grey.italic.dim)
                message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable38"]));
            }
        }

        function setpoints() {
            try {
                /**
                 * GET the Rank User
                 * @info you can tag him
                 */
                if (!args[0]) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable39"]));
                let rankuser = message.mentions.users.first();
                if (!rankuser) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable40"]));
                // if(rankuser.bot) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable41"]));
                //Call the databasing function!
                const key = `${message.guild.id}-${rankuser.id}`;
                databasing(rankuser);

                let toaddpoints = Number(args[1]);
                if (!args[1]) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable42"]));
                if(Number(args[1]) > 10000) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable43"]))
                if (Number(args[1]) < 0) args[1] = 0;
                const neededPoints = client.points.get(key, `neededpoints`);
                addingpoints(toaddpoints, neededPoints);

                function addingpoints(toaddpoints, neededPoints) {
                    if (toaddpoints >= neededPoints) {
                        client.points.set(key, 0, `points`); //set points to 0
                        client.points.inc(key, `level`); //add 1 to level
                        //HARDING UP!
                        const newLevel = client.points.get(key, `level`); //get current NEW level
                        if (newLevel % 4 === 0) client.points.math(key, `+`, 100, `neededpoints`)

                        const newneededPoints = client.points.get(key, `neededpoints`); //get NEW needed Points
                        const newPoints = client.points.get(key, `points`); //get current NEW points

                        //THE INFORMATION EMBED 
                        const embed = new Discord.MessageEmbed()
                            .setAuthor(`Ranking of:  ${rankuser.tag}`, rankuser.displayAvatarURL({
                                dynamic: true
                            }))
                            .setDescription(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable44"]))
                            .setColor(embedcolor);
                        //send ping and embed message
                        message.channel.send(rankuser, embed).catch(e=>console.log("ranking: " + e));

                        addingpoints(toaddpoints - neededPoints, newneededPoints); //Ofc there is still points left to add so... lets do it!
                    } else {
                        client.points.set(key, Number(toaddpoints), `points`)
                    }
                }

                const embed = new Discord.MessageEmbed()
                    .setColor(embedcolor)
                    .setDescription(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable45"]))
                message.channel.send(embed).catch(e=>console.log("ranking: " + e));
                rank(rankuser); //also sending the rankcard
            } catch (error) {
                console.log("RANKING:".underline.red + " :: " + error.stack.toString().grey.italic.dim)
                message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable46"]));
            }
        }

        function removepoints(amount) {
            try {
                /**
                 * GET the Rank User
                 * @info you can tag him
                 */
                if (!args[0]) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable47"]));
                let rankuser = message.mentions.users.first();
                if (!rankuser) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable48"]));
                // if(rankuser.bot) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable49"]));
                //Call the databasing function!
                const key = `${message.guild.id}-${rankuser.id}`;
                databasing(rankuser);

                const curPoints = client.points.get(key, `points`);
                const neededPoints = client.points.get(key, `neededpoints`);

                if (!args[1] && !amount) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable50"]));
                if (!amount) amount = Number(args[1]);
                if(Number(args[1]) > 10000 || Number(args[1]) < -10000) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable51"]))
                if (amount < 0) addpoints(amount);
                
                removingpoints(amount, curPoints);

                function removingpoints(amount, curPoints) {
                    if (amount > curPoints) {
                        let removedpoints = amount - curPoints - 1;
                        client.points.set(key, neededPoints - 1, `points`); //set points to 0
                        if (client.points.get(key, `level`) == 1) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable52"]));
                        client.points.dec(key, `level`); //remove 1 from level
                        //HARDING UP!
                        const newLevel = client.points.get(key, `level`); //get current NEW level
                        if ((newLevel + 1) % 4 === 0) { //if old level was divideable by 4 set neededpoints && points -100
                            client.points.math(key, `-`, 100, `points`)
                            client.points.math(key, `-`, 100, `neededpoints`)
                        }

                        const newneededPoints = client.points.get(key, `neededpoints`); //get NEW needed Points
                        const newPoints = client.points.get(key, `points`); //get current NEW points

                        //THE INFORMATION EMBED 
                        const embed = new Discord.MessageEmbed()
                            .setAuthor(`Ranking of:  ${rankuser.tag}`, rankuser.displayAvatarURL({
                                dynamic: true
                            }))
                            .setDescription(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable53"]))
                            .setColor(embedcolor);
                        //send ping and embed message only IF the removing will be completed!
                        if (amount - removedpoints < neededPoints)
                            message.channel.send(rankuser, embed).catch(e=>console.log("ranking: " + e));

                        removingpoints(amount - removedpoints, newneededPoints); //Ofc there is still points left to add so... lets do it!
                    } else {
                        client.points.math(key, `-`, Number(amount), `points`)
                    }
                }

                const embed = new Discord.MessageEmbed()
                    .setColor(embedcolor)
                    .setDescription(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable54"]))
                message.reply(embed);
                rank(rankuser); //also sending the rankcard
            } catch (error) {
                console.log("RANKING:".underline.red + " :: " + error.stack.toString().grey.italic.dim)
                message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable55"]));
            }
        }

        function addlevel() {
            try {
                /**
                 * GET the Rank User
                 * @info you can tag him
                 */
                if (!args[0]) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable56"]));
                let rankuser = message.mentions.users.first();
                if (!rankuser) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable57"]));
                // if(rankuser.bot) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable58"]));

                //Call the databasing function!
                const key = `${message.guild.id}-${rankuser.id}`;
                databasing(rankuser);
                let newLevel = client.points.get(key, `level`);
                if (!args[1]) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable59"]));
                if(Number(args[1]) > 10000) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable60"]))
                if (Number(args[1]) < 0) args[1] = 0;
                for (let i = 0; i < Number(args[1]); i++) {
                    client.points.set(key, 0, `points`); //set points to 0
                    client.points.inc(key, `level`); //add 1 to level
                    //HARDING UP!
                    newLevel = client.points.get(key, `level`); //get current NEW level
                    if (newLevel % 4 === 0) client.points.math(key, `+`, 100, `neededpoints`)
                }
                const newneededPoints = client.points.get(key, `neededpoints`); //get NEW needed Points
                const newPoints = client.points.get(key, `points`); //get current NEW points

                //THE INFORMATION EMBED 
                const embed = new Discord.MessageEmbed()
                    .setAuthor(`Ranking of:  ${rankuser.tag}`, rankuser.displayAvatarURL({
                        dynamic: true
                    }))
                    .setDescription(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable61"]))
                    .setColor(embedcolor);
                message.channel.send(rankuser, embed).catch(e=>console.log("ranking: " + e));
                rank(rankuser); //also sending the rankcard
                const sssembed = new Discord.MessageEmbed()
                .setColor(embedcolor)
                .setDescription(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable62"]))
                message.reply(sssembed);
            } catch (error) {
                console.log("RANKING:".underline.red + " :: " + error.stack.toString().grey.italic.dim)
                message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable63"]));
            }
        }

        function setlevel() {
            try {
                /**
                 * GET the Rank User
                 * @info you can tag him
                 */
                if (!args[0]) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable64"]));
                let rankuser = message.mentions.users.first();
                if (!rankuser) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable65"]));
                // if(rankuser.bot) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable66"]));

                //Call the databasing function!
                const key = `${message.guild.id}-${rankuser.id}`;
                databasing(rankuser);

                if (!args[1]) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable67"]));
                if (Number(args[1]) < 1) args[1] = 1;
                
                if(Number(args[1]) > 10000) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable68"]))

                client.points.set(key, Number(args[1]), `level`); //set level to the wanted level
                client.points.set(key, 0, `points`); //set the points to 0

                let newLevel = client.points.get(key, `level`); //set level to the wanted level
                let counter = Number(newLevel) / 4;

                client.points.set(key, 400, `neededpoints`) //set neededpoints to 0 for beeing sure
                //add 100 for each divideable 4
                for (let i = 0; i < Math.floor(counter); i++) {
                    client.points.math(key, `+`, 100, `neededpoints`)
                }
                const newneededPoints = client.points.get(key, `neededpoints`); //get NEW needed Points

                const newPoints = client.points.get(key, `points`); //get current NEW points
                //THE INFORMATION EMBED 
                const embed = new Discord.MessageEmbed()
                    .setAuthor(`Ranking of:  ${rankuser.tag}`, rankuser.displayAvatarURL({
                        dynamic: true
                    }))
                    .setDescription(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable69"]))
                    .setColor(embedcolor);
                message.channel.send(rankuser, embed).catch(e=>console.log("ranking: " + e));
                rank(rankuser); //also sending the rankcard
                const sssembed = new Discord.MessageEmbed()
                .setColor(embedcolor)
                .setDescription(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable70"]))
                message.reply(sssembed);
            } catch (error) {
                console.log("RANKING:".underline.red + " :: " + error.stack.toString().grey.italic.dim)
                message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable71"]));
            }
        }

        function removelevel() {
            try {
                /**
                 * GET the Rank User
                 * @info you can tag him
                 */
                if (!args[0]) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable72"]));
                let rankuser = message.mentions.users.first();
                if (!rankuser) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable73"]));
                // if(rankuser.bot) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable74"]));

                //Call the databasing function!
                const key = `${message.guild.id}-${rankuser.id}`;
                databasing(rankuser);
                let newLevel = client.points.get(key, `level`);
                if (!args[1]) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable75"]));
                if (Number(args[1]) < 0) args[1] = 0;
                for (let i = 0; i < Number(args[1]); i++) {
                    client.points.set(key, 0, `points`); //set points to 0
                    client.points.dec(key, `level`); //add 1 to level
                    //HARDING UP!
                    newLevel = client.points.get(key, `level`); //get current NEW level
                    if(newLevel < 1) client.points.set(key, 1 ,`level`); //if smaller then 1 set to 1
                }
                snewLevel = client.points.get(key, `level`); //get current NEW level
                let counter = Number(snewLevel) / 4;

                client.points.set(key, 400, `neededpoints`) //set neededpoints to 0 for beeing sure
                //add 100 for each divideable 4
                for (let i = 0; i < Math.floor(counter); i++) {
                    client.points.math(key, `+`, 100, `neededpoints`)
                }
                const newneededPoints = client.points.get(key, `neededpoints`); //get NEW needed Points
                const newPoints = client.points.get(key, `points`); //get current NEW points

                //THE INFORMATION EMBED 
                const embed = new Discord.MessageEmbed()
                    .setAuthor(`Ranking of:  ${rankuser.tag}`, rankuser.displayAvatarURL({
                        dynamic: true
                    }))
                    .setDescription(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable76"]))
                    .setColor(embedcolor);
                message.channel.send(rankuser, embed).catch(e=>console.log("ranking: " + e));
                rank(rankuser); //also sending the rankcard
                const sssembed = new Discord.MessageEmbed()
                .setColor(embedcolor)
                .setDescription(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable77"]))
                message.reply(sssembed);
            } catch (error) {
                console.log("RANKING:".underline.red + " :: " + error.stack.toString().grey.italic.dim)
                message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable78"]));
            }
        }

        function resetranking() {
            try {
                /**
                 * GET the Rank User
                 * @info you can tag him
                 */
                if (!args[0]) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable79"]));
                let rankuser = message.mentions.users.first();
                if (!rankuser) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable80"]));
                // if(rankuser.bot) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable81"]));
                
                //Call the databasing function!
                const key = `${message.guild.id}-${rankuser.id}`;
                databasing(rankuser);

                client.points.set(key, 1, `level`); //set level to 0
                client.points.set(key, 0, `points`); //set the points to 0
                client.points.set(key, 400, `neededpoints`) //set neededpoints to 0 for beeing sure
                client.points.set(key, "", `oldmessage`); //set old message to 0

                //THE INFORMATION EMBED 
                const embed = new Discord.MessageEmbed()
                    .setAuthor(`Ranking of:  ${rankuser.tag}`, rankuser.displayAvatarURL({
                        dynamic: true
                    }))
                    .setDescription(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable82"]))
                    .setColor(embedcolor);
                message.channel.send(rankuser, embed).catch(e=>console.log("ranking: " + e));
                rank(rankuser); //also sending the rankcard
                const sssembed = new Discord.MessageEmbed()
                .setColor(embedcolor)
                .setDescription(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable83"]))
                message.reply(sssembed);
            } catch (error) {
                console.log("RANKING:".underline.red + " :: " + error.stack.toString().grey.italic.dim)
                message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable84"]));
            }
        }

        function registerall() {
            let allmembers = message.guild.members.cache.keyArray();
            for (let i = 0; i < allmembers.length; i++) {
                //Call the databasing function!
                let rankuser = message.guild.members.cache.get(allmembers[i]).user;
                databasing(rankuser);
            }
            const embed = new Discord.MessageEmbed()
            .setColor(embedcolor)
            .setDescription(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable85"]))
            message.reply(embed);
        }

        function resetrankingall() {
            let allmembers = message.guild.members.cache.keyArray();
            for (let i = 0; i < allmembers.length; i++) {
                let rankuser = message.guild.members.cache.get(allmembers[i]).user;
                const key = `${message.guild.id}-${rankuser.id}`;
                client.points.set(key, 1, `level`); //set level to 0
                client.points.set(key, 0, `points`); //set the points to 0
                client.points.set(key, 400, `neededpoints`) //set neededpoints to 0 for beeing sure
                client.points.set(key, "", `oldmessage`); //set old message to 0
            }
            const embed = new Discord.MessageEmbed()
            .setColor(embedcolor)
            .setDescription(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable86"]))
            message.reply(embed);
        }

        function addrandomall() {
            let maxnum = 5;
            if (args[0]) maxnum = Number(args[0]);
            if(args[0] && Number(maxnum) > 10000) return message.reply(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable87"]))
            let allmembers = message.guild.members.cache.filter(member=> !member.user.bot).keyArray();
            for (let i = 0; i < allmembers.length; i++) {
                //Call the databasing function!
                let rankuser = message.guild.members.cache.get(allmembers[i]).user;
                databasing(rankuser);
                if(rankuser.bot) continue;
                Giving_Ranking_Points(`${message.guild.id}-${rankuser.id}`, maxnum);
                Giving_Ranking_Points(`${message.guild.id}-${message.author.id}`, maxnum);
            }
            const embed = new Discord.MessageEmbed()
            .setColor(embedcolor)
            .setDescription(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable88"]))
            message.reply(embed);
        }

        function levelinghelp() {
            const embed = new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable89"]))
                .setDescription(eval(client.la[ls]["handlers"]["rankingjs"]["ranking"]["variable90"]))
                .setColor(embedcolor)
                .addFields([{
                        name: "`rank [@User]`",
                        value: ">>> *Shows the Rank of a User*",
                        inline: true
                    },
                    {
                        name: "`leaderboard`",
                        value: ">>> *Shows the Top 10 Leaderboard*",
                        inline: true
                    },
                    {
                        name: "`setxpcounter <@USER> <AMOUNT>`",
                        value: ">>> *Changes the amount of how much to count, x1, x2, x3, ...*",
                        inline: true
                    },

                    {
                        name: "`addpoints <@User> <Amount`",
                        value: ">>> *Add a specific amount of Points to a User*",
                        inline: true
                    },
                    {
                        name: "`setpoints <@User> <Amount`",
                        value: ">>> *Set a specific amount of Points to a User*",
                        inline: true
                    },
                    {
                        name: "`removepoints <@User> <Amount`",
                        value: ">>> *Remove a specific amount of Points to a User*",
                        inline: true
                    },

                    {
                        name: "`addlevel <@User> <Amount`",
                        value: ">>> *Add a specific amount of Levels to a User*",
                        inline: true
                    },
                    {
                        name: "`setlevel <@User> <Amount`",
                        value: ">>> *Set a specific amount of Levels to a User*",
                        inline: true
                    },
                    {
                        name: "`removelevel <@User> <Amount`",
                        value: ">>> *Remove a specific amount of Levels to a User*",
                        inline: true
                    },

                    {
                        name: "`resetranking <@User>`",
                        value: ">>> *Resets the ranking of a User*",
                        inline: true
                    },
                    {
                        name: "`setglobalxpcounter <AMOUNT>`",
                        value: ">>> *Sets the global xp counter for this guild, standard 1*",
                        inline: true
                    },
                    {
                        name: "\u200b",
                        value: "\u200b",
                        inline: true
                    },

                    {
                        name: "`registerall`",
                        value: ">>> *Register everyone in the Server to the Database*",
                        inline: true
                    },
                    {
                        name: "`resetrankingall`",
                        value: ">>> *Reset ranking of everyone in this Server*",
                        inline: true
                    },
                    {
                        name: "`addrandomall`",
                        value: ">>> *Add a random amount of Points to everyone*",
                        inline: true
                    }
                ])
            message.channel.send(embed).catch(e=>console.log("ranking: " + e))
        }

    }catch(e){console.log("ranking: " + e)}
    })



}
//Coded by Tomato#6966!
function shortenLargeNumber(num, digits) {
    var units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
        decimal;

    for(var i=units.length-1; i>=0; i--) {
        decimal = Math.pow(1000, i+1);

        if(num <= -decimal || num >= decimal) {
            return +(num / decimal).toFixed(digits) + units[i];
        }
    }

    return num;
}