import {Sequelize} from 'sequelize';

export const db = new Sequelize('SequelizeDB','USER','PASS',{
    host: 'localhost',
    dialect:'postgres'
})