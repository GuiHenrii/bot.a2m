async function dialogoAtendente(client, messagem) {
  const telefoneCliente = messagem.from
  const texto = `Atendimento`
  const assunto = `O cliente solicitou atendimento para ${messagem.body}`
  const Adm = '5534984406710@c.us'
  

  await client
  .sendContactVcard(Adm, telefoneCliente, texto)
  .then(async (result) => {
    await client
    .sendText(Adm, assunto 
      )
    .then(async () => {
      await client
      .sendText(messagem.from, "Seu atendimento foi encaminha para o nosso especialista." 
        )
      .then(async () => {
      
          console.log('Chat marcado como não visto:', result);
        })
      .catch((erro) => {
        console.error('Erro ao enviar mensagem ', erro); //return object error
      });    
        console.log('Chat marcado como não visto:', result);
      })
    .catch((erro) => {
      console.error('Erro ao enviar mensagem ', erro); //return object error
    });
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });

}

export default dialogoAtendente;