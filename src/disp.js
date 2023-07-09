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
          const dialogo = await Cliente.findOne({
            attributes: dialogo,
            where: {
              id: id,
            },
          });
          switch (dialogo) {
            case "dialogoInicial":
              dialogoInicial(client, message);
              atualizaStage(cliente.id, 2, "dialogoInicial");
              break;
            case "dialogoCaminho1":
              dialogoCaminho(client, message);
              atualizaStage(cliente.id, 3, "dialogoCaminho1");
              break;
            case "dialogoOrcamento":
              dialogoOrcamento(client, message);
              atualizaStage(cliente.id, 4, "dialogoOrcamento");
              break;
            case "dialogoCaminho2":
              dialogoSac(client, message);
              atualizaStage(cliente.id, 3, "dialogoCaminho2");
              break;
            case "dialogoAtendente":
              dialogoSac(client, message);
              atualizaStage(cliente.id, 4, "dialogoAtendente");
              break;
            case "dialogoduvida1":
              dialogoSac(client, message);
              atualizaStage(cliente.id, 20, "dialogoduvida1");
              break;
            case "dialogoduvida2":
              dialogoSac(client, message);
              atualizaStage(cliente.id, 15, "dialogoduvida2");
              break;
            case "dialogoEstante":
              dialogoSac(client, message);
              atualizaStage(cliente.id, 7, "dialogoEstante");
              break;
            case "dialogoMovel":
              dialogoSac(client, message);
              atualizaStage(cliente.id, 5, "dialogoMovel");
              break;
            case "dialogoOrcamento":
              dialogoSac(client, message);
              atualizaStage(cliente.id, 4, "dialogoOrcamento");
              break;
            case "dialogoPlanejado":
              dialogoSac(client, message);
              atualizaStage(cliente.id, 7, "dialogoPlanejado");
              break;
            case "dialogoQuadros":
              dialogoQuadros(client, message);
              atualizaStage(cliente.id, 7, "dialogoQuadros");
              break;
            case "dialogoSac":
              dialogoSac(client, message);
              atualizaStage(cliente.id, 4, "dialogoSac");
              break;
            default:
              break;
          } 
        }else if (message.body && stage === 1) {
           dialogoInicial(client, message);
           const estado = 2;
           const dialogo = "dialogoinicial";
           atualizaStage(cliente.id, estado, dialogo);
        }else if (message.body === "1" && stage === 2) {
          dialogoCaminho1(client, message);
          const estado = 3;
          const dialogo = "dialogocaminho1";
          atualizaStage(cliente.id, estado, dialogo);
         } else if (message.body === "2" && stage === 2) {
          dialogoCaminho2(client, message);
          const estado = 3;
          const dialogo = "dialogocaminho2";
          atualizaStage(cliente.id, estado, dialogo);
         }if (message.body === "1" && stage === 3) {
          dialogoOrcamento(client, message);
          const estado = 4;
          const dialogo = "dialogoorcamento";
          atualizaStage(cliente.id, estado, dialogo);
        } else if (message.body === "2" && stage === 2) {
          dialogoSac(client, message);
          const estado = 4;
          const dialogo = "dialogoSac";
          atualizaStage(cliente.id, estado, dialogo);
        } else if (message.body === "1" && stage === 4) {
          dialogoMovel(client, message);
          const estado = 5;
          const dialogo = "dialogomovel";
          atualizaStage(cliente.id, estado, dialogo);
        } else if (message.body === "2" && stage === 4) {
          dialogoPlanejado(client, message);
          const estado = 7;
          const dialogo = "dialogoPlanejado";
          atualizaStage(cliente.id, estado, dialogo);
        } else if (message.body === "3") {
          dialogoEstante(client, message);
          const estado = 7;
          const dialogo = "dialogoEstante";
          atualizaStage(cliente.id, estado, dialogo);
        } else if (message.body === "4" && stage === 4) {
          dialogoQuadro(client, message);
          const estado = 7;
          const dialogo = "dialogoQuadro";
          atualizaStage(cliente.id, estado, dialogo);
        } else if (message.body === "5") {
          dialogoAtendente(client, message);
          const estado = 7;
          const dialogo = "dialogoAtendente";
          atualizaStage(cliente.id, estado, dialogo);
        } else if (message.body === "1" || message.body === "2") {
          dialogoAtendente(client, message);
          const estado = 6;
          const dialogo = "dialogoAtendente";
          atualizaStage(cliente.id, estado, dialogo);
        } else if (message.body === "3" && stage === 5) {
          dialogoduvida2(client, message);
          const estado = 15;
          const dialogo = "dialogoduvida2";
          atualizaStage(cliente.id, estado, dialogo);
        } else if (message.body === "1" || message.body === "2") {
          dialogoAtendente(client, message);
          const estado = 8;
          const dialogo = "dialogoAtendente";
          atualizaStage(cliente.id, estado, dialogo);
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