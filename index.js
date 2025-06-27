require("dotenv").config();
const { Client, GatewayIntentBits, Collection, Events } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

// Buat instance client dengan intent minimal untuk command
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// Koleksi untuk command
client.commands = new Collection();

// Load command handler
require("./handlers/commandHandler")(client);

// Load event handler
require("./handlers/eventHandler")(client);

// Handle command execution (fallback jika belum ditangani di eventHandler)
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    console.warn(`⚠️ Command not found: ${interaction.commandName}`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(
      `❌ Error executing command ${interaction.commandName}:`,
      error
    );

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "⚠️ There was an error while executing this command.",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "⚠️ There was an error while executing this command.",
        ephemeral: true,
      });
    }
  }
});

// Jalankan bot
client.login(process.env.DISCORD_TOKEN);
