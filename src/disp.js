import Cliente from "./models/chat.js";
import schedule from "node-schedule";
import moment from "moment";
import { create } from "venom-bot";
import { Op } from "sequelize";
import atualizaStage from "./functions/stage.js";
import dialogoCaminho1 from "./dialogo/dialogoCaminho1.js";
import dialogoCaminho2 from "./dialogo/dialogoCaminho2.js";
import dialogoInicial from "./dialogo/dialogoInicial.js";
import dialogoOrcamento from "./dialogo/dialogoOrcamento.js";
import dialogoSac from "./dialogo/dialogoSac.js";
import dialogoCredencial from "./dialogo/dialogoCredencial.js";
import dialogofinal from "./dialogo/dialogofinal.js";
import dialogoEstante from "./dialogo/dialogoEstante.js";
import dialogoMovel from "./dialogo/dialogoMovel.js";
import dialogoAtendente from "./dialogo/dialogoAtendente.js";
import dialogoPlanejado from "./dialogo/dialogoPlanejado.js";
import dialogoQuadro from "./dialogo/dialogoQuadros.js";
import dialogoduvida1 from "./dialogo/dialogoduvida1.js";
import dialogoduvida2 from "./dialogo/dialogoDuvida2.js";

function start(client) {
  console.log("Cliente Venom iniciado!");
  // Bot ativo
  schedule.scheduleJob("*/15 * * * * *", () => {
    (async () => {
      const atendido = 0;

      const clientes = await Cliente.findAll({
        where: {
          atendido: {
            [Op.eq]: atendido,
          },
        },
      });

      if (clientes.length === 0) {
        console.log("Todos os contatos foram processados!");
        return;
      }

      for (const cliente of clientes) {
        const id = cliente.id;
        const assunto = cliente.assunto;
        const nome = cliente.nome;
        const atendido = cliente.atendido;
        console.log(assunto);

        let textmsg = `Olá, ${nome}! Tivemos uma conversa no site e gostaria de dar continuidade ao seu atendimento por aqui. Verifiquei seus dados e gostaria de confirmar se o seu nome está correto. Poderia confirmar para mim, por favor?`;

        const numero = cliente.telefone;
        const numeroDisp = "55" + numero;
        client
          .sendText(`55${numeroDisp}@c.us`, textmsg)
          .then((result) => {
            console.log(`Mensagem enviada para: ${numeroDisp}`);
          })
          .catch((error) => {
            console.error(
              `Erro ao enviar mensagem para: ${numeroDisp} - ${error}`
            );
          });

        await atualizaAtendimento(id);
      }

      console.log("Todas as mensagens foram enviadas!");
    })();
  });

  // BotReceptivo
  client.onMessage(async (message) => {
    // Verifica se a mensagem não é de grupo
    if (!message.isGroupMsg) {
      const tel = message.from.replace(/@c\.us/g, ""); // recebe o número de telefone do cliente
      // Pesquisa o cliente no banco de dados
      const cliente = await Cliente.findOne({
        raw: true,
        where: { telefone: tel },
      }); 

      // Entra nesse if caso o cliente não exista no banco de dados
      if (!cliente) {
        const telefoneContato = message.from.replace(/@c\.us/g, "");
        const dados = {
          nome: message.notifyName,
          telefone: telefoneContato,
          atendido: 1,
          assunto: "contato Whatsapp",
          stage: 1,
        };
        console.log(dados);
        const cliente = await Cliente.create(dados);
        if (message.body && dados.stage === 1) {
          // Chama o diálogo inicial
          dialogoInicial(client, message);
          const estado = 2;
          const dialogo = "dialogoinicial";
          atualizaStage(cliente.id, estado, dialogo);
        }
      } else { // Entrar else em dois casos 1° caso o cliente esteja cadastrado entra direto 2° após o primeiro if que vai cadastra o cliente no banco de dados e já vai estar com stage 2 
        //chama dialogo inicial
        const id = cliente.id;
        const stage = cliente.stage;
        //  if de seguraça para restaurar model
        if (message.body === "0") {
          const id = cliente.id;
          const clienteDialogo = await Cliente.findOne({raw: true,
            where: {
              id: id,
            },
          });
          const dialogo = clienteDialogo.dialogo
          switch (dialogo) {
            case "dialogoinicial":
              dialogoInicial(client, message);
              atualizaStage(cliente.id, 2, "reiniciar");
              break;
            case "dialogocaminho1":
              dialogoCaminho1(client, message);
              atualizaStage(cliente.id, 3, "reiniciar");
              break;
            case "dialogoOrcamento":
              dialogoOrcamento(client, message);
              atualizaStage(cliente.id, 4, "reiniciar");
              break;
            case "dialogocaminho2":
              dialogoCaminho2(client, message);
              atualizaStage(cliente.id, 3, "reiniciar");
              break;
            case "dialogoAtendente":
              dialogoAtendente(client, message);
              atualizaStage(cliente.id, 10, "reiniciar");
              break;
            case "dialogoduvida1":
              dialogoduvida1(client, message);
              atualizaStage(cliente.id, 10, "reiniciar");
              break;
            case "dialogoduvida2":
              dialogoduvida2(client, message);
              atualizaStage(cliente.id, 10, "reiniciar");
              break;
            case "dialogoEstante":
              dialogoEstante(client, message);
              atualizaStage(cliente.id, 10, "reiniciar");
              break;
            case "dialogoMovel":
              dialogoMovel(client, message);
              atualizaStage(cliente.id, 6, "reiniciar");
              break;
            case "dialogoOrcamento":
              dialogoOrcamento(client, message);
              atualizaStage(cliente.id, 4, "reiniciar");
              break;
            case "dialogoPlanejado":
              dialogoPlanejado(client, message);
              atualizaStage(cliente.id, 7, "reiniciar");
              break;
            case "dialogoQuadros":
              dialogoQuadros(client, message);
              atualizaStage(cliente.id, 7, "reiniciar");
              break;
            case "dialogoSac":
              dialogoSac(client, message);
              atualizaStage(cliente.id, 5, "reiniciar");
              break;
            default:
              dialogoInicial(client, message);
              atualizaStage(cliente.id, 2, "dialogoinicial");
              break;
          } 
        }else if (message.body && stage === 1) {
           dialogoInicial(client, message);
           const estado = 2;
           const dialogo = "dialogoinicial";
           atualizaStage(cliente.id, estado, dialogo);
        }else if (stage === 2){   
          const mensagem = message.body
          switch(mensagem){
            case "1":
              dialogoCaminho1(client, message);
              atualizaStage(cliente.id, 3, "dialogocaminho1");
              break;
            case '2':
              dialogoCaminho2(client, message);
              atualizaStage(cliente.id, 3, "dialogocaminho2");
              break;
          }
        }else if(stage === 3){
          const mensagem = message.body
          switch(mensagem){
            case "1":
              dialogoOrcamento(client, message)
              atualizaStage(cliente.id, 4, " dialogoOrcamento");
              break;
            case "2":
              dialogoSac(client, message)
              atualizaStage(cliente.id, 5, "dialogoSac");
              break;
            case "3":
              dialogoAtendente(client, message)
              atualizaStage(cliente.id, 10, "dialogoAtendente"); // Verificar se o stage esta correto
              break;
          }
        }else if(stage === 4){
          const mensagem = message.body
          switch(mensagem){
            case "1":
              dialogoMovel(client, message)
              atualizaStage(cliente.id, 6, "dialogoMovel");
              break
            case "2":
              dialogoPlanejado(client, message)
              atualizaStage(cliente.id, 7, "dialogoPlanejado");
              break
            case "3":
              dialogoEstante(client, message)
              atualizaStage(cliente.id, 10, "dialogoEstante");
              break
            case "4":
              dialogoQuadro(client, message)
              atualizaStage(cliente.id, 8, "dialogoQuadro");
              break
            case "5":
              dialogoAtendente(client, message)
              atualizaStage(cliente.id, 10, "dialogoAtendente");
              break
        }
      }else if(stage === 6){
        const mensagem = message.body
          switch(mensagem){
            case "1":
              dialogoAtendente(client, message)
              atualizaStage(cliente.id, 10, "dialogoAtendente");
              break
            case '2':
              dialogoAtendente(client, message)
              atualizaStage(cliente.id, 10, "dialogoAtendente");
              break
            case '3':
              dialogoduvida2(client, message)
              atualizaStage(cliente.id, 10, "dialogoduvida2");
              break
            }
      }else if(stage === 7){
        dialogoAtendente(client, message)
        atualizaStage(cliente.id, 10, "dialogoAtendente");
      }else if(stage === 8){
        const mensagem = message.body
        switch(mensagem){
          case "1":
            dialogoAtendente(client, message)
            atualizaStage(cliente.id, 10, "dialogoAtendente");
            break
          case '2':
            dialogoAtendente(client, message)
            atualizaStage(cliente.id, 10, "dialogoAtendente");
            break
          case '3':
            dialogoduvida1(client, message)
            atualizaStage(cliente.id, 10, "dialogoduvida1");
            break
          }
      }
      }
    }
  });
}

// Inicie o Venom Bot aqui
create({
  session: "Tendenci", // Nome da sessão
})
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });