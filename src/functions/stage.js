import Cliente from "../models/chat.js";
async function atualizaStage(id, stage, dialogo){
  await Cliente.update({ stage: stage, dialogo: dialogo }, { where: { id: id } });
}
export default atualizaStage;
