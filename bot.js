    //constants / variales
    const botsettings = require("./botsetting.json");
    const Discord = require("discord.js");

    const bot = new Discord.Client({disableEveryone: true});

    //"boot"
    bot.on("ready", async () => {
        console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} servers.`);

             try {
                 let link = await bot.generateInvite(["ADMINISTRATOR"]);
                 console.clear()
                 console.log("---------------------------------------------------------------------------------------------------------")
                 console.log("Token: " + botsettings.token)
                 console.log("prefix: " + botsettings.prefix)
                 console.log("Invite link: " + link)
                 console.log("---------------------------------------------------------------------------------------------------------")
                 console.log("Information about the Bots events!");
                 bot.user.setActivity(`Serving ${bot.guilds.size} servers`);
             } catch(e) {
                 console.log(e);
             }

             bot.on("guildCreate", guild => {
                 console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
                 console.log(" ");
                 bot.user.setActivity(`Serving ${bot.guilds.size} servers!`);
             });
        });

    //commands
    bot.on("message", async message => {
        if(message.author.bot) return;
        if(message.channel.type === "dm") return;

        let messageArray = message.content.split(" ");
        let command = messageArray[0];
        let args = messageArray.slice(1);

        //console.log(messageArray);
        //console.log("In Server(" + message.guild + ", " + message.channel.name + ")," + message.author.username + ":" + message.content);
        //console.log(args);

        if(!command.startsWith(botsettings.prefix)) return;

        //!userinfo
        if(command === `${botsettings.prefix}userinfo`) {
         var user = message.mentions.users.first();
            let embed = new Discord.RichEmbed()
                .setFooter(`${user.username}`, `${user.displayAvatarURL}`)
                .setDescription("This is the info about:" + user.username + "!")
                .setColor("#00ccff")
                .addField(user.avatar)
                .addField("Full username:",user.tag)
                .addField("ID:",user.id)
                .addField("Joined Discord at:", user.createdAt);
                 console.log("Embed generated for:" + user.username + "!")
            message.channel.send(embed);
            console.log(message.author.tag + " run the command " + message.content + " In(" + message.guild + ",channel:" + message.channel.name +")!");
            return;
        }

    	   //avatar
        	    if(command === `${botsettings.prefix}avatar`) {
                var usr1 = message.mentions.users.first() || message.author;
                if(!usr1){usr1 = message.author};
                    message.channel.send(`${message.author}`);
                    var avatar_embed = new Discord.RichEmbed()
                    .setAuthor(`Avatar of ${usr1.tag}`, `${bot.user.displayAvatarURL}`)
                    .setColor('#00ccff')
                    .setImage(`${usr1.displayAvatarURL}`)
                    .setTimestamp()
                    .setFooter(`${bot.user.username}`, `${bot.user.displayAvatarURL}`);
                    message.channel.send({embed : avatar_embed});
                    console.log(message.author.tag + " run the command " + message.content + " In(" + message.guild + ",channel:" + message.channel.name +")!");
                return;
            }

            //!uptime
                if(command === `${botsettings.prefix}uptime`) {
                    var uptime_embed = new Discord.RichEmbed()
                    .setColor('#00ccff')
                    .addField("Online since:", "Milliseconds:" + bot.uptime)
                    .setFooter(`${bot.user.username}`, `${bot.user.displayAvatarURL}`);
                    message.channel.send({embed : uptime_embed});
                    console.log(message.author.tag + " run the command " + message.content + " In(" + message.guild + ",channel:" + message.channel.name +")!");
                return;
            }

            //!help
            if(command === `${botsettings.prefix}help`) {
                let embed = new Discord.RichEmbed()
                    .setAuthor("All Commands:" + " " , `${bot.user.displayAvatarURL}`)
                    .setFooter(`${bot.user.username}`, `${bot.user.displayAvatarURL}`)
                    .setDescription("")
                    .setColor("#00ccff")
                    .addField("!help", " this list.")
                    .addField("!userinfo(@name)", " give information about the user!")
                    .addField("!avatar(@name)", " display the avatar of the user!")
                    .addField("!invite", " sends an invite link for the bot!")
                    .addField("!serverinfo", " info about the server!")
                    .addField("!uptime", " since when the bot is online!");
                 message.author.send(embed);
                 console.log(message.author.tag + " run the command " + message.content + " In(" + message.guild + ",channel:" + message.channel.name +")!");
                return;
            }

            //!invite
            if(command === `${botsettings.prefix}invite` || command.channel.type === DMchannes) {
                let link = await bot.generateInvite(["ADMINISTRATOR"]);
                message.author.send("Invite link for Electra-Bot:" + link)
                console.log(message.author.tag + " run the command " + message.content + " In(" + message.guild + ",channel:" + message.channel.name +")!");
                return;
              }else {
                message.channel.send("You need to run the command in DM " + message.author.tag);
              }

            //!help
            if(command === `${botsettings.prefix}serverinfo`) {
                let embed = new Discord.RichEmbed()
                    .setAuthor("Server info:" + " " , `${bot.user.displayAvatarURL}`)
                    .setFooter(`${bot.user.username}`, `${bot.user.displayAvatarURL}`)
                    .setThumbnail(`${message.author.displayAvatarURL}`)
                    .setDescription("")
                    .setColor("#00ccff")
                    .addField("Server name:", message.guild)
                    .addField("ID:", message.guild.id)
                    .addField("Creator:", message.guild.owner)
                    .addField("Members:", message.guild.members.size)
                    .addField("Channels:", message.guild.channels.size)
                    .addField("Role(s)", message.guild.roles.size)
                    .addField("Created at:", message.guild.createdAt);
                 message.channel.send(embed);
                 console.log(message.author.tag + " run the command " + message.content + " In(" + message.guild + ",channel:" + message.channel.name +")!");
                return;
            }

            if(command === `${botsettings.prefix}clear`) {
                  message.channel.send("Cleared the console!" + console.size)
                  console.clear();
                return;
            }
});

bot.login(botsettings.token);
