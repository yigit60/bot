const { CommandoClient, FriendlyError, SQLiteProvider } = require('discord.js-commando'),
    path = require('path'),
    sqlite = require('sqlite'),
	  { PlayerManager } = require("discord.js-lavalink"),
	  oneLine = require('common-tags').oneLine,
      moment = require('moment'),
      dbaapi = require('discord-bots-api'),
      winston = require('winston'),
	  request = require('request'),
	  snekfetch = require('snekfetch'),
	  { MongoClient } = require('mongodb'),
	  MongoDBProvider = require('commando-provider-mongo'),
	  Jimp = require('jimp'),
	  fs = require('fs'),
      Discord = require('discord.js'),
    { RichEmbed } = require('discord.js');

const ayarlar = require('./data/ayarlar.json');

const client = new CommandoClient({
    commandPrefix: ayarlar.PREFIX,
    unknownCommandResponse: false,
    owner: ayarlar.SAHIP,
    disableEveryone: true
});

client.on('guildCreate', async guild => {
const girismesaj = [
    '**Better Bot sunucunuza eklendi!**',
    '**Better Bot** sunucunuzdaki insanlara ve size kolaylıklar sağlar.',
    'Bot \`! 🍊Ceyhun Y.🍊#4812\` tarafından geliştirilmektedir.',
    'Botumuzun özelliklerini öğrenmek için \`.yardım\` komutunu kullanabilirsiniz.',
    '**Better Bot Resmî Discord Sunucusu:** https://discord.gg/tmQjRgv'
]
  guild.owner.send(girismesaj)
});

client.on('guilCreate', guild => {
  const channel = guild.channels.find('name', 'better-log');
  if (!channel) return;
 const embed = new Discord.RichEmbed()
 .setColor('RANDOM')
 .setThumbnail(guild.iconURL)
 .setTitle('Sunucuya katıldım!')
 .setDescription(`Better Bot **${guild.name}** Adlı Sunucu'ya eklendi.`)
 .setFooter('Better Bot', client.user.avatarURL)
 .setTimestamp()
 channel.send(embed);
});

client.on('guilRemove', guild => {
  const channel = guild.channels.find('name', 'better-log');
  if (!channel) return;
 const embed = new Discord.RichEmbed()
 .setColor('RANDOM')
 .setThumbnail(guild.iconURL)
 .setTitle('Sunucudan atıldım!')
 .setDescription(`Better Bot **${guild.name}** Adlı Sunucu'dan atıldı.`)
 .setFooter('Better Bot', client.user.avatarURL)
 .setTimestamp()
 channel.send(embed);
});

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', 'gelen-giden');
  if (!channel) return;
 const embed = new Discord.RichEmbed()
 .setColor('RANDOM')
 .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
 .setTitle('Üye katıldı;')
 .setDescription(`📥 | <@${member.user.id}> Adlı kullanıcı Sunucu'ya katıldı! \n\n [Şuanki üye sayısı: ${member.guild.memberCount}]`)
 .setFooter('Better Bot | gelen-giden Sistemi', client.user.avatarURL)
 .setTimestamp()
 channel.send(embed);
});


client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', 'gelen-giden');
  if (!channel) return;
 const embed = new Discord.RichEmbed()
 .setColor('RANDOM')
 .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
 .setTitle('Üye ayrıldı;')
 .setDescription(`📤 | <@${member.user.id}> Adlı kullanıcı Sunucu'dan ayrıldı! \n\n [Şuanki üye sayısı: ${member.guild.memberCount}]`)
 .setFooter('Better Bot | gelen-giden Sistemi', client.user.avatarURL)
 .setTimestamp()
 channel.send(embed);
});

client.on('guildMemberAdd', async member => {
  const veri = client.provider.get(member.guild.id, 'girisRolK', []);
  if (veri ==! true) return;
  if (veri === true) {
    const girisrolveri = client.provider.get(member.guild.id, 'girisRol', []);
    if (member.guild.roles.get(girisrolveri) === undefined || member.guild.roles.get(girisrolveri) === null) return;
    member.addRole(girisrolveri);
  }
})

/**
* antispam
.on('message', async msg => {
if (!msg.guild) return;
if (msg.guild.id !== "360031789978484738") return;
const talkedRecently = new Set();
if (talkedRecently.has(msg.author.id)) {
  return msg.delete();
};
talkedRecently.add(msg.author.id);
setTimeout(() => {
  talkedRecently.delete(msg.author.id);
}, 1000);
})*/

client.on('message', msg => {
if (!msg.guild) return;
const veri = client.provider.get(msg.guild.id, 'linkEngel', []);
if (veri !== true) return;
if (veri === true) {
const swearWords = ["discord.gg", "discord.me", "discordapp.com", "discord.io", "discord.tk"];
if (swearWords.some(word => msg.content.includes(word))) {
  if (!msg.member.hasPermission("ADMINISTRATOR")) {
    return;
  }
}
var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
if (regex.test(msg.content)==true) {
  if (!msg.member.hasPermission("ADMINISTRATOR")) {
    msg.delete();
    
    return msg.reply('Reklam yapmamalısın!').then(msg => msg.delete(3000));
  } else {
    return;
  };
} else {
  return;
};
};
})

client.on('message', msg => {
  if (msg.content === '<@457547769159352341>') {
    msg.reply('Komutlarımı öğrenmek için; \n `@Better Bot#4077 yardım` veya \n `.yardım` yazabilir, \n Beni sunucuna eklemek ve Destek Sunucum\'a gelmek için ise `@Better Bot#4077 davet` veya `.davet` yazabilirsin.');
  }
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
    ['sunucu', 'Sunucu Komutları'],
    ['kullanıcı', 'Kullanıcı Komutları'],
    ['basvuru', 'Başvuru Sistemi'],
    ['eğlence', 'Eğlence Komutları'],
    ['moderasyon', 'Moderasyon Komutları'],
    ['bot', 'Bot Komutları'],
    ['ayarlar', 'Ayarlar'],
    ['admin', 'Sadece Bot Sahibinin Kullanabileceği Komutlar'],
    ['genel', 'Genel Komutlar'],
    [`destek`, `Bizimle İletişim İçin`],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

	sqlite.open(path.join(__dirname, "database.sqlite3")).then((db) => {
		client.setProvider(new SQLiteProvider(db));
	});

  client.on('ready', () => {
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] LOG: Aktif, Komutlar yüklendi!`),
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] LOG: Bot Better Bot ismi ile giriş yaptı!`);
    client.setInterval(() => {
      client.user.setActivity(".yardım | .davet", { type: "WATCHING" });
      client.user.setActivity(".yenilikler | .davet", { type: "WATCHING" });
      client.user.setActivity(`${client.guilds.size} Sunucu`, { type: "LISTENING" })
    }, 6000);
  });

client.on('error', err => {
	console.log(err)
});

client.login(ayarlar.TOKEN);