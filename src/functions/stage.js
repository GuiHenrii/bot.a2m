import Cliente from "../models/chat.js";

async function atualizaStage(id, stage) {
  await Cliente.update({ stage: stage }, { where: { id: id } });
}
export default atualizaStage;
