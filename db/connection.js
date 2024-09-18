import { Sequelize } from "sequelize";

export const sequilize = new Sequelize({
    dialect:'sqlite',
    storage: './db/app.db'
});



