const { MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
    name: 'avatar',
    aliases: ['av', 'image'],
    async execute(message, args, MessageEmbed, client, setCd, color, helper) {
        const memberFind = helper.findMember(message, args);
        if (memberFind == 'No found user') return message.channel.send(`${client.emotes.error} | No pude encontrar a ese usuario`);
        const member = memberFind == 'No found mention' ? message.member : message.guild.members.cache.get(memberFind[0]);

        const embed = async (av) => new MessageEmbed()
            .setAuthor({ name: `Avatar de ${member.user.tag}`, iconURL: av })
            .setImage(av)
            .addField(`Imagen completa`, `[click aquí](${av})`)
            .setColor(await helper.getColor(member.id))
            .setFooter({ text: `ID: ${member.user.id}` });

        if (!member.avatarURL()) {
            message.channel.send({ embeds: [await embed(member.user.avatarURL({ dynamic: true, size: 2048 }))] });
        } else {
            const globalButton = new MessageButton()
                .setCustomId('globalButton')
                .setLabel('ver avatar global')
                .setEmoji("🌏")
                .setStyle("SECONDARY");

            const serverButton = new MessageButton()
                .setCustomId('serverButton')
                .setLabel('ver avatar del servidor')
                .setEmoji("🌇")
                .setStyle("SECONDARY");

            const row = (component) => new MessageActionRow().addComponents(component);

            const msg = await message.channel.send({
                embeds: [await embed(member.user.avatarURL({ dynamic: true, size: 2048 }))],
                components: [row(serverButton)]
            });

            const filter = (inter) => {
                if (inter.user.id == message.author.id) return true;
                return inter.reply({ content: `${inter.user.tag} no puedes hacer eso!`, ephemeral: true });
            };

            const collector = msg.createMessageComponentCollector({ filter });

            collector.on('collect', async (int) => {
                if (!member.avatarURL()) {
                    int.update({ 
                        embeds: [await embed(member.user.avatarURL({ dynamic: true, size: 2048 }))],
                        components: []
                    });
                } else if (int.customId === 'serverButton') {
                    int.update({
                        embeds: [await embed(member.avatarURL({ dynamic: true, size: 2048 }))],
                        components: [row(globalButton)]
                    });
                } else if (int.customId === 'globalButton') {
                    int.update({
                        embeds: [await embed(member.user.avatarURL({ dynamic: true, size: 2048 }))],
                        components: [row(serverButton)]
                    });
                }
            });
        }
    }
};