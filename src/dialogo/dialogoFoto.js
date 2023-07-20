async function dialogoFoto(client, message) {
  await client
    .sendImage(
      message.from,
      "./assets/bi.jpg",
      "A2M",
      "Digite *0* para voltar ao menu inicial"
    )
    .then((result) => {
      console.log("Send Image"); //return object success
    })
    .catch((erro) => {
      console.error("Error when sending: ", erro); //return object error
    });
}
export default dialogoFoto;
