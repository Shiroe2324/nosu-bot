const DIG = require("discord-image-generation");
const Discord = require('discord.js')

module.exports = {
    name: 'gay',
    aliases: ['homo'],
    cd: 4500,
    async execute(message, args, MessageEmbed, Util, client, cmd, setCd, color, helper) {
        const memberFind = helper.findMember(message, args);
        if (memberFind == 'No found user') return message.channel.send(`${client.emotes.error} | No pude encontrar a ese usuario`);
        const member = memberFind == 'No found mention' ? message.member : message.guild.members.cache.get(memberFind[0]);

        setCd()
        const avatar = member.user.avatarURL({ format: 'png', dynamic: false, size: 2048 });
        const img = await new DIG.Gay().getImage(avatar);

        const attach = new Discord.MessageAttachment(img, "gay.png");
        message.reply({ files: [attach] })
    }
}
