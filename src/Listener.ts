import { commandsWithArgs } from './utils';
import { Message } from 'discord.js';
import { commandsListenerSwitch } from './helpers/commandsSwitch';
import { possibleArgsEmbed } from './embeds/messageEmbed';

export class Listener {
  listenForCommands = (
    message: Message,
    CMD_NAME: string,
    args: string[],
    globalQueue: Map<any, any>
  ): Promise<Message> => {
    if (
      !args.length &&
      Object.keys(commandsWithArgs).includes(CMD_NAME) &&
      commandsWithArgs[CMD_NAME as command].length
    ) {
      return possibleArgsEmbed(message, CMD_NAME as command);
    }

    return commandsListenerSwitch(message, CMD_NAME, args)!;
  };
}
