import { Sequelize } from 'sequelize-typescript';

const PG_HOST = process.env.PG_HOST || 'localhost';
const PG_NAME = process.env.PG_NAME || 'auth_develop';
const PG_USER = process.env.PG_USER || 'auth';
const PG_PASS = process.env.PG_PASS || 'authisawesome';


const sequelizeInst = new Sequelize({
  host: PG_HOST,
  database: PG_NAME,
  dialect: 'postgres',
  username: PG_USER,
  password: PG_PASS,
});

import { User } from './models/User.model';

sequelizeInst.addModels([
  User,
]);


export default sequelizeInst;
export {
  User,
};

