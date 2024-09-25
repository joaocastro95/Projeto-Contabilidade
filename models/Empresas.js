import { Sequelize } from "sequelize";
import { sequilize } from '../db/connection.js';

const db = sequilize;


export const Empresa = db.define('empresa', {
    name: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
    cnpj: {
        type: Sequelize.STRING,
    }
})

