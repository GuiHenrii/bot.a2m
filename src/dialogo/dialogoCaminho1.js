async function dialogoCaminho(client, message) {
  const texto =
    "*Como podemos ajudar?* Por favor, selecione a opção desejada:\n1 - Solicitar um orçamento\n2 - Falar com o nosso SAC (Serviço de Atendimento ao Cliente)\n3 - Rastreio\n0 - Voltar ao Menu";

  await client
    .sendText(message.from, texto)
    .then(() => {
      console.log("Result: ", "result"); //return object success
    })
    .catch((erro) => {
      console.error("Erro ao enviar mensagem ", erro); //return object error
    });
}

export default dialogoCaminho;

async function dialogoInicial(client, message) {
  const texto =
    "Bem-vindo à Loja Tendenci! Por favor, escolha o item desejado enviando a numeração correspondente.\nJá é cliente nosso?\n1 - Sim\n2 - Não";

  await client
    .startTyping(message.from) // Inicia a digitação no número de telefone do remetente
    .then(async () => {
      await client.sendText(message.from, texto);
      console.log("Mensagem enviada com sucesso!");
    })
    .catch((erro) => {
      console.error("Erro ao enviar mensagem: ", erro);
      client.on("message", async (message) => {
        await dialogoInicial(client, message);
      });

      client.initialize();
    });
}
