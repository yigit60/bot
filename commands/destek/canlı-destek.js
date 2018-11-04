const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const { RichEmbed } = require('discord.js');

module.exports = class SupportCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'canlı-destek',
      group: 'destek',
      memberName: 'canlı-destek',
      description: 'Better Bot Destek Ekibi ile görüşmeye bağlanırsınız.',
      details: oneLine `
               Better Bot ile ilgili yardıma ihtiyacınız var mı?
               Geliştiricilerle iletişime geçmek ve ihtiyacınız olan yardımı almak için bu komutu kullanın!
			`,
      examples: ['support'],
      guildOnly: true,
      guarded: true
    })
  }

  async run(message) {
    let isEnabled
    let avatarURL = message.author.avatar ? message.author.avatarURL : 'https://discordapp.com/assets/0e291f67c9274a1abdddeb3fd919cbaa.png'
    const client = this.client
    message.reply('Better Bot Desteği ile iletişim kurduğunuz için teşekkür ederiz! Herhangi bir destek yetkilisi varsa, yakında sizinle iletişim kuracaktır.')
    let chan = message.channel
    let supportChan = '456597064588066825'
    const embed = new RichEmbed()
      .setTitle(':bangbang: **Yeni Destek Çağrısı** :bangbang:')
      .setAuthor(`${message.author.tag} (${message.author.id})`, `${avatarURL}`)
      .setColor(0xFF0000)
      .setDescription(`**Sunucu:** ${message.guild.name} (${message.guild.id}) \n**Kanal:** #${message.channel.name} (${message.channel.id})`)
      .setFooter('Better Bot canlı-destek sistemi')
      .setTimestamp()
		this.client.channels.get(supportChan).send('<@&457550797152976897>')
		this.client.channels.get(supportChan).send({ embed })
    const collector = this.client.channels.get(supportChan).createCollector(message => message.content.startsWith(''), {
      time: 0
    })
    this.client.channels.get(supportChan).send('Destek çağrısına bağlanmak için `katıl` yazınız.')
    collector.on('message', (message) => {
      if (message.content === 'kapat') collector.stop('aborted')
      if (message.content === 'katıl') collector.stop('success')
    })
    collector.on('end', (collected, reason) => {
      if (reason === 'time') return message.reply('Çağrı zaman aşımına uğradı.')
      if (reason === 'aborted') {
        message.reply(':x: Çağrı reddedildi.')
        this.client.channels.get(supportChan).send(':x: Başarıyla çağrı reddedildi.')
      }
      if (reason === 'success') {
        this.client.channels.get(supportChan).send(':heavy_check_mark: Destek çağrısı alındı!')
        //eslint-disable-next-line no-useless-escape
        this.client.channels.get(supportChan).send('Destek çağrısını kapatmak için `kapat` yazınız.')
        chan.send(`${message.author}`)
        chan.send(':heavy_check_mark: Çağrınız bir destek yetkilisi tarafından alındı!')
        chan.send(':hourglass:En kısa zamanda size yardımcı olacaklar.')
        //eslint-disable-next-line no-useless-escape
        chan.send('Destek çağrısını kapatmak için `kapat` yazınız.')
        isEnabled = true
        this.client.on('message', message => {
          function contact() {
            if (isEnabled === false) return
            if (message.author.id === client.user.id) return
            if (message.content.startsWith('kapat')) {
              message.channel.send(':x: Çağrı kapatıldı.')
              if (message.channel.id === chan.id) client.channels.get(supportChan).send(':x: Çağrı diğer taraftan kapatıldı.')
              if (message.channel.id === supportChan) chan.send(':x: Çağrı diğer taraftan kapatıldı.')

              return isEnabled = false
            }
            if (message.channel.id === chan.id) client.channels.get(supportChan).send(`**(Kullanıcı) ${message.author.tag}**: ${message.content}`)
            if (message.channel.id === supportChan) chan.send(`**(Canlı Destek) ${message.author.tag}:** ${message.content}`)
          }
          contact(client)
        })
      }
    })
  }
};