import Cliente from "../models/chat.js";
async function stage(id, stage) {
  await Cliente.update({ stage: stage }, { where: { id: id } });
}
export default stage;
