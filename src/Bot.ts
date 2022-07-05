import { Client } from 'discord.js';
import { Listener } from './Listener';

export class Bot {
  DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
  PREFIX = '$';

  listener = new Listener();

  constructor(public client: Client) {}

  //login the bot
  login(): void {
    this.client.on('ready', () => {
      console.log(`${this.client.user?.username} is now online!`);
    });

    this.client.login(this.DISCORD_BOT_TOKEN);
  }

  //messages
  checkMessages(): void {
    this.client.on('message', message => {
      if (message.content.startsWith(this.PREFIX)) {
        const [CMD_NAME, ...args] = message.content
          .trim()
          .substring(this.PREFIX.length)
          .split(/\s+/);

        return this.listener.listenForCommands(
          message,
          CMD_NAME as command,
          args
        );
      }
    });
  }
}
