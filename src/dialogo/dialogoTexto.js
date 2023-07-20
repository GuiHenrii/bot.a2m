async function dialogoTexto(client, message) {
  const texto =
    "Descubra o Futuro do Atendimento ao Cliente🤖\n\n🤖Atendimento 24 Horas e 7 dias por semana.\n🚀 Respostas Instantâneas.\n🎯 Mensagens personalizadas.\n📈 Aumento da Eficiência,\n🔒 Suporte Técnico Instantâneo\n\nNão perca mais clientes devido a problemas no atendimento\n\nDigite *0* para voltar ao menu inicial.";

  await client
    .sendText(message.from, texto)
    .then(() => {
      console.log("Send Message"); //return object success
    })
    .catch((erro) => {
      console.error("Error when sending: ", erro); //return object error
    });
}
export default dialogoTexto;
