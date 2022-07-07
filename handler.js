const fs = require('fs');
const { MessageEmbed, Util } = require('discord.js');
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const commandFolder = fs.readdirSync('./commands').filter(file => !file.endsWith('.js'));

module.exports = async (client) => {
    for (const folder of commandFolder) {
        const commandFile = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
        for (const file of commandFile) {
            const command = require(`./commands/${folder}/${file}`);
            client.commands.set(command.name, command);
        }
    }

    for (const file of eventFiles) {
        const event = require(`./events/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client, MessageEmbed, Util));
        }
    }
}