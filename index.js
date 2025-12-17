const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder
} = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Test DRAX'),

  new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show DRAX commands')
].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('🔁 Registering guild slash commands...');
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );
    console.log('✅ Slash commands registered (guild)');
  } catch (err) {
    console.error(err);
  }
})();

client.once('ready', () => {
  console.log(`🔥 DRAX online as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('🏓 Pong from DRAX');
  }

  if (interaction.commandName === 'help') {
    await interaction.reply(`
🤖 **DRAX Commands**
/ping
/help
`);
  }
});

client.login(process.env.TOKEN);
