import { NodeOptions } from 'erela.js';
import dotenv from 'dotenv';

dotenv.config();

export const commandsWithArgs = {
  user: ['info'],
  server: ['name', 'members'],
  music: ['play', 'skip', 'stop'],
  playlist: ['register', 'create', 'add', 'showcase', 'show'],
};

export const nodeOptions = {
  host: process.env.HOST,
  password: process.env.PASSWORD,
  port: parseInt(process.env.PORT!),
} as NodeOptions;
