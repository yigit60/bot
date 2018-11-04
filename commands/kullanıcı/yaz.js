const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class YazCommand extends Command {
    constructor(client){

        super(client, {

            name: 'yaz',
            group: 'kullanıcı',
            memberName: 'yaz',
            description: 'Bota yazı yazdırırsınız.',

            args: [
                {
                    key: 'yazi',
                    prompt: 'Bota ne yazdırmak istersin?',
                    type: 'string'
                }
            ]
        })
    }


    run(msg, args) {
    const { yazi } = args;
    const embed = new RichEmbed()
    .setColor('RANDOM')
    .setTitle(`Yazılan:`)
    .setDescription(yazi)
    .setFooter(`Yazdıran: ${msg.author.tag}`, msg.author.avatarURL)
    .setTimestamp()
    msg.delete()
    return msg.embed(embed)

    }
}
