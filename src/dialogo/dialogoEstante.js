async function dialogoEstante(client, message) {
  const texto =
    "*Certo, vou encaminhar para o nosso atendente.*\nEle responderá em breve.\nEnquanto isso navegue na nossa categorias quadros.\nhttps://www.tendenci.com.br/collections/todos-os-quadros-decorativos";

  await client
    .sendText(message.from, texto)
    .then(() => {
      console.log("Result: ", "result"); //return object success
    })
    .catch((erro) => {
      console.error("Erro ao enviar mensagem ", erro); //return object error
    });
}

export default dialogoEstante;
