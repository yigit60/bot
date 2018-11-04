const {Command} = require('discord.js-commando'),
  {stripIndents} = require('common-tags');
const { RichEmbed } = require('discord.js');

module.exports = class CheckGuildsCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'sunucular',
      aliases: ['sunucu-listesi'],
      memberName: 'sunucular',
      group: 'admin',
      description: 'Botun bulunduğu sunucuları gösterir.',
      guildOnly: false,
      ownerOnly: true
    });
  }

  run (msg) {

    const embed = new RichEmbed()
    .setColor('RANDOM')
    .setThumbnail(this.client.user.avatarURL)
    .setAuthor(`Better Bot | Sunucular`, this.client.user.avatarURL)    
    .setDescription(stripIndents`Bot ${this.client.guilds.size} tane sunucuda bulunuyor.
        
        **Sunucu Listesi:**
        ●${this.client.guilds.map(m => m.name).join('\n●')}`, {split: true});
    return msg.embed(embed)
  }
};