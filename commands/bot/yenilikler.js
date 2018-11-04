const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = class NewsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'yenilikler',
			group: 'bot',
			memberName: 'yenilikler',
			description: 'Bot ile ilgili yeni özellikleri gösterir.',
			guildOnly: false,
			throttling: {
				usages: 1,
				duration: 10
			}
		});
	}

	async run(msg) {
		if (msg.guild) {
			var embed = new RichEmbed()
			.setTitle('Yenilikler')
			.setDescription(stripIndents`
			**Sürüm 0.0.1**

			+ \`balık-tut\` Komutu eklendi.

			+ \`gelen-giden\` sistemi eklendi. 
			Bu sistem'i kullanmak için tek yapmanız gereken \`gelen-giden\` isminde bir metin kanalı açmaktır.Bot otomatik olarak sunucuya birisi katıldığında veya sunucudan birisi ayrıldığında açtığınız \`gelen-giden\` kanalına yazacaktır.

			+ \`oto-rol-ayarla\` Komutu eklendi.

			Komutları görmek için: \`${msg.guild.commandPrefix}yardım\` yazabilirsiniz.
			Better Bot\'u sunucularınıza eklemek için: \`${msg.guild.commandPrefix}davet\` yazabilirsiniz.
			`)
			.setColor('RANDOM');
			return msg.channel.send({embed});
		}

		var embed = new RichEmbed()
		.setTitle('Yenilikler')
		.setDescription(stripIndents`
		**Sürüm 0.0.1**

		+ \`balık-tut\` Komutu eklendi.

		+ \`gelen-giden\` sistemi eklendi. 
		Bu sistem'i kullanmak için tek yapmanız gereken \`gelen-giden\` isminde bir metin kanalı açmaktır.Bot otomatik olarak sunucuya birisi katıldığında veya sunucudan birisi ayrıldığında açtığınız \`gelen-giden\` kanalına yazacaktır.

		+ \`oto-rol-ayarla\` Komutu eklendi.

		Komutları görmek için: \`${msg.guild.commandPrefix}yardım\` yazabilirsiniz.
		Better Bot\'u sunucularınıza eklemek için: \`${msg.guild.commandPrefix}davet\` yazabilirsiniz.
		`)
		.setColor('RANDOM');

		return msg.channel.send({embed});
	}
};