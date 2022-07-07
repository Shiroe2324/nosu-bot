const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = async (message, embed, elementSize, elementFit) => {

    const createButton = (emoji, id, disabled) => {
        return new MessageButton()
            .setStyle('SECONDARY')
            .setLabel('')
            .setEmoji(emoji)
            .setCustomId(id)
            .setDisabled(disabled);
    };

    const backButton2Off = createButton('⏪', 'back2Off', true);
    const backButton2 = createButton('⏪', 'back2', false);
    const backButtonOff = createButton('⬅️', 'backOff', true);
    const backButton = createButton('⬅️', 'back', false);
    const forwardButton2Off = createButton('⏩', 'forward2Off', true);
    const forwardButton2 = createButton('⏩', 'forward2', false);
    const forwardButtonOff = createButton('➡️', 'forwardOff', true);
    const forwardButton = createButton('➡️', 'forward', false);
    const exitButton = createButton('❌', 'exit', false);

    const embedMessage = await message.channel.send({
        embeds: [await embed(0)],
        components: elementSize <= elementFit ? [] : [
            new MessageActionRow({
                components: [backButton2Off, backButtonOff, exitButton, forwardButton, forwardButton2]
            })
        ]
    });

    if (elementSize <= elementFit) return;

    const filter = (inter) => {
        if (inter.user.id == message.author.id) return true;
        switch (inter.customId) {
            case 'exit': return inter.reply({
                content: `${inter.user.tag} No puedes quitar los botones si no hiciste el comando`,
                ephemeral: true
            });
            default: return inter.reply({
                content: `${inter.user.tag} No puedes pasar de pagina si no hiciste el comando`,
                ephemeral: true
            });
        }
    };

    const collector = embedMessage.createMessageComponentCollector({ filter, time: 120000 });

    let currentIndex = 0;

    collector.on('collect', async (inter) => {
        switch (inter.customId) {
            case 'back': currentIndex -= elementFit; break;
            case 'forward': currentIndex += elementFit; break;
            case 'back2': currentIndex -= elementFit * 5; break;
            case 'forward2': currentIndex += elementFit * 5; break;
            case 'exit': return await inter.update({ embeds: [await embed(currentIndex)], components: [] });
        }

        if (currentIndex < 0) currentIndex = 0;

        if (elementFit == 10) {
            if (currentIndex >= elementSize) currentIndex = parseInt(elementSize / 10) * 10;
        } else if (elementFit == 5) {
            if (currentIndex >= elementSize) currentIndex = elementSize > (parseInt(elementSize / 10) * 10) + 5 ? ((parseInt(elementSize / 10) * 10) + 5) : parseInt(elementSize / 10) * 10;
            if (currentIndex == elementSize) currentIndex = elementSize - 5;
        }

        await inter.update({
            embeds: [await embed(currentIndex)],
            components: [
                new MessageActionRow({
                    components: [
                        ...(currentIndex >= elementFit ? [backButton2] : [backButton2Off]),
                        ...(currentIndex ? [backButton] : [backButtonOff]),
                        exitButton,
                        ...(currentIndex + elementFit < elementSize ? [forwardButton] : [forwardButtonOff]),
                        ...(currentIndex < elementSize - elementFit ? [forwardButton2] : [forwardButton2Off])
                    ]
                })
            ]
        })
    })

    collector.on('end', async (collected) => {
        await embedMessage.edit({ embeds: [await embed(currentIndex)], components: [] })
    })
};