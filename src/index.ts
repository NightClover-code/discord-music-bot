//importing dependencies
import { Bot } from './Bot';
import { CustomClient } from './Client';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const client = new CustomClient();
const bot = new Bot(client);

// Listen for when the client becomes ready
client.once('ready', () => {
  // Initiates the manager and connects to all the nodes
  client.manager.init(client.user?.id);

  console.log(`${client.user?.username} is now online!`);
});

// THIS IS REQUIRED. Send raw events to Erela.js
client.on('raw', d => client.manager.updateVoiceState(d));

bot.login();
bot.checkMessages();

mongoose.connect(process.env.MONGODB_DATABASE_URL!, () => {
  console.log('Connected to DB!');
});
