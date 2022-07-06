import { Message } from 'discord.js';
import { UserCommand } from '../commands/UserCommand';
import { ServerCommand } from '../commands/ServerCommand';
import { possibleCommandsEmbed } from '../embeds/messageEmbed';
import { MusicCommand } from '../commands/MusicCommand';
import { CustomClient } from '../Client';

const serverCommand = new ServerCommand();
const userCommand = new UserCommand();
const musicCommand = new MusicCommand();

enum CommandTypes {
  SERVER = 'server',
  USER = 'user',
  MUSIC = 'music',
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
    case CommandTypes.MUSIC:
      return musicCommand.musicHelper(message, args, CMD_NAME, client);
    default:
      return possibleCommandsEmbed(message);
  }
};
