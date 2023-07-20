async function dialogoFuncional(client, message) {
  const texto = "1 - Encaminhar foto\n2 - Encaminhar texto\n3 - Encaminhar audio\n0 - Voltar ao menu"

  await client
  .sendText(message.from, texto)
  .then(() => {
    console.log('Send Message'); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });
}
export default dialogoFuncional