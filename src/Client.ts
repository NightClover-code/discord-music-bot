import { Client } from 'discord.js';
import { Manager } from 'erela.js';
import { nodeOptions } from './utils';

export class CustomClient extends Client {
  manager = new Manager({
    nodes: [nodeOptions],

    send: (id, payload) => {
      const guild = this.guilds.cache.get(id);

      if (guild) guild.shard.send(payload);
    },
  })
    .on('nodeConnect', node => {
      console.log(`Node "${node.options.identifier}" connected.`);
    })
    .on('nodeError', (node, error) => {
      console.log(
        `Node "${node.options.identifier}" encountered an error: ${error.message}.`
      );
    });

  constructor() {
    super();
  }
}
