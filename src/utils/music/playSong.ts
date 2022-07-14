import { Message } from 'discord.js';
import { CustomClient } from '../../Client';

export const playSong = async (
  message: Message,
  args: string[],
  client: CustomClient
): Promise<Message> => {
  const _args = args.filter((el, i) => i > 0);

  const channel = message.member?.voice.channel;
  const guildId = message.guild?.id!;

  if (!channel) return message.reply('You need to join a voice channel.');

  if (!_args.length)
    return message.reply(
      'You need to provide a URL or a search term, or a playlist.'
    );

  const player = client.manager.create({
    guild: guildId,
    voiceChannel: channel.id,
    textChannel: channel.id,
  });

  const search = _args.join(' ');
  let res, tracks;

  const songs = ['intervals 5 htp', 'james franco polyphia'];

  try {
    if (search.startsWith('playlist:')) {
      message.reply(`Loading tracks...`);

      tracks = await Promise.all(
        songs.map(
          async song =>
            (
              await client.manager.search(song, message.author)
            ).tracks[0]
        )
      );
      if (player.state !== 'CONNECTED') player.connect();

      player.queue.add(tracks);
      if (
        !player.playing &&
        !player.paused &&
        player.queue.totalSize === tracks.length
      )
        player.play();

      console.log(tracks);

      return message.reply(`Multiple tracks added to queue!`);
    } else {
      res = await client.manager.search(search, message.author);

      if (res.loadType === 'NO_MATCHES')
        return message.reply('There was no tracks found with that query.');
      else if (res.loadType === 'LOAD_FAILED') throw res.exception;
      else if (res.loadType === 'PLAYLIST_LOADED')
        throw { message: 'Playlists are not supported with this command.' };

      player.connect();
      player.queue.add(res.tracks[0]);

      if (!player.playing && !player.paused && !player.queue.size)
        player.play();

      return message.reply(`${res.tracks[0].title} is added to queue!`);
    }
  } catch (err) {
    return message.reply(`There was an error while searching!`);
  }
};
