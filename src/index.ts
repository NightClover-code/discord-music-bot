//importing dependencies
import dotenv from 'dotenv';
import { Client } from 'discord.js';
import { Bot } from './Bot';

dotenv.config();

const client = new Client();
const bot = new Bot(client);

bot.login();
bot.checkMessages();
