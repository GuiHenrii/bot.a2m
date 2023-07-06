async function dialogoPlanejado(client, message) {
  const texto =
    "1 - possui projeto\n2 - Falar com nosso atendente\n3 - não possui projeto\n0 - Voltar ao Menu\nEnvie-nos o projeto pelo e-mail :\nProjetistas@tendenci.com.br";

  await client
    .sendText(message.from, texto)
    .then(() => {
      console.log("Result: ", "result"); //return object success
    })
    .catch((erro) => {
      console.error("Erro ao enviar mensagem ", erro); //return object error
    });
}

export default dialogoPlanejado;
