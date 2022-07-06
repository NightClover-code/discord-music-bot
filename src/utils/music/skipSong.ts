import { Message } from 'discord.js';
import { CustomClient } from '../../Client';

export const skipSong = async (
  message: Message,
  client: CustomClient
): Promise<Message> => {
  const channel = message.member?.voice.channel;
  const guildId = message.guild?.id!;

  if (!channel) return message.reply('You need to join a voice channel.');

  const player = client.manager.players.get(guildId);

  if (!player || !player.queue.size)
    return message.reply('There are no songs in the queue!');

  player.stop();
  player.play();

  return message.reply(`Now playing...${player.queue[0].title}`);
};
