const Canvas = require('canvas');

module.exports = {
    name: 'meme',
    aliases: ['si'],
    cd: 10000,
    async execute(message, args, MessageEmbed, Util, client, cmd, setCd, color, helper) {
        const memberFind = helper.findMember(message, args);
        if (memberFind == 'No found user') return message.channel.send(`${client.emotes.error} | No pude encontrar a ese usuario`);
        const member = memberFind == 'No found mention' ? message.member : message.guild.members.cache.get(memberFind[0])

        setCd();
        const canvas = Canvas.createCanvas(586, 427);
        const ctx = canvas.getContext('2d');
        const avatar = await Canvas.loadImage(member.user.avatarURL({ size: 2048, format: 'png' }));
        const img = await Canvas.loadImage(`${process.cwd()}/unknown.jpg`);

        ctx.drawImage(img, 0, 0, 586, 427);
        ctx.drawImage(avatar, 17, 17, 252, 252);

        message.channel.send({ files: [{ attachment: canvas.toBuffer() }] });
    }
}