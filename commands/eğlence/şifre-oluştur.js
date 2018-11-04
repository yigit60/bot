const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class RandTextCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'şifre-oluştur',
      aliases: ['rastgele-şifre'],
      group: 'eğlence',
      memberName: 'şifre-oluştur',
      description: 'Belirttiğiniz uzunluğa göre rastgele bir şifre oluşturur.',
      details: oneLine `
               Rastgele harflere ihtiyacınız var mı? Saçmalamayı sever misin?
               Bu komut, rastgele bir harf ve sayı dizisi oluşturur.
               belirttiğiniz boyutta.
			`,
      examples: ['random 15'],
      args: [{
        key: 'toRand',
        label: 'randtext',
        prompt: 'Şifre\'nin uzunluğunun ne kadar olmasını istersin?',
        type: 'float',
        infinite: false
      }]
    })
  }

  //eslint-disable-next-line class-methods-use-this
  async run(message, args) {
    message.reply('İstediğiniz uzunlukta şifre oluşturup, özel mesaj olarak yollandı.');

    function randomtext() {
      let text = '';
      //eslint-disable-next-line no-useless-escape
      let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,!?@#$%^&()-_=+/|\{\}"\'';

      for (let i = 0;i < args.toRand;i++) text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }

    let random = randomtext()
    message.delete(1)
      .then(() => {
        message.author.send(random)
      })
  }
};