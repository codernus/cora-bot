const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check if CORA is responsive"),

  async execute(interaction) {
    try {
      await interaction.reply("🏓 Pong! CORA is alive.");
    } catch (error) {
      console.error("❌ Error replying to ping:", error);
      if (!interaction.replied) {
        await interaction.reply({
          content: "⚠️ Ping failed.",
          ephemeral: true,
        });
      }
    }
  },
};
