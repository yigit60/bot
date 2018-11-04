const { Command } = require('discord.js-commando')
const { RichEmbed } = require('discord.js');

module.exports = class channelinfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ayarlar',
			group: 'ayarlar',
			memberName: 'ayarlar',
			description: 'Sunucudaki ayarları gösterir.',
			guildOnly: true,
		});
	}
	
	    hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission('MANAGE_MESSAGES');
    }
	
	async run(msg) {
        
		const modlog = msg.guild.channels.get(msg.guild.settings.get('modLog'))
		const basvuru = msg.guild.channels.get(msg.guild.settings.get('başvuruKanal'))
		const girisRol = msg.guild.roles.get(msg.guild.settings.get('girisRol'))

		const embed = new RichEmbed()
		.setColor('RANDOM')
		.setAuthor(msg.guild.name)
		.setThumbnail(msg.guild.iconURL)
		.addField('Mod-Log Kanalı', modlog ? modlog : 'Ayarlanmamış.', true)
		.addField(`Başvuru Kanalı`, basvuru ? basvuru : 'Ayarlanmamış.', true)
		.addField(`Giriş Rolü`, girisRol ? girisRol : 'Ayarlanmamış.', true)
		return msg.embed(embed)

	}
}