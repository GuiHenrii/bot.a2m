async function dialogoInicial(client, message) {
  const texto =
    "Bem-vindo à Loja Tendenci! Por favor, escolha o item desejado enviando a numeração correspondente.\nJá é cliente nosso?\n1 - Sim\n2 - Não";

  await client
    .sendText(message.from, texto)
    .then(() => {
      console.log("Result: ", "result"); //return object success
    })
    .catch((erro) => {
      console.error("Erro ao enviar mensagem ", erro); //return object error
    });
}

export default dialogoInicial;
