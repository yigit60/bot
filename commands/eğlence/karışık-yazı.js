const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class ScrambleCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'karışık-yazı',
      group: 'eğlence',
      memberName: 'karışık-yazı',
      description: 'Yazdığınız yazıyı karıştırır.',
      details: oneLine `
               Bu komut söylediklerinizi alır ve karıştırır.
               Eğer saçmalık anlamışsanız çok yararlıdır.
			`,
      examples: ['scramble this is very hard to understand'],
      args: [{
        key: 'toScramble',
        label: 'scramble',
        prompt: 'Neyi karıştırmak istersiniz?',
        type: 'string',
        infinite: false
      }]
    })
  }

  //eslint-disable-next-line class-methods-use-this
  async run(message, args) {
    //eslint-disable-next-line no-extend-native
    String.prototype.shuffle = function() {
      let a = this.split(''),
        n = a.length

      for (let i = n - 1;i > 0;i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let tmp = a[i]
        a[i] = a[j]
        a[j] = tmp
      }

      return a.join('')
    }

    message.channel.send(args.toScramble.shuffle())
  }
};