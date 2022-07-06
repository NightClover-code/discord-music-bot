import { Message } from 'discord.js';
import { possibleArgsEmbed } from '../embeds/messageEmbed';
import { serverMembersEmbed, serverNameEmbed } from '../embeds/serverEmbed';

enum ArgTypes {
  NAME = 'name',
  MEMBERS = 'members',
}

export class ServerCommand {
  serverHelper = (
    message: Message,
    args: string[],
    CMD_NAME: string
  ): Promise<Message> | null => {
    switch (args[0]) {
      case ArgTypes.NAME:
        return serverNameEmbed(message);
      case ArgTypes.MEMBERS:
        if (!message.author.bot) {
          return serverMembersEmbed(message);
        }
        return null;
      default:
        return possibleArgsEmbed(message, CMD_NAME as command);
    }
  };
}
