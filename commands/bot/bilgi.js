const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment');
const { stripIndents } = require('common-tags');
require('moment-duration-format');

module.exports = class InfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'bilgi',
			aliases: ['b', 'info', 'bot info', 'botinfo'],
			group: 'bot',
			memberName: 'bilgi',
			description: 'Bot ile ilgili bilgi verir.',
			guildOnly: false,
			throttling: {
				usages: 2,
				duration: 3
			}
		});
	}

	async run(msg) {
		var embed = {
			color: 3447003,
			description: `**Bilgi**`,
			fields: [
				{
					name: '❯ Yapımcı',
					value: '<@427400103377108992>',
					inline: false
				},
				{
					name: '❯ Davet',
					value: `https://discordapp.com/api/oauth2/authorize?client_id=456220451627073537&permissions=8&scope=bot`,
					inline: false
				},
				{
					name: '❯ Destek sunucusu',
					value: `https://discord.gg/gsx4QTv`,
					inline: false
				},
			],
			footer: {
			  icon_url: this.client.user.avatarURL,
			  text: "© 2018 Better Bot"
			},
			thumbnail: { url: this.client.user.avatarURL }
    };
		return msg.channel.send({embed});
	}
};