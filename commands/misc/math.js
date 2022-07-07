const math = require("math-expression-evaluator");

module.exports = {
    name: 'math',
    aliases: ["calc"],
    async execute(message, args, MessageEmbed, client, setCd, color, helper) {

        if (!args[0]) return message.channel.send(`${client.emotes.error} | Por favor ingrese una **expresion matematica**`);

        let entrada = helper.multiSplit(args.join(" ").toLowerCase(), ['√', '×', 'π', 'x', '÷', '\\'], ['root', '*', 'pi', '*', '/', '/']);
        let resultado;

        try {
            resultado = math.eval(entrada);
        } catch (e) {
            return message.channel.send(`${client.emotes.error} | La operación no es válida`);
        };

        const embed = new MessageEmbed()
            .setColor(color)
            .setAuthor({ name: 'Calculadora', iconURL: client.user.avatarURL() })
            .addField("Entrada:", `\`\`\`yml\n${multiSplit(entrada, ['root', 'pi'], ['√', 'π'])}\`\`\``)
            .addField("Salida", `\`\`\`yml\n${resultado}\`\`\``);

        message.channel.send({ embeds: [embed] });
    }
};