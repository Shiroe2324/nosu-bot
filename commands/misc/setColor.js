const schemas = require('../../utils/schemas');

module.exports = {
    name: "setcolor",
    aliases: [],
    cd: 5000,
    async execute(message, args, MessageEmbed, client, setCd, color, helper) {
        const user = await schemas.user.findOne({ userID: message.author.id });

        const isOk = /^#[0-9A-F]{6}$/i.test(args[0]);

        if (!isOk) return message.channel.send(`${client.emotes.error} | ¡Por favor, proporciona un código hex válido!`);
        
        setCd()

        if (user) {
            user.color = args[0].toUpperCase();
            await user.save().catch(e => console.log(e));
        } else {
            const newUser = new schemas.user({
                userID: message.author.id,
                color: args[0].toUpperCase()
            });
            await newUser.save().catch(e => console.log(e));
        }
        message.reply(`${client.emotes.success} | Se ha actualizado el color del perfil a ${args[0].toUpperCase()}`);
    }
};