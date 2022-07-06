import { Message } from 'discord.js';
import { CustomClient } from '../Client';
import { possibleArgsEmbed } from '../embeds/messageEmbed';

export class JoinCommand {
  joinHelper = (
    message: Message,
    args: string[],
    CMD_NAME: string,
    client: CustomClient
  ): Promise<Message> | null => {
    const channel = message.member?.voice.channel;
    const guildId = message.guild?.id!;

    const helper = async () => {
      if (!channel) return message.reply('you need to join a voice channel.');
      if (args.length < 2)
        return message.reply('you need to give me a URL or a search term.');

      const search = args.join(' ');
      let res;

      try {
        // Search for tracks using a query or url, using a query searches youtube automatically and the track requester object
        res = await client.manager.search(search, message.author);
        // Check the load type as this command is not that advanced for basics
        if (res.loadType === 'LOAD_FAILED') throw res.exception;
        else if (res.loadType === 'PLAYLIST_LOADED')
          throw { message: 'Playlists are not supported with this command.' };
      } catch (err) {
        return message.reply(`there was an error while searching!`);
      }

      if (res.loadType === 'NO_MATCHES')
        return message.reply('there was no tracks found with that query.');

      // Create the player
      const player = client.manager.create({
        guild: guildId,
        voiceChannel: message.member.voice.channel.id,
        textChannel: message.channel.id,
      });

      // Connect to the voice channel and add the track to the queue
      player.connect();
      player.queue.add(res.tracks[0]);

      // Checks if the client should play the track if it's the first one added
      if (!player.playing && !player.paused && !player.queue.size)
        player.play();

      return message.reply(`enqueuing ${res.tracks[0].title}.`);
    };

    switch (args[0]) {
      case 'play':
        return helper();
      default:
        return possibleArgsEmbed(message, CMD_NAME as command);
    }
  };
}
