const { inspect } = require('util');
const Discord = require('discord.js');
const moment = require('moment');
const ms = require('ms');
const fs = require('fs');
const schemas = require('../../utils/schemas');
const superagent = require('superagent');

module.exports = {
    name: 'eval',
    aliases: ['e', 'ev', 'eva'],
    creator: true,
    async execute(message, args, MessageEmbed, client, setCd, color, helper) {

        const command = args.join(" ");
        if (!command) return message.channel.send("???");

        moment.updateLocale('es', {
            months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            monthsShort: ['Enero.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
            weekdays: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
            weekdaysShort: ['Dom.', 'Lun.', 'Mar.', 'Mier.', 'Jue.', 'Vier.', 'Sab.'],
            weekdaysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa']
        });
        moment.locale('es');

        const row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setCustomId('clear')
                .setLabel('Clear')
                .setEmoji("❌")
                .setStyle("DANGER")
        );

        try {
            const evaled = await eval(command);

            if (["token", "destroy"].some(word => message.content.toLowerCase().includes(word))) return;

            const embed = new MessageEmbed()
                .setColor(0x2f3136)
                .setTitle("Evaluado correctamente!")
                .addField("**Tipo:**", `\`\`\`prolog\n${typeof (evaled)}\n\`\`\``, true)
                .addField("**Evaluado en:**", `\`\`\`yaml\n${Date.now() - message.createdTimestamp}ms\n\`\`\``, true)
                .addField(`**Entrada**`, `\`\`\`js\n${command}\n\`\`\``)
                .addField(`**Salida**`, `\`\`\`js\n${inspect(evaled, { depth: 0 })}\n\`\`\``);

            if (inspect(evaled, { depth: 0 }).length >= 2000) {
                message.channel.send({ content: 'el resultado de la evaluacion es muy largo' });
            } else if (inspect(evaled, { depth: 0 }).length < 1024) {
                message.channel.send({ embeds: [embed], components: [row] })
            } else {
                message.channel.send({ content: `\`\`\`js\n${inspect(evaled, { depth: 0 })}\n\`\`\``, components: [row] });
            }

        } catch (err) {
            const embedfallo = new MessageEmbed()
                .setColor(0x2f3136)
                .addField(`Entrada`, `\`\`\`js\n${command}\n\`\`\``)
                .addField(`Error`, `\`\`\`js\n${err}\n\`\`\``);

            message.channel.send({ embeds: [embedfallo], components: [row] });
        };

        const filter = (inter) => {
            if (inter.user.id == message.author.id) return true;
            return inter.reply({ content: `${inter.user.tag} no puedes hacer eso!`, ephemeral: true });
        };

        const collector = message.channel.createMessageComponentCollector({ filter });

        collector.on('collect', async int => {
            if (int.customId == 'clear') int.message.delete();
        });
    }
};