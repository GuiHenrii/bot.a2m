import Cliente from "./models/chat.js";
import conn from "./db/conn.js";
import { create } from "venom-bot";
import { Op } from "sequelize";
import atualizaStage from "./functions/stage.js";
import dialogoInicial from "./dialogo/dialogoInicial.js";
import dialogoSite from "./dialogo/dialogoSite.js";
import dialogoAtendente from "./dialogo/dialogoAtendente.js";
import dialogoFuncional from "./dialogo/dialogoFuncional.js";
import dialogoTexto from "./dialogo/dialogoTexto.js";
import dialogoreiniciar from "./dialogo/dialogoreiniciar.js";
import dialogoAudio from "./dialogo/dialogoAudio.js";
import dialogoFoto from "./dialogo/dialogoFoto.js";
import dialogoAdmin from "./dialogo/dialogoAdmin.js";

function start(client) {
  console.log("Cliente Venom iniciado!");
  // Inicio atendimento
  const atendimento = {};

  client.onMessage(async (message) => {
    // Verifica se a mensagem não é de grupo
    if (message.isGroupMsg === false) {
      const tel = message.from.replace(/@c\.us/g, ""); // recebe o número de telefone do cliente
      // Pesquisa o cliente no banco de dados
      const cliente = await Cliente.findOne({
        raw: true,
        where: { telefone: tel },
      });
      if (!cliente) {
        console.log("Novo atendimento criado");
        const dados = {
          nome: message.notifyName,
          telefone: tel,
          assunto: "contato Whatsapp",
          atendido: 1,
          stage: 1,
        };

        const cliente = await Cliente.create(dados);
        dialogoInicial(client, message);
        const id = cliente.id;
        const stage = 2;
        atualizaStage(id, stage);
      }

      //  -------------------- Envia as vantagens
      else if (message.body === "1" && cliente.stage === 2) {
        client
          .sendFile(
            message.from,
            "./assets/Sistema.pdf",
            "Sistema de Mensagens Inteligentes",
            "Digite *0* para voltar ao menu inicial"
          )
          .then((result) => {
            console.log("Result: ", result); //return object success
          })
          .catch((erro) => {
            console.error("Error when sending: ", erro); //return object error
          });
        const stage = 2;
        const id = cliente.id;
        atualizaStage(id, stage);
      }

      //  -------------------- Envia o site
      else if (message.body === "2" && cliente.stage === 2) {
        dialogoSite(client, message);
        const id = cliente.id;
        const stage = 2;
        atualizaStage(id, stage);
      }
      //  -------------------- joga pras funcionalidades
      else if (message.body === "3" && cliente.stage === 2) {
        dialogoFuncional(client, message);
        const id = cliente.id;
        const stage = 3;
        atualizaStage(id, stage);
      } else if (message.body === "1" && cliente.stage === 3) {
        dialogoFoto(client, message);
        const stage = 2;
        const id = cliente.id;
        atualizaStage(id, stage);
      } else if (message.body === "2" && cliente.stage === 3) {
        dialogoTexto(client, message);
        const id = cliente.id;
        const stage = 2;
        atualizaStage(id, stage);
      } else if (message.body === "3" && cliente.stage === 3) {
        dialogoAudio(client, message);
        const stage = 2;
        const id = cliente.id;
        atualizaStage(id, stage);
      }
      //joga pro Especialista
      else if (message.body === "4" && cliente.stage === 2) {
        dialogoAtendente(client, message);
        const id = cliente.id;
        const stage = 2;
        atualizaStage(id, stage);
      }
      //admin
      else if (message.body === "5" && cliente.stage === 2) {
        dialogoAdmin(client, message);
        const id = cliente.id;
        const stage = 2;
        atualizaStage(id, stage);
      }
      // --------------------- Final do ajuste ---------------
      // Caso algo de errado
      else {
        dialogoInicial(client, message);
        const id = cliente.id;
        const stage = 2;
        atualizaStage(id, stage);

        const texto = "";
        client
          .sendText(message.from, texto)
          .then(() => {
            console.log("Mensagem enviada.");
          })
          .catch((error) => {
            console.error("Erro ao enviar mensagem", error);
          });
      }
    }
  });
}

// Inicie o Venom Bot aqui
create({
  session: "A2M", // Nome da sessão
})
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });
conn
  .sync()
  .then(() => {})
  .catch((err) => console.log(err));
