const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class FLeaveCommand extends commando.Command {
	constructor(bot) {
		super(bot, {
			name: 'ayrıl',
			group: 'admin',
			memberName: 'ayrıl',
			description: 'Bot istenen sunucudan ayrılır.',
			examples: ['fleave 1234567890'],

			args: [{
				key: 'toLeave',
				label: 'toLeave',
				prompt: 'Botun ayrılmasını istediğiniz sunucunun İD\'sini yazınız.',
				type: 'string',
				infinite: false
			}],

			guarded: true
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author);
	}

	async run(message, args) {
		let found = 0
		let guild = this.client.guilds.get(args.toLeave)
		guild.channels.map((c) => {
			if (found === 0) {
				if (c.type === 'text') {
					if (c.permissionsFor(this.client.user).has('VIEW_CHANNEL') === true) {
						if (c.permissionsFor(this.client.user).has('SEND_MESSAGES') === true) {
							c.send('Botun buradan ayrılması istendi. Bot sunucudan ayrılıyor... \n Geliştiricilerimle konuşmak isterseniz, onları burada bulabilirsiniz: https://discord.gg/tmQjRgv')
							found = 1
						}
					}
				}
      }
      return null;
		})
		guild.leave()
		message.reply('Bot sunucudan ayrıldı.')
	}
};