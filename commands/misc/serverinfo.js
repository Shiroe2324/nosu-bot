const moment = require('moment');

module.exports = {
    name: 'server',
    aliases: ['serverinfo', 'infoserver'],
    cd: 6000,
    async execute(message, args, MessageEmbed, client, setCd, color, helper) {
        setCd();
        moment.updateLocale('es', {
            months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            monthsShort: ['Enero.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
            weekdays: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
            weekdaysShort: ['Dom.', 'Lun.', 'Mar.', 'Mier.', 'Jue.', 'Vier.', 'Sab.'],
            weekdaysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa']
        });
        moment.locale('es');


        let tiempoafk;
        switch (message.guild.afkTimeout) {
            case 60: tiempoafk = '1 minuto'; break;
            case 300: tiempoafk = '5 minutos'; break;
            case 900: tiempoafk = '15 minutos'; break;
            case 1800: tiempoafk = '30 minutos'; break;
            case 3600: tiempoafk = '1 hora'; break;
        };

        let verifLevels = {
            none: "Ningúno",
            low: "Bajo",
            medium: "Medio",
            high: "Alto",
            very_high: "Muy alto"
        };

        let features = {
            ANIMATED_ICON: "Icono animado",
            BANNER: "Banner de servidor",
            COMMERCE: "Canal de tienda",
            DISCOVERABLE: "Servidor de Discord Discovery List",
            FEATURABLE: "Apto para estar en la lista de destacados",
            INVITE_SPLASH: "Fondo para invitaciones",
            PUBLIC: "El servidor es público",
            NEWS: "Canal de novedades",
            PARTNERED: "Servidor Asociado",
            VANITY_URL: "Invitacion personalizada",
            VERIFIED: "Servidor verificado",
            VIP_REGIONS: "Región V.I.P",
            THREADS_ENABLED: "Hilos activados",
            COMMUNITY: "Comunidad",
            NEW_THREAD_PERMISSIONS: "Crear hilos",
            WELCOME_SCREEN_ENABLED: "Fondo de bienvenidas"
        };

        let owner = await message.guild.fetchOwner();

        let lines = [
            `👑 **Dueño del server:** ${owner.user.tag} (${owner.id})\n`,
            `🆔 **ID:** ${message.guild.id}\n`,
            `📋 **Roles:** ${!(message.guild.roles.cache.size - 1) ? 'No tiene' : message.guild.roles.cache.size - 1}\n`,
            `💬 **Canales:** ${message.guild.channels.cache.size}\n`,
            `<:badge_33:854341763082223616> **Emotes:** ${!message.guild.emojis.cache.size ? 'No tiene' : message.guild.emojis.cache.size}\n`,
            `<a:nitro2:855957589606924289> **Boost:** ${!message.guild.premiumSubscriptionCount ? 'No tiene' : message.guild.premiumSubscriptionCount}\n`,
            `<a:nitro3:855957589165735956> **Nivel de boost:** Nivel ${message.guild.premiumTier == 'NONE' ? 0 : message.guild.premiumTier}\n`,
            `<:1978discordserverboost:854351702660349993> **Beneficios de boost:** ${message.guild.features.length <= 0 ? "No tiene" : message.guild.features.map(f => features[f]).join(" **|** ")}\n`,
            `<:discord:855956443546255362> **Nivel de verificacion:** ${verifLevels[message.guild.verificationLevel.toLowerCase()]}\n`,
            `🤖 **Bots:** ${!message.guild.members.cache.filter(member => member.user.bot).size ? 'No tiene' : message.guild.members.cache.filter(member => member.user.bot).size}\n`,
            `👥 **Miembros:** ${message.guild.members.cache.filter(member => !member.user.bot).size}\n<a:online:854360034795323412> en linea: ${message.guild.members.cache.filter(member => member.presence ? member.presence.status == 'online' : false).size}\n<a:idle:854360034782871572> ausente: ${message.guild.members.cache.filter(member => member.presence ? member.presence.status == 'idle' : false).size}\n<a:dnd:854360034833334282> no molestar: ${message.guild.members.cache.filter(member => member.presence ? member.presence.status == 'dnd' : false).size}\n<a:offline:854360034572894239> desconectado: ${message.guild.members.cache.filter(member => !member.presence).size}\n`,
            `⏰ **Canal AFK:** ${message.guild.afkChannel ? message.guild.afkChannel.toString() : 'No tiene'}\n`,
            `💤 **Tiempo del canal AFK:** ${tiempoafk}\n`,
            `📆 **Creado el:** ${moment(message.guild.createdAt).format('LL [a las] h:mm a')} (Eso fue ${moment(message.guild.createdAt).fromNow()})`
        ];

        const embed = new MessageEmbed()
            .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setColor(color)
            .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
            .setImage(message.guild.bannerURL())
            .setFooter({ text: `Pedido por: ${message.author.username}`, iconURL: message.author.avatarURL({ dynamic: true }) })
            .setDescription(lines.join(''))
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    }
};