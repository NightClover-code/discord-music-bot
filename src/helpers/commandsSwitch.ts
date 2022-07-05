import { Message } from 'discord.js';
import { UserCommand } from '../commands/UserCommand';
import { ServerCommand } from '../commands/ServerCommand';
import { possibleCommandsEmbed } from '../embeds/messageEmbed';

const serverCommand = new ServerCommand();
const userCommand = new UserCommand();

enum CommandTypes {
  SERVER = 'server',
  USER = 'user',
}

export const commandsListenerSwitch = (
  message: Message,
  CMD_NAME: string,
  args: string[]
): Promise<Message> | null => {
  switch (CMD_NAME) {
    case CommandTypes.SERVER:
      return serverCommand.serverHelper(message, args[0], CMD_NAME);
    case CommandTypes.USER:
      return userCommand.userHelper(message, args[0], CMD_NAME);
    default:
      return possibleCommandsEmbed(message);
  }
};
