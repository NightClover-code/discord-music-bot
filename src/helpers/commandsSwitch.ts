import { Message } from 'discord.js';
import { UserCommand } from '../commands/UserCommand';
import { ServerCommand } from '../commands/ServerCommand';
import { possibleCommandsEmbed } from '../embeds/messageEmbed';
import { JoinCommand } from '../commands/JoinCommand';
import { CustomClient } from '../Client';

const serverCommand = new ServerCommand();
const userCommand = new UserCommand();
const joinCommand = new JoinCommand();

enum CommandTypes {
  SERVER = 'server',
  USER = 'user',
  JOIN = 'join',
}

export const commandsListenerSwitch = (
  message: Message,
  CMD_NAME: string,
  args: string[],
  client: CustomClient
): Promise<Message> | null => {
  switch (CMD_NAME) {
    case CommandTypes.SERVER:
      return serverCommand.serverHelper(message, args, CMD_NAME);
    case CommandTypes.USER:
      return userCommand.userHelper(message, args, CMD_NAME);
    case CommandTypes.JOIN:
      return joinCommand.joinHelper(message, args, CMD_NAME, client);
    default:
      return possibleCommandsEmbed(message);
  }
};
