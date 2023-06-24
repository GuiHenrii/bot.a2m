async function dialogoCredencial(client, message) {
  const texto = "*Por Favor digite seu nome completo e CPF.*"

  await client
    .sendText(message.from, texto)
    .then(() => {
      console.log('Result: ', "result"); //return object success
    })
    .catch((erro) => {
      console.error('Erro ao enviar mensagem ', erro); //return object error
    });
}

export default dialogoCredencial;