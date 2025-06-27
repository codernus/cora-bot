require("dotenv").config();
const { Client, GatewayIntentBits, Collection, Events } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();

require("./handlers/commandHandler")(client);

require("./handlers/eventHandler")(client);

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

client.login(process.env.DISCORD_TOKEN);
