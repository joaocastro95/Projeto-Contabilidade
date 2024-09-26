import { Sequelize } from "sequelize";

export const sequilize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/app.db',
    dialectOptions: {
        busyTimeout: 30000 // Tempo de espera de 30 segundos
    }
});


