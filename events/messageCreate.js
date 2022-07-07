const helper = require('../utils/helper');
const schemas = require('../utils/schemas')
const { Collection } = require('discord.js');
const moment = require('moment')

moment.updateLocale('es', {
    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthsShort: ['Enero.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
    weekdays: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    weekdaysShort: ['Dom.', 'Lun.', 'Mar.', 'Mier.', 'Jue.', 'Vier.', 'Sab.'],
    weekdaysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa']
});
moment.locale('es');

module.exports = {
    name: 'messageCreate',
    async execute(message, client, MessageEmbed, Util) {
        if (message.author.bot) return;
        const guild = await schemas.guild.findOne({ guildID: message.guild.id });

        if(message.content.toLowerCase().endsWith('hola') || message.content.toLowerCase().endsWith('ola')) {
            message.reply('tu nariz entre mis bolas');
        }

        if(message.content.toLowerCase().endsWith('que') || message.content.toLowerCase().endsWith('que?') || message.content.toLowerCase().endsWith('que.') || message.content.toLowerCase().endsWith('que!')) {
            message.reply('so');
        }
        // ----------------------- AFK ----------------------- //

        const mention = message.mentions.members.first();
        if (guild) {
            if (mention) {
                message.mentions.members.forEach(member => {
                    const user = guild.afkList.find(user => user.id === member.id)
                    if (user) {
                        message.reply(`**${member.user.tag}** Se encuentra afk en este momento\n**Motivo:** ${user.motive}\n**Desde:** ${moment(user.time).fromNow()}`).then(msg => setTimeout(() => msg.delete(), 10000)).catch(e => {});
                    }
                })
            }
    
            const user = guild.afkList.find(user => user.id === message.author.id)
    
            if (user) {
                message.reply(`Bienvenido de vuelta **${message.author.tag}**\nEstuviste ausente desde **${moment(user.time).fromNow()}**`).then(msg => setTimeout(() => msg.delete(), 7000)).catch(e => {});
                guild.afkList = guild.afkList.filter(user => user.id !== message.author.id);
                await guild.save().catch(e => console.log(e));
            }
        }

        // ----------------------- COMANDS ----------------------- //

        if (!message.content.startsWith(process.env.PREFIX)) return;

        const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
        const command = helper.multiSplit(args.shift().toLowerCase(), ['á', 'é', 'í', 'ó', 'ú'], ['a', 'e', 'i', 'o', 'u']);
        const cmd = client.commands.get(command) || client.commands.find((s) => s.aliases.includes(command));
        if (!cmd) return;

        if (!cmd.cd) cmd.cd = 0;
        if (!client.cooldowns.has(cmd.name)) client.cooldowns.set(cmd.name, new Collection());

        if (cmd.admin) {
            if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(`${client.emotes.error} | Necesitas ser administrador para usar este comando`);
        }
        if (cmd.creator) {
            if (message.author.id != process.env.OWNER1 && message.author.id != process.env.OWNER2) return;
        };

        const timeStamps = client.cooldowns.get(cmd.name);
        if (timeStamps.has(message.author.id)) {
            const expirationTime = timeStamps.get(message.author.id) + cmd.cd;
            if (Date.now() < expirationTime) return message.reply(`${client.emotes.error} | Por favor espera **${(helper.dateFormat(expirationTime, { s: ' segundo(s)', m: ' minuto(s)', ago: '' }))}** antes de usar este comando de nuevo`).then(msg => setTimeout(() => msg.delete(), 10000)).catch(e => {});
        };

        const setCd = () => {
            timeStamps.set(message.author.id, Date.now());
            setTimeout(() => timeStamps.delete(message.author.id), cmd.cd);
        };

        cmd.execute(message, args, MessageEmbed, client, setCd, process.env.COLOR, helper).catch((err) => {
            message.channel.send(`${client.emotes.error} | Ocurrió un error: **${err}**, puedes reportar este error con el comando **report**`);
            console.error(err);
        });
    }
};