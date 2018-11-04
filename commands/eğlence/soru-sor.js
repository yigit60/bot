const Command = require('../../structures/Command');
const { stripIndents } = require('common-tags');
const answers = require('../../assets/json/8-ball');

module.exports = class EightBallCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'soru-sor',
			aliases: ['sorusor', 'soru'],
			group: 'eğlence',
			memberName: 'soru-sor',
			description: 'Bota soru sorarsınız.',
			args: [
				{
					key: 'question',
					prompt: 'Bota ne sormak istersiniz?',
					type: 'string',
					max: 1950
				}
			]
		});
	}

	run(msg, { question }) {
		return msg.say(stripIndents`
			${question}
		   **🗯 Cevap:** ${answers[Math.floor(Math.random() * answers.length)]} 🎱
		`);
	}
};