import { Message } from 'discord.js';
import { CustomClient } from '../../Client';

export const stopSong = async (
  message: Message,
  client: CustomClient
): Promise<Message> => {
  const channel = message.member?.voice.channel;
  const guildId = message.guild?.id!;

  if (!channel) return message.reply('You need to join a voice channel.');

  const player = client.manager.players.get(guildId);

  if (!player) return message.reply('There are no songs in the queue!');

  player.destroy();

  return message.reply('Queue successfully cleared!');
};
