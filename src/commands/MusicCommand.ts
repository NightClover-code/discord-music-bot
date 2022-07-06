import { Message } from 'discord.js';
import { CustomClient } from '../Client';
import { possibleArgsEmbed } from '../embeds/messageEmbed';
import { playSong } from '../utils/music/playSong';
import { stopSong } from '../utils/music/stopSong';

enum ArgTypes {
  PLAY = 'play',
  STOP = 'stop',
  SKIP = 'skip',
}

export class MusicCommand {
  musicHelper = (
    message: Message,
    args: string[],
    CMD_NAME: string,
    client: CustomClient
  ): Promise<Message> | null => {
    switch (args[0]) {
      case ArgTypes.PLAY:
        return playSong(message, args, client);
      case ArgTypes.STOP:
        return stopSong(message, client);
      default:
        return possibleArgsEmbed(message, CMD_NAME as command);
    }
  };
}
