async function dialogoAudio(client, message) {
  const texto1 = "Digite *0* para voltar ao menu inicial."
  await client
    .sendVoice(message.from, "./assets/marcos.mp3")
    await client
    .sendText(message.from, texto1)
    .then(async () => {
      
      })
    .catch((erro) => {
      console.error('Erro ao enviar mensagem ', erro); //return object error
    });
}
export default dialogoAudio;
