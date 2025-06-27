const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  const commandsPath = path.join(__dirname, "..", "commands");
  const folders = fs.readdirSync(commandsPath);

  for (const folder of folders) {
    const files = fs
      .readdirSync(`${commandsPath}/${folder}`)
      .filter((file) => file.endsWith(".js"));

    for (const file of files) {
      const command = require(`../commands/${folder}/${file}`);
      client.commands.set(command.data.name, command);
    }
  }
};
