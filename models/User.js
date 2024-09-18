import { Sequelize } from "sequelize";
import { sequilize } from '../db/connection.js';

const db = sequilize; 


export const User = db.define('user',{
    name: {
        type: Sequelize.STRING,
    },
    email: {
        type : Sequelize.STRING,
    },
    password :{
        type : Sequelize.STRING,
    },
    cpf: {
        type : Sequelize.STRING,
    }
})

