const { Client, GatewayIntentBits, Partials } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  partials: [Partials.Channel]
});

const TOKEN = "YOUR_NEW_BOT_TOKEN_HERE";

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.content === "!hi") {
    message.reply("hello");
  }
});

client.login(TOKEN);
