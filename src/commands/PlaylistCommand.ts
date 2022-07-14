import { possibleArgsEmbed } from '../embeds/messageEmbed';
import { Message } from 'discord.js';
import {
  createSong,
  registerUser,
  addSong,
  showSongs,
  showcasePlaylist,
} from '../handlers/playlist';

enum ArgTypes {
  REGISTER = 'register',
  CREATE = 'create',
  ADD = 'add',
  SHOWCASE = 'showcase',
  SHOW = 'show',
}

export class PlaylistCommand {
  playlistHelper = (
    message: Message,
    args: string[],
    CMD_NAME: string,
    globalQueue: Map<any, any>
  ): Promise<Message> => {
    switch (args[0]) {
      case ArgTypes.REGISTER:
        return registerUser(message);
      case ArgTypes.CREATE:
        return createSong(message, args);
      case ArgTypes.ADD:
        return addSong(message, args);
      case ArgTypes.SHOWCASE:
        return showcasePlaylist(message);
      case ArgTypes.SHOW:
        return showSongs(message, args);

      default:
        return possibleArgsEmbed(message, CMD_NAME as command);
    }
  };
}
