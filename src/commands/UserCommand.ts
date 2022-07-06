import { Message } from 'discord.js';
import { possibleArgsEmbed } from '../embeds/messageEmbed';
import { userInfoEmbed } from '../embeds/userEmbed';

enum ArgTypes {
  INFO = 'info',
}

export class UserCommand {
  userHelper = (
    message: Message,
    args: string[],
    CMD_NAME: string
  ): Promise<Message> => {
    switch (args[0]) {
      case ArgTypes.INFO:
        return userInfoEmbed(message);
      default:
        return possibleArgsEmbed(message, CMD_NAME as command);
    }
  };
}
