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