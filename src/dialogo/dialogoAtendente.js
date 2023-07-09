async function dialogoAtendente(client, message) {
  const texto = "*Certo, vou encaminhar para o nosso atendente.* *Ele responderá a você em breve.*"

  await client
    .sendText(message.from, texto)
    .then(async () => {
        // Marcar a mensagem como não lida
        const result = await client.markUnseenMessage(message.from);
        console.log('Chat marcado como não visto:', result);
      })
    .catch((erro) => {
      console.error('Erro ao enviar mensagem ', erro); //return object error
    });
}

export default dialogoAtendente;