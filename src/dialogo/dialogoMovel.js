async function dialogoMovel(client, message) {
  const texto = "1 - gostaria de personalizar moveis\n2 - falar com um atendente\n3 - Duvidas Frequentes sobre moveis\n0 - Voltar ao Menu\nsegue nossa linha de móveis.\nhttps://www.tendenci.com.br/collections/todos-os-moveis"

  await client
    .sendText(message.from, texto)
    .then(() => {
      console.log('Result: ', "result"); //return object success
    })
    .catch((erro) => {
      console.error('Erro ao enviar mensagem ', erro); //return object error
    });
}

export default dialogoMovel;