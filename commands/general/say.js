const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Make CORA say something")
    .addStringOption((opt) =>
      opt
        .setName("message")
        .setDescription("Text for CORA to send")
        .setRequired(true)
    ),

  async execute(interaction) {
    const message = interaction.options.getString("message");
    await interaction.reply({
      content: "✅ Message sent.",
      flags: 64,
    });
    await interaction.channel.send(message);
  },
};
