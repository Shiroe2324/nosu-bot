const schemas = require('../../utils/schemas');

module.exports = {
    name: 'afk',
    aliases: [],
    cd: 10000,
    async execute(message, args, MessageEmbed, Util, client, cmd, setCd, color, helper) {

        setCd()
        const guild = await schemas.guild.findOne({ guildID: message.guild.id });

        if (!guild) {
            const newGuild = new schemas.guild({
                guildID: message.guild.id,
                afkList: [{ id: message.author.id, motive: args[0] ? args.join('') : 'No se dió motivo', time: Date.now() }]
            });
            await newGuild.save().catch(e => conole.log(e));
        } else {
            if (guild.afkList.find(user => user.id === message.author.id)) return;

            guild.afkList.push({ id: message.author.id, motive: args[0] ? args.join('') : 'No se dió motivo', time: Date.now() });
            await guild.save().catch(e => conole.log(e));
        }

        message.delete()

        const embed = new MessageEmbed()
            .setColor(await helper.getColor(message.author.id))
            .setAuthor({ name: message.author.tag, iconURL: message.guild.iconURL({ dynamic: true })})
            .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 }))
            .setTitle('AFK establecido')
            .setDescription(`**Motivo:** ${args[0] ? args.join('') : 'No se dió motivo'}`)
            .setFooter({ text: 'Avisare a quienes te mencionen'})

        message.channel.send({ embeds: [embed] }).then(msg => setTimeout(() => msg.delete(), 10000)).catch(e => {});
    }
}