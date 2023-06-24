async function dialogoInicial(client, message) {
  const texto =
    " ";

  await client
    .startTyping(message.from) // Inicia a digitação no número de telefone do remetente
    .then(async () => {
      await client.sendText(message.from, texto);
      console.log("Mensagem enviada com sucesso!");
    })
    .catch((erro) => {
      console.error("Erro ao enviar mensagem: ", erro);
    });
}

client.on('message', async (message) => {
  await dialogoInicial(client, message);
});

client.initialize();