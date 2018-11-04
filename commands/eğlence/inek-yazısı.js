const Command = require('../../structures/Command');
const request = require('node-superfetch');

module.exports = class CowSayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'inek-yazısı',
			group: 'eğlence',
			memberName: 'inek-yazısı',
			description: 'Yazdığınız şeyi bir inek söyler.',
			args: [
				{
					key: 'text',
					prompt: 'İneğin ne söylemesini istersin?',
					type: 'string',
					max: 1500
				}
			]
		});
	}

	async run(msg, { text }) {
		try {
			const { body } = await request
				.get('http://cowsay.morecode.org/say')
				.query({
					message: text,
					format: 'json'
				});
			return msg.code(null, body.cow);
		} catch (err) {
			return msg.reply(`Bir hata oluştu: \`${err.message}\`. Daha sonra tekrar deneyin!`);
		}
	}
};