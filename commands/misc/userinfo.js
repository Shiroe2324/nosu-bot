const moment = require('moment');
const badges = {
    'DISCORD_EMPLOYEE': '<:Discordstaff:854341762498822204>',
    'DISCORD_PARTNER': '<:Partner:854345448059961384>',
    'BUGHUNTER_LEVEL_1': '<:BugHunter:854346467267444746>',
    'BUGHUNTER_LEVEL_2': '<:9552_BugHunterLvl2:854346467279896586>',
    'HYPESQUAD_EVENTS': '<:badge_33:854341763082223616>',
    'HOUSE_BRAVERY': '<:badge_34:854339234642264124>',
    'HOUSE_BRILLIANCE': '<:badge_35:854339234613035038>',
    'HOUSE_BALANCE': '<:badge_36:854339234583806002>',
    'EARLY_SUPPORTER': '<:NcxetDL:854344136445526076>',
    'VERIFIED_BOT': '<:Verified_Bot_Badge:854348943094054952>',
    'VERIFIED_DEVELOPER': '<:badge_134:854339235956260874>'
};

module.exports = {
    name: 'user',
    aliases: ['userinfo', 'infouser'],
    cd: 5000,
    async execute(message, args, MessageEmbed, client, setCd, color, helper) {
        moment.updateLocale('es', {
            months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            monthsShort: ['Enero.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
            weekdays: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
            weekdaysShort: ['Dom.', 'Lun.', 'Mar.', 'Mier.', 'Jue.', 'Vier.', 'Sab.'],
            weekdaysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa']
        });
        moment.locale('es');

        let memberFind = helper.findMember(message, args);
        if (memberFind == 'No found user') return message.channel.send(`${client.emotes.error} | No pude encontrar a ese usuario`);
        let member = message.guild.members.cache.get(memberFind[0]);
        if (memberFind == 'No found mention') member = message.member;

        setCd();

        let game = "No está jugando nada";
        let games = member.presence?.activities?.sort((a, b) => a.position - b.position)?.map(role => role.toString());
        if (games?.includes('Custom Status')) games = member.presence?.activities?.sort((a, b) => a.position - b.position)?.map(role => role.toString()).slice(1, 9);
        if (games?.length > 0) game = games.join(', ');

        let status = member.presence?.status ? member.presence.status : "offline";
        switch (status) {
            case 'dnd': status = "<a:dnd:854360034833334282> No molestar"; break;
            case 'online': status = "<a:online:854360034795323412> En Línea"; break;
            case 'offline': status = "<a:offline:854360034572894239> Desconectado **|** Invisible"; break;
            case 'idle': status = "<a:idle:854360034782871572> Ausente"; break;
        }

        let statusFormat = "offline";
        if (member.presence?.clientStatus?.desktop) statusFormat = "- Discord de escritorio";
        if (member.presence?.clientStatus?.mobile) statusFormat = "- Discord de telefono";
        if (member.presence?.clientStatus?.web) statusFormat = "- Discord de navegador";

        let roles = member.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()).slice(0, -1);
        let displayRoles = "Muchos roles!";
        if (roles.length < 35) displayRoles = roles.join(' - ');
        if (roles.length < 1) displayRoles = "No tiene roles";

        let lines1 = [
            `**❯ Username:** ${member.user.username}\n`,
            `**❯ Discriminator:** ${member.user.discriminator}\n`,
            `**❯ ID:** ${member.id}\n`,
            `**❯ Insignias:** ${member.user.flags ? (member.user.flags.toArray().length > 0 ? member.user.flags.toArray().map(badge => badges[badge]).join(' ') : "`No tiene badges`") : "`No tiene badges`"}\n`,
            `**❯ ¿Es bot?:** ${member.user.bot ? 'Si' : 'No'}\n`,
            `**❯ Avatar:** [Click aquí](${member.user.displayAvatarURL({ dynamic: true, size: 2048 })})\n`,
            `**❯ status:** ${status} ${statusFormat === "offline" ? ' ' : statusFormat}\n`,
            `**❯ Actividad:** ${game}\n`,
            `**❯ Estado personalizado:** ${member.presence ? (!member.presence.activities[0] ? 'No tiene' : (member.presence.activities[0].state === null ? 'No tiene' : member.presence.activities[0].state)) : 'No tiene'}\n`,
            `**❯ Tiempo en Discord:** ${moment(member.user.createdTimestamp).format('LL [a las] h:mm a')} (Eso fue ${moment(member.user.createdTimestamp).fromNow()})`,
        ];

        let lines2 = [
            `**❯ Apodo:** ${member.nickname ? member.nickname : "No tiene"}\n`,
            `**❯ ¿Boostea este servidor?:** ${member.premiumSince ? 'Si <:1978discordserverboost:854351702660349993>' : 'No'}\n`,
            `**❯ Color:** ${member.displayHexColor === '#000000' ? 'No tiene' : member.displayHexColor.toUpperCase()}\n`,
            `**❯ Rol Mas Alto:** ${member.roles.highest.name == "@everyone" ? "No tiene" : member.roles.highest.name}\n`,
            `**❯ Total de roles: [${roles.length}]** ${displayRoles}\n`,
            `**❯ Se unió a ${message.guild.name}:** ${moment(member.joinedAt).format('LL [a las] h:mm a')} (Eso fue ${moment(member.joinedAt).fromNow()})`
        ];

        const embed = new MessageEmbed()
            .setAuthor({ name: `informacion de usuario de ${member.user.username}`, iconURL: member.user.displayAvatarURL({ dynamic: true, size: 2048 }) })
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))
            .addField(`**Usuario**`, lines1.join(''))
            .addField(`**Miembro**`, lines2.join(''))
            .setColor(await helper.getColor(member.id))
            .setFooter({ text: `Pedido por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    }
};