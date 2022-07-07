const OS = require('os'); 
const maxMemory = OS.totalmem();

module.exports = {
    name: "ram",
    aliases: [],
    creator: true,
    async execute(message, args, MessageEmbed, client, setCd, color, helper) {

        function getMemoryUsage() {
            const free = OS.freemem(); 
            return {
                max: memory(maxMemory),
                free: memory(free),
                used: memory(maxMemory - free), 
                usedByProcess: memory(process.memoryUsage().rss)
            };
        };

        function memory(bytes = 0) {
            const gigaBytes = bytes / 1024 ** 3; 
    
            if (gigaBytes > 1) return `${gigaBytes.toFixed(1)} GB`; 
 
            const megaBytes = bytes / 1024 ** 2; 

            if (megaBytes < 10) return `${megaBytes.toFixed(2)} MB`; 
            if (megaBytes < 100) return `${megaBytes.toFixed(1)} MB`; 
            return `${Math.floor(megaBytes)} MB`; 
        };

        const memoria = getMemoryUsage();
                
        const embed = new MessageEmbed()
            .addField('Memoria maxima', memoria.max)
            .addField('Memoria libre', memoria.free)
            .addField('Memoria usada por el bot', memoria.usedByProcess)
            .setColor(0x2f3136);

        message.channel.send({ embeds: [embed], allowedMentions: { repliedUser: false } });

    }
};