async function dialogoAtendente(client, message) {
  const texto = "*Certo, vou encaminhar para o nosso atendente.* *Ele responderá a você em breve.*"

  await client
    .sendText(message.from, texto)
    .then(() => {
      console.log('Result: ', "result"); //return object success
    })
    .catch((erro) => {
      console.error('Erro ao enviar mensagem ', erro); //return object error
    });
}

export default dialogoAtendente;