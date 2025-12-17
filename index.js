const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.once('ready', () => {
  console.log(`🔥 DRAX is online as ${client.user.tag}`);
});

client.on('messageCreate', message => {
  if (message.author.bot) return;

  if (message.content === '!ping') {
    message.reply('🏓 Pong from DRAX');
  }

  if (message.content === '!help') {
    message.reply(`
🤖 DRAX Commands

!ping - Test bot
!help - Show commands
`);
  }
});

client.login(process.env.TOKEN);
