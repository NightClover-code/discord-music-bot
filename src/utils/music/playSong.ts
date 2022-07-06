import { Message } from 'discord.js';
import { CustomClient } from '../../Client';

export const playSong = async (
  message: Message,
  args: string[],
  client: CustomClient
) => {
  const _args = args.filter((el, i) => i > 0);

  const channel = message.member?.voice.channel;
  const guildId = message.guild?.id!;

  if (!channel) return message.reply('You need to join a voice channel.');

  if (!_args.length)
    return message.reply('You need to provide a URL or a search term.');

  const search = _args.join(' ');
  let res;

  try {
    res = await client.manager.search(search, message.author);

    if (res.loadType === 'LOAD_FAILED') throw res.exception;
    else if (res.loadType === 'PLAYLIST_LOADED')
      throw { message: 'Playlists are not supported with this command.' };
  } catch (err) {
    return message.reply(`There was an error while searching!`);
  }

  if (res.loadType === 'NO_MATCHES')
    return message.reply('There was no tracks found with that query.');

  const player = client.manager.create({
    guild: guildId,
    voiceChannel: message.member.voice.channel.id,
    textChannel: message.channel.id,
  });

  player.connect();
  player.queue.add(res.tracks[0]);

  if (!player.playing && !player.paused && !player.queue.size) player.play();

  return message.reply(`${res.tracks[0].title} is added to queue!`);
};
