const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class EmbedCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'saat-kaç',
            group: 'eğlence',
            memberName: 'saat-kaç',
            description: 'Saati söyler.',
        });    
    }

    run(msg) {

            const embed = new RichEmbed()
            .setColor("RANDOM")
            .setFooter(`Saat:`)
            .setTimestamp()
            return msg.embed(embed)
        }
};