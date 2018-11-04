const Command = require('../../structures/Command');
const { letterTrans } = require('custom-translate');
const dictionary = require('../../assets/json/emojify');

module.exports = class EmojifyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'emoji-yazısı',
			group: 'eğlence',
			memberName: 'emoji-yazısı',
			description: 'Yazdığınız yazıyı emojili hale getirir.',
			args: [
				{
					key: 'text',
					prompt: 'Emojili hale getirmek istediğiniz yazıyı yazınız?',
					type: 'string',
					validate: text => {
						if (letterTrans(text.toLowerCase(), dictionary, ' ').length < 2000) return true;
						return 'Geçersiz metin, metniniz çok uzun.';
					},
					parse: text => text.toLowerCase()
				}
			]
		});
	}

	run(msg, { text }) {
		return msg.say(letterTrans(text, dictionary, ' '));
	}
};