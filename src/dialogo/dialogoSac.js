async function dialogoSac(client, message) {
  const texto =
  "Como podemos ajudar? Por favor, selecione a opção desejada:\n1 - Acompanhar o status dos seus produtos\n2 - Solicitar troca ou devolução\n0 - Voltar ao Menu"
  
  await client
    .sendText(message.from, texto)
    .then(() => {
      console.log("Result: ", "result"); //return object success
    })
    .catch((erro) => {
      console.error("Erro ao enviar mensagem ", erro); //return object error
    });
}

export default dialogoSac;
