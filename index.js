const { 
  Client, 
  GatewayIntentBits, 
  REST, 
  Routes, 
  SlashCommandBuilder 
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// 🧩 تعريف الأوامر
const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Test the bot response'),

  new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show DRAX commands')
].map(cmd => cmd.toJSON());

// 🚀 تسجيل الأوامر
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('🔁 Registering slash commands...');
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );
    console.log('✅ Slash commands registered');
  } catch (error) {
    console.error(error);
  }
})();

client.once('ready', () => {
  console.log(`🔥 DRAX online as ${client.user.tag}`);
});

// ⚡ التعامل مع الأوامر
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('🏓 Pong from DRAX');
  }

  if (interaction.commandName === 'help') {
    await interaction.reply(`
🤖 **DRAX Commands**

/ping - Test the bot
/help - Show commands

More coming soon 🔥
`);
  }
});

client.login(process.env.TOKEN);
