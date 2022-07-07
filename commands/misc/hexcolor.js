const superagent = require('superagent')

module.exports = {
    name: 'hexcolor',
    aliases: ['colorhex'],
    async execute(message, args, MessageEmbed, client, setCd, color, helper) {
        const Color = args[0]?.replace("#", "");
        const isOk = /^[0-9A-F]{6}$/i.test(Color);

        if (!isOk) return message.channel.send(`${client.emotes.error} | ¡Por favor, proporciona un código hex válido!`);

        const { body } = await superagent.get(`https://api.alexflipnote.dev/color/${Color}`);

        const embed = new MessageEmbed()
            .setColor(`#${Color}`)
            .setTitle(body.name)
            .addField("**Hex**", body.hex.toUpperCase(), true)
            .addField("**RGB**", `${body.rgb_values.r}, ${body.rgb_values.g}, ${body.rgb_values.b}`, true)
            .setImage(body.image);

        message.channel.send({ embeds: [embed] });
    }
};