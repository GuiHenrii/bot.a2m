async function dialogoInicial(client, message) {
  const texto =
    "Olá. Sou o Alex, Uma inteligencia artificial desenvolvida completamente pela A2M. Como posso ajudar?\n\n1 - Vantagens do sistema\n2 - Ver Site\n3 - Funcionalidades\n4 - Falar com especialista\n5 - Falar na Administração.";

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
