const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class EmbedCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'davet',
            group: 'bot',
            memberName: 'davet',
            description: 'Bot davet linki atar.',
        }) 
    }

    async run(msg) {
		var embed = {
			color: 3447003,
			author: {
                name: 'Better Bot | Linkler',
            },
            title: 'Beni Ekle!',
            url: 'https://discordapp.com/api/oauth2/authorize?client_id=457547769159352341&permissions=8&scope=bot',
			fields: [
				{
                    name: '-----------------------------------------------------',
                    value: '[Destek Sunucum\'a gel!](https://discord.gg/tmQjRgv)',
					inline: true
                }
            ],
            footer: {
                text: "Better Bot | Davet Sistemi"
              }
            };
		msg.channel.send({embed});
	}};