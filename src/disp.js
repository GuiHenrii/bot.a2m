import conn from "./db/conn.js";
import Cliente from "./models/chat.js";
import schedule from "node-schedule";
import moment from "moment";
import { create } from "venom-bot";
import { Op } from "sequelize";
import atualizaStage from "./functions/stage.js";
import dialogoCaminho from "./dialogo/dialogoCaminho.js";
import dialogoInicial from "./dialogo/dialogoInicial.js";
import dialogoOrcamento from "./dialogo/dialogoOrcamento.js";
import dialogoSac from "./dialogo/dialogoSac.js";
import dialogoCredencial from "./dialogo/dialogoCredencial.js";
import dialogofinal from "./dialogo/dialogofinal.js";

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

    // Bote Receptivo
    client.onMessage(async (message) => {
      console.log(message);
      // Verifica se a messagem é de grupo
      if (message.isGroupMsg === false) {
        const tel = message.from.replace(/@c\.us/g, ""); // recebe o numero de telefone do cliente
        const cliente = await Cliente.findOne({
          raw: true,
          where: { telefone: tel },
        }); // Pesquisa o cliente no banco de dados

        if (!cliente) {
          const telefoneContao = message.from.replace(/@c\.us/g, "");
          const dados = {
            nome: message.notifyName,
            telefone: telefoneContao,
            atendido: 1,
            assunto: "contato Whatspp",
            stage: 1,
          };
          console.log(dados);
          const cliente = await Cliente.create(dados);
          if (message.body && dados.stage === 1) {
            // Chama o dialogo 1
            dialogoInicial(client, message);
            const estado = 2;
            atualizaStage(cliente.id, estado);
          }
        } else {
          //chama dialogo inicial
          const id = cliente.id;
          const stage = cliente.stage;
          if (message.body && stage === 1) {
            // chama o dialogo 1
            dialogoInicial(client, message);
            const estado = 2;
            atualizaStage(id, estado);
          }
          //Pergunta se deseja sac ou orçamento
          else if (message.body && stage === 2) {
            dialogoCaminho(client, message);
            const estado = 3;
            atualizaStage(id, estado);
          }
          //Caso queira o orcamento
          else if (message.body === "1" && stage === 3) {
            dialogoOrcamento(client, message);
            const estado = 4;
            atualizaStage(id, estado);
          }
          //caso queira falar no sac
          else if (message.body === "2" && stage === 3) {
            dialogoSac(client, message);
            const estado = 4;
            atualizaStage(id, estado);
          } else if (message.body && stage === 4) {
            dialogofinal(client, message);
            const estado = 4;
            atualizaStage(id, estado);
          }
        }
      }
    });
  });
}
const venomOptions = {
  multiDevice: false,
  session: "Testes",
  createPathFileToken: true,
  waitForLogin: true,
  createPathFileToken: true,
  disableReadReceipts: true, // Desativa a marcação de mensagens lidas
};
create(venomOptions)
  .then((client) => start(client))
  .catch((error) => {
    console.log(error);
  });
conn
  .sync()
  .then(() => {})
  .catch((err) => console.log(err));
