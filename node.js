const { Client, GatewayIntentBits, Partials } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  partials: [Partials.Channel]
});

const TOKEN = "MTQzMTcyMzEzMzY1NTU4MDc2NA.GBDgAA.2W7anfmDRxiah-AH9lvYwWHkL2OWhaorge54TY";

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.content === "!hi") {
    message.reply("hello");
  }
});

client.login(TOKEN);
