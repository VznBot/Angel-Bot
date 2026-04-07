const { Client, GatewayIntentBits, Events } = require('discord.js');

// Canal onde o bot avisa quem ENTROU no servidor
const CANAL_ENTRADA_ID = 'COLOQUE_O_ID_DO_CANAL_DE_ENTRADA';

// Canal onde o bot avisa quem SAIU do servidor
const CANAL_SAIDA_ID = 'COLOQUE_O_ID_DO_CANAL_DE_SAIDA';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once(Events.ClientReady, () => {
  console.log(`Bot online como ${client.user.tag}`);
});

client.on(Events.MessageCreate, (message) => {
  if (message.author.bot) return;

  if (message.content === '!opa') {
    message.channel.send('Oi, tudo bem?');
  }
});

// Quando alguém entra no servidor
client.on(Events.GuildMemberAdd, (member) => {
  const canalEntrada = member.guild.channels.cache.get(CANAL_ENTRADA_ID);
  if (!canalEntrada) return;

  canalEntrada.send(`🎉 ${member} entrou no servidor. Seja bem-vindo(a)!`);
});

// Quando alguém sai do servidor
client.on(Events.GuildMemberRemove, (member) => {
  const canalSaida = member.guild.channels.cache.get(CANAL_SAIDA_ID);
  if (!canalSaida) return;

  canalSaida.send(`😢 ${member.user.tag} saiu do servidor.`);
});

client.login(process.env.TOKEN);