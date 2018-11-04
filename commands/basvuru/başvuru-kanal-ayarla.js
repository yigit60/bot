const { Command } = require('discord.js-commando');

module.exports = class ModChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'başvuru-kanal-ayarla',
            aliases: ['başvurukanal'],
            group: 'basvuru',
            memberName: 'başvuru-kanal-ayarla',
            description: 'Başvuruların gönderileceği kanalı ayarlar.',
            guildOnly: true,
			throttling: {
                usages: 3,
                duration: 5
            },
            args: [
                {
                    key: 'channel',
                    prompt: 'Hangi kanal başvuru kanalı olarak kullanılsın?',
                    type: 'channel'
                }
            ]
        });
    }
    
    hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission('ADMINISTRATOR');
    }
    

    async run(msg, args) {
        
        const { channel } = args;
        msg.guild.settings.set('başvuruKanal', channel.id);
        return msg.reply(`Başvuru formlarının gönderileceği kanal <#${channel.id}> kanalı olarak ayarlandı.`);
    }
};