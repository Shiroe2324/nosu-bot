module.exports = {
    name: 'icon',
    aliases: ['iconserver', 'servericon'],
    async execute(message, args, MessageEmbed, Util, client, cmd, setCd, color, helper) {

        if (message.guild.iconURL() === null) return message.reply(`${client.emotes.error} | El servidor no cuenta con una imagen o icono`)
        
        const embed = new MessageEmbed()
            .setAuthor({ name: `Icono de ${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setImage(`${message.guild.iconURL({ dynamic: true, size: 2048 })}`)
            .addField(`Imagen completa`, `[click aquí](${message.guild.iconURL({ dynamic: true, size: 2048 })})`)
            .setColor(color)
            .setFooter({ text: `ID: ${message.guild.id}` });

        message.channel.send({ embeds: [embed] });
    }
};