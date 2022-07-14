import { Message } from 'discord.js';
import { UserCommand } from '../commands/UserCommand';
import { ServerCommand } from '../commands/ServerCommand';
import { possibleCommandsEmbed } from '../embeds/messageEmbed';
import { MusicCommand } from '../commands/MusicCommand';
import { CustomClient } from '../Client';
import { PlaylistCommand } from '../commands/PlaylistCommand';

const serverCommand = new ServerCommand();
const userCommand = new UserCommand();
const musicCommand = new MusicCommand();
const playlistCommand = new PlaylistCommand();

enum CommandTypes {
  SERVER = 'server',
  USER = 'user',
  MUSIC = 'music',
  PLAYLIST = 'playlist',
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
    case CommandTypes.PLAYLIST:
      return playlistCommand.playlistHelper(message, args, CMD_NAME);
    default:
      return possibleCommandsEmbed(message);
  }
};
