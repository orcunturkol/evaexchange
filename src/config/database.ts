import { Sequelize, ModelCtor } from 'sequelize-typescript';
import { Share } from '../models/share';
import { Portfolio } from '../models/portfolio';
import { Transaction } from '../models/transaction'; // Import the Transaction model
import "dotenv/config";
 
export const sequelize = new Sequelize({ 
    dialect: 'postgres',
    host: process.env.DB_HOST as string,
    port:  process.env.DB_PORT as unknown as number,
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_DATABASE as string,
    logging: false,
    models: [Share, Portfolio, Transaction] as ModelCtor[],
});
 