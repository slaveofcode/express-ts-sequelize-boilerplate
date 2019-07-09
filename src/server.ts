import dotenv from 'dotenv';

dotenv.config();

const portNum: number = Number(process.env.SERVER_PORT || '5000');

import { App } from './app';

const server = new App();
server.start(portNum);
