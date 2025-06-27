const { SlashCommandBuilder } = require("discord.js");

const OWNER_ID = "1374287264409976852";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shutdown")
    .setDescription("Shut down CORA (owner only)"),

  async execute(interaction) {
    if (interaction.user.id !== OWNER_ID) {
      return interaction.reply({
        content: "❌ You are not authorized to shut down CORA.",
        flags: 64,
      });
    }

    await interaction.reply({
      content: "🛑 CORA shutting down. Goodbye!",
      flags: 64,
    });
    setTimeout(() => {
      process.exit(0);
    }, 1000);
  },
};
