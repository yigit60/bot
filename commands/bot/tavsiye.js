const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class TavsiyeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'tavsiye',
            group: 'bot',
            memberName: 'tavsiye',
            description: 'Bot için tavsiye bildirirsiniz',
            args: [
                {
                    key: 'tavsiye',
                    prompt: 'Bot için ne tavsiyesi bildirmek istersiniz?',
                    type: 'string'
                }
            ]
        });
    }

async run(msg, args) {

    msg.reply('Tavsiyeniz bildirildi! Yakında öneriniz/tavsiyeniz hakkında geri dönüş yapılacaktır.');

    const embed = new RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`${msg.author.tag} adlı kullanıcının tavsiyesi`)
    .addField(`Kulanıcı Hakkında`, `İsim: ${msg.author.tag} \n ID: ${msg.author.id}`)
    .addField("Tavsiye", args.tavsiye)
    .setThumbnail(msg.author.avatarURL)
    .setTimestamp()
    this.client.channels.get(`454992817085743134`).send(embed);
}
}