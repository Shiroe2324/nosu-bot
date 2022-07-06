const fs = require('fs');
const { MessageEmbed, Util } = require('discord.js');
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const commandFolder = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const commandFolderPath = fs.readdirSync('./commands').filter(file => !file.endsWith('.js'));

module.exports = async(client) => {
    for (const file of commandFolder) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    }

    for (const folder of commandFolderPath) {
        const commandFilePath = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
        for (const filePath of commandFilePath) {
            const commandPath = require(`./commands/${folder}/${filePath}`);
            client.commands.set(commandPath.name, commandPath);
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