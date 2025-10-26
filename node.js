// index.js
require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');

const TOKEN = process.env.TOKEN;
const PREFIX = process.env.PREFIX || '!';

if (!TOKEN) {
  console.error('ERROR: No TOKEN found in .env. Add TOKEN=your_bot_token');
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  // ignore bots (including itself)
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/\s+/);
  const command = args.shift().toLowerCase();

  if (command === 'hi') {
    message.channel.send('hello');
  }
});

// login
client.login(TOKEN).catch(err => {
  console.error('Failed to login:', err);
  process.exit(1);
});
