const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class ReverseCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'ters-yaz',
      aliases: ['ters-yazı'],
      group: 'eğlence',
      memberName: 'ters-yazı',
      description: 'Yazdığınız yazıyı ters şekilde yazar.',
      details: oneLine `
               Bu komut sağladığınız metni alır ve tersine çevirir.
               Ne, nükleer fizik bekledin mi?
			`,
      examples: ['reverse hello this is reverse yay'],

      args: [{
        key: 'toSay',
        label: 'message',
        type: 'string',
        prompt: 'Neyi ters\'e çevirmek istersiniz?',
        infinite: false
      }]
    });
  }

  //eslint-disable-next-line class-methods-use-this
  async run(message, args) {
    let reversed = ''
    let i = args.toSay.length

    while (i > 0) {
      reversed += args.toSay.substring(i - 1, i)
      i--
    }

    message.channel.send(reversed)
  }
};