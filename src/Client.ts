import { Client } from 'discord.js';
import { Manager, NodeOptions } from 'erela.js';

const nodes = [
  {
    //TODO
    host: 'localhost',
    password: '123456',
    port: 8000,
  },
] as NodeOptions[];

export class CustomClient extends Client {
  manager = new Manager({
    nodes,

    send: (id, payload) => {
      const guild = this.guilds.cache.get(id);

      if (guild) guild.shard.send(payload);
    },
  });

  constructor() {
    super();
  }
}
