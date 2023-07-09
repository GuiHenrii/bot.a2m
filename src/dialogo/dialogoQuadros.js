async function dialogoQuadros(client, message) {
  const texto =
    "1 - personalizar medida\n2 - falar com um atendente\n3 - Duvidas frequentes sobre Quadros\n0 - Voltar ao Menu\nsegue nossa categoria de todos os quadros\nhttps://www.tendenci.com.br/collections/estantes";

  await client
    .sendText(message.from, texto)
    .then(() => {
      console.log("Result: ", "result"); //return object success
    })
    .catch((erro) => {
      console.error("Erro ao enviar mensagem ", erro); //return object error
    });
}

export default dialogoQuadros;
