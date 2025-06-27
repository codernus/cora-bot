const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("Learn more about CORA"),
  async execute(interaction) {
    await interaction.reply(
      "🌐 CORA is your all-in-one global Discord assistant!"
    );
  },
};
