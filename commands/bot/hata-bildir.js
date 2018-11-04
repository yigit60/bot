const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class TavsiyeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hata-bildir',
            group: 'bot',
            memberName: 'hata-bildir',
            description: 'Bottaki bir hatayı bildirebilirsiniz.',
            args: [
                {
                    key: 'hata',
                    prompt: 'Ne hatası bildirmek istersiniz?',
                    type: 'string'
                }
            ]
        });
    }

async run(msg, args) {

    msg.reply('Hata Bildirildi! Yakında incelenecektir!');

    const embed = new RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`${msg.author.tag} adlı kullanıcının sorunu/hatası`)
    .addField(`Kulanıcı Hakkında`, `İsim: ${msg.author.tag} \n ID: ${msg.author.id}`)
    .addField("Hata", args.hata)
    .setThumbnail(msg.author.avatarURL)
    .setTimestamp()
    this.client.channels.get(`459426234804338689`).send(embed);
}
}