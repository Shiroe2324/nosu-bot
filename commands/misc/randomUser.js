const moment = require('moment');

module.exports = {
    name: 'randomuser',
    aliases: ["rdu", "userandom", "urd"],
    async execute(message, args, MessageEmbed, Util, client, cmd, setCd, color, helper) {

        moment.updateLocale('es', {
            months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            monthsShort: ['Enero.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
            weekdays: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
            weekdaysShort: ['Dom.', 'Lun.', 'Mar.', 'Mier.', 'Jue.', 'Vier.', 'Sab.'],
            weekdaysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa']
        });
        moment.locale('es');

        let users = message.guild.members.cache.map(member => member);
        let member = users[Math.floor(Math.random() * users.length)];

        let lines = [
            `**Seleccionado:** ${member.user.tag}\n`,
            `**ID:** ${member.id}\n`,
            `**Rol más alto:** ${member.roles.highest.toString()}\n`,
            `**Miembro desde:** ${moment(member.joinedAt).fromNow()}\n`,
            `**Se unió a discord:** ${moment(member.user.createdTimestamp).fromNow()}`
        ];

        const embed = new MessageEmbed()
            .setTitle('Selección aleatoria')
            .setColor(color)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))
            .setDescription(lines.join(''));

        message.channel.send({ embeds: [embed] });
    }
};