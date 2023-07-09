async function dialogoduvida1(client, message) {
  const texto =
    "*Vem pronto para por na parede?*\n\nSim, os quadros já vão prontos para ser instalados, são impressões em alta resolução feitas no tecido canvas e colocadas no chassi de madeira tratada.\n\n*E pintura?*\n\nSão impressões em alta\n\nresolução feitas em canvas que é um tecido 100% algodão, por isso dão esse efeito de pintura.\n\n*Faz sob medida?*\n\nFazemos sim, qual medida você precisa?\n\n*Somente as imagens do site?*\n\nNão, dependendo da imagem que você precisa podemos encontrar a mesma ou similar também:)";

  await client
    .sendText(message.from, texto)
    .then(() => {
      console.log("Result: ", "result"); //return object success
    })
    .catch((erro) => {
      console.error("Erro ao enviar mensagem ", erro); //return object error
    });
}

export default dialogoduvida1;
