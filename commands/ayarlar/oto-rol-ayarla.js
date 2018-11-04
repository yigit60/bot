const { Command } = require('discord.js-commando');

module.exports = class JoinRoleCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'oto-rol-ayarla',
			aliases: ['girişrolüayarla', 'girişrolü', 'giriş-rolü', 'girisrolu', 'girisrol', 'girişrol', 'girisroluayarla'],
			group: 'ayarlar',
			memberName: 'oto-rol-ayarla',
			description: 'Giriş rolü ayarlamanızı/belirlemenizi sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'rol',
					prompt: 'Hangi rol giriş rolü olarak ayarlansın? (rol ismini yazınız)\n',
					type: 'role',
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg, args) {
			const vt = this.client.provider.get(msg.guild.id, 'girisRol', []);
			const db = this.client.provider.get(msg.guild.id, 'girisRolK', []);
			if (vt === args.rol.id) {
				this.client.provider.set(msg.guild.id, 'girisRolK', true);
				msg.channel.send(`Giriş rolü zaten **${args.rol.name}** olarak ayarlı.`);
			} else {
				this.client.provider.set(msg.guild.id, 'girisRol', args.rol.id);
				this.client.provider.set(msg.guild.id, 'girisRolK', true);
				return msg.channel.send(`Giriş rolü **<@${args.rol.id}>** rolü olarak ayarlandı.`);
			}
	}
};