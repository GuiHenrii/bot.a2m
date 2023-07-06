import conn from "./db/conn.js";
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

        atualizaAtendimento(id);

        async function atualizaAtendimento(id) {
          const atendido = 1;
          await Cliente.update({ atendido }, { where: { id: id } });
        }
      }

      console.log("Todas as mensagens foram enviadas!");
    })();
  });

  // Bot Receptivo
  client.onMessage(async (message) => {
    console.log(message);
    // Verifica se a mensagem não é de grupo
    if (!message.isGroupMsg) {
      const tel = message.from.replace(/@c\.us/g, ""); // recebe o número de telefone do cliente
      const cliente = await Cliente.findOne({
        raw: true,
        where: { telefone: tel },
      }); // Pesquisa o cliente no banco de dados

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
      } else {
        //chama dialogo inicial
        const id = cliente.id;
        const stage = cliente.stage;
        switch (stage) {
          case 1:
            if (message.body) {
              // chama o diálogo 1
              dialogoInicial(client, message);
              const estado = 2;
              const dialogo = "dialogoinicial";
              atualizaStage(cliente.id, estado, dialogo);
            }
            break;
          case 2:
            if (message.body === "1") {
              dialogoCaminho1(client, message);
              const estado = 3;
              const dialogo = "dialogocaminho1";
              atualizaStage(cliente.id, estado, dialogo);
            } else if (message.body === "2") {
              dialogoCaminho2(client, message);
              const estado = 3;
              const dialogo = "dialogocaminho2";
              atualizaStage(cliente.id, estado, dialogo);
            }
            break;
          case 3:
            if (message.body === "1") {
              dialogoOrcamento(client, message);
              const estado = 4;
              const dialogo = "dialogoorcamento";
              atualizaStage(cliente.id, estado, dialogo);
            } else if (message.body === "2") {
              dialogoSac(client, message);
              const estado = 4;
              const dialogo = "dialogoSac";
              atualizaStage(cliente.id, estado, dialogo);
            }
            break;
          case 4:
            if (message.body === "1") {
              dialogoMovel(client, message);
              const estado = 5;
              const dialogo = "dialogomovel";
              atualizaStage(cliente.id, estado, dialogo);
            } else if (message.body === "2") {
              dialogoPlanejado(client, message);
              const estado = 7;
              const dialogo = "dialogoPlanejado";
              atualizaStage(cliente.id, estado, dialogo);
            } else if (message.body === "3") {
              dialogoEstante(client, message);
              const estado = 7;
              const dialogo = "dialogoEstante";
              atualizaStage(cliente.id, estado, dialogo);
            } else if (message.body === "4") {
              dialogoQuadro(client, message);
              const estado = 7;
              const dialogo = "dialogoQuadro";
              atualizaStage(cliente.id, estado, dialogo);
            } else if (message.body === "5") {
              dialogoAtendente(client, message);
              const estado = 7;
              const dialogo = "dialogoAtendente";
              atualizaStage(cliente.id, estado, dialogo);
            }
            break;
          case 5:
            if (message.body === "1" || message.body === "2") {
              dialogoAtendente(client, message);
              const estado = 6;
              const dialogo = "dialogoAtendente";
              atualizaStage(cliente.id, estado, dialogo);
            } else if (message.body === "3") {
              dialogoduvida2(client, message);
              const estado = 15;
              const dialogo = "dialogoduvida2";
              atualizaStage(cliente.id, estado, dialogo);
            } else if (message.body === "0") {
              const cliente = await Cliente.findOne({
                raw: true,
                where: { id: id },
              });
              const newStage = cliente.stage;
              const estado = newStage - 1;
              atualizaStage(id, estado);
            }
            break;
          case 7:
            if (message.body === "1" || message.body === "2") {
              dialogoAtendente(client, message);
              const estado = 8;
              const dialogo = "dialogoAtendente";
              atualizaStage(cliente.id, estado, dialogo);
            } else if (message.body === "0") {
              dialogoOrcamento(client, message);
              const estado = 5;
              const dialogo = "dialogoOrcamento";
              atualizaStage(cliente.id, estado, dialogo);
            }
            break;
          default:
            break;
      }
    });
  }

