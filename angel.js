const { Client, GatewayIntentBits, Events } = require('discord.js');

// Canal onde o bot avisa quem ENTROU no servidor
const CANAL_ENTRADA_ID = '1492972678402015362';

// Canal onde o bot avisa quem SAIU do servidor
const CANAL_SAIDA_ID = '1492972786094968852';

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

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  if (message.content === '!opa') {
    const regrasParte1 = `@everyone

╭━━━〔 📜 Regras Oficiais do Servidor 〕━━━╮

Seja bem-vindo(a) ao servidor. Para manter tudo organizado, agradável e seguro para todos, leia e respeite as regras abaixo. Ao permanecer aqui, você concorda com todas elas.

**1. Respeito em primeiro lugar**
Trate todos com respeito. Não serão tolerados insultos, humilhações, provocações excessivas, perseguições, discriminação ou qualquer atitude que prejudique a convivência.

**2. Proibido causar brigas e confusões**
Discussões sem motivo, tretas, indiretas para gerar confusão e atitudes para desestabilizar o servidor não serão aceitas. Problemas devem ser resolvidos com maturidade.

**3. Sem spam ou flood**
Não envie mensagens repetidas, textos exagerados em sequência, marcações sem necessidade, correntes, divulgação fora do lugar ou qualquer conteúdo que atrapalhe o chat.

**4. Divulgação só com permissão**
É proibido divulgar servidores, perfis, links, lojas, canais, grupos ou qualquer projeto próprio sem autorização da staff ou fora do canal correto.

**5. Conteúdo impróprio não é permitido**
Não envie conteúdo inadequado, ofensivo ou que desrespeite a comunidade. Mantenha o ambiente limpo e confortável para todos.

**6. Use os canais corretamente**
Cada canal tem sua função. Evite mandar assuntos fora do lugar para manter a organização do servidor.`;

    const regrasParte2 = `**7. Respeite a staff e as decisões**
A equipe está aqui para organizar e proteger o servidor. Desrespeito à staff, deboche em moderação ou tentativa de atrapalhar decisões poderá resultar em punição.

**8. Proibido se passar por outras pessoas**
Não finja ser membro, staff, parceiro, bot ou qualquer outra pessoa. Isso inclui nomes, perfis e atitudes que causem confusão.

**9. Nada de perturbar chamadas**
Em calls, evite gritos, sons altos, barulhos irritantes, músicas sem permissão ou qualquer comportamento que atrapalhe os demais.

**10. Compras e suporte com responsabilidade**
Nos canais de compra e suporte, mantenha clareza, respeito e paciência. Tentativas de enganar, tumultuar ou atrapalhar atendimentos não serão aceitas.

**11. Denúncias e problemas**
Caso algo aconteça, procure a staff da forma correta. Não tente resolver tudo no chat geral criando exposição ou confusão desnecessária.

**12. Bom senso sempre**
Nem tudo precisa estar escrito para ser entendido. Se algo claramente prejudica o servidor, a staff poderá agir mesmo que não esteja detalhado em uma regra específica.

╰━━━〔 ⚠️ Punições 〕━━━╯

As punições podem variar de acordo com a gravidade da situação, podendo incluir:
Aviso, mute, perda de acesso a canais, kick ou ban.

╭━━━〔 ✅ Aviso Final 〕━━━╮

O objetivo do servidor é manter uma comunidade ativa, divertida e organizada para todos. Colabore com a paz do ambiente e aproveite sua estadia da melhor forma.

Atenciosamente,
**Equipe da Staff**
╰━━━━━━━━━━━━━━━━━━━━━━╯`;

    try {
      await message.channel.send({
        content: regrasParte1,
        allowedMentions: { parse: ['everyone'] }
      });

      await message.channel.send({
        content: regrasParte2
      });
    } catch (error) {
      console.error('Erro ao enviar regras:', error);
      message.reply('Não consegui enviar as regras. Verifique as permissões do bot.');
    }
  }
});

// Quando alguém entra no servidor
client.on(Events.GuildMemberAdd, async (member) => {
  const canalEntrada = member.guild.channels.cache.get(CANAL_ENTRADA_ID);
  if (!canalEntrada) return;

  try {
    await canalEntrada.send(
      `🎉 ${member} entrou no servidor. Seja bem-vindo(a)! Aqui você pode fazer novas amizades, conversar com a comunidade e conhecer nossos serviços.

Esperamos que você tenha uma ótima experiência e aproveite tudo que o servidor oferece.`
    );
  } catch (error) {
    console.error('Erro ao enviar mensagem de entrada:', error);
  }
});

// Quando alguém sai do servidor
client.on(Events.GuildMemberRemove, async (member) => {
  const canalSaida = member.guild.channels.cache.get(CANAL_SAIDA_ID);
  if (!canalSaida) return;

  try {
    await canalSaida.send(
      `😢 ${member.user.tag} saiu do servidor. Sua saída foi registrada.

Agradecemos pelo tempo que passou aqui e desejamos tudo de bom para você. As portas estarão abertas caso queira voltar no futuro.`
    );
  } catch (error) {
    console.error('Erro ao enviar mensagem de saída:', error);
  }
});

client.login(process.env.TOKEN);
