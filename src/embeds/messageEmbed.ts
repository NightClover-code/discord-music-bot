import { Message, MessageEmbed } from 'discord.js';
import { commandsWithArgs } from '../utils';

export const possibleArgsEmbed = (
  message: Message,
  CMD_NAME: command
): Promise<Message> => {
  const args = commandsWithArgs[CMD_NAME].map((el: string) => `- ${el}`);

  const embed = new MessageEmbed()
    .setColor(message.member?.displayColor!)
    .setTitle(`Possible arguments for ${CMD_NAME}`)
    .setDescription(args);

  return message.reply(embed);
};

export const possibleCommandsEmbed = (message: Message): Promise<Message> => {
  const commands = Object.keys(commandsWithArgs).map(el => `- ${el}`);

  const embed = new MessageEmbed()
    .setColor(message.member?.displayColor!)
    .setTitle('Possible Commands')
    .setDescription(commands);

  return message.reply(embed);
};
