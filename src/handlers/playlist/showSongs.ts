import { Message, MessageEmbed } from 'discord.js';
import Playlist from '../../models/Playlist';
import User from '../../models/User';

export const showSongs = async (
  message: Message,
  args: string[]
): Promise<Message> => {
  const name = args[1];
  const userId = message.member?.id;

  const user = await User.findOne({ userId });
  const [playlist] = await Playlist.find({ name });

  try {
    if (!user)
      return message.reply(`Playlist are only available for registered users!`);

    if (!playlist)
      return message.reply(`We couldn't find the playlist ${name}!`);

    const embed = new MessageEmbed()
      .setColor(message.member?.displayColor!)
      .setTitle(`Playlist ${name} songs`)
      .setDescription(playlist.songs);

    return message.reply(embed);
  } catch (err) {
    return message.reply('Something went wrong :(');
  }
};
