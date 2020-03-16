const token = 'Njg5MDkxNzkyMDQxNDEwNTY3.XnAR9g.kE9envFaRAq9H4JbrblFJw8zIoo'
const fs =  require('fs');
const { Client } = require("discord.js");
const ytdl = require("ytdl-core");
const client = new Client();
const { Set } = require("discord-set");
const set = new Set();
const noList = ['no', 'non', 'la'];
/*const list = {
    '264102727334756353':'654032004031184898',
    '261838107773632513':'470968206966784020',
    '221950780888973312' : '470968232002584588',
    '221957739310612480' : '70914649940951060'
}*/



var servers = {} 
const help = "help, ping , emoji, meme, chat, drari, audio";
const path = './sound/'
var soundList = fs.readdirSync(path);

var banana = false;
var far = false;
client.on("message", (message) => {
    console.log(message.author.username, message.author.id)
    /*if (list[String(message.author.id)])
        message.react(list[String(message.author.id)])*/
    if (!message.guild || message.author.bot) return;
    const prefix = "?";
    if (!message.content.startsWith(prefix) && (far == false && banana == false)) return;
    let args = message.content.slice(prefix.length).trim().split(" ");
    let command = args.shift().toLowerCase();
    if (command == "drari"){
        far = true;
        message.channel.send("Wach kat3arfo far9 bin fare o file o banana ?")
        message.react('🐁');
        message.react('🐘');
        message.react('🍌');
        return;
    }
    if (noList.includes(message.content.toLowerCase())){
        if (far == true){
            banana = true;
            far = false;
            return message.channel.send("daba fare sghir o file kbir");
        }
    }
    if (message.content.toLowerCase().indexOf('banana') != -1 ){
        if (banana == true){
            banana =  false;
            message.channel.send("f Karek");
            return message.channel.send("https://tenor.com/view/risitas-yes-giggle-gif-13898844");
        }
    }
    if (command === "dofus") {
        return message.channel.send("Drari dofus 3taw code abo free 1 semain creew des comptes men daba pour le serveur temporis 'DOFUSMARS2020' faut avoir un compte creer depuis 3 jrs  pour activer code : https://www.dofus.com/fr/mmorpg/communaute/codes")
    }
    if (command === "ping") {
        return message.channel.send("pong");
    } else if (command === "chat") {
        set.chat(args.join(" ")).then(reply => {
            return message.channel.send(reply);
        });
    } else if (command === "emoji") {
        let msg = set.emojify(args.join(" "));
        return message.channel.send(msg);
    } else if (command === "meme") {
        set.meme(message.channel, ["me_irl", "Dankmemes"], { readyMade: true });
    } else if (command === "help"){
        return message.channel.send(help)
    } else if (command === "audio"){
        if (args[0] == "play"){
            function play(connection, message)
            {
                var server = servers[message.guild.id];
                if (soundList.includes(server.queue[0])){
                    server.dispatcher = connection.play(path+server.queue[0]);
                }else{
                    server.dispatcher = connection.play(ytdl(server.queue[0], 
                        {
                          filter:"audioonly"
                        }));
                    }
                server.queue.shift();
                server.dispatcher.on("end", function(){
                    if (server.queue[0]){
                        play(connection, message);
                    }else{
                        connection.disconnect();
                    }
                });
            }
            if (!message.member.voice.channel){
                message.channel.send("You must be in a channel to play the audio");
                return;
            }
            if(!args[1]){
                message.channel.send("You need to provide a title!");
                return;
            }
            if (args[1] == 'help'){
                message.channel.send(soundList);
                return ;
            }
            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }
            var server = servers[message.guild.id];
            server.queue.push(args[1]);
            if (!message.guild.voiceConnection) 
                message.member.voice.channel.join().then(function(connection){
                    play(connection, message)
                });
        }else if (args[0] == 'skip'){
            var server = servers[message.guild.id];
            if (server.dispatcher)
                server.dispatcher.end();
        }else if (args[0] == 'stop'){
            var server = servers[message.guild.id];
            if (message.guild.voiceConnection){
                for(var i = server.queue.length -1; i >= 0; i--){
                    server.queue.splice(i, 1);
                }
                server.dispatcher.end();
            }
            if (message.guild.connection) message.guild.voiceConnection.disconnect();
        }
    }

});
 
client.login(token);