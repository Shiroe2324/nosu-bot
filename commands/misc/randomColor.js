const superagent = require('superagent');

module.exports = {
    name: 'randomcolor',
    aliases: ['randcolor', 'colorandom'],
    async execute(message, args, MessageEmbed, client, setCd, color, helper) {

        var color = '';
        for (let x = 0; x < 6; x++) {
            color += `${Math.floor(Math.random() * 16).toString(16)}`;
        };
        
        const { body } = await superagent.get(`https://api.alexflipnote.dev/color/${color}`);

        const embed = new MessageEmbed()
            .setColor(`#${color}`)
            .setTitle(body.name)
            .addField("**Hex**", body.hex.toUpperCase(), true)
            .addField("**RGB**", `${body.rgb_values.r}, ${body.rgb_values.g}, ${body.rgb_values.b}`, true)
            .setImage(body.image);

        message.channel.send({ embeds: [embed] });
    }
};