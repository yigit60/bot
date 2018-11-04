const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class mesajCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'mesaj',
            group: 'bot',
            memberName: 'mesaj',
            description: 'Bot sahibine mesaj gönderir.',
            args: [
                {
                    key: 'mesaj',
                    prompt: 'Sahibime ne mesajı iletmek istersiniz?',
                    type: 'string'
                },
                {
                    key: 'link',
                    prompt: 'Mesaj gönderdiğiniz sunucunun davet linkini atınız.',
                    type: 'string'
                }
            ]
        });
    }

async run(msg, args) {

    msg.reply('Mesajınız sahibime iletildi!');

    const embed = new RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`${msg.author.tag} adlı kullanıcının mesajı`)
    .addField(`Kulanıcı Hakkında`, `İsim: ${msg.author.tag} \n ID: ${msg.author.id}`)
    .addField("Mesaj", args.mesaj)
    .addField("Davet Linki", args.link)
    .setThumbnail(msg.author.avatarURL)
    .setTimestamp()
    this.client.users.get(`427400103377108992`).send(embed);
}
}