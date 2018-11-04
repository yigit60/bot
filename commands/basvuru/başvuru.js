const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const moment = require('moment');

module.exports = class AnonsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'başvuru',
            aliases: ['başvuru-yap'],
            group: 'basvuru',
            memberName: 'başvuru',
            description: 'Başvuru yaparsınız.',
            examples: ['Merhaba!'],
 			throttling: {
                usages: 3,
                duration: 5
            },
            args: [
                {
                    key: 'yazi',
                    prompt: 'Yaşın kaçtır?',
                    type: 'string',
                },
                {
                    key: 'yazi2',
                    prompt: 'Bize kendin hakkında kısaca bilgi verir misin?',
                    type: 'string',
                },
                {
                    key: 'yazi3',
                    prompt: 'Herhangi bir deneyimin veya tecbüren var mı? Varsa nedir?',
                    type: 'string',
                },
                {
                    key: 'yazi4',
                    prompt: 'Günde aktif olabileceğin saatler?',
                    type: 'string',
                },
                {
                    key: 'yazi5',
                    prompt: 'Peki, neden seni diğerleri yerine işe almalıyız?',
                    type: 'string',
                },
            ]
        });    
    }
    
    run(msg, args) {
        const kanal = msg.guild.channels.get(msg.guild.settings.get('başvuruKanal'));
        if (!kanal) return msg.reply('Başvuru kanalını bulamıyorum.Bu yüzden başvuru sistemi devre dışıdır.Açmak için `başvuru-kanal-ayarla` komutu ile bir başvuru kanalı belirleyin.');
    
          msg.reply('Başvurunuz gönderildi, en kısa zamanda size geri dönüş yapılacaktır.');
    
          const { yazi } = args;
          const { yazi2 } = args;
          const { yazi3 } = args;
          const { yazi4 } = args;
        const embed = new RichEmbed()
        .setAuthor(`${msg.author.username} Adlı kullanıcının başvurusu.`)   
        .setColor("RANDOM")
        .setDescription(``)
        .setThumbnail(msg.author.avatarURL)
        .addField(`**• Kullanıcı:**`, `${msg.author.username}`)
        .addField(`**• Tag:**`, `${msg.author.tag}`)
        .addField(`**• Kullanıcı ID:**`,`${msg.author.id}`)
        .addField(`**• Hesap Kuruluşu:**`, `${moment.utc(msg.author.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
        .addField(`**• Yaşın kaçtır?**`, yazi)
        .addField(`**• Bize kendin hakkında kısaca bilgi verir misin?**`, yazi2)
        .addField(`**• Herhangi bir deneyimin veya tecbüren var mı? Varsa nedir?**`, yazi3)
        .addField(`**• Günde aktif olabileceğin saatler?**`, yazi4)
        .addField(`**• Peki, neden seni diğerleri yerine işe almalıyız?**`, yazi5)
        .setFooter(`Better | Başvuru Sistemi | Başvuru Formu`)
        .setTimestamp()
        return kanal.send(embed);
    
    }
};