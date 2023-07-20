async function dialogoSite(client, message) {
  const texto =
    "*Acesse o nosso site e descubra a maravilha da tecnologia.*\nhttps://www.a2mprodutora.com.br/\n\nDigite *0* para voltar ao menu inicial.";

  await client
    .sendText(message.from, texto)
    .then(() => {
      console.log("Result: ", "result"); //return object success
    })
    .catch((erro) => {
      console.error("Erro ao enviar mensagem ", erro); //return object error
    });
}

export default dialogoSite;
