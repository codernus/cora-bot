module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`✅ CORA is online as ${client.user.tag}`);
  },
};
