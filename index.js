require('dotenv').config();
const { Client, Intents, Collection } = require('discord.js');
const intents = new Intents(32767);
const client = new Client({ intents });
const handlingSystem = require('./handler');

client.emotes = require('./utils/emotes.json');
client.cooldowns = new Map(); 
client.commands = new Collection();

process.on('unhandledRejection', (error) => console.error(error));
handlingSystem(client);

client.login(process.env.TOKEN);