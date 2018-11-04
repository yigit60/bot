const Command = require('../../structures/Command');
const { stripIndents } = require('common-tags');
const slots = ['🔧', '💎', '💰', '💵', '💳'];

module.exports = class SlotsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'slot',
			group: 'eğlence',
			memberName: 'slot',
			description: 'Slot makinesi ile oynarsınız.'
		});
	}

	run(msg) {
		const slotOne = slots[Math.floor(Math.random() * slots.length)];
		const slotTwo = slots[Math.floor(Math.random() * slots.length)];
		const slotThree = slots[Math.floor(Math.random() * slots.length)];
		if (slotOne === slotTwo && slotOne === slotThree) {
			return msg.reply(stripIndents`
				${slotOne}|${slotTwo}|${slotThree}
				Woww! Kazandın! Helal!
			`);
		}
		return msg.reply(stripIndents`
			${slotOne}|${slotTwo}|${slotThree}
			Olamazz! Kaybettin! Şanssızlık olmalı bu!
		`);
	}
};