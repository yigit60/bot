const Command = require('../../structures/Command');
const request = require('node-superfetch');

module.exports = class DogCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'köpek',
			aliases: ['köpek-foto'],
			group: 'eğlence',
			memberName: 'köpek',
			description: 'Rastgele bir köpek fotoğrafı atar.',
			clientPermissions: ['ATTACH_FILES']
		});
	}

	async run(msg) {
		try {
			const { body } = await request.get('https://dog.ceo/api/breeds/image/random');
			return msg.say({ files: [body.message] });
		} catch (err) {
			return msg.reply(`Bir hata oluştu: \`${err.message}\`. Daha sonra tekrar dene!`);
		}
	}
};