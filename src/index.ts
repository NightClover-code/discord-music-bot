//importing dependencies
import { Bot } from './Bot';
import { CustomClient } from './Client';
import dotenv from 'dotenv';

dotenv.config();

const client = new CustomClient();
const bot = new Bot(client);

// Emitted whenever a node connects
client.manager.on('nodeConnect', node => {
  console.log(`Node "${node.options.identifier}" connected.`);
});

// Emitted whenever a node encountered an error
client.manager.on('nodeError', (node, error) => {
  console.log(
    `Node "${node.options.identifier}" encountered an error: ${error.message}.`
  );
});

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
