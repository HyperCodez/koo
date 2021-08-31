class TicTacToe {

        /**
         * @name TicTacToe
         * @kind constructor
         * @param {Object} options options
         * @param {String} [options.xEmoji] x emoji
         * @param {any} [options.message] the discord message
         * @param {String} [options.xColor] x button color
         * @param {String} [options.oEmoji] o emoji
         * @param {String} [options.oColor] o button color
         * @param {any} [options.opponent] const opponent = <Message>.mentions.members.first() (NOT CHANGEABLE)
        */

        constructor(options) {
        if(!options.xEmoji) throw new TypeError('Missing argument: xEmoji')
        if(typeof options.xEmoji !== 'string') throw new TypeError('Weky Error: xEmoji must be a string')

        if(!options.oEmoji) throw new TypeError('Missing argument: oEmoji')
        if(typeof options.oEmoji !== 'string') throw new TypeError('Weky Error: oEmoji must be a string')

        if(!options.xColor) throw new TypeError('Missing argument: xColor')
        if(typeof options.xColor !== 'string') throw new TypeError('Weky Error: xColor must be a string')

        if(!options.oColor) throw new TypeError('Missing argument: oColor')
        if(typeof options.oColor !== 'string') throw new TypeError('Weky Error: oColor must be a string')

        if(!options.opponent) throw new TypeError('Weky Error: Missing argument opponent')

        if(!options.message) throw new TypeError('Weky Error: Missing argument message')

        this.message = options.message;
        this.xEmoji = options.xEmoji
        this.oEmoji = options.oEmoji
        this.opponent = options.opponent
        this.xColor = options.xColor
        this.oColor = options.oColor
        }
        async start() {
        let a1 = '⬜'
        let a2 = '⬜'
        let a3 = '⬜'
        let b1 = '⬜'
        let b2 = '⬜'
        let b3 = '⬜'
        let c1 = '⬜'
        let c2 = '⬜'
        let c3 = '⬜'
        
        function getRandomString(length) {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var result = '';
        for ( var i = 0; i < length; i++ ) {
                result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
        }
        return result
        }

        let a11 = (getRandomString(4)+'-'+getRandomString(4)+'-'+getRandomString(4)+'-'+getRandomString(4))
        let a22 = (getRandomString(4)+'-'+getRandomString(4)+'-'+getRandomString(4)+'-'+getRandomString(4))
        let a33 = (getRandomString(4)+'-'+getRandomString(4)+'-'+getRandomString(4)+'-'+getRandomString(4))
        let b11 = (getRandomString(4)+'-'+getRandomString(4)+'-'+getRandomString(4)+'-'+getRandomString(4))
        let b22 = (getRandomString(4)+'-'+getRandomString(4)+'-'+getRandomString(4)+'-'+getRandomString(4))
        let b33 = (getRandomString(4)+'-'+getRandomString(4)+'-'+getRandomString(4)+'-'+getRandomString(4))
        let c11 = (getRandomString(4)+'-'+getRandomString(4)+'-'+getRandomString(4)+'-'+getRandomString(4))
        let c22 = (getRandomString(4)+'-'+getRandomString(4)+'-'+getRandomString(4)+'-'+getRandomString(4))
        let c33 = (getRandomString(4)+'-'+getRandomString(4)+'-'+getRandomString(4)+'-'+getRandomString(4))
        const author = this.message.author.id 
        const member = this.opponent
        const authorName = this.message.author.username 
        const gameData = [
        { member: this.message.author, em: this.xEmoji, color: this.xColor },
        { member: member, em: this.oEmoji, color: this.oColor }
        ];
        let xd = Math.floor(Math.random() * gameData.length)
        let player = xd;

        
        const midDuel = new Set()
                
        if (midDuel.has(author)) { 
        return this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable1"]))
        } else if (midDuel.has(member.id)) { 
        return this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable2"]))
        } if (member.id === this.message.client.user.id) { 
        return this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable3"]))
        }

        const Discord = require('discord.js')
        let Embed;
        if(player == 0){
        Embed = new Discord.MessageEmbed()
        .setTitle(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable4"]))
        .setDescription(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable5"]))
        .setColor(3426654)
        }else{
        Embed = new Discord.MessageEmbed()
        .setTitle(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable6"]))
        .setDescription(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable7"]))
        .setColor(3426654)
        }
        const dis = require('discord.js')
        let A1 = new dis.MessageButton()
        .setCustomId(a11)
        .setStyle('gray')
        .setLabel('~')
        let A2 = new dis.MessageButton()
        .setCustomId(a22)
        .setStyle('gray')
        .setLabel('~')
        let A3 = new dis.MessageButton()
        .setCustomId(a33)
        .setStyle('gray')
        .setLabel('~')
        let B1 = new dis.MessageButton()
        .setCustomId(b11)
        .setStyle('gray')
        .setLabel('~')
        let B2 = new dis.MessageButton()
        .setCustomId(b22)
        .setStyle('gray')
        .setLabel('~')
        let B3 = new dis.MessageButton()
        .setCustomId(b33)
        .setStyle('gray')
        .setLabel('~')
        let C1 = new dis.MessageButton()
        .setCustomId(c11)
        .setStyle('gray')
        .setLabel('~')
        let C2 = new dis.MessageButton()
        .setCustomId(c22)
        .setStyle('gray')
        .setLabel('~')
        let C3 = new dis.MessageButton()
        .setCustomId(c33)
        .setStyle('gray')
        .setLabel('~')
        this.message.reply({
        embed: Embed,
        components: [
                {type: 1, components: [
        A1, A2, A3
                ]},
                {type: 1, components: [
        B1, B2, B3
                ]},
                {type: 1, components: [
        C1, C2, C3
                ]},
        ]
        }).then( async (msg) => {
        midDuel.add(author)
        midDuel.add(member.id)
        const gameCollector = msg.createMessageComponentCollector({filter: (i) => i.isButton() && i.user && i.user.id == this.message.author.id && i.message.author.id == client.user.id,});


        
                gameCollector.on('collect', async btn => {
                if(btn.id == a11 && gameData[player].member.id === btn.user.id){
                btn.deferUpdate();
                if (btn.label == this.oEmoji || btn.label == this.xEmoji) { // User tries to place at an already claimed spot
                        btn.message.update('That spot is already occupied.')
                } else {
                try{
                        a1 = gameData[player].em
                        if (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji || a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable8"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji || a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable9"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji || a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable10"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji || a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) {
                        
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable11"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji || b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable12"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji || c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) {
                        player = (player + 1) % 2;
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable13"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji || a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) {
                        
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable14"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji || a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable15"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        }                  }catch(e){
                        console.log(e.stack ? String(e.stack).grey : String(e).grey)
                }
                player = (player + 1) % 2;
                if(player == 0){
                Embed = new Discord.MessageEmbed()
                .setDescription(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable16"]))
                .setColor(3426654)
                }else{
                Embed = new Discord.MessageEmbed()
                .setDescription(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable17"]))
                .setColor(3426654)
                }
                        A1 = new dis.MessageButton()
                        .setCustomId(a11)
                        .setStyle(gameData[player].color)
                        .setEmoji(gameData[player].em)
                        .setDisabled()
                        msg.edit({
                        embed: Embed,
                        components: [
                        {type: 1, components: [
                A1, A2, A3
                        ]},
                        {type: 1, components: [
                B1, B2, B3
                        ]},
                        {type: 1, components: [
                C1, C2, C3
                        ]},
                        ]
                        })
        
                }
                }else if(btn.id == a22 && gameData[player].member.id === btn.user.id){
                btn.deferUpdate()
                if (btn.label == this.oEmoji || btn.label == this.xEmoji) { // User tries to place at an already claimed spot
                        btn.message.update('That spot is already occupied.')
                } else {
                try{
                        a2 = gameData[player].em
                        if (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji || a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable18"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji || a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable19"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji || a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable20"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji || a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) {
                        
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable21"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji || b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable22"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji || c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) {
                        player = (player + 1) % 2;
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable23"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji || a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) {
                        
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable24"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji || a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable25"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        }                              }catch(e){
                        console.log(e.stack ? String(e.stack).grey : String(e).grey)
                }     
                player = (player + 1) % 2;
                if(player == 0){
                        Embed = new Discord.MessageEmbed()
                        .setDescription(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable26"]))
                        .setColor(3426654)
                        }else{
                        Embed = new Discord.MessageEmbed()
                        .setDescription(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable27"]))
                        .setColor(3426654)
                        }
                A2 = new dis.MessageButton()
                        .setCustomId(a22)
                        .setStyle(gameData[player].color)
                        .setEmoji(gameData[player].em)
                        .setDisabled()
                        msg.edit({
                        embed: Embed,
                        components: [
                        {type: 1, components: [
                A1, A2, A3
                        ]},
                        {type: 1, components: [
                B1, B2, B3
                        ]},
                        {type: 1, components: [
                C1, C2, C3
                        ]},
                        ]
                })
        
                }
                }else if(btn.id == a33 && gameData[player].member.id === btn.user.id){
                btn.deferUpdate()
                if (btn.label == this.oEmoji || btn.label == this.xEmoji) { // User tries to place at an already claimed spot
                        btn.message.update('That spot is already occupied.')
                } else {
                try{
                        a3 = gameData[player].em
                        if (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji || a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable28"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji || a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable29"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji || a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable30"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji || a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) {
                        
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable31"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji || b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable32"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji || c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) {
                        player = (player + 1) % 2;
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable33"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji || a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) {
                        
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable34"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji || a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable35"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        }                  }catch(e){
                        console.log(e.stack ? String(e.stack).grey : String(e).grey)
                }  
                player = (player + 1) % 2;     
                if(player == 0){
                        Embed = new Discord.MessageEmbed()
                        .setDescription(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable36"]))
                        .setColor(3426654)
                        }else{
                        Embed = new Discord.MessageEmbed()
                        .setDescription(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable37"]))
                        .setColor(3426654)
                        }        
                A3 = new dis.MessageButton()
                        .setCustomId(a33)
                        .setStyle(gameData[player].color)
                        .setEmoji(gameData[player].em)
                        .setDisabled()
                        msg.edit({
                        embed: Embed,
                        components: [
                        {type: 1, components: [
                A1, A2, A3
                        ]},
                        {type: 1, components: [
                B1, B2, B3
                        ]},
                        {type: 1, components: [
                C1, C2, C3
                        ]},
                        ]
                })
        
                }
                }else if(btn.id == b11 && gameData[player].member.id === btn.user.id){
                btn.deferUpdate()
                if (btn.label == this.oEmoji || btn.label == this.xEmoji) { // User tries to place at an already claimed spot
                        btn.message.update('That spot is already occupied.')
                } else {
        
                try{
                        b1 = gameData[player].em
                        if (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji || a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable38"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji || a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable39"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji || a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable40"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji || a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) {
                        
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable41"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji || b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable42"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji || c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) {
                        player = (player + 1) % 2;
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable43"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji || a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) {
                        
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable44"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji || a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable45"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        }                  }catch(e){
                        console.log(e.stack ? String(e.stack).grey : String(e).grey)
                }
                player = (player + 1) % 2;
                if(player == 0){
                        Embed = new Discord.MessageEmbed()
                        .setDescription(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable46"]))
                        .setColor(3426654)
                        }else{
                        Embed = new Discord.MessageEmbed()
                        .setDescription(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable47"]))
                        .setColor(3426654)
                        }
                        B1 = new dis.MessageButton()
                        .setCustomId(b11)
                        .setStyle(gameData[player].color)
                        .setEmoji(gameData[player].em)
                        .setDisabled()
                        msg.edit({
                        embed: Embed,
                        components: [
                        {type: 1, components: [
                A1, A2, A3
                        ]},
                        {type: 1, components: [
                B1, B2, B3
                        ]},
                        {type: 1, components: [
                C1, C2, C3
                        ]},
                        ]
                })
        
                }
                }else if(btn.id == b22 && gameData[player].member.id === btn.user.id){
                btn.deferUpdate()
                if (btn.label == this.oEmoji || btn.label == this.xEmoji) { // User tries to place at an already claimed spot
                        btn.message.update('That spot is already occupied.')
                } else {
                try{
                        b2 = gameData[player].em
                        if (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji || a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable48"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji || a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable49"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji || a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable50"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji || a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) {
                        
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable51"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji || b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable52"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji || c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) {
                        player = (player + 1) % 2;
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable53"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji || a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) {
                        
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable54"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji || a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable55"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        }                  }catch(e){
                        console.log(e.stack ? String(e.stack).grey : String(e).grey)
                }
                player = (player + 1) % 2;
                if(player == 0){
                        Embed = new Discord.MessageEmbed()
                        .setDescription(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable56"]))
                        .setColor(3426654)
                        }else{
                        Embed = new Discord.MessageEmbed()
                        .setDescription(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable57"]))
                        .setColor(3426654)
                        }
                        B2 = new dis.MessageButton()
                        .setCustomId(b22)
                        .setStyle(gameData[player].color)
                        .setEmoji(gameData[player].em)
                        .setDisabled()
                        msg.edit({
                        embed: Embed,
                        components: [
                        {type: 1, components: [
                A1, A2, A3
                        ]},
                        {type: 1, components: [
                B1, B2, B3
                        ]},
                        {type: 1, components: [
                C1, C2, C3
                        ]},
                        ]
                })
        
                }
                }else if(btn.id == b33 && gameData[player].member.id === btn.user.id){
                btn.deferUpdate()
                if (btn.label == this.oEmoji || btn.label == this.xEmoji) { // User tries to place at an already claimed spot
                        btn.message.update('That spot is already occupied.')
                } else {
                try{
                        b3 = gameData[player].em
                        if (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji || a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable58"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji || a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable59"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji || a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable60"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji || a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) {
                        
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable61"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji || b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable62"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji || c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) {
                        player = (player + 1) % 2;
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable63"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji || a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) {
                        
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable64"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji || a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable65"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        }                  }catch(e){
                        console.log(e.stack ? String(e.stack).grey : String(e).grey)
                }
                player = (player + 1) % 2;
                if(player == 0){
                        Embed = new Discord.MessageEmbed()
                        .setDescription(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable66"]))
                        .setColor(3426654)
                        }else{
                        Embed = new Discord.MessageEmbed()
                        .setDescription(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable67"]))
                        .setColor(3426654)
                        }
                        B3 = new dis.MessageButton()
                        .setCustomId(b33)
                        .setStyle(gameData[player].color)
                        .setEmoji(gameData[player].em)
                        .setDisabled()
                        msg.edit({
                        embed: Embed,
                        components: [
                        {type: 1, components: [
                A1, A2, A3
                        ]},
                        {type: 1, components: [
                B1, B2, B3
                        ]},
                        {type: 1, components: [
                C1, C2, C3
                        ]},
                        ]
                })
        
                }
                }else if(btn.id == c11 && gameData[player].member.id === btn.user.id){
                btn.deferUpdate()
                if (btn.label == this.oEmoji || btn.label == this.xEmoji) { // User tries to place at an already claimed spot
                        btn.message.update('That spot is already occupied.')
                } else {
                try{
                        c1 = gameData[player].em
                        if (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji || a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable68"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji || a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable69"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji || a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable70"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji || a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) {
                        
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable71"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji || b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable72"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji || c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) {
                        player = (player + 1) % 2;
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable73"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji || a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) {
                        
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable74"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji || a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable75"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        }                  }catch(e){
                        console.log(e.stack ? String(e.stack).grey : String(e).grey)
                }
                player = (player + 1) % 2;
                if(player == 0){
                        Embed = new Discord.MessageEmbed()
                        .setDescription(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable76"]))
                        .setColor(3426654)
                        }else{
                        Embed = new Discord.MessageEmbed()
                        .setDescription(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable77"]))
                        .setColor(3426654)
                        }
                        C1 = new dis.MessageButton()
                        .setCustomId(c11)
                        .setStyle(gameData[player].color)
                        .setEmoji(gameData[player].em)
                        .setDisabled()
                        msg.edit({
                        embed: Embed,
                        components: [
                        {type: 1, components: [
                A1, A2, A3
                        ]},
                        {type: 1, components: [
                B1, B2, B3
                        ]},
                        {type: 1, components: [
                C1, C2, C3
                        ]},
                        ]
                })
        
                }
                }else if(btn.id == c22 && gameData[player].member.id === btn.user.id){
                btn.deferUpdate()
                if (btn.label == this.oEmoji || btn.label == this.xEmoji) { // User tries to place at an already claimed spot
                        btn.message.update('That spot is already occupied.')
                } else {
                try{
                        c2 = gameData[player].em
                        if (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji || a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable78"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji || a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable79"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji || a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable80"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji || a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) {
                        
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable81"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji || b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable82"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji || c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) {
                        player = (player + 1) % 2;
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable83"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji || a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) {
                        
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable84"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji || a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable85"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        }                  }catch(e){
                        console.log(e.stack ? String(e.stack).grey : String(e).grey)
                }
                player = (player + 1) % 2;
                if(player == 0){
                        Embed = new Discord.MessageEmbed()
                        .setDescription(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable86"]))
                        .setColor(3426654)
                        }else{
                        Embed = new Discord.MessageEmbed()
                        .setDescription(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable87"]))
                        .setColor(3426654)
                        }
                        C2 = new dis.MessageButton()
                        .setCustomId(c22)
                        .setStyle(gameData[player].color)
                        .setEmoji(gameData[player].em)
                        .setDisabled()
                        msg.edit({
                        embed: Embed,
                        components: [
                        {type: 1, components: [
                A1, A2, A3
                        ]},
                        {type: 1, components: [
                B1, B2, B3
                        ]},
                        {type: 1, components: [
                C1, C2, C3
                        ]},
                        ]
                })
                
                }
                }else if(btn.id == c33 && gameData[player].member.id === btn.user.id){
                btn.deferUpdate()
                if (btn.label == this.oEmoji || btn.label == this.xEmoji) { // User tries to place at an already claimed spot
                        btn.message.update('That spot is already occupied.')
                } else {
                try{
                        c3 = gameData[player].em
                        if (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji || a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable88"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji || a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable89"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji || a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable90"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji || a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) {
                        
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable91"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji || b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable92"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji || c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) {
                        player = (player + 1) % 2;
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable93"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji || a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) {
                        
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable94"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        } else if (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji || a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji) {
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable95"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        }else if(a1 !== '⬜' && a2 !== '⬜' && a3 !== '⬜' && b1 !== '⬜' && b2 !== '⬜' && b3 !== '⬜' && c1 !== '⬜' && c2 !== '⬜' && c3 !== '⬜'){
                        this.message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable96"]))
                        gameCollector.stop()
                        midDuel.delete(author)
                        midDuel.delete(member.id)
                        msg.edit({
                        embed: Embed,
                        components: [
                                {type: 1, components: [
                        A1.setDisabled(true), A2.setDisabled(true), A3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        B1.setDisabled(true), B2.setDisabled(true), B3.setDisabled(true)
                                ]},
                                {type: 1, components: [
                        C1.setDisabled(true), C2.setDisabled(true), C3.setDisabled(true)
                                ]},
                        ]
                        })
                        }
                        }catch(e){
                        console.log(e.stack ? String(e.stack).grey : String(e).grey)
                }
                player = (player + 1) % 2;
                if(player == 0){
                        Embed = new Discord.MessageEmbed()
                        .setDescription(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable97"]))
                        .setColor(3426654)
                        }else{
                        Embed = new Discord.MessageEmbed()
                        .setDescription(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable98"]))
                        .setColor(3426654)
                        }
                        C3 = new dis.MessageButton()
                        .setCustomId(c33)
                        .setStyle(gameData[player].color)
                        .setEmoji(gameData[player].em)
                        .setDisabled()
                        msg.edit({
                        embed: Embed,
                        components: [
                        {type: 1, components: [
                A1, A2, A3
                        ]},
                        {type: 1, components: [
                B1, B2, B3
                        ]},
                        {type: 1, components: [
                C1, C2, C3
                        ]},
                        ]
                })
                }
                }else {
                return btn.reply('Wait for opponent.', true)
                }
                
        
                })
        
        })
        }

}
module.exports = {
    name: "tictactoe",
    aliases: ["ttt"],
    category: "🎮 MiniGames",
    description: "Allows you to play a Game of Tic Tac Toe",
    usage: "tictactoe --> Play the Game",
    run: async (client, message, args, cmduser, text, prefix) => {
    
        let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
        if(!client.settings.get(message.guild.id, "MINIGAMES")){
          return message.reply(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(client.la[ls].common.disabled.title)
            .setDescription(require(`../../handlers/functions`).handlemsg(client.la[ls].common.disabled.description, {prefix: prefix}))
          );
        }
        const opponent = message.mentions.users.first();
        if (!opponent) return message.reply(eval(client.la[ls]["cmds"]["minigames"]["tictactoe"]["variable99"]));
        const game = new TicTacToe({
            message: message,
            opponent: opponent, // opponent
            xColor: 'red', // x's color
            oColor: 'green', //zero's color
            xEmoji: '862306785007632385',  //t he x emoji
            oEmoji: '862306766338523166' ,// the zero emoji
        })
        game.start()// start da game
        return;
    }
  }