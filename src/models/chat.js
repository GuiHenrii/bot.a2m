import { DataTypes } from "sequelize";

// Importar o conector do banco
import sequelize from "../db/conn.js";

const Clientes = sequelize.define("clientes", {
  nome: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  assunto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  atendido: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  stage: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

export default Clientes;
