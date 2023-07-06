async function dialogoduvida2(client, message) {
  const texto =
    "*Faz sob medida?*\nPara fazer seu móvel ou projeto personalizado com as suas medidas, aperte 0 para voltar ao menu e solicite falar com um atendente.\n*Vem montado?*\nDependendo da medida do produto ela irá montada ou modulada em duas partes ou mais.";

  await client
    .sendText(message.from, texto)
    .then(() => {
      console.log("Result: ", "result"); //return object success
    })
    .catch((erro) => {
      console.error("Erro ao enviar mensagem ", erro); //return object error
    });
}

export default dialogoduvida2;
