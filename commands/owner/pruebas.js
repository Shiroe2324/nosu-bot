const Discord = require('discord.js')

module.exports = {
    name: 'test',
    aliases: ["prueba", "pruebas"],
    creator: true,
    async execute(message, args, MessageEmbed, Util, client, cmd, setCd, color, helper) {
        const roleSize = {
            colors: {
                red: message.guild.roles.resolve('925953717696622643').members.size,
                orange: message.guild.roles.resolve('925953732041113620').members.size,
                pink: message.guild.roles.resolve('925954734886617089').members.size,
                yellow: message.guild.roles.resolve('925953641804886077').members.size,
                light_green: message.guild.roles.resolve('925953722197082193').members.size,
                dark_green: message.guild.roles.resolve('925953728853454919').members.size,
                blue: message.guild.roles.resolve('925953712768303235').members.size,
                sky_blue: message.guild.roles.resolve('925953725888069683').members.size,
                purple: message.guild.roles.resolve('925956505335910491').members.size,
                brown: message.guild.roles.resolve('925953734855524363').members.size,
                white: message.guild.roles.resolve('925953738278076506').members.size,
                black: message.guild.roles.resolve('925953741381844992').members.size
            },
            games: {
                lol: message.guild.roles.resolve('989720185084719124').members.size,
                roblox: message.guild.roles.resolve('989720230681018418').members.size,
                minecraft: message.guild.roles.resolve('989720249517604937').members.size,
                brawlhalla: message.guild.roles.resolve('989720267720896532').members.size,
                valorant: message.guild.roles.resolve('989721335716544542').members.size,
                genshin: message.guild.roles.resolve('990343454481588314').members.size
            },
            modes: {
                standard: message.guild.roles.resolve('923666363724206109').members.size,
                catch: message.guild.roles.resolve('923666363724206107').members.size,
                taiko: message.guild.roles.resolve('923666363724206108').members.size,
                mania: message.guild.roles.resolve('923666363724206106').members.size
            },
            extra: {
                artist: message.guild.roles.resolve('989719815025479750').members.size,
                mapper: message.guild.roles.resolve('989720047385722890').members.size,
                skinner: message.guild.roles.resolve('989720075097493604').members.size
            },
            ping: {
                dead_chat: message.guild.roles.resolve('989720640183500851').members.size,
                events: message.guild.roles.resolve('989720675407241276').members.size        
            }
        };

        function newButton(id, emoji) {
            return new Discord.MessageButton()
                .setCustomId(`role-${id}`)
                .setLabel('')
                .setStyle('SECONDARY')
                .setEmoji(emoji);
        }

        function newRow(components) {
            return new Discord.MessageActionRow()
                .addComponents(...components);
        }

        function newEmbed(title, description, footer) {
            const embed = new MessageEmbed()
                .setTitle(title)
                .setDescription(description)
                .setColor(color);
            if (footer) embed.setFooter({ text: footer });
            return embed
        }

        const embedColors = newEmbed(
            'Presiona un boton para elegir el rol si quieres alguno de los siguientes colores',
            `**- Rojo [#CA3437]:** 🔴 - (#${roleSize.colors.red})\n**- Naranja [#FF8815]:** 🟠 - (#${roleSize.colors.orange})\n**- Rosado [#FFA2BC]:** 🐽 - (#${roleSize.colors.pink})**\n- Amarillo [#FDFF00]:** 🟡 - (#${roleSize.colors.yellow})\n**- Verde Claro [#36FD25]:** 🟢 - (#${roleSize.colors.light_green})\n**- Verde Oscuro [#1D5E1D]:** 🌲 - (#${roleSize.colors.dark_green})\n**- Azul [#4652EF]:** 🐋 - (#${roleSize.colors.blue})\n**- Celeste [#90F3EB]:** 🔵 - (#${roleSize.colors.sky_blue})\n**- Morado [#7B3692]:** 🟣 - (#${roleSize.colors.purple})\n**- Marrón [#6B4C3E]:** 🟤 - (#${roleSize.colors.brown})\n**- Blanco [#FFFFFF]:** ⚪ - (#${roleSize.colors.white})\n**- Negro [#000000]:** ⚫ - (#${roleSize.colors.black})\n`,
            'Solo puedes tener un color a la vez, si eliges otro mas, se quitara el antiguo'
        );
        const embedGames = newEmbed(
            'Presiona un boton para elegir el rol si juegas alguno de los siguientes juegos',
            `**- League of legends:** 🏹 | (#${roleSize.games.lol})\n**- Roblox:** 🪁 | (#${roleSize.games.roblox})\n**- Minecraft:** ⛏️ | (#${roleSize.games.minecraft})\n**- Brawlhalla:** ⚔️ | (#${roleSize.games.brawlhalla})\n**- Valorant:** 🔫 | (#${roleSize.games.valorant})\n**- genshin Impact:** 🔮 | (#${roleSize.games.genshin})`
        );
        const embedModes = newEmbed(
            'Presiona un boton para elegir el rol del modo o los modos que juegues',
            `**- Standard:** ☄️ | (#${roleSize.modes.standard})\n**- Catch:** 🍎 | (#${roleSize.modes.catch})\n**- Taiko:** 🥁 | (#${roleSize.modes.taiko})\n**- Mania:** 🎹 | (#${roleSize.modes.mania})`
        );
        const embedExtra = newEmbed(
            'Presiona un boton para elegir el rol si te dedicas a alguna de las siguientes cosas',
            `**- Artista:** 🎨 | (#${roleSize.extra.mapper})\n**- Mapper:** ✏️ | (#${roleSize.extra.mapper})\n**- Skinner:** 📏 | (#${roleSize.extra.skinner})`
        );
        const embedPings = newEmbed(
            'Presiona un boton para elegir el rol por si quieres que te llegue alguna de las siguientes notificaciones',
            `**- Chat muerto:** 💀 | (#${roleSize.ping.dead_chat})\n**- Eventos:** 🏆 | (#${roleSize.ping.events})`
        );

        message.channel.send({ embeds: [embedColors], components: [newRow([newButton('colors-925953717696622643', '🔴'), newButton('colors-925953732041113620', '🟠'), newButton('colors-925954734886617089', '🐽'), newButton('colors-925953641804886077', '🟡'), newButton('colors-925953722197082193', '🟢')]), newRow([ newButton('colors-925953728853454919', '🌲'), newButton('colors-925953712768303235', '🐋'), newButton('colors-925953725888069683', '🔵'), newButton('colors-925956505335910491', '🟣'), newButton('colors-925953734855524363', '🟤')]), newRow([newButton('colors-925953738278076506', '⚪'), newButton('colors-925953741381844992', '⚫')])] })
        message.channel.send({ embeds: [embedGames], components: [newRow([newButton('games-989720185084719124', '🏹'), newButton('games-989720230681018418', '🪁'), newButton('games-989720249517604937', '⛏️'), newButton('games-989720267720896532', '⚔️'), newButton('games-989721335716544542', '🔫')]), newRow([newButton('games-990343454481588314', '🔮')])] })
        message.channel.send({ embeds: [embedModes], components: [newRow([newButton('modes-923666363724206109', '☄️'), newButton('modes-923666363724206107', '🍎'), newButton('modes-923666363724206108', '🥁'), newButton('modes-923666363724206106', '🎹')])] })
        message.channel.send({ embeds: [embedExtra], components: [newRow([newButton('extra-989719815025479750', '🎨'), newButton('extra-989720047385722890', '✏️'), newButton('extra-989720075097493604', '📏')])] })
        message.channel.send({ embeds: [embedPings], components: [newRow([newButton('pings-989720640183500851', '💀'), newButton('pings-989720675407241276', '🏆')])] })
    }
};